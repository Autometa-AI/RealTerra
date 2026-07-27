import { Fragment } from 'react';

// Renders a string with embedded "\n" as literal <br/> line breaks —
// content fields store the same manual line-break points the original
// hardcoded JSX used, editable as plain newlines in a textarea.
export default function Lines({ text }) {
  const parts = text.split('\n');
  return parts.map((line, i) => (
    <Fragment key={i}>
      {line}
      {i < parts.length - 1 && <br />}
    </Fragment>
  ));
}
