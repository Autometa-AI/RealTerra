'use client';

import { useState } from 'react';
import Link from 'next/link';
import Field from './Field';

// A short single-line field takes half a row; anything that needs room
// (paragraphs, media, repeating groups) takes the full width. This is what
// stops a page turning into one tall column of near-empty text boxes.
function isCompact(field) {
  if (field.type !== 'text' && field.type !== 'toggle' && field.type !== 'select') return false;
  if (field.type === 'text' && field.words && field.words[1] > 8) return false;
  return true;
}

function Section({ group, content, setContent, open, onToggle }) {
  const count = group.fields.length;
  return (
    <section className={`a-section${open ? ' open' : ''}`}>
      <button type="button" className="a-section-head" onClick={onToggle} aria-expanded={open}>
        <span className="a-section-title">{group.title}</span>
        <span className="a-section-meta">
          {count} field{count === 1 ? '' : 's'}
          <span className="a-section-chevron" aria-hidden="true" />
        </span>
      </button>

      {open && (
        <div className="a-section-body">
          <div className="a-fields">
            {group.fields.map((field) => (
              <div className={`a-cell${isCompact(field) ? ' a-cell-half' : ''}`} key={field.path}>
                <Field field={field} container={content} onContainerChange={setContent} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default function PageEditor({ pageKey, pageLabel, groups, initialContent }) {
  const [content, setContent] = useState(initialContent);
  // What is currently in the database. Advancing this after each save is
  // what lets "undo my edit, then save again" work — otherwise reverting
  // back to the originally-loaded copy looks like "no changes" and the
  // save button goes dead while the database still holds the old edit.
  const [saved, setSaved] = useState(initialContent);
  const [status, setStatus] = useState('idle'); // idle | saving | success | error
  const [error, setError] = useState('');
  // Only the first section starts open, so the page opens as a short list
  // of headings you can scan instead of every field at once.
  const [openSections, setOpenSections] = useState(() => new Set([groups[0]?.title]));

  function toggleSection(title) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  }

  const allOpen = openSections.size === groups.length;
  function toggleAll() {
    setOpenSections(allOpen ? new Set() : new Set(groups.map((g) => g.title)));
  }

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
            Pick a section to open it. Word counts and image sizes are suggestions, not limits.
          </p>
        </div>
        <button type="button" className="a-btn a-btn-ghost" onClick={toggleAll}>
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      {groups.map((group) => (
        <Section
          key={group.title}
          group={group}
          content={content}
          setContent={setContent}
          open={openSections.has(group.title)}
          onToggle={() => toggleSection(group.title)}
        />
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
