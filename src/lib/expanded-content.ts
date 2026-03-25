import type { Locale } from "@/lib/site-content";

export type ServiceSlug =
  | "website-development"
  | "seo-optimization"
  | "website-redesign"
  | "maintenance-plans";

export type InsightSlug =
  | "how-much-does-a-small-business-website-cost-in-estonia"
  | "why-local-business-websites-lose-leads"
  | "what-every-service-business-homepage-needs";

const expandedContent = {
  en: {
    pricingGuide: {
      kicker: "Clear Pricing Structure",
      title: "Know what changes the price before you start the project.",
      description:
        "Most website quotes vary because of scope, copy needs, integrations, and how much strategy the business actually needs. This breakdown makes that visible upfront.",
      factors: [
        {
          title: "Page count and structure",
          body: "A simple 4 to 5 page site costs less than a site that needs service silos, landing pages, or location pages.",
        },
        {
          title: "Copy and messaging depth",
          body: "If the offer needs stronger positioning, rewritten headlines, and objection handling, the strategy layer is larger.",
        },
        {
          title: "Custom sections and integrations",
          body: "Booking tools, lead routing, analytics setup, and custom components increase implementation time.",
        },
        {
          title: "SEO and content expansion",
          body: "Businesses that want to rank for more searches usually need more page templates, internal linking, and supporting content.",
        },
      ],
      comparisonTitle: "What each pricing tier is best for",
      comparisonColumns: ["Package", "Best for", "Timeline", "Included focus"],
      comparisonRows: [
        ["Starter Website", "New or small local businesses", "1-2 weeks", "Fast trust, core pages, clean mobile UX"],
        ["Advanced Website", "Businesses that need stronger conversion", "2-4 weeks", "More pages, stronger messaging, deeper SEO"],
        ["Monthly Maintenance", "Live websites that must stay sharp", "Ongoing", "Updates, fixes, performance, SEO upkeep"],
      ],
    },
    maintenancePlansSection: {
      kicker: "Monthly Maintenance",
      title: "Simple monthly retainers you can offer after the website goes live.",
      description:
        "This makes the recurring offer easy to explain: the build is a one-time project, then the monthly package covers hosting, upkeep, and support.",
      plans: [
        {
          name: "Basic Care",
          price: "EUR 29/mo",
          description: "For clients who mainly want dependable hosting and technical peace of mind.",
          points: ["Hosting and SSL", "Backups", "Basic security updates", "Uptime checks"],
        },
        {
          name: "Business Care",
          price: "EUR 79/mo",
          description: "For most small businesses that also need routine edits and support.",
          points: ["Everything in Basic Care", "Small text and image edits", "Form and performance checks", "Priority email support"],
        },
        {
          name: "Growth Care",
          price: "EUR 149/mo",
          description: "For businesses that want active monthly improvement, not just passive maintenance.",
          points: ["Everything in Business Care", "Monthly content updates", "Basic SEO improvements", "Faster turnaround on small requests"],
        },
      ],
    },
    pricingFaq: [
      {
        question: "Do I need to pay the full project fee upfront?",
        answer: "No. Projects are usually split into staged payments so the work can start without creating unnecessary risk on either side.",
      },
      {
        question: "What can make the final quote go above the starting price?",
        answer: "More pages, copywriting depth, booking or CRM integrations, and extra SEO landing pages are the main price drivers.",
      },
      {
        question: "Can I start with a smaller website and expand later?",
        answer: "Yes. A lean launch plus later expansion is often the best option for local businesses that need momentum quickly.",
      },
      {
        question: "Is hosting included?",
        answer: "Hosting and domain costs are separate unless a managed setup is agreed as part of the project scope.",
      },
      {
        question: "Do you offer ongoing support after launch?",
        answer: "Yes. The maintenance plan is there for updates, small content changes, SEO upkeep, and keeping the site reliable month to month.",
      },
    ],
    servicesFaq: [
      {
        question: "Which service is the best starting point for most businesses?",
        answer: "Usually website development or website redesign. If the current site already works structurally but is invisible in search, SEO optimization becomes the priority.",
      },
      {
        question: "Do I need all services at once?",
        answer: "Not always. The right move depends on what is currently leaking most: trust, speed, visibility, or ongoing reliability.",
      },
      {
        question: "How do I know whether I need redesign or a full rebuild?",
        answer: "If the site has technical issues, weak mobile performance, or a messy page structure, a rebuild is normally the better long-term decision.",
      },
      {
        question: "Can service pages be built around my business type?",
        answer: "Yes. The strategy, copy direction, and page structure are adjusted around your offer, buyer concerns, and local market intent.",
      },
    ],
    serviceDetails: [
      {
        slug: "website-development",
        title: "Website Development",
        eyebrow: "Service Detail",
        summary: "Fast business websites built to look credible, load quickly, and make action feel obvious.",
        intro:
          "This is for businesses that need a serious online presence instead of another generic site that looks acceptable but fails to produce trust or enquiries.",
        bestFor: [
          "Local businesses launching a new website",
          "Businesses with slow or outdated brochure sites",
          "Owners who want a cleaner path to calls, forms, or bookings",
        ],
        deliverables: [
          "Page structure built around the buyer journey",
          "Mobile-first layouts and speed-focused frontend build",
          "Clear CTA placement and stronger headline hierarchy",
          "Baseline SEO setup for indexing and local visibility",
        ],
        outcomes: [
          "Stronger first impression",
          "Lower bounce risk",
          "Better enquiry quality",
          "A site that is easier to expand later",
        ],
        process: [
          "Audit what the site needs to communicate first",
          "Map the page structure around trust and conversion",
          "Build the frontend with performance and clarity in mind",
          "Launch with SEO basics, analytics, and QA in place",
        ],
        priceNote: "Typical fit: Starter Website or Advanced Website depending on page count and messaging depth.",
        keywords: [
          "website development Tallinn",
          "small business website Estonia",
          "fast business website developer Tallinn",
        ],
      },
      {
        slug: "seo-optimization",
        title: "SEO Optimization",
        eyebrow: "Service Detail",
        summary: "Sharper structure, stronger local intent targeting, and content improvements that help the right buyers find you.",
        intro:
          "This is for businesses that already have a website but are not getting found enough by people who are ready to buy locally.",
        bestFor: [
          "Businesses with weak local search visibility",
          "Sites with poor page targeting or internal structure",
          "Owners who want better traffic quality rather than vanity metrics",
        ],
        deliverables: [
          "On-page SEO cleanup and keyword-to-page alignment",
          "Page title, meta, heading, and internal linking improvements",
          "Service and location page recommendations where needed",
          "Content direction focused on buyer intent",
        ],
        outcomes: [
          "More relevant local impressions",
          "Clearer page purpose",
          "Better conversion path from search traffic",
          "Less dependence on random low-quality visits",
        ],
        process: [
          "Review current page targeting and content gaps",
          "Match business offers to search intent",
          "Refine structure, copy, metadata, and internal links",
          "Track what should be expanded next",
        ],
        priceNote: "Typical fit: Advanced Website or Monthly Maintenance when SEO is ongoing rather than a one-off cleanup.",
        keywords: [
          "SEO optimization Tallinn",
          "local SEO Estonia",
          "website SEO services Tallinn",
        ],
      },
      {
        slug: "website-redesign",
        title: "Website Redesign",
        eyebrow: "Service Detail",
        summary: "A redesign that makes the business feel current, trustworthy, and worth contacting on every screen.",
        intro:
          "This is for businesses whose site technically exists but visually weakens the offer, lowers trust, and feels behind the market.",
        bestFor: [
          "Businesses with dated branding or weak layout hierarchy",
          "Owners whose site looks cheaper than the service they actually provide",
          "Teams that need stronger trust without bloating the website",
        ],
        deliverables: [
          "Modernized visual direction aligned with your offer",
          "Cleaner information hierarchy and CTA placement",
          "Improved mobile readability and content rhythm",
          "Sharper sections for proof, services, and contact intent",
        ],
        outcomes: [
          "A more premium first impression",
          "Clearer service understanding",
          "Higher trust before contact",
          "Better consistency across pages",
        ],
        process: [
          "Identify what feels outdated or weak today",
          "Define the new positioning and visual direction",
          "Rebuild key pages around trust and clarity",
          "Launch with tighter messaging and stronger conversion flow",
        ],
        priceNote: "Typical fit: Advanced Website when design, structure, and messaging all need to be upgraded together.",
        keywords: [
          "website redesign Tallinn",
          "business website redesign Estonia",
          "modern website redesign services Tallinn",
        ],
      },
      {
        slug: "maintenance-plans",
        title: "Maintenance Plans",
        eyebrow: "Service Detail",
        summary: "Ongoing support to keep your website updated, fast, and ready to convert instead of slowly degrading.",
        intro:
          "This is for businesses that already have a live website but do not want revenue leaks caused by stale content, broken forms, or neglected performance.",
        bestFor: [
          "Businesses that need regular content updates",
          "Sites that rely on stable enquiry flow",
          "Owners who want one person responsible for ongoing website quality",
        ],
        deliverables: [
          "Content edits and small layout changes",
          "Routine checks for forms, speed, and usability",
          "SEO upkeep and metadata improvements",
          "Priority support for minor issues",
        ],
        outcomes: [
          "Less downtime and fewer surprises",
          "Cleaner ongoing presentation",
          "Steadier performance",
          "Faster response when something slips",
        ],
        process: [
          "Define the monthly support scope",
          "Track recurring tasks and business priorities",
          "Implement updates and technical upkeep consistently",
          "Adjust focus based on what the site needs most each month",
        ],
        priceNote: "Typical fit: Monthly Maintenance after launch or after a redesign when the business wants dependable upkeep.",
        keywords: [
          "website maintenance Estonia",
          "website support Tallinn",
          "monthly website updates Estonia",
        ],
      },
    ],
    insightsLanding: {
      eyebrow: "Insights",
      title: "Short articles for business owners who want a website that performs instead of just existing.",
      description:
        "Practical notes on pricing, conversion, local SEO, and what small business websites usually get wrong.",
      readMore: "Read article",
    },
    insightPosts: [
      {
        slug: "how-much-does-a-small-business-website-cost-in-estonia",
        category: "Pricing",
        title: "How much does a small business website cost in Estonia?",
        excerpt:
          "The real answer depends on scope, copy, SEO depth, and whether the site is being built as a brochure or as a sales tool.",
        publishedAt: "March 22, 2026",
        readingTime: "4 min read",
        description:
          "A practical breakdown of what drives small business website pricing in Estonia and why cheap websites often cost more in lost trust and enquiries.",
        keywords: [
          "small business website cost Estonia",
          "website pricing Tallinn",
          "web design cost Estonia",
        ],
        sections: [
          {
            heading: "Most websites are priced by complexity, not by pixels.",
            body: [
              "A simple local business site with a homepage, services page, contact page, and clear CTA flow costs far less than a site that also needs custom sections, booking integrations, service silos, and SEO content depth.",
              "The pricing difference usually comes from what the website needs to do for the business, not from how decorative it looks.",
            ],
          },
          {
            heading: "What usually increases the price",
            body: [
              "More pages, stronger copywriting, custom lead flows, analytics setup, and deeper SEO are the biggest cost drivers.",
              "If a business wants the site to act as a proper sales asset, more strategic work happens before and during development.",
            ],
          },
          {
            heading: "Why cheaper is often more expensive",
            body: [
              "Low-cost sites often skip positioning, CTA strategy, speed work, and SEO basics. That can leave the owner paying less upfront but still losing leads every month.",
              "A website that looks acceptable but feels weak in practice keeps costing the business long after launch.",
            ],
          },
        ],
      },
      {
        slug: "why-local-business-websites-lose-leads",
        category: "Conversion",
        title: "Why local business websites lose leads even when traffic is fine",
        excerpt:
          "Many local sites do get visitors, but the structure, trust signals, and calls to action are too weak to turn attention into contact.",
        publishedAt: "March 22, 2026",
        readingTime: "3 min read",
        description:
          "The most common reasons local business websites lose enquiries despite getting traffic, and what should be fixed first.",
        keywords: [
          "why websites lose leads",
          "local business website conversion",
          "website enquiry optimization Estonia",
        ],
        sections: [
          {
            heading: "The problem is often trust, not traffic.",
            body: [
              "A visitor can reach the site and still leave quickly if the business looks outdated, unclear, or hard to contact.",
              "That means the marketing channel did its job, but the website failed to convert the attention.",
            ],
          },
          {
            heading: "Weak pages make people hesitate.",
            body: [
              "Common issues are slow load speed, generic headlines, buried contact actions, weak service explanations, and almost no proof.",
              "When the page does not answer basic buyer questions fast, hesitation wins.",
            ],
          },
          {
            heading: "What to fix first",
            body: [
              "Start with the homepage and core service pages. Tighten the headline, make the CTA obvious, improve mobile readability, and add trust cues that feel real.",
              "Small changes in clarity often improve conversion more than adding extra features.",
            ],
          },
        ],
      },
      {
        slug: "what-every-service-business-homepage-needs",
        category: "Homepage Strategy",
        title: "What every service business homepage needs",
        excerpt:
          "A service homepage should create trust, explain what is offered, and move people toward contact without making them work for it.",
        publishedAt: "March 22, 2026",
        readingTime: "4 min read",
        description:
          "A straightforward homepage checklist for service businesses that want more calls and enquiries from their website.",
        keywords: [
          "service business homepage",
          "homepage checklist Estonia",
          "website homepage conversion tips",
        ],
        sections: [
          {
            heading: "Clear promise first",
            body: [
              "The first screen should say what the business does, who it helps, and what the next action is. Visitors should not need to decode the offer.",
            ],
          },
          {
            heading: "Trust before depth",
            body: [
              "Before a visitor reads long details, they want signals that the business is credible. That means clean design, relevant proof, easy contact access, and service clarity.",
            ],
          },
          {
            heading: "Frictionless next step",
            body: [
              "Whether the goal is a call, booking, or form submission, the path should feel obvious on desktop and mobile. If the CTA is buried, the homepage is underperforming.",
            ],
          },
        ],
      },
    ],
  },
  et: {
    pricingGuide: {
      kicker: "Selge hinnastruktuur",
      title: "Tea juba alguses, mis hinnataset muudab.",
      description:
        "Veebilehe pakkumised erinevad enamasti mahu, copy, integratsioonide ja strateegilise töö hulga järgi. See jaotus teeb need hinnamõjurid ette nähtavaks.",
      factors: [
        {
          title: "Lehtede arv ja struktuur",
          body: "Lihtne 4 kuni 5 lehega veeb maksab vähem kui lahendus, mis vajab teenuste alalehti, maandumislehti või asukohapõhiseid lehti.",
        },
        {
          title: "Copy ja sõnumi sügavus",
          body: "Kui pakkumine vajab tugevamat positsioneerimist, ümberkirjutatud pealkirju ja vastuväidete lahendamist, on strateegiline töömaht suurem.",
        },
        {
          title: "Kohandatud sektsioonid ja integratsioonid",
          body: "Broneerimistööriistad, lead routing, analüütika seadistus ja kohandatud komponendid lisavad arendusaega.",
        },
        {
          title: "SEO ja sisu laiendamine",
          body: "Kui ettevõte tahab nähtav olla rohkemates otsingutes, on vaja rohkem lehti, sisemisi linke ja toetavat sisu.",
        },
      ],
      comparisonTitle: "Mille jaoks iga hinnapakett kõige paremini sobib",
      comparisonColumns: ["Pakett", "Parim kellele", "Ajakava", "Põhifookus"],
      comparisonRows: [
        ["Stardiveeb", "Uuele või väiksele kohalikule ettevõttele", "1-2 nädalat", "Kiire usaldus, põhilehed, puhas mobiilikogemus"],
        ["Täiustatud veeb", "Ettevõttele, kes vajab tugevamat konversiooni", "2-4 nädalat", "Rohkem lehti, tugevam sõnum, sügavam SEO"],
        ["Igakuine hooldus", "Live veebile, mis peab püsima korras", "Jooksev", "Uuendused, parandused, jõudlus, SEO korrashoid"],
      ],
    },
    maintenancePlansSection: {
      kicker: "Igakuine hooldus",
      title: "Lihtsad kuupaketid, mida saad pakkuda pärast veebilehe valmimist.",
      description:
        "Nii on järelteenus lihtne selgitada: veebileht on ühekordne projekt ja kuupakett katab hostingu, hoolduse ning toe.",
      plans: [
        {
          name: "Põhihooldus",
          price: "29 €/kuu",
          description: "Klientidele, kes tahavad eelkõige kindlat hostingut ja tehnilist meelerahu.",
          points: ["Hosting ja SSL", "Varukoopiad", "Põhilised turvauuendused", "Töökindluse kontroll"],
        },
        {
          name: "Ärihooldus",
          price: "79 €/kuu",
          description: "Parim valik enamikele väikeettevõtetele, kes vajavad ka regulaarseid muudatusi ja tuge.",
          points: ["Kõik Põhihoolduse paketist", "Väikesed teksti- ja pildimuudatused", "Vormide ja jõudluse kontroll", "Prioriteetne e-posti tugi"],
        },
        {
          name: "Kasvuhooldus",
          price: "149 €/kuu",
          description: "Ettevõtetele, kes tahavad igakuist edasiarendust, mitte ainult passiivset hooldust.",
          points: ["Kõik Ärihoolduse paketist", "Igakuised sisuuuendused", "Põhilised SEO parandused", "Kiirem teostus väikestele soovidele"],
        },
      ],
    },
    pricingFaq: [
      {
        question: "Kas kogu projekti eest tuleb kohe ette maksta?",
        answer: "Ei. Projektid jagunevad tavaliselt etappideks, et töö saaks alata ilma liigse riskita kummalegi poolele.",
      },
      {
        question: "Mis võib lõpliku hinna algtasemest kõrgemaks viia?",
        answer: "Kõige sagedamini mõjutavad hinda lisalehed, sügavam copywriting, integratsioonid ning lisatud SEO maandumislehed.",
      },
      {
        question: "Kas saab alustada väiksema veebiga ja hiljem laiendada?",
        answer: "Jah. Paljude kohalike ettevõtete jaoks on kõige mõistlikum lahendus kiire käivitus ja hilisem laiendus.",
      },
      {
        question: "Kas hosting on hinna sees?",
        answer: "Hosting ja domeenikulu on eraldi, kui just hallatud lahendust ei lepita kokku projekti osana.",
      },
      {
        question: "Kas pärast launchi on võimalik saada jätkuvat tuge?",
        answer: "Jah. Hooldusplaan on mõeldud uuenduste, väikeste sisumuudatuste, SEO korrashoiu ja töökindluse jaoks.",
      },
    ],
    servicesFaq: [
      {
        question: "Millisest teenusest peaks enamik ettevõtteid alustama?",
        answer: "Tavaliselt veebilehe arendusest või ümberdisainist. Kui olemasolev veeb on struktuurselt okei, aga otsingus nähtamatu, siis on prioriteediks SEO optimeerimine.",
      },
      {
        question: "Kas mul on vaja kõiki teenuseid korraga?",
        answer: "Mitte alati. Õige valik sõltub sellest, kust praegu kõige rohkem lekib: usaldusest, kiirusest, nähtavusest või töökindlusest.",
      },
      {
        question: "Kuidas aru saada, kas vaja on ümberdisaini või täielikku ümberehitust?",
        answer: "Kui veebil on tehnilisi probleeme, nõrk mobiilijõudlus või segane lehestruktuur, on täisümberehitus tavaliselt parem pikaajaline otsus.",
      },
      {
        question: "Kas teenuselehti saab ehitada minu ärityübi järgi?",
        answer: "Jah. Strateegia, sõnum ja lehestruktuur kohandatakse sinu pakkumise, ostja küsimuste ja kohaliku otsingu kavatsuse järgi.",
      },
    ],
    serviceDetails: [
      {
        slug: "website-development",
        title: "Veebilehe arendus",
        eyebrow: "Teenuse detail",
        summary: "Kiired äriveebid, mis mõjuvad usaldusväärselt, laevad kiiresti ja muudavad tegutsemise loomulikuks.",
        intro:
          "See on mõeldud ettevõtetele, kes vajavad tõsiseltvõetavat veebiesindust, mitte järjekordset keskpärast saiti, mis küll eksisteerib, aga ei too usaldust ega päringuid.",
        bestFor: [
          "Kohalikud ettevõtted, kes loovad uut veebilehte",
          "Ettevõtted, kelle praegune veeb on aeglane või aegunud",
          "Omanikud, kes tahavad selgemat teed kõnede, vormide või broneeringuteni",
        ],
        deliverables: [
          "Ostjateekonnale ehitatud lehestruktuur",
          "Mobiilikeskne paigutus ja kiirusele optimeeritud frontend",
          "Selged CTA-d ja tugevam pealkirjade hierarhia",
          "Baastaseme SEO seadistus indekseerimiseks ja kohaliku nähtavuse jaoks",
        ],
        outcomes: [
          "Tugevam esmamulje",
          "Väiksem bounce risk",
          "Parema kvaliteediga päringud",
          "Veeb, mida on hiljem lihtsam laiendada",
        ],
        process: [
          "Kaardistame, mida veeb peab esmalt kommunikeerima",
          "Paneme paika usaldust ja konversiooni toetava struktuuri",
          "Ehitan frontendi jõudluse ja selguse järgi",
          "Launch SEO põhialuste, analüütika ja QA-ga",
        ],
        priceNote: "Tüüpiline sobivus: Stardiveeb või Täiustatud veeb sõltuvalt lehtede arvust ja sõnumi sügavusest.",
        keywords: [
          "veebilehe arendus Tallinn",
          "äriveeb Eestis",
          "kiire veebiarendaja Tallinn",
        ],
      },
      {
        slug: "seo-optimization",
        title: "SEO optimeerimine",
        eyebrow: "Teenuse detail",
        summary: "Täpsem struktuur, tugevam kohaliku otsingu sihtimine ja sisuparandused, mis aitavad õigel ostjal sind leida.",
        intro:
          "See on ettevõtetele, kellel veeb juba olemas on, kuid kes ei jõua piisavalt nende inimesteni, kes on kohalikult valmis ostma.",
        bestFor: [
          "Ettevõtted, kellel on nõrk kohalik otsingunähtavus",
          "Veebid, mille lehesihistus või sisemine struktuur on nõrk",
          "Omanikud, kes tahavad paremat liikluse kvaliteeti, mitte edevusnumbreid",
        ],
        deliverables: [
          "On-page SEO puhastus ja märksõna-lehe vastavus",
          "Title, meta, heading ja sisemiste linkide parandused",
          "Teenuse- ja asukohalehtede soovitused",
          "Ostukavatsusele suunatud sisustrateegia",
        ],
        outcomes: [
          "Rohkem asjakohaseid kohalikke näitamisi",
          "Selgema eesmärgiga lehed",
          "Parem konversioon otsinguliiklusest",
          "Vähem juhuslikku madala kvaliteediga liiklust",
        ],
        process: [
          "Vaatame üle praeguse sihtimise ja sisulüngad",
          "Seome pakkumised otsingukavatsusega",
          "Parandame struktuuri, copyt, metadata't ja sisemisi linke",
          "Jälgime, mida tuleks järgmisena laiendada",
        ],
        priceNote: "Tüüpiline sobivus: Täiustatud veeb või Igakuine hooldus, kui SEO on pidev töö, mitte ühekordne puhastus.",
        keywords: [
          "SEO optimeerimine Tallinn",
          "kohalik SEO Eestis",
          "veebi SEO teenus Tallinn",
        ],
      },
      {
        slug: "website-redesign",
        title: "Veebilehe ümberdisain",
        eyebrow: "Teenuse detail",
        summary: "Ümberdisain, mis muudab ettevõtte ajakohaseks, usaldusväärseks ja kontaktiväärseks igal ekraanil.",
        intro:
          "See on ettevõtetele, kelle veeb küll olemas on, kuid nõrgestab visuaalselt pakkumist, vähendab usaldust ja jätab turust maha jäänud mulje.",
        bestFor: [
          "Ettevõtted aegunud brändikuvandi või nõrga hierarhiaga",
          "Omanikud, kelle veeb näeb välja odavam kui nende teenus tegelikult on",
          "Tiimid, kes vajavad rohkem usaldust ilma veebilehte paisutamata",
        ],
        deliverables: [
          "Kaasaegne visuaalne suund vastavalt sinu pakkumisele",
          "Puhtam infohierarhia ja CTA paigutus",
          "Parem loetavus mobiilis ja sisurütm",
          "Teravamad teenuse, tõestuse ja kontaktiplokid",
        ],
        outcomes: [
          "Kvaliteetsem esmamulje",
          "Selgem teenuse mõistmine",
          "Tugevam usaldus enne kontakti",
          "Ühtlasem kogemus lehtede vahel",
        ],
        process: [
          "Tuvastame, mis tundub praegu aegunud või nõrk",
          "Määrame uue positsioneeringu ja visuaalse suuna",
          "Ehitan põhilehed ümber usalduse ja selguse järgi",
          "Launch tugevama sõnumi ja konversioonivooga",
        ],
        priceNote: "Tüüpiline sobivus: Täiustatud veeb siis, kui disain, struktuur ja sõnum vajavad korraga uuendamist.",
        keywords: [
          "veebilehe ümberdisain Tallinn",
          "äriveebi ümberdisain Eestis",
          "kaasaegne veebidisain Tallinn",
        ],
      },
      {
        slug: "maintenance-plans",
        title: "Hooldusplaanid",
        eyebrow: "Teenuse detail",
        summary: "Jooksev tugi, mis hoiab veebilehe ajakohase, kiire ja konverteerimisvalmina selle asemel, et see vaikselt laguneks.",
        intro:
          "See on ettevõtetele, kelle veeb on juba live'is, kuid kes ei taha käibelekkeid, mida põhjustavad vananenud sisu, katkised vormid või tähelepanuta jäetud jõudlus.",
        bestFor: [
          "Ettevõtted, kes vajavad regulaarseid sisuuuendusi",
          "Veebid, millel on oluline stabiilne päringuvool",
          "Omanikud, kes tahavad üht vastutajat veebikvaliteedi eest",
        ],
        deliverables: [
          "Sisumuudatused ja väiksemad paigutuse täiendused",
          "Regulaarsed kontrollid vormidele, kiirusele ja kasutatavusele",
          "SEO korrashoid ja metadata parandused",
          "Prioriteetne tugi väiksemate probleemide korral",
        ],
        outcomes: [
          "Vähem seisakuid ja üllatusi",
          "Parem jooksev visuaalne kvaliteet",
          "Stabiilsem jõudlus",
          "Kiirem reageerimine probleemidele",
        ],
        process: [
          "Lepime kokku igakuise toe ulatuse",
          "Jälgime korduvaid ülesandeid ja ärilisi prioriteete",
          "Teen uuendusi ja tehnilist hooldust järjepidevalt",
          "Muudan fookust vastavalt sellele, mida veeb parasjagu enim vajab",
        ],
        priceNote: "Tüüpiline sobivus: Igakuine hooldus pärast launchi või ümberdisaini, kui ettevõte tahab kindlat järelhooldust.",
        keywords: [
          "veebihooldus Eestis",
          "veebitugi Tallinn",
          "igakuised veebiuuendused Eestis",
        ],
      },
    ],
    insightsLanding: {
      eyebrow: "Nõuanded",
      title: "Lühikesed artiklid ettevõtjatele, kes tahavad veebilehte, mis töötab, mitte lihtsalt ei eksisteeri.",
      description:
        "Praktilised märkmed hindade, konversiooni, kohaliku SEO ja tüüpiliste väikeettevõtte veebivigade kohta.",
      readMore: "Loe artiklit",
    },
    insightPosts: [
      {
        slug: "how-much-does-a-small-business-website-cost-in-estonia",
        category: "Hinnad",
        title: "Kui palju maksab väikeettevõtte veebileht Eestis?",
        excerpt:
          "Tegelik vastus sõltub mahust, copyst, SEO sügavusest ja sellest, kas veeb on lihtsalt brošüür või päris müügivahend.",
        publishedAt: "22. märts 2026",
        readingTime: "4 min lugemist",
        description:
          "Praktiline ülevaade sellest, mis mõjutab väikeettevõtte veebilehe hinda Eestis ja miks liiga odav veeb võib lõpuks rohkem maksma minna.",
        keywords: [
          "väikeettevõtte veebilehe hind Eestis",
          "veebilehe hinnad Tallinn",
          "veebidisaini hind Eestis",
        ],
        sections: [
          {
            heading: "Enamiku veebide hinda määrab keerukus, mitte pikslite arv.",
            body: [
              "Lihtne kohaliku ettevõtte veeb, kus on avaleht, teenused, kontakt ja selge CTA, maksab vähem kui lahendus, mis vajab kohandatud sektsioone, broneerimisi, teenuste alalehti ja sügavamat SEO-d.",
              "Hinnavahe tuleb enamasti sellest, mida veeb peab äri jaoks tegema, mitte sellest, kui dekoratiivne see välja näeb.",
            ],
          },
          {
            heading: "Mis tavaliselt hinda tõstab",
            body: [
              "Rohkem lehti, tugevam copywriting, kohandatud lead-flow'd, analüütika seadistus ja sügavam SEO on peamised hinnamõjurid.",
              "Kui ettevõte tahab, et veeb oleks päriselt müügivahend, tehakse enne arendust ja selle käigus rohkem strateegilist tööd.",
            ],
          },
          {
            heading: "Miks liiga odav lahendus on tihti lõpuks kallim",
            body: [
              "Odavad veebid jätavad tihti vahele positsioneeringu, CTA strateegia, kiirusetöö ja SEO põhialused. Nii maksab omanik vähem ette, aga kaotab jätkuvalt päringuid iga kuu.",
              "Veeb, mis näeb pealtnäha okei välja, kuid tundub praktikas nõrk, sööb ettevõttelt raha ka pärast launchi.",
            ],
          },
        ],
      },
      {
        slug: "why-local-business-websites-lose-leads",
        category: "Konversioon",
        title: "Miks kohalike ettevõtete veebid kaotavad kontakte isegi siis, kui liiklus on okei",
        excerpt:
          "Paljudel kohalikel veebidel külastajaid on, kuid struktuur, usaldussignaalid ja CTA-d on liiga nõrgad, et tähelepanu kontaktiks muuta.",
        publishedAt: "22. märts 2026",
        readingTime: "3 min lugemist",
        description:
          "Kõige levinumad põhjused, miks kohalike ettevõtete veebid kaotavad päringuid, kuigi liiklust tuleb, ja mida parandada esimesena.",
        keywords: [
          "miks veeb kaotab kontakte",
          "kohaliku ettevõtte veebikonversioon",
          "päringute optimeerimine Eestis",
        ],
        sections: [
          {
            heading: "Probleem on tihti usalduses, mitte liikluses.",
            body: [
              "Külastaja võib jõuda veebile ja lahkuda ikkagi kiiresti, kui ettevõte tundub aegunud, ebaselge või raskesti kontakteeritav.",
              "See tähendab, et turunduskanal tegi oma töö ära, aga veeb ei suutnud tähelepanu konversiooniks muuta.",
            ],
          },
          {
            heading: "Nõrgad lehed tekitavad kõhklust.",
            body: [
              "Levinud probleemid on aeglane kiirus, üldsõnalised pealkirjad, peidetud kontaktivõimalused, nõrgad teenusekirjeldused ja peaaegu olematu tõestusmaterjal.",
              "Kui leht ei vasta ostja põhiküsimustele kiiresti, võidab kõhklus.",
            ],
          },
          {
            heading: "Mida parandada esimesena",
            body: [
              "Alusta avalehest ja põhiteenuse lehtedest. Teravda pealkirja, tee CTA nähtavaks, paranda mobiililoetavust ja lisa päris usaldussignaale.",
              "Väikesed selguse parandused annavad tihti rohkem kui uute funktsioonide lisamine.",
            ],
          },
        ],
      },
      {
        slug: "what-every-service-business-homepage-needs",
        category: "Avalehe strateegia",
        title: "Mida vajab iga teenusettevõtte avaleht",
        excerpt:
          "Teenuse avaleht peab looma usaldust, selgitama pakkumist ja suunama inimesi kontaktini ilma, et nad peaksid selle nimel vaeva nägema.",
        publishedAt: "22. märts 2026",
        readingTime: "4 min lugemist",
        description:
          "Selge avalehe kontrollnimekiri teenusettevõtetele, kes tahavad veebist rohkem kõnesid ja päringuid.",
        keywords: [
          "teenusettevõtte avaleht",
          "avalehe kontrollnimekiri Eestis",
          "veebi avalehe konversiooni nõuanded",
        ],
        sections: [
          {
            heading: "Kõigepealt selge lubadus",
            body: [
              "Esimene ekraan peab ütlema, mida ettevõte teeb, kellele see on mõeldud ja mis on järgmine samm. Külastaja ei tohiks pakkumist lahti mõistatada.",
            ],
          },
          {
            heading: "Usaldus enne sügavust",
            body: [
              "Enne pikka lugemist tahab külastaja märki, et ettevõte on usaldusväärne. See tähendab puhast disaini, asjakohast tõestust, lihtsat kontakti ja selget teenuse seletust.",
            ],
          },
          {
            heading: "Hõõrdumiseta järgmine samm",
            body: [
              "Olgu eesmärk kõne, broneering või vormi täitmine, tee selleni peab olema ilmne nii arvutis kui mobiilis. Kui CTA on peidetud, töötab avaleht nõrgalt.",
            ],
          },
        ],
      },
    ],
  },
} as const;

