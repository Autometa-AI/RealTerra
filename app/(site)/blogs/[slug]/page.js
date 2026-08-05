import Link from 'next/link';
import { notFound } from 'next/navigation';
import '../blogs.css';
import './article.css';
import Media from '../../../../components/Media';
import ArticleBody from '../../../../components/ArticleBody';
import ArticleToc from '../../../../components/ArticleToc';
import { getContent } from '../../../../lib/content';
import { uniqueSlugs } from '../../../../lib/slug';
import { articleHeadings } from '../../../../lib/article';

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
  const related = posts.filter((_, i) => i !== index).slice(0, 4);
  const meta = [post.type, post.date, post.readTime].filter(Boolean);
  const headings = articleHeadings(post.body);

  // Projects rail. A post can name the developments it should sit beside;
  // anything it does not name falls back to the top of the catalogue, so the
  // rail is never an empty column on a post nobody has curated yet.
  const projectsContent = await getContent('projects');
  const allProjects = (projectsContent.projects || []).filter((p) => p?.name);
  const projectSlugs = uniqueSlugs(allProjects, 'name');
  const picked = (post.projects || [])
    .map((name) => allProjects.findIndex((p) => p.name?.trim() === String(name || '').trim()))
    .filter((i) => i !== -1);
  const railIndexes = (picked.length ? picked : allProjects.map((_, i) => i)).slice(0, 3);

  return (
    <main className="page">
      {/* Three columns on a wide screen — projects, the article, then
          contents and related reading. The article used to run the full
          width of the page with the related posts dumped underneath it,
          which is neither how anyone reads long-form nor where the reader
          is when they are ready for the next thing. Both rails move below
          the article on a phone. */}
      <div className="article-layout">
        <aside className="article-rail article-rail-left">
          {railIndexes.length > 0 && (
            <div className="article-rail-block">
              <p className="article-rail-title">Developments</p>
              <div className="article-project-list">
                {railIndexes.map((i) => {
                  const p = allProjects[i];
                  return (
                    <Link href={`/projects/${projectSlugs[i]}`} className="article-project" key={projectSlugs[i]}>
                      <span className="article-project-img">
                        <Media src={p.image} alt={p.name} fill sizes="220px" />
                      </span>
                      <span className="article-project-body">
                        <span className="article-project-dev">{p.developer}</span>
                        <span className="article-project-name">{p.name}</span>
                        {p.from && <span className="article-project-from">From {p.from}</span>}
                      </span>
                    </Link>
                  );
                })}
              </div>
              <Link href="/projects" className="arrow-link article-rail-link">All projects</Link>
            </div>
          )}
        </aside>

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
              <Media src={post.image} alt={post.title} fill priority sizes="(max-width: 900px) 100vw, 760px" />
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

        <aside className="article-rail article-rail-right">
          <ArticleToc headings={headings} />

          {related.length > 0 && (
            <div className="article-rail-block">
              <p className="article-rail-title">Related reading</p>
              <div className="article-related-list">
                {related.map((p) => {
                  const href = `/blogs/${slugs[posts.indexOf(p)]}`;
                  return (
                    <Link href={href} className="article-related" key={href}>
                      <span className="article-related-img">
                        <Media src={p.image} alt={p.title} fill sizes="220px" />
                      </span>
                      <span className="article-related-body">
                        <span className="article-related-type">{p.type}</span>
                        <span className="article-related-title">{p.title}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
              <Link href="/blogs" className="arrow-link article-rail-link">All blogs</Link>
            </div>
          )}
        </aside>
      </div>

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
