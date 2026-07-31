// Declarative schema describing every editable field per content page.
// The admin dashboard walks this to render forms and word-count / image
// guidance. `words`/`dims` are suggestions shown to the editor — nothing
// here is ever enforced as a hard limit.

const t = (path, label, words, opts = {}) => ({ type: 'text', path, label, words, ...opts });
const ta = (path, label, words, opts = {}) => ({ type: 'textarea', path, label, words, ...opts });
const img = (path, label, dims, opts = {}) => ({ type: 'image', path, label, dims, ...opts });
const file = (path, label, opts = {}) => ({ type: 'file', path, label, ...opts });
const toggle = (path, label, opts = {}) => ({ type: 'toggle', path, label, ...opts });
const select = (path, label, options, opts = {}) => ({ type: 'select', path, label, options, ...opts });
const list = (path, label, words, opts = {}) => ({ type: 'list', path, label, words, ...opts });
const repeat = (path, label, fields, opts = {}) => ({ type: 'repeat', path, label, fields, ...opts });

const HERO_WIDE = '2400×1200px or larger, 2:1 wide landscape (fills the full screen width)';
const CARD_LANDSCAPE = '1200×800px, 3:2 landscape';
const PANEL_LANDSCAPE = '1600×1000px, landscape';
const PORTRAIT = '1000×1250px, 4:5 portrait';
const WIDE_BAND = '1800×700px, wide landscape';
const AVATAR = '200×200px, square';

export const SOCIAL_PLATFORMS = [
  'Instagram',
  'LinkedIn',
  'Facebook',
  'YouTube',
  'TikTok',
  'X',
  'WhatsApp',
];

export const CMS_PAGES = [
  { key: 'site', label: 'Site-Wide', description: 'Navigation, footer, social links, E-Book, SEO defaults, and shared contact details.' },
  { key: 'home', label: 'Home', description: 'Hero, ticker, reviews, FAQs, and the landing page sections.' },
  { key: 'about', label: 'About', description: 'Methodology, founders, and services.' },
  { key: 'markets', label: 'Markets', description: 'The focus-market write-ups. Add or remove markets here.' },
  { key: 'projects', label: 'Projects', description: 'Featured and listed developments, plus the search bar.' },
  { key: 'blogs', label: 'Blogs', description: 'Blog posts, research hub, and the newsletter block.' },
  { key: 'contact', label: 'Contact', description: 'Contact hero, info panel, and enquiry form.' },
];

