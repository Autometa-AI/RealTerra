import Link from 'next/link';
import { notFound } from 'next/navigation';
import '../blogs.css';
import './article.css';
import Media from '../../../../components/Media';
import ArticleBody from '../../../../components/ArticleBody';
import { getContent } from '../../../../lib/content';
import { uniqueSlugs } from '../../../../lib/slug';

/** Featured post plus the grid, as one addressable list. */
async function allPosts() {
  const c = await getContent('blogs');
  const posts = [c.featured, ...(c.posts || [])].filter((p) => p?.title);
  return { c, posts, slugs: uniqueSlugs(posts) };
}

export async function generateStaticParams() {
  const { slugs } = await allPosts();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { posts, slugs } = await allPosts();
  const post = posts[slugs.indexOf(slug)];
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: post.image ? [post.image] : undefined },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const { c, posts, slugs } = await allPosts();
  const index = slugs.indexOf(slug);
  if (index === -1) notFound();

  const post = posts[index];
  const more = posts.filter((_, i) => i !== index).slice(0, 3);
  const meta = [post.type, post.date, post.readTime].filter(Boolean);

  return (
    <main className="page">
      <article className="article">
        <header className="article-head">
          <Link href="/blogs" className="article-back">← All blogs</Link>
          {post.type && <p className="eyebrow">{post.type}</p>}
          <h1>{post.title}</h1>
          {post.excerpt && <p className="article-standfirst">{post.excerpt}</p>}
          <div className="article-meta">
            {post.author && <span className="article-author">{post.author}</span>}
            {meta.length > 0 && <span>{meta.join(' · ')}</span>}
          </div>
        </header>

        {post.image && (
          <div className="article-hero">
            <Media src={post.image} alt={post.title} fill priority sizes="(max-width: 900px) 100vw, 1100px" />
          </div>
        )}

        <ArticleBody body={post.body} />

        <div className="article-cta">
          <div>
            <p className="eyebrow">Request the full research</p>
            <h2>Want the underlying data behind this piece?</h2>
          </div>
          <Link href="/contact" className="btn btn-dark">Request this report</Link>
        </div>
      </article>

      {more.length > 0 && (
        <section className="article-more">
          <div className="article-more-head">
            <p className="eyebrow">Keep reading</p>
            <Link href="/blogs" className="arrow-link">All blogs</Link>
          </div>
          <div className="insights-grid-full">
            {more.map((p) => {
              const href = `/blogs/${slugs[posts.indexOf(p)]}`;
              return (
                <Link href={href} className="insight-card-full" key={href}>
                  <div className="ic-img">
                    <Media src={p.image} alt={p.title} fill sizes="(max-width: 900px) 100vw, 33vw" />
                  </div>
                  <div className="ic-body">
                    <p className="ic-type">{p.type}</p>
                    <h3 className="ic-title">{p.title}</h3>
                    <p className="ic-excerpt">{p.excerpt}</p>
                    <div className="ic-meta"><span>{p.meta}</span><span className="arrow-link" style={{ fontSize: '0.65rem' }}>Read</span></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <div className="cta-band">
        <div>
          <p className="eyebrow">{c.closingCta.eyebrow}</p>
          <h2 style={{ color: 'var(--white)' }}>{c.closingCta.headline}</h2>
        </div>
        <Link href="/contact" className="btn btn-outline-light">{c.closingCta.buttonLabel}</Link>
      </div>
    </main>
  );
}
