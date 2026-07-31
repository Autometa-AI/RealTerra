'use client';

import { useState } from 'react';
import { wordCount } from '../../lib/deep';
import { isVideoSrc, MEDIA_ACCEPT, DOC_ACCEPT, limitForType, prettyBytes } from '../../lib/media';

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
      <input className="a-input" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />
      {field.help && <p className="a-help">{field.help}</p>}
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
      <textarea className="a-textarea" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />
      {field.help && <p className="a-help">{field.help}</p>}
      <WordHint text={value} words={field.words} />
    </div>
  );
}

export function ToggleField({ field, value, onChange }) {
  const on = value !== false;
  return (
    <div className="a-field a-field-inline">
      <label className="a-toggle">
        <input type="checkbox" checked={on} onChange={(e) => onChange(e.target.checked)} />
        <span>{field.label}</span>
      </label>
      {field.help && <p className="a-help">{field.help}</p>}
    </div>
  );
}

export function SelectField({ field, value, onChange }) {
  return (
    <div className="a-field">
      <label className="a-label">{field.label}</label>
      <select className="a-input" value={value || ''} onChange={(e) => onChange(e.target.value)}>
        {!value && <option value="">Select…</option>}
        {field.options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
        ))}
      </select>
      {field.help && <p className="a-help">{field.help}</p>}
    </div>
  );
}

export function ListField({ field, value, onChange }) {
  const items = value || [];
  const noun = (field.itemNoun || field.label.replace(/s$/, '')).toLowerCase();
  return (
    <div className="a-field">
      <label className="a-label">
        {field.label}
        <span className="a-label-hint">{items.length} item{items.length === 1 ? '' : 's'}</span>
      </label>
      {items.map((item, i) => (
        <div key={i} className="a-list-row">
          <div className="a-list-row-main">
            <span className="a-list-index">{String(i + 1).padStart(2, '0')}</span>
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
              className="a-btn a-btn-danger"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              aria-label={`Remove ${noun} ${i + 1}`}
            >
              Remove
            </button>
          </div>
          <WordHint text={item} words={field.words} />
        </div>
      ))}
      <button type="button" className="a-btn a-btn-add" onClick={() => onChange([...items, ''])}>
        + Add {noun}
      </button>
    </div>
  );
}

function useUploader() {
  const [status, setStatus] = useState('idle'); // idle | uploading | error
  const [error, setError] = useState('');

  async function upload(file, label) {
    setStatus('uploading');
    setError('');
    try {
      const limit = limitForType(file.type);
      if (file.size > limit) {
        throw new Error(`That file is ${prettyBytes(file.size)}. Keep it under ${prettyBytes(limit)}.`);
      }

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentType: file.type, size: file.size, label }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed.');

      // Straight to Supabase Storage, bypassing the serverless body limit.
      const put = await fetch(data.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });
      if (!put.ok) throw new Error(`Upload failed (${put.status}). Try a smaller file.`);

      setStatus('idle');
      return data.publicUrl;
    } catch (err) {
      setStatus('error');
      setError(err.message);
      return null;
    }
  }

  return { status, error, upload };
}

export function MediaField({ field, value, onChange }) {
  const { status, error, upload } = useUploader();
  const [localPreview, setLocalPreview] = useState(null);

  async function onFileSelected(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLocalPreview({ url: URL.createObjectURL(file), video: file.type.startsWith('video/') });
    const url = await upload(file, field.label);
    if (url) onChange(url);
  }

  const shown = localPreview?.url || value;
  const showVideo = localPreview ? localPreview.video : isVideoSrc(value);

  return (
    <div className="a-field">
      <label className="a-label">{field.label}</label>
      <div className="a-image-field">
        <div className="a-image-preview">
          {shown && showVideo && (
            /* eslint-disable-next-line jsx-a11y/media-has-caption */
            <video src={shown} autoPlay muted loop playsInline />
          )}
          {shown && !showVideo && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={shown} alt="" />
          )}
          {!shown && <span className="a-image-empty">No file yet</span>}
        </div>
        <div className="a-image-info">
          <p className="a-help">Suggested size: {field.dims}</p>
          <p className="a-help">
            Image or video. JPG, PNG, WebP, GIF, MP4, WebM or MOV. Videos autoplay muted and loop,
            so keep them short and silent.
          </p>
          <input
            type="file"
            accept={MEDIA_ACCEPT}
            className="a-input"
            onChange={onFileSelected}
            disabled={status === 'uploading'}
          />
          {status === 'uploading' && <p className="a-help warn">Uploading…</p>}
          {status === 'error' && <p className="a-help over">{error}</p>}
          {value && (
            <button type="button" className="a-btn a-btn-danger" onClick={() => { setLocalPreview(null); onChange(''); }}>
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function FileField({ field, value, onChange }) {
  const { status, error, upload } = useUploader();

  async function onFileSelected(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await upload(file, field.label);
    if (url) onChange(url);
  }

  return (
    <div className="a-field">
      <label className="a-label">{field.label}</label>
      {field.help && <p className="a-help">{field.help}</p>}
      {value && (
        <p className="a-help">
          Current file: <a href={value} target="_blank" rel="noreferrer">open PDF</a>
        </p>
      )}
      <input
        type="file"
        accept={DOC_ACCEPT}
        className="a-input"
        onChange={onFileSelected}
        disabled={status === 'uploading'}
      />
      {status === 'uploading' && <p className="a-help warn">Uploading…</p>}
      {status === 'error' && <p className="a-help over">{error}</p>}
      {value && (
        <button type="button" className="a-btn a-btn-danger" onClick={() => onChange('')}>
          Remove file
        </button>
      )}
    </div>
  );
}
