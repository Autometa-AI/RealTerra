'use client';

import { useState } from 'react';
import Link from 'next/link';
import Field from './Field';

export default function PageEditor({ pageKey, pageLabel, groups, initialContent }) {
  const [content, setContent] = useState(initialContent);
  // What is currently in the database. Advancing this after each save is
  // what lets "undo my edit, then save again" work — otherwise reverting
  // back to the originally-loaded copy looks like "no changes" and the
  // save button goes dead while the database still holds the old edit.
  const [saved, setSaved] = useState(initialContent);
  const [status, setStatus] = useState('idle'); // idle | saving | success | error
  const [error, setError] = useState('');

  async function onSave() {
    setStatus('saving');
    setError('');
    const attempted = content;
    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: pageKey, content: attempted }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed.');
      setSaved(attempted);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  }

  const hasChanges = JSON.stringify(content) !== JSON.stringify(saved);

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
          {status === 'saving' && 'Saving…'}
          {status === 'error' && <span style={{ color: 'var(--a-danger)' }}>{error}</span>}
          {/* Editing after a save must not keep reading "Saved". */}
          {status !== 'saving' && status !== 'error' && hasChanges && 'Unsaved changes'}
          {status === 'success' && !hasChanges && (
            <span style={{ color: 'var(--a-accent)' }}>Saved — live on the site now.</span>
          )}
          {status === 'idle' && !hasChanges && 'No changes yet'}
        </span>
        <button className="a-btn a-btn-primary" onClick={onSave} disabled={status === 'saving' || !hasChanges}>
          {status === 'saving' ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  );
}
