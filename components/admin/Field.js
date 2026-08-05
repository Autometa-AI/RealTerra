'use client';

import { useState } from 'react';
import { getPath, setPath } from '../../lib/deep';
import {
  TextField,
  TextAreaField,
  ListField,
  MediaField,
  FileField,
  ToggleField,
  SelectField,
} from './FieldEditor';

export default function Field({ field, container, onContainerChange }) {
  const value = getPath(container, field.path);
  const onChange = (v) => onContainerChange(setPath(container, field.path, v));

  switch (field.type) {
    case 'text':
      return <TextField field={field} value={value} onChange={onChange} />;
    case 'textarea':
      return <TextAreaField field={field} value={value} onChange={onChange} />;
    case 'list':
      return <ListField field={field} value={value} onChange={onChange} />;
    case 'image':
      return <MediaField field={field} value={value} onChange={onChange} />;
    case 'file':
      return <FileField field={field} value={value} onChange={onChange} />;
    case 'toggle':
      return <ToggleField field={field} value={value} onChange={onChange} />;
    case 'select':
      return <SelectField field={field} value={value} onChange={onChange} />;
    case 'repeat':
      return <RepeatField field={field} value={value} onChange={onChange} />;
    default:
      return null;
  }
}

// Best-effort label for a repeated row, so a long list stays navigable.
function itemSummary(item) {
  return item?.name || item?.title || item?.label || item?.question || item?.platform || '';
}

// A short single-line field takes half a row inside a repeated card too.
function isCompactSub(f) {
  if (f.type !== 'text' && f.type !== 'toggle' && f.type !== 'select') return false;
  if (f.type === 'text' && f.words && f.words[1] > 8) return false;
  return true;
}

function RepeatField({ field, value, onChange }) {
  const items = value || [];
  const noun = (field.itemNoun || field.label.replace(/s$/, '')).toLowerCase();
  // Rows start collapsed. Six projects at nine fields each is 54 inputs on
  // screen at once; collapsed they are six lines you can scan.
  const [openRows, setOpenRows] = useState(() => new Set());

  function toggleRow(i) {
    setOpenRows((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function updateItem(i, newItem) {
    const next = [...items];
    next[i] = newItem;
    onChange(next);
  }

  function removeItem(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  function move(i, delta) {
    const j = i + delta;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  // Seed a new row with every key the schema knows about, so the editor
  // renders a full set of inputs instead of a partially-empty card.
  function blankItem() {
    const blank = {};
    field.fields.forEach((f) => {
      if (f.type === 'repeat' || f.type === 'list') blank[f.path] = [];
      else if (f.type === 'toggle') blank[f.path] = true;
      else blank[f.path] = '';
    });
    return blank;
  }

  // A newly added row is opened straight away — you added it to fill it in.
  function addItem() {
    setOpenRows((prev) => new Set(prev).add(items.length));
    onChange([...items, blankItem()]);
  }

  return (
    <div className="a-field">
      <label className="a-label">
        {field.label}
        <span className="a-label-hint">{items.length} item{items.length === 1 ? '' : 's'}</span>
      </label>
      {field.help && <p className="a-help">{field.help}</p>}

      {items.length === 0 && (
        <p className="a-help">Nothing here yet. Use the button below to add the first one.</p>
      )}

      {items.map((item, i) => {
        const summary = itemSummary(item);
        const open = openRows.has(i);
        return (
          <div className={`a-repeat-item${open ? ' open' : ''}`} key={i}>
            <div className="a-repeat-head">
              <button
                type="button"
                className="a-repeat-label"
                onClick={() => toggleRow(i)}
                aria-expanded={open}
              >
                <span className="a-repeat-chevron" aria-hidden="true" />
                <span className="a-repeat-name">
                  {noun} {i + 1}
                  {summary ? ` · ${summary}` : ''}
                </span>
              </button>
              <div className="a-repeat-tools">
                <button type="button" className="a-btn a-btn-ghost" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</button>
                <button type="button" className="a-btn a-btn-ghost" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down">↓</button>
                <button type="button" className="a-btn a-btn-danger" onClick={() => removeItem(i)}>
                  Remove
                </button>
              </div>
            </div>
            {open && (
              <div className="a-fields a-repeat-body">
                {field.fields.map((sub) => (
                  <div className={`a-cell${isCompactSub(sub) ? ' a-cell-half' : ''}`} key={sub.path}>
                    <Field
                      field={sub}
                      container={item}
                      onContainerChange={(newItem) => updateItem(i, newItem)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <button type="button" className="a-btn a-btn-add" onClick={addItem}>
        + Add {noun}
      </button>
    </div>
  );
}
