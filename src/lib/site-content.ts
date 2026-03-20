import type { Metadata } from "next";

export const siteUrl = "https://brunohristoforov.dev";

export const contact = {
  email: "hristoforovbruno@gmail.com",
  phone: "+372 5863 0442",
  location: "Tallinn, Estonia",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Examples" },
  { href: "/why-choose-me", label: "Why Choose Me" },
  { href: "/process", label: "Process" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export const serviceHighlights = [
  {
    title: "Fast Business Websites",
    problem: "Slow pages make buyers leave before they even read your offer.",
    result: "Speed-focused builds that keep attention, build trust, and turn visits into calls.",
  },
  {
    title: "SEO That Brings Buyers",
    problem: "If your business cannot be found, your competitor gets the sale.",
    result: "Sharper page structure, local intent targeting, and content that helps you rank and get enquiries.",
  },
  {
    title: "Redesigns That Sell",
    problem: "Outdated websites look risky, cheap, and forgettable.",
    result: "Premium redesigns that make your business feel credible, current, and worth contacting.",
  },
  {
    title: "Reliable Monthly Support",
    problem: "Broken forms, stale content, and small issues quietly kill revenue.",
    result: "Ongoing maintenance that keeps your website polished, secure, and ready to convert.",
  },
];

export const services = [
  {
    title: "Website Development",
    keyword: "fast business websites Estonia",
    pain: "Your current website loads slowly, looks outdated, and leaks potential customers every day.",
    solution:
      "I build modern business websites that load fast, feel premium, and make it easier for people to trust you and take action.",
    outcomes: ["Faster first impression", "Stronger trust", "More calls and enquiries"],
  },
  {
    title: "SEO Optimization",
    keyword: "SEO websites Tallinn",
    pain: "A beautiful website means nothing if your ideal customers never see it.",
    solution:
      "I improve page messaging, structure, and search visibility so your business gets found by people ready to buy.",
    outcomes: ["More local visibility", "Better quality traffic", "Higher-value leads"],
  },
  {
    title: "Website Redesign",
    keyword: "website redesign Tallinn",
    pain: "An old website makes even a good business look behind the market.",
    solution:
      "I turn dated websites into sharp, high-conviction sales assets that feel credible on every screen.",
    outcomes: ["Modern brand image", "Cleaner user journey", "Higher conversion potential"],
  },
  {
    title: "Maintenance Plans",
    keyword: "website maintenance Estonia",
    pain: "Ignoring updates and performance issues lets revenue slip through cracks you do not notice until it hurts.",
    solution:
      "Monthly support keeps your site updated, responsive, and conversion-ready while you focus on running the business.",
    outcomes: ["Less downtime", "Fresh content", "Consistent performance"],
  },
];

export const projects = [
  {
    slug: "restaurant-website-example",
    name: "Restaurant Website Example",
    business: "Restaurant",
    theme: "restaurant",
    problem: "Many restaurant websites make menus hard to read, bookings hard to find, and the business feel less premium than it really is.",
    build:
      "A clean restaurant-style example focused on menu clarity, stronger trust, and an easier reservation path.",
    results: ["Booking-first layout", "Menu clarity", "Premium restaurant positioning"],
  },
  {
    slug: "dental-clinic-website-example",
    name: "Dental Clinic Website Example",
    business: "Dental Clinic",
    theme: "clinic",
    problem:
      "Clinic websites often feel outdated or confusing, which makes new patients hesitate before contacting the practice.",
    build:
      "A trust-focused clinic example with clearer treatment sections, a calm structure, and stronger appointment calls to action.",
    results: ["Trust-focused layout", "Clear treatment structure", "Patient-first messaging"],
  },
  {
    slug: "gym-website-example",
    name: "Gym Website Example",
    business: "Gym",
    theme: "gym",
    problem:
      "Gym websites often feel flat, outdated, or weak on mobile, which hurts trial signups and first impressions.",
    build:
      "A stronger gym-style example with bold calls to action, class previews, and a clearer path to trial memberships.",
    results: ["High-energy structure", "Mobile-first layout", "Stronger trial signup flow"],
  },
  {
    slug: "local-service-website-example",
    name: "Local Service Website Example",
    business: "Local Service",
    theme: "service",
    problem:
      "Local service websites often hide contact actions, service areas, and urgency cues that customers need right away.",
    build:
      "A service-business example with fast contact prompts, clearer service sections, and stronger trust signals.",
    results: ["Lead-focused structure", "Urgent contact flow", "Clear service area messaging"],
  },
];

export const examplePages = [
  {
    slug: "restaurant-website-example",
    category: "Restaurant Example",
    title: "A sharper restaurant website that makes booking feel easy.",
    description:
      "This example page shows how a restaurant can feel more premium online, guide guests to the menu faster, and turn visits into reservations.",
    heroLabel: "Modern Dining Experience",
    heroIntro:
      "Built to help restaurants look more memorable, feel more premium, and move people toward reservations instead of hesitation.",
    primaryCta: "Book a Table",
    secondaryCta: "View Menu",
    stats: [
      { value: "Menu", label: "clear at first glance" },
      { value: "Mobile", label: "booking-friendly layout" },
      { value: "Trust", label: "premium first impression" },
    ],
    sections: [
      {
        title: "Why this style works",
        text: "Restaurants win when the website makes the place feel desirable before the guest even arrives. Strong photography, clear booking actions, and a simple menu flow reduce friction.",
      },
      {
        title: "What this example focuses on",
        text: "A calmer premium layout, bolder menu hierarchy, and a more obvious reservation path for mobile and desktop visitors.",
      },
    ],
    features: ["Hero with booking CTA", "Featured dishes section", "Menu preview cards", "Reservation-first footer"],
    theme: "restaurant",
  },
  {
    slug: "dental-clinic-website-example",
    category: "Clinic Example",
    title: "A clinic website that feels trusted before the first call.",
    description:
      "This example page shows how a dental clinic can feel calmer, clearer, and more credible for new patients deciding whether to book.",
    heroLabel: "Trusted Dental Care",
    heroIntro:
      "Built to reduce doubt, explain treatment clearly, and make contacting the clinic feel safe and straightforward.",
    primaryCta: "Request Appointment",
    secondaryCta: "Explore Treatments",
    stats: [
      { value: "Clear", label: "treatment overview" },
      { value: "Calm", label: "trust-focused design" },
      { value: "Simple", label: "contact journey" },
    ],
    sections: [
      {
        title: "Why this style works",
        text: "Healthcare websites need to lower anxiety fast. Clean spacing, reassuring language, and simple service structure help patients feel more comfortable taking the next step.",
      },
      {
        title: "What this example focuses on",
        text: "Treatment clarity, proof-of-care layout blocks, and a visible appointment action without overwhelming the visitor.",
      },
    ],
    features: ["Calm hero section", "Treatment cards", "Why-patients-choose-us section", "Appointment prompt"],
    theme: "clinic",
  },
  {
    slug: "gym-website-example",
    category: "Gym Example",
    title: "A gym website with more energy and a clearer signup push.",
    description:
      "This example page shows how a gym can feel more active, more current, and more aggressive about driving trial signups.",
    heroLabel: "Train Harder",
    heroIntro:
      "Built to create urgency, highlight classes and facilities, and push new visitors toward a trial instead of passive browsing.",
    primaryCta: "Claim Free Trial",
    secondaryCta: "View Classes",
    stats: [
      { value: "Bold", label: "high-energy messaging" },
      { value: "Fast", label: "mobile-first browsing" },
      { value: "Clear", label: "trial signup flow" },
    ],
    sections: [
      {
        title: "Why this style works",
        text: "Gyms compete on energy and confidence. Strong headlines, visible offers, and a fast layout help turn attention into trial leads.",
      },
      {
        title: "What this example focuses on",
        text: "Membership urgency, class previews, and a stronger path from landing page to trial claim.",
      },
    ],
    features: ["Bold hero offer", "Class schedule teaser", "Trainer highlights", "Trial-focused CTA block"],
    theme: "gym",
  },
  {
    slug: "local-service-website-example",
    category: "Local Service Example",
    title: "A local service website that pushes calls and quick enquiries.",
    description:
      "This example page shows how a local service business can make urgent contact easier and look more trustworthy right away.",
    heroLabel: "Fast Local Help",
    heroIntro:
      "Built to make service areas clearer, trust signals stronger, and the call button impossible to miss when customers need help now.",
    primaryCta: "Call Now",
    secondaryCta: "See Services",
    stats: [
      { value: "Urgent", label: "contact-first structure" },
      { value: "Local", label: "service-area clarity" },
      { value: "Trusted", label: "proof-driven layout" },
    ],
    sections: [
      {
        title: "Why this style works",
        text: "Service businesses lose leads when contact info is buried. Fast access to calls, service areas, and trust cues improves the chance of conversion.",
      },
      {
        title: "What this example focuses on",
        text: "Emergency-ready call actions, visible service categories, and stronger reassurance for first-time customers.",
      },
    ],
    features: ["Sticky call CTA", "Service area section", "Fast quote form preview", "Proof and reassurance blocks"],
    theme: "service",
  },
] as const;

export const differentiators = [
  "Fast-loading pages that stop potential customers from leaving.",
  "SEO-first structure that helps the right buyers find your business.",
  "Modern visual design that makes your brand feel credible and premium.",
  "Clear communication, fast turnaround, and business-first execution.",
];

export const testimonials = [
  {
    quote:
      "Bruno rebuilt our restaurant website and the difference was immediate. We started getting more reservation requests within weeks because the site finally looked trustworthy and easy to use.",
    author: "Marta K.",
    role: "Owner, Luna Table",
  },
  {
    quote:
      "Our clinic needed a site that looked trustworthy before people ever called. Bruno made it cleaner, faster, and much more convincing for new patients.",
    author: "Daniel R.",
    role: "Owner, Harbor Dental",
  },
  {
    quote:
      "The old gym website was costing us signups. The new one feels alive, loads quickly, and pushes people to claim a trial instead of disappearing.",
    author: "Kevin S.",
    role: "Manager, Iron District",
  },
];

export const processSteps = [
  {
    title: "Discovery",
    description:
      "We identify where your current website loses trust, traffic, and revenue so the rebuild solves the right problem.",
  },
  {
    title: "Design",
    description:
      "I map a cleaner user journey and premium visual direction built to make your business look worth choosing.",
  },
  {
    title: "Development",
    description:
      "Your site is built for speed, clarity, and mobile performance so visitors stay engaged instead of bouncing.",
  },
  {
    title: "Launch",
    description:
      "After testing, your website goes live with SEO-ready pages and a clear path for enquiries, calls, or bookings.",
  },
];

export const pricingPlans = [
  {
    name: "Starter Website",
    price: "from EUR 900",
    description: "For local businesses that need a serious online presence fast.",
    points: ["Up to 5 pages", "Sales-focused copy direction", "Mobile-first design", "Basic SEO setup"],
  },
  {
    name: "Advanced Website",
    price: "from EUR 1,800",
    description: "For businesses that need stronger trust, more pages, and better lead flow.",
    points: ["Up to 10 pages", "Custom interactive sections", "Advanced on-page SEO", "Examples or service expansion"],
  },
  {
    name: "Monthly Maintenance",
    price: "from EUR 120/mo",
    description: "For businesses that want speed, updates, and reliability without chasing fixes.",
    points: ["Content updates", "Performance checks", "SEO upkeep", "Priority support"],
  },
];

export const seoKeywords = {
  home: [
    "web developer Tallinn",
    "freelance web developer Estonia",
    "fast business websites Estonia",
    "website developer for small businesses",
  ],
  services: [
    "SEO websites Tallinn",
    "fast business websites Estonia",
    "website redesign Tallinn",
    "website maintenance Estonia",
  ],
  portfolio: [
    "website examples Estonia",
    "small business website examples",
    "small business website case studies",
  ],
  whyChooseMe: [
    "web developer Tallinn Estonia",
    "modern business websites Estonia",
    "reliable freelance web developer",
  ],
  process: [
    "website design process Estonia",
    "small business website launch process",
  ],
  pricing: [
    "website pricing Estonia",
    "small business website cost Tallinn",
    "freelance web developer pricing",
  ],
  contact: [
    "hire web developer Tallinn",
    "contact freelance web developer Estonia",
  ],
};

type MetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: MetadataOptions): Metadata {
  const canonical = `${siteUrl}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Bruno Hristoforov",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
