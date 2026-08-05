'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Field from './Field';
import { CMS_PAGES } from '../../lib/cms-schema';
import { DRAFTS_EVENT, dropDraft, dropDrafts, getDraft, listDrafts, putDraft } from '../../lib/admin-drafts';

const pageLabelFor = (key) => CMS_PAGES.find((p) => p.key === key)?.label || key;

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
  // Every page holding unsaved edits — including ones edited earlier in this
  // session and then navigated away from. This is what "Save changes"
  // publishes, so the editor has to show it before the button is pressed.
  const [pending, setPending] = useState([]);
  const [restored, setRestored] = useState(false);
  const [storageFull, setStorageFull] = useState(false);
  // Nothing is written back to the draft store until the stored draft for
  // this page has been read in — otherwise the first pass, still holding the
  // server copy, would clear the very draft it is about to restore.
  const [hydrated, setHydrated] = useState(false);

  // Drafts live in localStorage, which does not exist during the server
  // render — read them once the component is on the client.
  useEffect(() => {
    const sync = () => setPending(listDrafts());
    const draft = getDraft(pageKey);
    if (draft && JSON.stringify(draft) !== JSON.stringify(initialContent)) {
      setContent(draft);
      setRestored(true);
    }
    sync();
    setHydrated(true);
    window.addEventListener(DRAFTS_EVENT, sync);
    return () => window.removeEventListener(DRAFTS_EVENT, sync);
  }, [pageKey, initialContent]);

  const dirty = JSON.stringify(content) !== JSON.stringify(saved);

  // Mirror the working copy into the draft store on every edit, and clear it
  // again if the editor undoes their way back to what is already published.
  useEffect(() => {
    if (!hydrated) return;
    if (dirty) {
      if (!putDraft(pageKey, content)) setStorageFull(true);
    } else {
      dropDraft(pageKey);
    }
  }, [hydrated, dirty, content, pageKey]);

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

  // Everything one press of "Save changes" will publish: this page's working
  // copy plus any other page still holding a draft.
  const updates = useMemo(() => {
    const byPage = new Map(pending.map((d) => [d.page, d.content]));
    if (dirty) byPage.set(pageKey, content);
    else byPage.delete(pageKey);
    return [...byPage].map(([page, pageContent]) => ({ page, content: pageContent }));
  }, [pending, dirty, content, pageKey]);

  const otherPending = updates.filter((u) => u.page !== pageKey).map((u) => u.page);

  const discard = useCallback((page) => {
    dropDraft(page);
    if (page === pageKey) {
      setContent(saved);
      setRestored(false);
    }
  }, [pageKey, saved]);

  async function onSave() {
    if (updates.length === 0) return;
    setStatus('saving');
    setError('');
    const attempted = content;
    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed.');
      // Only the pages the server confirmed are cleared, so a partial failure
      // leaves the rest of the work sitting safely in the draft store.
      dropDrafts(data.saved || updates.map((u) => u.page));
      if ((data.saved || []).includes(pageKey) || !data.saved) setSaved(attempted);
      setStatus('success');
      setRestored(false);
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  }

  const hasChanges = updates.length > 0;

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

      {restored && (
        <p className="admin-note">
          Your unsaved edits to this page were restored. They are published with the next save.
        </p>
      )}
      {storageFull && (
        <p className="admin-note admin-note-warn">
          This browser has run out of room to hold unsaved edits. Save now so nothing is lost.
        </p>
      )}

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
          {status !== 'saving' && status !== 'error' && hasChanges && (
            <>
              {dirty ? 'Unsaved changes' : 'Unsaved changes on other pages'}
              {otherPending.length > 0 && (
                <span className="admin-savebar-pending">
                  {' · also publishing '}
                  {otherPending.map((page, i) => (
                    <span key={page}>
                      {i > 0 && ', '}
                      <strong>{pageLabelFor(page)}</strong>
                      <button
                        type="button"
                        className="admin-discard"
                        onClick={() => discard(page)}
                        title={`Discard unsaved edits to ${pageLabelFor(page)}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </span>
              )}
            </>
          )}
          {status === 'success' && !hasChanges && (
            <span style={{ color: 'var(--a-accent)' }}>Saved. Live on the site now.</span>
          )}
          {status === 'idle' && !hasChanges && 'No changes yet'}
        </span>
        <button className="a-btn a-btn-primary" onClick={onSave} disabled={status === 'saving' || !hasChanges}>
          {status === 'saving'
            ? 'Saving…'
            : updates.length > 1
              ? `Save changes (${updates.length} pages)`
              : 'Save changes'}
        </button>
      </div>
    </div>
  );
}
