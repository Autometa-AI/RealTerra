/**
 * Renders the CMS `body` array as an article.
 *
 * Each entry is one paragraph. A line starting with "## " becomes a
 * subheading, which is the only formatting the editor needs and the only
 * one that cannot be faked with plain paragraphs.
 */
export default function ArticleBody({ body }) {
  const blocks = (body || []).filter((b) => b && b.trim());
  if (!blocks.length) return null;

  return (
    <div className="article-body">
      {blocks.map((block, i) => {
        const text = block.trim();
        if (text.startsWith('## ')) {
          return <h2 key={i}>{text.slice(3).trim()}</h2>;
        }
        return <p key={i}>{text}</p>;
      })}
    </div>
  );
}
