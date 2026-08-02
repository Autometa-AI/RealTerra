import Link from 'next/link';

/**
 * Native <details> accordion: open/close works with zero JavaScript, stays
 * keyboard accessible for free, and the answers are in the HTML at load
 * time so search engines index them.
 */
export default function Faq({ content }) {
  const items = (content?.items || []).filter((f) => f?.question?.trim());
  if (!items.length) return null;

  return (
    <section className="faq-section">
      {/* The heading column is a third of the width and two lines tall, so on
          its own it leaves a large empty block beside the questions. The
          follow-up prompt gives that column a job — and an FAQ is exactly
          where someone decides they would rather just ask. */}
      <div className="faq-head reveal">
        {content.eyebrow && <p className="eyebrow">{content.eyebrow}</p>}
        {content.headline && <h2>{content.headline}</h2>}
        {(content.supportText || content.linkLabel) && (
          <div className="faq-head-aside">
            {content.supportText && <p className="faq-support">{content.supportText}</p>}
            {content.linkLabel && (
              <Link href={content.linkHref || '/contact'} className="arrow-link">
                {content.linkLabel}
              </Link>
            )}
          </div>
        )}
      </div>
      <div className="faq-list reveal d1">
        {items.map((f, i) => (
          <details className="faq-item" key={`${f.question}-${i}`}>
            <summary className="faq-q">
              <span>{f.question}</span>
              <span className="faq-mark" aria-hidden="true"></span>
            </summary>
            <div className="faq-a"><p>{f.answer}</p></div>
          </details>
        ))}
      </div>
    </section>
  );
}
