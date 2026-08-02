import Link from 'next/link';
import { notFound } from 'next/navigation';
import '../projects.css';
import './project-detail.css';
import Media from '../../../../components/Media';
import ProjectEnquiryForm from '../../../../components/ProjectEnquiryForm';
import { getContent } from '../../../../lib/content';
import { uniqueSlugs } from '../../../../lib/slug';

async function allProjects() {
  const c = await getContent('projects');
  const projects = (c.projects || []).filter((p) => p?.name);
  return { c, projects, slugs: uniqueSlugs(projects, 'name') };
}

export async function generateStaticParams() {
  const { slugs } = await allProjects();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { projects, slugs } = await allProjects();
  const p = projects[slugs.indexOf(slug)];
  if (!p) return {};
  return {
    title: p.name,
    description: p.description,
    openGraph: { title: p.name, description: p.description, images: p.image ? [p.image] : undefined },
  };
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const { c, projects, slugs } = await allProjects();
  const index = slugs.indexOf(slug);
  if (index === -1) notFound();

  const p = projects[index];
  const detail = c.detail || {};
  const gallery = (p.gallery || []).map((g) => g?.image).filter(Boolean);
  const others = projects.filter((_, i) => i !== index).slice(0, 3);

  // Only the facts that were actually filled in get a row.
  const facts = [
    ['Starting price', p.from],
    ['Gross yield', p.yield],
    ['Handover', p.handover],
    ['Property type', p.propertyType],
    ['Bedrooms', p.bedrooms],
    ['Size', p.size],
    ['Payment plan', p.paymentPlan],
    ['Developer', p.developer],
  ].filter(([, v]) => v);

  return (
    <main className="page">
      <div className="pd-hero">
        <div className="pd-hero-media">
          <Media src={p.image} alt={p.name} fill priority sizes="100vw" />
        </div>
        <div className="pd-hero-inner">
          <Link href="/projects" className="pd-back">← {detail.backLabel || 'All projects'}</Link>
          {p.badge && <span className="pd-badge">{p.badge}</span>}
          <h1>{p.name}</h1>
          <p className="pd-hero-meta">
            {[p.developer, p.location].filter(Boolean).join(' · ')}
          </p>
        </div>
      </div>

      <div className="pd-layout">
        <div className="pd-main">
          {facts.length > 0 && (
            <section className="pd-facts">
              {facts.map(([label, value]) => (
                <div className="pd-fact" key={label}>
                  <span className="pd-fact-label">{label}</span>
                  <span className="pd-fact-value">{value}</span>
                </div>
              ))}
            </section>
          )}

          <section className="pd-section">
            <h2>Overview</h2>
            {(p.overview?.length ? p.overview : [p.description]).filter(Boolean).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </section>

          {p.highlights?.length > 0 && (
            <section className="pd-section">
              <h2>Investment highlights</h2>
              <ul className="pd-highlights">
                {p.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </section>
          )}

          {p.amenities?.length > 0 && (
            <section className="pd-section">
              <h2>Amenities</h2>
              <ul className="pd-amenities">
                {p.amenities.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </section>
          )}

          {gallery.length > 0 && (
            <section className="pd-section">
              <h2>Gallery</h2>
              <div className="pd-gallery">
                {gallery.map((src, i) => (
                  <div className="pd-gallery-item" key={i}>
                    <Media src={src} alt={`${p.name} — image ${i + 1}`} fill sizes="(max-width: 900px) 100vw, 33vw" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="pd-aside">
          <ProjectEnquiryForm project={p.name} content={detail} />
        </aside>
      </div>

      {others.length > 0 && (
        <section className="pd-more">
          <div className="pd-more-head">
            <p className="eyebrow">More developments</p>
            <Link href="/projects" className="arrow-link">All projects</Link>
          </div>
          <div className="projects-grid">
            {others.map((o) => {
              const href = `/projects/${slugs[projects.indexOf(o)]}`;
              return (
                <Link href={href} className="project-card-full" key={href}>
                  <div className="project-img">
                    <Media src={o.image} alt={o.name} fill sizes="(max-width: 900px) 100vw, 33vw" />
                    {o.badge && <span className="project-badge">{o.badge}</span>}
                  </div>
                  <div className="project-body-full">
                    <p className="project-developer">{o.developer}</p>
                    <h3 className="project-name-full">{o.name}</h3>
                    <p className="project-location-text">{o.location}</p>
                    <p className="project-desc-text">{o.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
