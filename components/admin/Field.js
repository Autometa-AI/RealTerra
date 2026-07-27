'use client';

import { getPath, setPath } from '../../lib/deep';
import { TextField, TextAreaField, ListField, ImageField } from './FieldEditor';

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
      return <ImageField field={field} value={value} onChange={onChange} />;
    case 'repeat':
      return <RepeatField field={field} value={value} onChange={onChange} />;
    default:
      return null;
  }
}

function RepeatField({ field, value, onChange }) {
  const items = value || [];

  function updateItem(i, newItem) {
    const next = [...items];
    next[i] = newItem;
    onChange(next);
  }

  function removeItem(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  function addItem() {
    const blank = {};
    field.fields.forEach((f) => {
      blank[f.path] = f.type === 'repeat' || f.type === 'list' ? [] : '';
    });
    onChange([...items, blank]);
  }

  return (
    <div className="a-field">
      <label className="a-label">{field.label}</label>
      {items.map((item, i) => (
        <div className="a-repeat-item" key={i}>
          <div className="a-repeat-label">
            {field.label.replace(/s$/, '')} {i + 1}
            {item.name ? ` — ${item.name}` : item.title ? ` — ${item.title}` : ''}
          </div>
          {field.fields.map((sub) => (
            <Field
              key={sub.path}
              field={sub}
              container={item}
              onContainerChange={(newItem) => updateItem(i, newItem)}
            />
          ))}
          <button type="button" className="a-btn a-btn-ghost" onClick={() => removeItem(i)}>
            Remove this item
          </button>
        </div>
      ))}
      <button type="button" className="a-btn a-btn-ghost" onClick={addItem}>
        + Add {field.label.replace(/s$/, '').toLowerCase()}
      </button>
    </div>
  );
}
