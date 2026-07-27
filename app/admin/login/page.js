'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../admin.css';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed.');
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setStatus('idle');
      setError(err.message);
    }
  }

  return (
    <div className="admin">
      <div className="admin-login-wrap">
        <div className="admin-login-card">
          <div className="admin-login-title">RealTerra CMS</div>
          <div className="admin-login-sub">Sign in to edit site content.</div>
          {error && <div className="a-error">{error}</div>}
          <form onSubmit={onSubmit}>
            <div className="a-field">
              <label className="a-label">Username</label>
              <input
                className="a-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div className="a-field">
              <label className="a-label">Password</label>
              <input
                className="a-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <button className="a-btn a-btn-primary a-btn-full" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
