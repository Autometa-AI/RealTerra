// Usage: node scripts/hash-password.js <username> <name> <password>
// Prints a CMS_USERS JSON entry to paste into the env var (an array of these).
const crypto = require('crypto');

const [, , username, name, password] = process.argv;

if (!username || !name || !password) {
  console.error('Usage: node scripts/hash-password.js <username> <name> <password>');
  process.exit(1);
}

function hashPassword(pw) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(pw, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

const entry = { username, name, passwordHash: hashPassword(password) };
console.log(JSON.stringify(entry));
