/**
 * Programme and company content, transcribed from the DriveHer corporate
 * documents: the Bayelsa Women Green Mobility Initiative (BWGMI) PPP proposal,
 * the Delta Women Clean Mobility Initiative (DWCMI) brief, the pre-seed
 * investor pitch deck and the platform pricing policy.
 *
 * Keeping copy as data (rather than inline JSX) makes it reviewable by
 * non-engineers and trivially portable to a CMS later.
 */

/* -------------------------------------------------------------------------- */
/*  The ecosystem — eight business lines on one shared platform                */
/* -------------------------------------------------------------------------- */

export type EcosystemLine = {
  id: string;
  name: string;
  role: string;
  description: string;
  points: string[];
};

export const ecosystem: EcosystemLine[] = [
  {
    id: 'ride',
    name: 'DriveHer Ride',
    role: 'Ride-hailing',
    description:
      'On-demand rides dispatched through the DriveHer platform, with cashless payment, real-time tracking and in-app safety features for both passenger and driver.',
    points: [
      'Intelligent dispatch and route optimisation',
      'Fair Fare policy — surge capped at 1.3×',
      'Driver and passenger safety and emergency response',
      'Cashless payments and digital receipting',
    ],
  },
  {
    id: 'transport',
    name: 'DriveHer Transport',
    role: 'Urban taxi',
    description:
      'Scheduled and hailed urban taxi services along high-demand corridors connecting government institutions, hospitals, campuses, airports and commercial districts.',
    points: [
      'Green Corridor operating model',
      'Airport transfers and executive mobility',
      'Community shuttle and last-mile connectivity',
      'Government personnel transportation',
    ],
  },
  {
    id: 'logistics',
    name: 'DriveHer Logistics',
    role: 'Delivery & freight',
    description:
      'Same-day delivery, business distribution and last-mile logistics that keep the fleet earning outside passenger peak hours.',
    points: [
      'Corporate and SME distribution contracts',
      'Parcel and document delivery',
      'Asset utilisation across the full operating day',
      'Configurable logistics pricing rules',
    ],
  },
  {
    id: 'fleet',
    name: 'DriveHer Fleet',
    role: 'Fleet management',
    description:
      'Managed fleets for corporates, institutions and third-party owners — telematics, maintenance scheduling, compliance and utilisation reporting as a service.',
    points: [
      'Real-time telematics and utilisation dashboards',
      'Predictive maintenance from operational data',
      'Third-party fleet management contracts',
      'Driver performance and safety scoring',
    ],
  },
  {
    id: 'pay',
    name: 'DriveHer Pay',
    role: 'Wallet & card',
    description:
      'A mobility wallet and card that settles rides, deliveries, charging and lease repayments — the financial rails under every other business line.',
    points: [
      'Rider wallet and corporate billing accounts',
      'Automatic lease repayment at source',
      'Charging and fuelling settlement',
      'Driver earnings, savings and payout history',
    ],
  },
  {
    id: 'tech',
    name: 'DriveHer Tech',
    role: 'Platform & data',
    description:
      'The engine underneath the ecosystem: rider app, driver app, dispatch, pricing rules, energy management and business intelligence.',
    points: [
      'Configurable pricing rules engine — no code changes to reprice',
      'Fleet, energy and charging management',
      'Operational analytics and regulatory reporting',
      'Licensable to partners and other markets',
    ],
  },
  {
    id: 'academy',
    name: 'DriveHer Academy',
    role: 'Academy & training',
    description:
      'Structured recruitment, professional training and certification that moves women from transport users to mobility professionals, supervisors and owners.',
    points: [
      'Professional driving, safety and customer service',
      'EV and CNG maintenance and technical skills',
      'Digital literacy, financial literacy and business skills',
      'Leadership, entrepreneurship and franchise readiness',
    ],
  },
  {
    id: 'green',
    name: 'DriveHer Green',
    role: 'Clean energy',
    description:
      'The energy layer — CNG in Delta today, solar-powered electric charging in Bayelsa, and the hub infrastructure that makes both dependable.',
    points: [
      'Solar PV generation and battery energy storage',
      'DC fast charging and standard AC charge points',
      'CNG dual-fuel deployment in Delta State',
      'Lower operating cost and reduced grid dependence',
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Programmes                                                                 */
/* -------------------------------------------------------------------------- */

export const bayelsa = {
  slug: 'bayelsa',
  name: 'DriveHer Bayelsa',
  initiative: 'Bayelsa Women Green Mobility Initiative (BWGMI)',
  tagline: 'Driving Women. Powering Communities.',
  positioning:
    'A Public–Private Partnership proposal to position Bayelsa State as a national leader in women-led sustainable urban mobility.',
  summary:
    'BWGMI addresses two development priorities at once: expanding economic opportunity for women, and accelerating the adoption of clean transportation supported by renewable energy infrastructure. Electric vehicles, solar-powered charging and smart mobility technology are the tools; women’s empowerment and economic development are the outcome.',
  pilotCity: 'Yenagoa',
  pillars: [
    {
      title: "Women's economic empowerment",
      body: 'Women are the primary beneficiaries — through employment, entrepreneurship, leadership development and access to new economic opportunity within the green economy.',
    },
    {
      title: 'Sustainable electric mobility',
      body: 'Electric vehicles deployed for ride-hailing, corporate transport, airport transfers, logistics support and other urban mobility services.',
    },
    {
      title: 'Renewable energy infrastructure',
      body: 'Solar-powered DriveHer Energy Hubs with battery storage and modern charging facilities, addressing the current absence of EV charging infrastructure in the State.',
    },
    {
      title: 'Smart mobility technology',
      body: 'A digital platform integrating passenger booking, fleet management, vehicle monitoring, safety features, cashless payments and operational analytics.',
    },
  ],
  energyHub: {
    title: 'DriveHer Energy Hub — Yenagoa',
    intro:
      'Bayelsa’s first solar-powered EV charging and fleet operations centre, designed as the backbone of the pilot and a demonstration site for clean mobility technology.',
    specs: [
      { value: '200 kWp', label: 'Solar PV system', sub: 'Rooftop and canopy array' },
      { value: '500 kWh', label: 'Battery energy storage', sub: 'LiFePO₄ BESS' },
      { value: '250 kW', label: 'Hybrid inverter system', sub: 'Solar, battery and grid balance' },
      { value: '5 × 120 kW', label: 'DC fast chargers', sub: 'Dual-gun — 10 vehicles at once' },
    ],
    facilities: [
      'Solar photovoltaic generation and battery energy storage',
      'Fast DC charging for commercial fleet and standard AC charge points',
      'Smart energy management and remote monitoring',
      'Fleet inspection and light maintenance workshop',
      'Driver support, briefing and customer waiting areas',
      "Women's training, innovation and co-working centre",
      'CCTV, access control and 24/7 site security',
      'Digital payment systems integrated with the DriveHer platform',
    ],
  },
  corridor: {
    title: 'The Yenagoa Green Corridor',
    body: 'Rather than dispersing thinly across the city, the pilot concentrates services along high-demand routes — maximising utilisation, public visibility and the quality of operating data before wider expansion.',
    destinations: [
      'Bayelsa State Government House',
      'Bayelsa State Secretariat',
      'Bayelsa International Airport',
      'Federal Medical Centre, Yenagoa',
      'Major hotels and conference facilities',
      'Educational institutions',
      'Commercial and financial districts',
      'Residential communities with high commuter demand',
    ],
  },
  phases: [
    {
      phase: 'Phase 1',
      title: 'Pilot phase',
      timeline: '0 – 12 months',
      areas: ['Yenagoa'],
      body: 'Pilot launch and establishment of the flagship DriveHer Mobility Centre & Green Hub.',
    },
    {
      phase: 'Phase 2',
      title: 'Expansion phase',
      timeline: '12 – 24 months',
      areas: ['Sagbama', 'Ogbia', 'Kolokuma/Opokuma', 'Southern Ijaw (Oporoma)'],
      body: 'Scaling clean mobility solutions to deepen impact and drive adoption across these LGAs.',
    },
    {
      phase: 'Phase 3',
      title: 'Statewide scale',
      timeline: '24 – 36 months',
      areas: ['Ekeremor', 'Nembe', 'Brass'],
      body: 'Expanding connectivity and clean mobility services to achieve full statewide coverage and inclusion.',
    },
  ],
  targets: [
    { value: '8', label: 'LGAs covered', sub: 'Full statewide reach' },
    { value: '50+', label: 'EVs in pilot phase', sub: 'Yenagoa' },
    { value: '15+', label: 'Charging points', sub: 'By year three' },
    { value: '1,500+', label: 'Women empowered', sub: 'Across the programme' },
    { value: '500+', label: 'EVs at statewide scale', sub: 'Year three' },
  ],
  blueMobility: {
    title: 'DriveHer Blue Mobility',
    body: 'Bayelsa’s geography connects communities by water as much as by road. Following the land-based rollout, DriveHer intends to study and pilot clean-energy passenger vessels — water taxis, ferries and community vessels — supported by renewable-energy charging, digital booking and real-time vessel monitoring, forming DriveHer Green Maritime Corridors alongside the road network.',
    caveat:
      'Maritime deployment is subject to technical feasibility studies, waterway assessments, regulatory requirements, safety standards and the availability of appropriate investment and technology partners.',
  },
};

export const delta = {
  slug: 'delta',
  name: 'DriveHer Delta',
  initiative: 'Delta Women Clean Mobility Initiative (DWCMI)',
  tagline: 'Driving Hopes. Fueling Futures.',
  positioning:
    'A transformative programme empowering women through CNG-powered transportation, skills development and access to economic opportunity in Delta State.',
  summary:
    'DWCMI puts dual-fuel CNG/PMS vehicles into the hands of women on affordable lease-to-own terms, wrapped in professional training, maintenance support and a mobility platform that keeps the vehicle earning. Cleaner energy, lower fuel cost, safer journeys — and a pathway to ownership.',
  vehicle: 'Chery Tiggo 2 Pro — CNG/PMS dual fuel',
  cities: [
    { name: 'Asaba', women: 40, vehicles: 20 },
    { name: 'Warri', women: 60, vehicles: 30 },
  ],
  targets: [
    { value: '100', label: 'Women empowered', sub: 'Year one' },
    { value: '100+', label: 'Direct jobs', sub: 'Created in year one' },
    { value: '300+', label: 'Indirect jobs', sub: 'Across the value chain' },
    { value: '50', label: 'Vehicles deployed', sub: 'Asaba and Warri combined' },
  ],
  components: [
    {
      title: 'Driver & life skills training',
      body: 'Professional driving, road safety, customer service and personal development before any woman takes a vehicle out.',
    },
    {
      title: 'CNG vehicle deployment',
      body: 'Dual-fuel Chery Tiggo 2 Pro vehicles selected for efficiency, running-cost savings and reliability on Delta roads.',
    },
    {
      title: 'Smart mobility platform',
      body: 'Ride-hailing, corporate rides, airport transfers and delivery work routed through one app so vehicles stay utilised.',
    },
    {
      title: 'Financial inclusion',
      body: 'Access to finance, structured savings and a documented pathway to full vehicle ownership.',
    },
    {
      title: 'Maintenance & support',
      body: 'CNG maintenance support and 24/7 operational assistance so a breakdown does not become a lost livelihood.',
    },
    {
      title: 'Women support network',
      body: 'Community, mentorship and continuous support — the part that keeps women in the programme past month three.',
    },
  ],
  leaseToOwn: [
    'Affordable daily payments deducted automatically at source',
    'Financial inclusion through a formal earnings and repayment record',
    'A defined pathway to outright vehicle ownership',
    'Sustainable livelihoods rather than a one-off grant',
  ],
  cngBenefits: [
    'Affordable — materially lower fuel cost per kilometre',
    'Cleaner — reduced emissions versus petrol-only operation',
    'Reliable — dual-fuel means no stranded vehicles',
    'Better for the environment and for household income',
  ],
};

/* -------------------------------------------------------------------------- */
/*  Women's empowerment framework                                              */
/* -------------------------------------------------------------------------- */

export const womenPathways = [
  'Professional electric vehicle operators',
  'Fleet supervisors and operations managers',
  'Customer service and passenger experience management',
  'Dispatch and mobility coordination',
  'Electric vehicle maintenance and technical support',
  'Solar charging station administration',
  'Renewable energy operations',
  'Digital platform support and data management',
  'Fleet entrepreneurship and franchise ownership',
  'Community engagement and mobility advocacy',
];

export const academyTracks = [
  'Electric vehicle operation and safety',
  'Customer relations and service excellence',
  'Fleet operations and logistics',
  'Digital mobility systems',
  'Renewable energy awareness',
  'Business management and entrepreneurship',
  'Financial literacy',
  'Leadership and professional development',
];

/* -------------------------------------------------------------------------- */
/*  Impact                                                                     */
/* -------------------------------------------------------------------------- */

export const impact = {
  economic: [
    'Increase income-generating opportunities for women',
    'Create direct and indirect employment across the mobility and renewable energy value chains',
    'Encourage private sector investment in clean transport and energy infrastructure',
    'Promote local enterprise development through fleet partnerships and support services',
    'Strengthen the State’s attractiveness as a destination for sustainable investment',
  ],
  social: [
    'Greater participation of women in leadership and technical roles',
    'Improved mobility for residents, workers and visitors',
    'Enhanced public safety through monitored, technology-driven transport',
    'Increased financial independence for participating women',
    'Skills development in emerging industries',
    'Stronger community engagement and social cohesion',
  ],
  environmental: [
    'Reduce dependence on fossil-fuel-powered urban transport',
    'Lower greenhouse gas emissions',
    'Improve urban air quality',
    'Encourage renewable energy utilisation',
    'Support Nigeria’s transition toward cleaner transportation systems',
  ],
};

export const governance = [
  {
    title: 'Steering committee',
    body: 'A multi-stakeholder committee provides strategic oversight — State Government, DriveHer, the Ministries of Women Affairs, Transport, Environment and Energy, private sector partners, development and funding partners, and independent technical advisers.',
  },
  {
    title: 'Project management office',
    body: 'A dedicated PMO coordinates day-to-day implementation: programme coordination, scheduling, stakeholder engagement, procurement, operational reporting, risk management and performance monitoring.',
  },
  {
    title: 'Monitoring & evaluation',
    body: 'Performance is assessed against defined indicators — women trained and economically empowered, employment created, fleet utilisation, renewable energy generated and consumed, passenger satisfaction, safety, revenue and operational efficiency, carbon emissions reduced, charging infrastructure expansion and community outcomes.',
  },
  {
    title: 'Transparency & accountability',
    body: 'Periodic operational and financial reporting, independent performance reviews, clear procurement and contracting procedures, compliance with applicable regulatory requirements, stakeholder consultation and ethical standards in service delivery.',
  },
];

/* -------------------------------------------------------------------------- */
/*  Investment                                                                 */
/* -------------------------------------------------------------------------- */

export const investment = {
  round: 'Pre-seed',
  amount: '₦7.5 million',
  purpose:
    'To establish the operational and institutional foundation required for pilot implementation, and to build DriveHer into a scalable, investment-ready platform capable of attracting significantly larger institutional funding for fleet deployment and expansion.',
  useOfFunds: [
    { share: 30, label: 'Technology MVP', body: 'Rider app, driver app, dispatch engine and pricing rules engine.' },
    { share: 20, label: 'Business development', body: 'Corporate contracts, route partnerships and demand pipeline.' },
    { share: 15, label: 'Legal & corporate structuring', body: 'Governance, compliance and investment-ready documentation.' },
    { share: 15, label: 'Brand development & marketing', body: 'Market entry, driver recruitment and public awareness.' },
    { share: 10, label: 'Government & PPP engagement', body: 'State partnerships, permits and institutional alignment.' },
    { share: 10, label: 'Operating capital', body: 'Working capital through the foundation phase.' },
  ],
  whyNow: [
    'Accelerating urbanisation across Nigerian cities',
    'Rapid smartphone adoption',
    'Maturing digital payment infrastructure',
    'Federal and state investment in CNG infrastructure',
    'Government support for women’s economic empowerment',
    'An active Public–Private Partnership environment',
    'Growing logistics and last-mile demand',
    'Rising demand for cleaner mobility',
  ],
  revenueStreams: [
    'Urban taxi',
    'Ride-hailing',
    'Corporate transport',
    'Logistics',
    'Fleet management',
    'Digital wallet',
    'Mobility card',
    'Driver academy',
    'Advertising',
    'Technology licensing',
    'Fleet analytics',
    'Future AI services',
  ],
  goToMarket: [
    { phase: 'Phase 1', label: '100 vehicles', detail: 'Asaba + Warri' },
    { phase: 'Phase 2', label: '500 vehicles', detail: 'Delta State' },
    { phase: 'Phase 3', label: 'South-South', detail: 'Regional expansion' },
    { phase: 'Phase 4', label: 'DriveHer Naija', detail: 'National platform' },
    { phase: 'Phase 5', label: 'West Africa', detail: 'Cross-border' },
  ],
};

export type ComparisonRow = {
  feature: string;
  driveher: string;
  uber: string;
  bolt: string;
  indrive: string;
};

export const comparison: ComparisonRow[] = [
  { feature: 'Ride-hailing', driveher: 'yes', uber: 'yes', bolt: 'yes', indrive: 'yes' },
  { feature: 'Urban taxi services', driveher: 'yes', uber: 'limited', bolt: 'limited', indrive: 'limited' },
  { feature: 'Fleet management', driveher: 'yes', uber: 'no', bolt: 'no', indrive: 'no' },
  { feature: "Women's empowerment", driveher: 'core', uber: 'no', bolt: 'no', indrive: 'no' },
  { feature: 'Digital wallet', driveher: 'yes', uber: 'limited', bolt: 'limited', indrive: 'limited' },
  { feature: 'Mobility card', driveher: 'yes', uber: 'no', bolt: 'no', indrive: 'no' },
  { feature: 'PPP ready', driveher: 'yes', uber: 'no', bolt: 'no', indrive: 'no' },
  { feature: 'Clean energy strategy', driveher: 'yes', uber: 'limited', bolt: 'limited', indrive: 'limited' },
];

/* -------------------------------------------------------------------------- */
/*  Partnership framework                                                      */
/* -------------------------------------------------------------------------- */

export const pppRoles = [
  {
    title: 'The State Government',
    body: 'Plays a strategic and enabling role — policy and regulatory support, allocation of suitable locations for Mobility Centres and Green Hubs, facilitation of relevant approvals and permits, integration of DriveHer into state transportation and women’s empowerment programmes, and consideration of DriveHer services for appropriate government mobility needs.',
  },
  {
    title: 'DriveHer Urban Mobility Services',
    body: 'Serves as project developer and operational manager — project planning and implementation, fleet acquisition and operations, development and management of the digital platform, establishment of Mobility Hubs and Green Hubs, recruitment and training of women participants, operational monitoring and quality assurance, and performance reporting.',
  },
  {
    title: 'Private sector partners',
    body: 'Contribute investment, technical expertise and service delivery — electric vehicle supply, renewable energy systems, charging infrastructure, technology solutions, fleet financing, insurance, maintenance support and telecommunications or digital payment integration.',
  },
  {
    title: 'Development partners',
    body: 'Development finance institutions, international development agencies and climate-focused organisations may support the initiative through technical assistance, capacity building, grant funding for pilot programmes, climate adaptation and renewable energy financing, women’s entrepreneurship programmes, and research and impact assessment.',
  },
  {
    title: 'Community participation',
    body: 'Traditional institutions, youth organisations, women’s associations and local stakeholders are engaged throughout planning and implementation to encourage local ownership, strengthen public confidence and ensure services respond effectively to community needs.',
  },
];

/* -------------------------------------------------------------------------- */
/*  Platform policy — pricing and fairness                                     */
/* -------------------------------------------------------------------------- */

export const pricingPolicy = {
  commission: '15%',
  commissionNote:
    'Below the prevailing market rate — attractive enough to recruit drivers while still generating recurring platform revenue.',
  tiers: [
    { label: 'Standard driver', value: '15%' },
    { label: 'Premium driver', value: '17%' },
    { label: 'Corporate driver', value: '18%' },
    { label: 'Fleet partner', value: 'Negotiated' },
    { label: 'Government contract', value: 'Negotiated' },
  ],
  principles: [
    {
      title: 'Fair Fare surge cap',
      body: 'Surge pricing is capped at 1.3× — riders are never priced out of a journey they need to make.',
    },
    {
      title: 'Subsidise launch, don’t undercut permanently',
      body: 'Introductory pricing runs roughly 5% below the market leader for the first three months, funded from a defined promotional budget rather than a permanently unsustainable fare.',
    },
    {
      title: 'Automatic lease repayment',
      body: 'Lease partners have repayment deducted from earnings at source. No manual collection, no arrears spiral, a clean repayment record for the driver.',
    },
    {
      title: 'A rules engine, not hard-coded fares',
      body: 'Base fare, minimum fare, per-kilometre and per-minute rates, commission, VAT, state levies and airport surcharges are all configurable from an admin dashboard — so a regulatory change never requires a rebuild.',
    },
    {
      title: 'Scheduled rate review',
      body: 'Monthly internal review and quarterly public review, with emergency review reserved for significant CNG or electricity tariff movement, inflation spikes or new taxes.',
    },
    {
      title: 'Built for many energy types',
      body: 'The same engine prices CNG, EV and petrol fleets, corporate, government, airport, luxury, delivery and future intercity services — across states with different rules.',
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  FAQ — also emitted as FAQPage structured data                              */
/* -------------------------------------------------------------------------- */

export const faqs = [
  {
    question: 'What exactly is DriveHer?',
    answer:
      'DriveHer Urban Mobility Services Limited is a technology-enabled mobility company building an integrated ecosystem that combines ride-hailing, urban taxi services, logistics, fleet management, digital transport payments, clean mobility and women’s economic empowerment on one platform. It is structured as a Public–Private Partnership-ready enterprise operating in Bayelsa and Delta State, with a long-term vision of national and regional expansion.',
  },
  {
    question: 'How is DriveHer different from Uber, Bolt or inDrive?',
    answer:
      'Those platforms provide ride-hailing. DriveHer combines ride-hailing with urban taxi services, fleet management, a digital wallet and mobility card, a clean energy strategy and a PPP-ready structure — with women’s participation as the core business model rather than a corporate social responsibility programme.',
  },
  {
    question: 'Why are women at the centre of the business model?',
    answer:
      'Transportation has historically been one of the least gender-inclusive sectors, and women have largely been users of transport systems rather than participants in shaping and managing them. DriveHer creates structured pathways for women to become drivers, fleet managers, technicians, dispatchers, entrepreneurs, franchise owners, trainers and technology professionals across the whole mobility value chain.',
  },
  {
    question: 'What is the difference between the Bayelsa and Delta programmes?',
    answer:
      'DriveHer Bayelsa (BWGMI) is an electric mobility programme built around solar-powered DriveHer Energy Hubs, piloting in Yenagoa before phased expansion across all eight local government areas. DriveHer Delta (DWCMI) deploys dual-fuel CNG vehicles on lease-to-own terms to 100 women across Asaba and Warri. Both run on the same technology platform and the same women’s empowerment framework.',
  },
  {
    question: 'How does lease-to-own work for drivers?',
    answer:
      'Drivers join in one of two categories: owner drivers, who keep normal earnings, and DriveHer lease partners, whose repayment is deducted automatically from daily earnings by the platform. Automatic deduction removes manual collection, builds a formal repayment record and gives the driver a defined pathway to outright ownership.',
  },
  {
    question: 'How much commission does DriveHer take?',
    answer:
      'The standard platform commission is 15%, below the prevailing market rate. Tiered rates apply for premium and corporate drivers, and fleet partner and government contract rates are negotiated. All rates are configurable from the admin dashboard rather than hard-coded.',
  },
  {
    question: 'How is surge pricing handled?',
    answer:
      'DriveHer operates a Fair Fare policy with surge capped at 1.3×. Rates are reviewed monthly internally and quarterly in public, with emergency review reserved for significant CNG or electricity tariff movement, inflation spikes or new government taxes.',
  },
  {
    question: 'What is DriveHer raising, and what will the money do?',
    answer:
      'DriveHer is raising a ₦7.5 million pre-seed round to build the technology MVP, complete corporate structuring and governance, fund business development, brand and market entry, support government and PPP engagement, and cover operating capital through the foundation phase.',
  },
];

/* -------------------------------------------------------------------------- */
/*  Company timeline / vision                                                  */
/* -------------------------------------------------------------------------- */

export const nationalRoadmap = [
  { label: 'Launch', detail: 'Delta State and Bayelsa State pilots' },
  { label: 'Expand', detail: 'South-South region' },
  { label: 'Scale', detail: 'Nigeria — DriveHer Naija' },
  { label: 'Cross borders', detail: 'West Africa' },
  { label: 'Continental', detail: 'Africa' },
];
