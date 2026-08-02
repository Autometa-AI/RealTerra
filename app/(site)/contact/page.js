import './contact.css';
import Media from '../../../components/Media';
import { getContent } from '../../../lib/content';
import Lines from '../../../components/Lines';
import ContactForm from '../../../components/ContactForm';
import PropertyMap from '../../../components/PropertyMap';

export const metadata = {
  title: 'Contact',
};

export default async function Contact() {
  const c = await getContent('contact');
  const site = await getContent('site');
  const info = site.contactInfo;

  return (
    <main className="page">
      {/* HERO */}
      <div className="contact-hero page-hero-split">
        <div className="page-hero-split-left dark">
          <p className="eyebrow reveal" style={{ color: 'var(--text-2)' }}>{c.hero.eyebrow}</p>
          <h1 className="reveal d1"><Lines text={c.hero.headline} /></h1>
          <p className="reveal d2" style={{ maxWidth: '360px', marginTop: '1rem' }}>{c.hero.subhead}</p>
          <div className="contact-hero-details reveal d3">
            <div>
              <div className="contact-hero-detail-label">{c.heroDetailLabels.email}</div>
              <div className="contact-hero-detail-val"><a href={`mailto:${info.email}`}>{info.email}</a></div>
            </div>
            <div>
              <div className="contact-hero-detail-label">{c.heroDetailLabels.whatsapp}</div>
              <div className="contact-hero-detail-val"><a href={info.whatsappUrl}>{info.phoneDisplay}</a></div>
            </div>
            <div>
              <div className="contact-hero-detail-label">{c.heroDetailLabels.location}</div>
              <div className="contact-hero-detail-val">{info.location}</div>
            </div>
          </div>
        </div>
        <div className="page-hero-split-right">
          <Media src={c.hero.image} alt="RealTerra office Dubai" fill priority sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </div>

      {/* MAIN */}
      <div className="contact-main">
        {/* INFO PANEL */}
        <div className="contact-info-panel">
          <div className="contact-detail reveal">
            <p className="contact-detail-label">{c.infoPanel.office.label}</p>
            <p className="contact-detail-val">{c.infoPanel.office.value}</p>
            <p className="contact-detail-sub">{c.infoPanel.office.sub}</p>
          </div>

          <div className="contact-detail reveal d1">
            <p className="contact-detail-label">{c.infoPanel.email.label}</p>
            <p className="contact-detail-val"><a href={`mailto:${info.email}`} style={{ color: 'var(--text-1)' }}>{info.email}</a></p>
            <p className="contact-detail-sub">{c.infoPanel.email.sub}</p>
          </div>

          <div className="contact-detail reveal d2">
            <p className="contact-detail-label">{c.infoPanel.whatsapp.label}</p>
            <p className="contact-detail-val">{info.phoneDisplay}</p>
            <a href={info.whatsappUrl} className="whatsapp-btn" target="_blank" rel="noreferrer">
              <span className="whatsapp-icon">✓</span> {c.infoPanel.whatsapp.buttonLabel}
            </a>
          </div>

          <div className="contact-detail reveal d3">
            <p className="contact-detail-label">{c.infoPanel.managingDirector.label}</p>
            <p className="contact-detail-val">{c.infoPanel.managingDirector.name}</p>
            <p className="contact-detail-sub">{c.infoPanel.managingDirector.sub}</p>
          </div>

          <div className="contact-detail reveal d3">
            <p className="contact-detail-label">{c.infoPanel.ceo.label}</p>
            <p className="contact-detail-val">{c.infoPanel.ceo.name}</p>
            <p className="contact-detail-sub">{c.infoPanel.ceo.sub}</p>
          </div>

          <div className="contact-detail reveal">
            <p className="contact-detail-label">{c.infoPanel.licensedBy.label}</p>
            <p className="contact-detail-val">{c.infoPanel.licensedBy.value}</p>
            <p className="contact-detail-sub">{c.infoPanel.licensedBy.sub}</p>
          </div>
        </div>

        {/* FORM PANEL */}
        <div className="contact-form-panel">
          <h2 className="reveal">{c.form.headline}</h2>
          <p className="reveal d1">{c.form.intro}</p>
          <ContactForm content={c.form} />
        </div>
      </div>

      {/* MAP — a real, draggable Google map once a location is set. The aerial
          photo is the fallback for anyone who has not filled one in yet. */}
      {c.map.query || c.map.embedUrl ? (
        <div className="map-area map-area-live">
          <PropertyMap
            project={{ name: c.map.pinLabel, mapQuery: c.map.query, mapEmbedUrl: c.map.embedUrl, location: c.map.pinLabel }}
          />
        </div>
      ) : (
        <div className="map-area">
          <Media src={c.map.image} alt="Dubai aerial view" fill sizes="100vw" />
          <div className="map-overlay">
            <div className="map-pin">{c.map.pinLabel}</div>
          </div>
        </div>
      )}
    </main>
  );
}