const mojibakeFixes = new Map<string, string>([
  ["Г¤", "ä"],
  ["Г„", "Ä"],
  ["Гµ", "õ"],
  ["Г•", "Õ"],
  ["Г¶", "ö"],
  ["Г–", "Ö"],
  ["Гј", "ü"],
  ["Гњ", "Ü"],
  ["ЕЎ", "š"],
  ["в‚¬", "€"],
  ["В·", "·"],
]);

function fixMojibake(value: string) {
  let nextValue = value;

  for (const [broken, fixed] of mojibakeFixes) {
    nextValue = nextValue.replaceAll(broken, fixed);
  }

  return nextValue;
}

function normalizeExpandedValue<T>(value: T): T {
  if (typeof value === "string") {
    return fixMojibake(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeExpandedValue(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, normalizeExpandedValue(nestedValue)]),
    ) as T;
  }

  return value;
}

export function getExpandedContent(locale: Locale) {
  return normalizeExpandedValue(expandedContent[locale]);
}

export const serviceDetails = expandedContent.en.serviceDetails;
export const insightPosts = expandedContent.en.insightPosts;

export function getServiceDetail(locale: Locale, slug: ServiceSlug) {
  return expandedContent[locale].serviceDetails.find((item) => item.slug === slug) ?? null;
}

export function getInsightPost(locale: Locale, slug: InsightSlug) {
  return expandedContent[locale].insightPosts.find((item) => item.slug === slug) ?? null;
}
