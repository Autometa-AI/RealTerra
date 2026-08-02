// One-off. Usage: node --env-file=.env.local scripts/seed-detail-content.js
//
// Blog posts and projects now have their own pages, which need fields the
// existing rows do not carry (slug, article body, project overview, and so
// on). This fills those in without touching anything the client has already
// edited: every assignment is guarded, so a field they later change is left
// alone on a re-run.
const { createClient } = require('@supabase/supabase-js');

const BLOG_BODIES = {
  'dubai-south-reading-the-airport-signal-before-the-market-does': [
    '## Why the airport matters more than the address',
    "Al Maktoum International is being built out to a planned 260 million passenger capacity, which would make it the largest airport in the world by some distance. Infrastructure of that scale does not sit in isolation. It pulls logistics, aviation employment, hospitality and eventually residential demand into a corridor that, today, still prices like open desert.",
    'The pattern is well documented elsewhere. Areas within a twenty-minute drive of a major hub tend to reprice in two distinct waves: first when construction contracts are awarded and the workforce arrives, and again when passenger operations begin and permanent employment settles. Dubai South is between those two waves.',
    '## Which sub-zones sit in the corridor',
    'Not all of Dubai South benefits equally. The Residential District and the areas bordering the Expo legacy site have the clearest path to demand, because they combine completed infrastructure with genuine amenity. The industrial and logistics zones will see activity, but the residential thesis there is weaker and the exit market thinner.',
    'We concentrate on masterplans with confirmed handover dates before the next airport phase completes. Buying into a project that hands over after the demand arrives means paying for the repricing rather than capturing it.',
    '## How to size a position',
    'Entry pricing in the corridor still starts around AED 650,000, which puts a meaningful position within reach of most portfolios. For clients building UAE exposure from scratch we typically treat Dubai South as the growth sleeve rather than the yield sleeve, and size it accordingly against a stabilised Business Bay or Marina holding.',
    'The early-mover window here is closing, not closed. Institutional capital has started to appear in the land market, which historically leads retail pricing by twelve to eighteen months.',
  ],
  'damac-vs-emaar-completion-rate-and-yield-comparison-across-12-projects': [
    '## Why developer selection is a risk decision, not a brand decision',
    'Off-plan buyers are underwriting two things at once: the asset and the developer. The second is frequently ignored. A project that hands over two years late has destroyed a meaningful portion of its own return through financing cost and foregone rent, regardless of how the finished building looks.',
    'We track handover performance, escrow compliance and secondary market behaviour across the developers we transact with. This comparison covers twelve completed projects, six from each developer, handed over between 2019 and 2025.',
    '## Completion performance',
    'Emaar delivered closer to its published handover dates across the sample, with an average slippage measured in months rather than years. DAMAC showed wider variance: its strongest projects delivered on time, but the tail was longer. For a buyer, that variance is the number that matters, not the average.',
    '## Yield and secondary liquidity',
    'DAMAC product frequently offers a higher headline gross yield at entry, largely a function of lower entry pricing. Emaar stock tends to hold value better on resale and transacts faster in the secondary market, which matters when the exit is part of the thesis rather than an afterthought.',
    '## What we conclude',
    'Neither developer is the answer on its own. We use Emaar as the stability allocation and DAMAC selectively where a specific masterplan and price point justify the wider delivery variance. The full comparison, including the project-level data, is available to qualified investors on request.',
  ],
  'dubai-maritime-city-the-waterfront-district-the-market-hasnt-priced-yet': [
    '## A waterfront district hiding in plain sight',
    'Dubai Maritime City occupies a peninsula between Port Rashid and Dubai Drydocks, minutes from Downtown and the DIFC. On any comparable waterfront in the emirate that location would command a significant premium. Here it does not, largely because the district spent its first decade zoned around maritime industry rather than residential living.',
    'That is changing. Zoning has been progressively reclassified, the superyacht marina is operational, and the first genuinely residential towers are under construction.',
    '## The infrastructure case',
    'Three things underpin the thesis: the Port Rashid redevelopment immediately north, the completion of the coastal road connections, and the district being effectively supply-capped by its own geography. A peninsula cannot expand. Once the current pipeline delivers, new supply requires redevelopment rather than greenfield launch.',
    '## Our forward view',
    'Our price model runs to 2029 and assumes no change to current infrastructure commitments. Even on that conservative basis the district closes a meaningful part of its discount to comparable Dubai waterfront. The full model, including the assumptions we would want a client to challenge, is available on request.',
  ],
  'building-a-uae-portfolio-across-three-horizons-yield-growth-off-plan-value': [
    '## Three horizons, three different jobs',
    'Most investors approach UAE property one asset at a time. A portfolio built that way tends to end up concentrated in whatever was being marketed hardest at the time of purchase. The alternative is to decide the shape of the portfolio first, then fill it.',
    'We structure exposure across three horizons. The short horizon is stabilised, tenanted stock producing income from day one. The medium horizon is completed property in districts with a clear repricing catalyst. The long horizon is off-plan, where capital is committed today against a handover several years out.',
    '## Why the tax environment changes the maths',
    'With no capital gains tax and no income tax on rental proceeds, returns compound in a way they cannot in most comparable jurisdictions. Rental income can be recycled into the next position without the drag of an annual tax bill. Over a ten-year horizon that difference dominates almost every other variable.',
    '## Sizing the sleeves',
    'There is no universal split. A client drawing income needs the short horizon weighted heavily. A client compounding for a decade can carry far more off-plan risk. What matters is that the split is chosen deliberately and reviewed, rather than emerging by accident.',
    'We build this allocation with clients before looking at a single specific property. The framework is available in full on request.',
  ],
  'saadiyat-island-why-abu-dhabis-cultural-district-is-an-institutional-grade-bet': [
    '## Culture as permanent infrastructure',
    'Saadiyat Island is anchored by assets that do not relocate. The Louvre Abu Dhabi is operational, the Guggenheim and the Zayed National Museum are in delivery, and NYU Abu Dhabi has been established on the island for over a decade. These are permanent demand drivers of a kind most masterplans never acquire.',
    '## Reduced completion risk',
    'The island is developed largely by government-linked entities. For an off-plan buyer that materially lowers the completion risk that dominates developer selection elsewhere. The trade-off is pricing: entry is higher than comparable Dubai product, and the yield is correspondingly lower.',
    '## Who this suits',
    'Saadiyat is not a yield play and we do not present it as one. It suits capital with a long horizon and a preference for downside protection over headline return, and it pairs naturally with a higher-yield Dubai holding. The full investment case is available on request.',
  ],
  'uae-real-estate-in-2025-the-four-structural-tailwinds-every-investor-should-understand': [
    '## Beyond the headline numbers',
    'Transaction volume records make headlines but tell you very little about whether to commit capital. Four structural factors matter more, and all four are policy-driven rather than cyclical.',
    '## One: the tax position',
    'Zero capital gains tax and zero income tax on rental proceeds remains the single largest structural advantage the UAE holds over competing global property markets. It is also the factor most often stated and least often modelled properly.',
    '## Two: residency lock-in',
    'Golden Visa and investor visa pathways convert transient residents into long-term ones. A resident with a ten-year horizon buys rather than rents, and that shift in behaviour creates durable owner-occupier demand underneath the investment market.',
    '## Three: the infrastructure pipeline',
    'Committed government infrastructure spend runs beyond AED 650 billion through 2040. Infrastructure of that scale reprices the areas around it with a lag that is long enough to trade.',
    '## Four: high-net-worth inflows',
    'Over 160,000 new high-net-worth residents relocated in 2024. That population buys at the top of the market and sustains demand for exactly the product our clients hold.',
    'None of these is a reason to buy any particular asset. They are the reason the market deserves a serious allocation at all; asset selection is a separate discipline.',
  ],
};

