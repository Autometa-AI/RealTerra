import './contact.css';
import Media from '../../../components/Media';
import PageHero from '../../../components/PageHero';
import SharedSections from '../../../components/SharedSections';
import { getContent } from '../../../lib/content';
import ContactForm from '../../../components/ContactForm';
import PropertyMap from '../../../components/PropertyMap';
import SocialIcon from '../../../components/SocialIcon';
import { whatsappUrl } from '../../../lib/site';

export const metadata = {
  title: 'Contact',
};

export default async function Contact() {
  const c = await getContent('contact');
  const site = await getContent('site');
  const info = site.contactInfo;
  // `contactInfo` has no whatsappUrl field — the page was rendering
  // href={undefined}, so tapping the number in the hero did nothing at all.
  // The number and the opening message both live under askUs, which is what
  // every other WhatsApp link on the site already uses.
  const waHref = whatsappUrl(site);
  const telHref = `tel:${String(info.phoneDisplay || '').replace(/[^0-9+]/g, '')}`;

  return (
    <main className="page">
      {/* HERO */}
      <PageHero
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        subhead={c.hero.subhead}
        image={c.hero.image}
        poster={c.hero.poster}
        alt="RealTerra office Dubai"
      >
        <div className="contact-hero-details reveal d3">
          <div>
            <div className="contact-hero-detail-label">{c.heroDetailLabels.email}</div>
            <div className="contact-hero-detail-val"><a href={`mailto:${info.email}`}>{info.email}</a></div>
          </div>
          <div>
            <div className="contact-hero-detail-label">{c.heroDetailLabels.whatsapp}</div>
            <div className="contact-hero-detail-val">
              <a href={waHref} target="_blank" rel="noreferrer">{info.phoneDisplay}</a>
            </div>
          </div>
          <div>
            <div className="contact-hero-detail-label">{c.heroDetailLabels.location}</div>
            <div className="contact-hero-detail-val">{info.location}</div>
          </div>
        </div>
      </PageHero>

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
            <p className="contact-detail-val">
              <a href={telHref} style={{ color: 'var(--text-1)' }}>{info.phoneDisplay}</a>
            </p>
            <a href={waHref} className="whatsapp-btn" target="_blank" rel="noreferrer">
              <span className="whatsapp-icon"><SocialIcon platform="WhatsApp" size={17} /></span>
              {c.infoPanel.whatsapp.buttonLabel}
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

      <SharedSections />

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