export const CMS_SCHEMA = {
  site: [
    {
      title: 'SEO Defaults',
      fields: [
        t('seo.titleDefault', 'Default page title', [4, 12]),
        ta('seo.description', 'Meta description', [15, 30]),
      ],
    },
    {
      title: 'Navigation',
      fields: [
        t('nav.wordmark', 'Wordmark (logo text)', [1, 2]),
        t('nav.drawerMetaLine1', 'Mobile menu footer — line 1', [1, 6]),
        t('nav.drawerMetaLine2', 'Mobile menu footer — line 2', [1, 8]),
        repeat('nav.links', 'Menu items', [
          t('label', 'Label', [1, 2]),
          t('href', 'Link path', null, { help: 'For example / or /about or /blogs' }),
        ], { itemNoun: 'menu item' }),
      ],
    },
    {
      title: 'Ask Us Question button',
      fields: [
        t('askUs.label', 'Button label', [1, 4]),
        t('askUs.phone', 'WhatsApp number', null, {
          help: 'Digits only, including country code. For example 971555084911',
        }),
        ta('askUs.message', 'Pre-filled WhatsApp message', [5, 30], {
          help: 'This text is typed into WhatsApp automatically when someone taps the button.',
        }),
      ],
    },
    {
      title: 'E-Book',
      fields: [
        toggle('ebook.enabled', 'Show the E-Book download', {
          help: 'Turn on once you have decided where the button should appear.',
        }),
        t('ebook.buttonLabel', 'Button label', [2, 5]),
        t('ebook.title', 'E-Book title', [2, 10]),
        ta('ebook.description', 'Short description', [10, 40]),
        img('ebook.coverImage', 'Cover image', '800×1000px, 4:5 portrait'),
        file('ebook.fileUrl', 'E-Book PDF', { help: 'Upload the PDF visitors will download.' }),
      ],
    },
    {
      title: 'Footer',
      fields: [
        t('footer.logo', 'Footer logo text', [1, 2]),
        t('footer.logoSub', 'Footer logo subtitle', [1, 3]),
        ta('footer.tagline', 'Footer tagline', [10, 30]),
        list('footer.marketLinks', 'Market links list', [1, 4], { itemNoun: 'market link' }),
        t('footer.email', 'Contact email shown in footer', null),
        t('footer.copyright', 'Copyright line', [4, 12]),
        t('footer.licenseLine', 'License line', [2, 8]),
      ],
    },
    {
      title: 'Social Media Links',
      fields: [
        repeat('social', 'Social links', [
          select('platform', 'Platform', SOCIAL_PLATFORMS),
          t('url', 'Full link', null, { help: 'Paste the complete URL, including https://' }),
          toggle('visible', 'Show this icon in the footer'),
        ], {
          itemNoun: 'social link',
          help: 'Icons appear in the footer in this order. Untick one to hide it without deleting the link.',
        }),
      ],
    },
    {
      title: 'Mobile Dock',
      fields: [
        t('dock.name', 'Dock name', [1, 2]),
        t('dock.meta', 'Dock subtitle', [1, 6]),
        t('dock.whatsappLabel', 'WhatsApp button label', [1, 2]),
      ],
    },
    {
      title: 'Shared Contact Details',
      fields: [
        t('contactInfo.email', 'Primary email address', null),
        t('contactInfo.phoneDisplay', 'Phone / WhatsApp number (display)', null),
        t('contactInfo.location', 'Office location line', [2, 8]),
      ],
    },
  ],

  home: [
    {
      title: 'Hero',
      fields: [
        t('hero.eyebrow', 'Eyebrow line', [2, 8]),
        ta('hero.headline', 'Headline', [4, 14], { help: 'Use line breaks to control where it wraps.' }),
        ta('hero.subhead', 'Subheading', [15, 45]),
        t('hero.ctaPrimary', 'Primary button label', [2, 5]),
        t('hero.ctaSecondary', 'Secondary link label', [2, 5]),
        img('hero.image', 'Hero background (image or video)', HERO_WIDE),
      ],
    },
    {
      title: 'Scrolling Ticker',
      fields: [
        list('marquee', 'Ticker items', [1, 4], {
          itemNoun: 'ticker item',
        }),
      ],
    },
    {
      title: 'Philosophy Intro',
      fields: [
        t('philosophyIntro.eyebrow', 'Eyebrow', [1, 3]),
        ta('philosophyIntro.headline', 'Headline', [4, 10], { help: 'Use line breaks to control wrapping.' }),
        ta('philosophyIntro.body', 'Body text', [20, 45]),
        t('philosophyIntro.linkLabel', 'Link label', [1, 4]),
      ],
    },
    {
      title: 'Philosophy Panel (dark)',
      fields: [
        t('philosophyPanel.eyebrow', 'Eyebrow', [1, 3]),
        t('philosophyPanel.headline', 'Headline', [2, 5]),
        ta('philosophyPanel.subtext', 'Subtext', [8, 20]),
        list('philosophyPanel.pillars', 'Pillar labels', [1, 5], { itemNoun: 'pillar' }),
        t('philosophyPanel.linkLabel', 'Link label', [1, 4]),
        img('philosophyPanel.image', 'Panel image or video', PANEL_LANDSCAPE),
      ],
    },
    {
      title: 'Focus Markets',
      fields: [
        t('focusMarkets.eyebrow', 'Eyebrow', [1, 3]),
        t('focusMarkets.headline', 'Headline', [1, 4]),
        t('focusMarkets.linkLabel', 'Link label', [1, 4]),
        repeat('focusMarkets.cards', 'Market cards', [
          t('tag', 'Location tag', [1, 3]),
          t('name', 'Market name', [1, 5]),
          ta('description', 'Description', [15, 30]),
          t('yield', 'Yield line', [1, 6]),
          img('image', 'Card image or video', CARD_LANDSCAPE),
        ], { itemNoun: 'market card' }),
      ],
    },
    {
      title: 'Founders Strip',
      fields: [
        t('foundersStrip.eyebrow', 'Eyebrow', [1, 3]),
        t('foundersStrip.headline', 'Headline', [2, 6]),
        ta('foundersStrip.body', 'Body text', [20, 50]),
        t('foundersStrip.linkLabel', 'Link label', [1, 4]),
        img('foundersStrip.image', 'Panel image or video', PANEL_LANDSCAPE),
      ],
    },
    {
      title: 'Blogs Preview',
      fields: [
        t('blogsPreview.eyebrow', 'Eyebrow', [1, 3]),
        t('blogsPreview.headline', 'Headline', [1, 4]),
        t('blogsPreview.linkLabel', 'Link label', [1, 4]),
        repeat('blogsPreview.cards', 'Blog cards', [
          t('tag', 'Tag', [1, 4]),
          ta('title', 'Title', [6, 20]),
          t('meta', 'Meta line', [2, 8]),
          img('image', 'Card image or video', CARD_LANDSCAPE),
        ], { itemNoun: 'blog card' }),
      ],
    },
    {
      title: 'Google Reviews',
      fields: [
        t('reviews.eyebrow', 'Eyebrow', [1, 3]),
        t('reviews.headline', 'Headline', [2, 8]),
        t('reviews.ratingSummary', 'Rating summary line', [2, 10], {
          help: 'For example: 4.9 out of 5 from 120 Google reviews',
        }),
        t('reviews.linkLabel', 'Link label', [2, 6]),
        t('reviews.linkUrl', 'Link URL', null, { help: 'Where the link goes, e.g. your Google Business profile.' }),
        repeat('reviews.items', 'Reviews', [
          t('name', 'Reviewer name', [1, 4]),
          img('avatar', 'Reviewer photo', AVATAR),
          select('rating', 'Star rating', ['5', '4', '3', '2', '1']),
          ta('text', 'Review text', [15, 60]),
          t('date', 'Date line', [1, 4], { help: 'For example: March 2026' }),
        ], { itemNoun: 'review' }),
      ],
    },
    {
      title: 'FAQs',
      fields: [
        t('faq.eyebrow', 'Eyebrow', [1, 3]),
        t('faq.headline', 'Headline', [2, 8]),
        repeat('faq.items', 'Questions', [
          ta('question', 'Question', [3, 20]),
          ta('answer', 'Answer', [15, 80]),
        ], { itemNoun: 'question' }),
      ],
    },
    {
      title: 'Closing CTA',
      fields: [
        t('closingCta.eyebrow', 'Eyebrow', [1, 4]),
        ta('closingCta.headline', 'Headline', [4, 12], { help: 'Use line breaks to control wrapping.' }),
        t('closingCta.buttonLabel', 'Button label', [2, 6]),
      ],
    },
  ],

  about: [
    {
      title: 'Hero',
      fields: [
        t('hero.eyebrow', 'Eyebrow', [1, 4]),
        ta('hero.headline', 'Headline', [4, 10], { help: 'Use line breaks to control wrapping.' }),
        ta('hero.subhead', 'Subheading', [10, 25]),
        img('hero.image', 'Hero image or video', PANEL_LANDSCAPE),
      ],
    },
    {
      title: 'Methodology',
      fields: [
        t('methodology.eyebrow', 'Eyebrow', [1, 3]),
        t('methodology.headline', 'Headline', [2, 6]),
        list('methodology.paragraphs', 'Body paragraphs', [30, 70], { itemNoun: 'paragraph' }),
        repeat('methodology.pillars', 'Pillars', [
          t('title', 'Pillar title', [1, 5]),
          ta('text', 'Pillar description', [20, 40]),
        ], { itemNoun: 'pillar' }),
      ],
    },
    {
      title: 'Founders',
      fields: [
        t('founders.eyebrow', 'Eyebrow', [1, 3]),
        t('founders.headline', 'Headline', [1, 4]),
      ],
    },
    {
      title: 'Founder — Gaurav',
      fields: [
        t('founders.gaurav.roleTag', 'Role', [1, 4]),
        t('founders.gaurav.name', 'Full name', [1, 4]),
        img('founders.gaurav.image', 'Portrait', PORTRAIT),
        list('founders.gaurav.bio', 'Bio paragraphs', [55, 75], {
          itemNoun: 'paragraph',
          help: 'Keep both founders to the same number of paragraphs and a similar length so the two blocks match.',
        }),
        list('founders.gaurav.capabilities', 'Capability tags', [2, 6], { itemNoun: 'capability' }),
      ],
    },
    {
      title: 'Founder — Ruchika',
      fields: [
        t('founders.ruchika.roleTag', 'Role', [1, 4]),
        t('founders.ruchika.name', 'Full name', [1, 4]),
        img('founders.ruchika.image', 'Portrait', PORTRAIT),
        list('founders.ruchika.bio', 'Bio paragraphs', [55, 75], {
          itemNoun: 'paragraph',
          help: 'Keep both founders to the same number of paragraphs and a similar length so the two blocks match.',
        }),
        list('founders.ruchika.capabilities', 'Capability tags', [2, 6], { itemNoun: 'capability' }),
      ],
    },
    {
      title: 'Services',
      fields: [
        t('services.eyebrow', 'Eyebrow', [1, 3]),
        t('services.headline', 'Headline', [1, 4]),
        repeat('services.items', 'Service items', [
          t('title', 'Title', [1, 5]),
          ta('description', 'Description', [15, 35]),
        ], { itemNoun: 'service' }),
      ],
    },
    {
      title: 'Closing CTA',
      fields: [
        t('closingCta.eyebrow', 'Eyebrow', [1, 4]),
        ta('closingCta.headline', 'Headline', [4, 10], { help: 'Use line breaks to control wrapping.' }),
        t('closingCta.buttonLabel', 'Button label', [2, 6]),
      ],
    },
  ],

  markets: [
    {
      title: 'Hero',
      fields: [
        t('hero.eyebrow', 'Eyebrow', [1, 3]),
        ta('hero.headline', 'Headline', [3, 8], { help: 'Use line breaks to control wrapping.' }),
        ta('hero.subhead', 'Subheading', [15, 35]),
        img('hero.image', 'Hero image or video', PANEL_LANDSCAPE),
        repeat('hero.stats', 'Hero stats', [
          t('value', 'Value', [1, 3]),
          t('label', 'Label', [1, 4]),
        ], { itemNoun: 'stat' }),
      ],
    },
    {
      title: 'Macro Case',
      fields: [
        t('macro.eyebrow', 'Eyebrow', [1, 3]),
        t('macro.headline', 'Headline', [3, 8]),
        list('macro.points', 'Macro points', [15, 35], { itemNoun: 'point' }),
      ],
    },
    {
      title: 'Markets',
      fields: [
        repeat('markets', 'Market write-ups', [
          t('location', 'Location tag', [1, 3]),
          t('name', 'Market name', [1, 5]),
          ta('description', 'Description', [40, 90]),
          img('image', 'Photo or video', CARD_LANDSCAPE),
          t('capitalGrowth', 'Capital growth (3yr)', [1, 4]),
          t('rentalYield', 'Gross rental yield', [1, 4]),
          t('entryPoint', 'Entry point', [1, 5]),
          t('conviction', 'RealTerra conviction', [1, 3]),
        ], {
          itemNoun: 'market',
          help: 'Add as many markets as you like. They appear on the page in this order.',
        }),
        t('requestLinkLabel', '"Request report" link label (shown on every market)', [1, 5]),
      ],
    },
    {
      title: 'Closing CTA',
      fields: [
        t('closingCta.eyebrow', 'Eyebrow', [1, 4]),
        ta('closingCta.headline', 'Headline', [4, 10], { help: 'Use line breaks to control wrapping.' }),
        t('closingCta.buttonLabel', 'Button label', [2, 6]),
      ],
    },
  ],

  projects: [
    {
      title: 'Hero',
      fields: [
        t('hero.eyebrow', 'Eyebrow', [1, 3]),
        ta('hero.headline', 'Headline', [3, 8], { help: 'Use line breaks to control wrapping.' }),
        ta('hero.subhead', 'Subheading', [15, 40]),
        img('hero.image', 'Hero image or video', PANEL_LANDSCAPE),
        list('hero.criteriaTags', 'Criteria tags', [1, 5], { itemNoun: 'tag' }),
      ],
    },
    {
      title: 'Search & Filters',
      fields: [
        t('search.placeholder', 'Search box placeholder', [3, 10]),
        t('search.noResults', 'Message when nothing matches', [4, 20]),
        list('filters', 'Filter labels', [1, 2], {
          itemNoun: 'filter',
          help: 'A filter matches a project when its text appears in the developer, location, badge or name. Keep "All" first.',
        }),
      ],
    },
    {
      title: 'Featured Project',
      fields: [
        t('featured.tag', 'Tag line', [2, 8]),
        t('featured.name', 'Project name', [1, 6]),
        ta('featured.description', 'Description', [30, 60]),
        img('featured.image', 'Photo or video', CARD_LANDSCAPE),
        repeat('featured.stats', 'Stats', [
          t('value', 'Value', [1, 3]),
          t('label', 'Label', [1, 4]),
        ], { itemNoun: 'stat' }),
        t('featured.linkLabel', 'Link label', [2, 6]),
      ],
    },
    {
      title: 'Project Grid',
      fields: [
        repeat('projects', 'Project cards', [
          t('developer', 'Developer', [1, 4]),
          t('name', 'Project name', [1, 6]),
          t('location', 'Location line', [1, 8]),
          ta('description', 'Description', [20, 45]),
          img('image', 'Photo or video', CARD_LANDSCAPE),
          t('badge', 'Badge', [1, 3]),
          t('from', 'Starting price', [1, 3]),
          t('yield', 'Yield', [1, 2]),
          t('handover', 'Handover', [1, 2]),
        ], {
          itemNoun: 'project',
          help: 'Add as many projects as you like. Visitors can search across the name, developer, location and description.',
        }),
      ],
    },
    {
      title: 'Closing CTA',
      fields: [
        t('closingCta.eyebrow', 'Eyebrow', [1, 4]),
        ta('closingCta.headline', 'Headline', [4, 10], { help: 'Use line breaks to control wrapping.' }),
        t('closingCta.buttonLabel', 'Button label', [2, 6]),
      ],
    },
  ],

  blogs: [
    {
      title: 'Hero',
      fields: [
        t('hero.eyebrow', 'Eyebrow', [1, 3]),
        ta('hero.headline', 'Headline', [2, 6], { help: 'Use line breaks to control wrapping.' }),
        ta('hero.intro', 'Intro paragraph', [20, 45]),
      ],
    },
    {
      title: 'Featured Post',
      fields: [
        t('featured.type', 'Type / date line', [2, 6]),
        ta('featured.title', 'Title', [6, 20]),
        ta('featured.excerpt', 'Excerpt', [40, 80]),
        img('featured.image', 'Photo or video', CARD_LANDSCAPE),
        t('featured.linkLabel', 'Link label', [2, 6]),
        t('featured.meta', 'Meta line', [2, 8]),
      ],
    },
    {
      title: 'Blog Posts',
      fields: [
        repeat('posts', 'Blog posts', [
          t('type', 'Category', [1, 4]),
          ta('title', 'Title', [6, 20]),
          ta('excerpt', 'Excerpt', [20, 40]),
          t('meta', 'Meta line', [1, 6]),
          img('image', 'Photo or video', CARD_LANDSCAPE),
        ], {
          itemNoun: 'blog post',
          help: 'Add as many posts as you like. They appear on the page in this order.',
        }),
        t('requestLinkLabel', '"Request" link label (shown on every card)', [1, 3]),
      ],
    },
    {
      title: 'Newsletter',
      fields: [
        t('newsletter.eyebrow', 'Eyebrow', [1, 3]),
        ta('newsletter.headline', 'Headline', [4, 10], { help: 'Use line breaks to control wrapping.' }),
        ta('newsletter.body', 'Body text', [10, 30]),
        t('newsletter.buttonLabel', 'Button label', [1, 3]),
        t('newsletter.disclaimer', 'Disclaimer', [4, 15]),
      ],
    },
    {
      title: 'Closing CTA',
      fields: [
        t('closingCta.eyebrow', 'Eyebrow', [1, 4]),
        ta('closingCta.headline', 'Headline', [4, 10], { help: 'Use line breaks to control wrapping.' }),
        t('closingCta.buttonLabel', 'Button label', [2, 6]),
      ],
    },
  ],

  contact: [
    {
      title: 'Hero',
      fields: [
        t('hero.eyebrow', 'Eyebrow', [1, 3]),
        ta('hero.headline', 'Headline', [2, 6], { help: 'Use line breaks to control wrapping.' }),
        ta('hero.subhead', 'Subheading', [10, 30]),
        img('hero.image', 'Hero image or video', PANEL_LANDSCAPE),
        t('heroDetailLabels.email', '"Email" field label', [1, 2]),
        t('heroDetailLabels.whatsapp', '"WhatsApp" field label', [1, 2]),
        t('heroDetailLabels.location', '"Location" field label', [1, 2]),
      ],
    },
    {
      title: 'Info Panel',
      fields: [
        t('infoPanel.office.label', 'Office — label', [1, 2]),
        t('infoPanel.office.value', 'Office — value', [1, 5]),
        t('infoPanel.office.sub', 'Office — sub text', [1, 6]),
        t('infoPanel.email.label', 'Email — label', [1, 2]),
        t('infoPanel.email.sub', 'Email — sub text', [1, 6]),
        t('infoPanel.whatsapp.label', 'WhatsApp — label', [1, 2]),
        t('infoPanel.whatsapp.buttonLabel', 'WhatsApp — button label', [2, 5]),
        t('infoPanel.managingDirector.label', 'Managing Director — role label', [1, 3]),
        t('infoPanel.managingDirector.name', 'Managing Director — name', [1, 4]),
        t('infoPanel.managingDirector.sub', 'Managing Director — sub text', [2, 8]),
        t('infoPanel.ceo.label', 'CEO — role label', [1, 2]),
        t('infoPanel.ceo.name', 'CEO — name', [1, 4]),
        t('infoPanel.ceo.sub', 'CEO — sub text', [2, 8]),
        t('infoPanel.licensedBy.label', 'License — label', [1, 3]),
        t('infoPanel.licensedBy.value', 'License — value', [1, 5]),
        t('infoPanel.licensedBy.sub', 'License — sub text', [1, 6]),
      ],
    },
    {
      title: 'Enquiry Form',
      fields: [
        t('form.headline', 'Form headline', [2, 5]),
        ta('form.intro', 'Form intro text', [15, 35]),
        list('form.interestOptions', '"I am interested in" options', [1, 5], { itemNoun: 'option' }),
        list('form.budgetOptions', 'Budget range options', [1, 5], { itemNoun: 'option' }),
        t('form.submitLabel', 'Submit button label', [1, 4]),
      ],
    },
    {
      title: 'Map',
      fields: [
        img('map.image', 'Map / aerial image or video', WIDE_BAND),
        t('map.pinLabel', 'Map pin label', [2, 6]),
      ],
    },
  ],
};