const PROJECT_DETAIL = {
  'the-valley': {
    propertyType: 'Villas & Townhouses', bedrooms: '3 – 5', size: '2,400 – 3,900 sq ft', paymentPlan: '80 / 20',
    overview: [
      "The Valley is a masterplanned community on the Dubai–Al Ain Road, built around a town centre, sports village and a large stretch of open parkland. It is aimed squarely at families, and the product reflects that: generous plots, low-rise density and a walkable centre rather than a tower cluster.",
      'The investment case rests on entry pricing that still sits below replacement cost for comparable villa stock closer to the city, combined with rental demand from the expanding Dubai South employment corridor immediately to the west. Emaar has a consistent delivery record on communities of this type, which lowers the completion risk that usually dominates off-plan villa purchases.',
    ],
    highlights: ['Entry below replacement cost for comparable villa stock', 'Family-driven rental demand from the Dubai South corridor', 'Emaar delivery record on comparable masterplans', 'Low-rise density with significant open parkland'],
    amenities: ['Town centre retail', 'Sports village', 'Community parkland', 'Swimming pools', 'Cycling and running tracks', 'Schools within the masterplan'],
  },
  'damac-islands-2': {
    propertyType: 'Waterfront Villas', bedrooms: '4 – 7', size: '3,100 – 6,200 sq ft', paymentPlan: '75 / 25',
    overview: [
      'DAMAC Islands 2 extends the island-living concept in Dubailand, with clusters arranged around private lagoons and sand-edged waterways. Phase 2 follows a first phase that sold through quickly, which gives some evidence of genuine demand rather than purely speculative absorption.',
      'The thesis is substitution. Buyers priced out of Palm Jumeirah and comparable waterfront addresses can access lagoon frontage and equivalent lifestyle credentials at a materially lower entry point. The risk to watch is delivery timing, where DAMAC has shown wider variance than its peers.',
    ],
    highlights: ['Private lagoon frontage at a fraction of Palm pricing', 'Phase 1 sold through, evidencing real demand', 'Large plot sizes relative to the price point', 'Strong secondary market for DAMAC lagoon product'],
    amenities: ['Private lagoons and beaches', 'Water sports', 'Clubhouse', 'Landscaped island parks', 'Gymnasium', 'Retail promenade'],
  },
  'binghatti-skyrise': {
    propertyType: 'Apartments', bedrooms: 'Studio – 3', size: '420 – 1,850 sq ft', paymentPlan: '70 / 30',
    overview: [
      "Binghatti Skyrise sits in Business Bay, within walking distance of the Dubai Canal and a short drive from Downtown. Binghatti's signature here is architectural density and short handover timelines, both of which matter to an investor: the capital is committed for less time before it starts producing.",
      "Business Bay is the most liquid apartment market in the emirate outside Downtown and Marina, which makes the exit straightforward. This is a yield-and-liquidity position rather than a high-growth one.",
    ],
    highlights: ['Short handover timeline relative to comparable off-plan', 'Business Bay secondary market depth', 'Canal proximity', 'Branded residence components within the tower'],
    amenities: ['Rooftop pool', 'Fitness centre', 'Concierge', 'Covered parking', 'Retail at podium level', 'Landscaped deck'],
  },
  'creek-harbour': {
    propertyType: 'Apartments', bedrooms: '1 – 4', size: '700 – 2,900 sq ft', paymentPlan: '80 / 20',
    overview: [
      "Dubai Creek Harbour is positioned as the city's next downtown, built around the creek with a marina, a central park and a retail district. Emaar is master developer, and the delivery record across the completed phases has been consistent.",
      'The long-term catalyst is Creek Tower. Its completion would materially change the skyline and the address, though the timeline has moved before and any thesis that depends solely on it carries real timing risk. The nearer-term case is simpler: a well-executed waterfront masterplan by a proven developer, within reach of the airport and Downtown.',
    ],
    highlights: ['Emaar master developer with consistent delivery', 'Waterfront and creek frontage', 'Central park and retail district within the masterplan', 'Proximity to Downtown and the airport'],
    amenities: ['Marina and yacht club', 'Central park', 'Waterfront promenade', 'Swimming pools', 'Fitness facilities', 'Retail district'],
  },
  'damac-lagoons': {
    propertyType: 'Mediterranean Villas', bedrooms: '3 – 6', size: '2,200 – 5,100 sq ft', paymentPlan: '75 / 25',
    overview: [
      'DAMAC Lagoons is a villa masterplan in Dubailand organised into Mediterranean-themed clusters, each arranged around swimmable lagoons. The community has a proven sellout record across earlier clusters and, importantly, an active secondary market, which is the harder test.',
      'For an investor the appeal is a villa product at a townhouse price point with genuine differentiation on amenity. The location is inland, so this is a lifestyle-demand play rather than a proximity-to-employment one.',
    ],
    highlights: ['Proven sellout record across earlier clusters', 'Active secondary market for the product type', 'Swimmable lagoons throughout the community', 'Villa product at a townhouse entry point'],
    amenities: ['Swimmable lagoons', 'Wave pools', 'Floating cinema', 'Community clubhouse', 'Sports courts', 'Landscaped parks'],
  },
  'emaar-beachfront': {
    propertyType: 'Waterfront Apartments', bedrooms: '1 – 4', size: '750 – 3,400 sq ft', paymentPlan: 'Ready',
    overview: [
      'Emaar Beachfront occupies a private island between Dubai Marina and Palm Jumeirah, with its own beach and direct marina views. It is one of the most liquid residential addresses in the emirate, which is the defining characteristic for anyone who cares about the exit.',
      'Inventory is limited and largely complete, so this is a different proposition to the off-plan positions elsewhere in the portfolio: income starts immediately, the price reflects the certainty, and the asset holds value through market cycles rather than repricing sharply in either direction.',
    ],
    highlights: ['Private beach access', 'Among the most liquid addresses in the emirate', 'Ready inventory, income from day one', 'Marina and Palm Jumeirah views'],
    amenities: ['Private beach', 'Infinity pools', 'Marina berths nearby', 'Fitness and spa', 'Beachfront retail', '24-hour security'],
  },
};

