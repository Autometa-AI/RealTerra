import crypto from 'crypto';

export const SESSION_COOKIE = 'cms_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = process.env.CMS_SESSION_SECRET;
  if (!secret) throw new Error('CMS_SESSION_SECRET is not set.');
  return secret;
}

function sign(data, secret) {
  return crypto.createHmac('sha256', secret).update(data).digest('base64url');
}

export function createSessionToken(user) {
  const payload = JSON.stringify({
    username: user.username,
    name: user.name,
    exp: Date.now() + SESSION_TTL_MS,
  });
  const body = Buffer.from(payload).toString('base64url');
  const sig = sign(body, getSecret());
  return `${body}.${sig}`;
}

export function verifySessionToken(token) {
  if (!token || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  let expected;
  try {
    expected = sign(body, getSecret());
  } catch {
    return null;
  }
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (!payload.exp || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

function scryptHash(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

// Used offline (see scripts/hash-password.js) to generate CMS_USERS entries.
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  return `${salt}:${scryptHash(password, salt)}`;
}

export function verifyPassword(password, stored) {
  const [salt, hash] = (stored || '').split(':');
  if (!salt || !hash) return false;
  const hashBuf = Buffer.from(hash, 'hex');
  const testBuf = Buffer.from(scryptHash(password, salt), 'hex');
  return hashBuf.length === testBuf.length && crypto.timingSafeEqual(hashBuf, testBuf);
}

export function getUsers() {
  const raw = process.env.CMS_USERS;
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function findUser(username) {
  return getUsers().find((u) => u.username === username) || null;
}
