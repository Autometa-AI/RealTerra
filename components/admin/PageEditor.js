'use client';

import { useState } from 'react';
import Link from 'next/link';
import Field from './Field';

export default function PageEditor({ pageKey, pageLabel, groups, initialContent }) {
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState('idle'); // idle | saving | success | error
  const [error, setError] = useState('');

  async function onSave() {
    setStatus('saving');
    setError('');
    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: pageKey, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed.');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  }

  const hasChanges = JSON.stringify(content) !== JSON.stringify(initialContent);

  return (
    <div>
      <Link href="/admin" className="admin-back">← Overview</Link>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-h1">{pageLabel}</h1>
          <p className="admin-sub" style={{ marginBottom: 0 }}>
            Word counts and image sizes below are suggestions, not limits — save whatever reads best.
          </p>
        </div>
      </div>

      {groups.map((group) => (
        <div className="a-section" key={group.title}>
          <div className="a-section-title">{group.title}</div>
          {group.fields.map((field) => (
            <Field key={field.path} field={field} container={content} onContainerChange={setContent} />
          ))}
        </div>
      ))}

      <div className="admin-savebar">
        <span className="admin-savebar-status">
          {status === 'error' && <span style={{ color: 'var(--a-danger)' }}>{error}</span>}
          {status === 'success' && <span style={{ color: 'var(--a-accent)' }}>Saved — live on the site now.</span>}
          {status === 'idle' && hasChanges && 'Unsaved changes'}
          {status === 'idle' && !hasChanges && 'No changes yet'}
          {status === 'saving' && 'Saving…'}
        </span>
        <button className="a-btn a-btn-primary" onClick={onSave} disabled={status === 'saving' || !hasChanges}>
          {status === 'saving' ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  );
}