function slugify(str) {
  return String(str || '').toLowerCase().replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80);
}

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) { console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY first.'); process.exit(1); }
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  // ── blogs ────────────────────────────────────────────────────────
  {
    const { data, error } = await supabase.from('cms_content').select('content').eq('page', 'blogs').single();
    if (error) throw new Error(error.message);
    const c = JSON.parse(JSON.stringify(data.content));

    const fill = (post) => {
      const slug = post.slug || slugify(post.title);
      post.slug = slug;
      if (!post.author) post.author = 'RealTerra Research';
      if (!post.date) post.date = '2026';
      if (!post.readTime) post.readTime = '6 min read';
      if (!post.body || post.body.length === 0) post.body = BLOG_BODIES[slug] || [post.excerpt || ''];
      return post;
    };

    if (c.featured) fill(c.featured);
    (c.posts || []).forEach(fill);

    const { error: e2 } = await supabase.from('cms_content')
      .upsert({ page: 'blogs', content: c, updated_by: 'detail-seed' });
    if (e2) throw new Error(e2.message);
    console.log(`blogs: ${(c.posts || []).length} posts + featured now have slugs and bodies`);
  }

  // ── projects ─────────────────────────────────────────────────────
  {
    const { data, error } = await supabase.from('cms_content').select('content').eq('page', 'projects').single();
    if (error) throw new Error(error.message);
    const c = JSON.parse(JSON.stringify(data.content));

    (c.projects || []).forEach((p) => {
      const slug = p.slug || slugify(p.name);
      p.slug = slug;
      const d = PROJECT_DETAIL[slug];
      if (!d) return;
      if (!p.propertyType) p.propertyType = d.propertyType;
      if (!p.bedrooms) p.bedrooms = d.bedrooms;
      if (!p.size) p.size = d.size;
      if (!p.paymentPlan) p.paymentPlan = d.paymentPlan;
      if (!p.overview || p.overview.length === 0) p.overview = d.overview;
      if (!p.highlights || p.highlights.length === 0) p.highlights = d.highlights;
      if (!p.amenities || p.amenities.length === 0) p.amenities = d.amenities;
      if (!p.gallery) p.gallery = [];
    });

    if (!c.detail) {
      c.detail = {
        enquiryHeadline: 'Enquire about this project',
        enquiryIntro: 'Send us your details and we will come back with pricing, availability and the full project breakdown.',
        submitLabel: 'Send Enquiry →',
        backLabel: 'All projects',
      };
    }

    const { error: e2 } = await supabase.from('cms_content')
      .upsert({ page: 'projects', content: c, updated_by: 'detail-seed' });
    if (e2) throw new Error(e2.message);
    console.log(`projects: ${(c.projects || []).length} projects now have slugs and detail content`);
  }

  console.log('Done.');
}

main().catch((e) => { console.error(e.message); process.exit(1); });
