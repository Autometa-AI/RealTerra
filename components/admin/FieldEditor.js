'use client';

import { useState } from 'react';
import { wordCount } from '../../lib/deep';

function WordHint({ text, words }) {
  if (!words) return null;
  const [min, max] = words;
  const n = wordCount(text);
  let cls = '';
  if (n < min) cls = 'warn';
  else if (n > max) cls = 'over';
  return (
    <p className={`a-help ${cls}`}>
      {n} word{n === 1 ? '' : 's'} — suggested {min}–{max}
      {n < min && ' (a bit short)'}
      {n > max && ' (a bit long)'}
    </p>
  );
}

export function TextField({ field, value, onChange }) {
  return (
    <div className="a-field">
      <label className="a-label">
        {field.label}
        {field.words && <span className="a-label-hint">{field.words[0]}–{field.words[1]} words</span>}
      </label>
      <input className="a-input" value={value || ''} onChange={(e) => onChange(e.target.value)} />
      <WordHint text={value} words={field.words} />
    </div>
  );
}

export function TextAreaField({ field, value, onChange }) {
  return (
    <div className="a-field">
      <label className="a-label">
        {field.label}
        {field.words && <span className="a-label-hint">{field.words[0]}–{field.words[1]} words</span>}
      </label>
      <textarea className="a-textarea" value={value || ''} onChange={(e) => onChange(e.target.value)} />
      <WordHint text={value} words={field.words} />
    </div>
  );
}

export function ListField({ field, value, onChange }) {
  const items = value || [];
  return (
    <div className="a-field">
      <label className="a-label">{field.label}</label>
      {items.map((item, i) => (
        <div key={i} style={{ marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              className="a-input"
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
            <button
              type="button"
              className="a-btn a-btn-ghost"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            >
              Remove
            </button>
          </div>
          <WordHint text={item} words={field.words} />
        </div>
      ))}
      <button type="button" className="a-btn a-btn-ghost" onClick={() => onChange([...items, ''])}>
        + Add item
      </button>
    </div>
  );
}

export function ImageField({ field, value, onChange }) {
  const [status, setStatus] = useState('idle'); // idle | uploading | error
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  function onFileSelected(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus('uploading');
    setError('');

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result;
      setPreview(dataUrl);
      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl, label: field.label }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed.');
        onChange(data.url);
        setStatus('idle');
      } catch (err) {
        setStatus('error');
        setError(err.message);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="a-field">
      <label className="a-label">{field.label}</label>
      <div className="a-image-field">
        <div className="a-image-preview" style={{ backgroundImage: (preview || value) ? `url(${preview || value})` : 'none' }} />
        <div className="a-image-info">
          <p className="a-help">Suggested size: {field.dims}</p>
          <input type="file" accept="image/*" className="a-input" onChange={onFileSelected} disabled={status === 'uploading'} />
          {status === 'uploading' && <p className="a-help warn">Uploading…</p>}
          {status === 'error' && <p className="a-help over">{error}</p>}
        </div>
      </div>
    </div>
  );
}
