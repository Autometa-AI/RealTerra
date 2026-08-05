import { articleHeadings } from '../lib/article';

/**
 * Renders the CMS `body` array as an article.
 *
 * Each entry is one paragraph. A line starting with "## " becomes a
 * subheading, which is the only formatting the editor needs and the only
 * one that cannot be faked with plain paragraphs.
 *
 * Headings carry an id so the contents rail beside the article can link to
 * them and follow the reader down the page. The ids come from the same
 * helper the rail uses, so the two can never disagree.
 */
export default function ArticleBody({ body }) {
  const blocks = (body || []).filter((b) => b && b.trim());
  if (!blocks.length) return null;

  const headings = articleHeadings(body);
  let headingIndex = 0;

  return (
    <div className="article-body">
      {blocks.map((block, i) => {
        const text = block.trim();
        if (text.startsWith('## ')) {
          const heading = headings[headingIndex++];
          return <h2 key={i} id={heading?.id}>{text.slice(3).trim()}</h2>;
        }
        return <p key={i}>{text}</p>;
      })}
    </div>
  );
}
