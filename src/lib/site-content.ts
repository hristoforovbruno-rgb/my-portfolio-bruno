import type { Metadata } from "next";

export type Locale = "en" | "et";

export const siteUrl = "https://brunohristoforov.dev";

const siteContent = {
  en: {
    contact: {
      email: "hristoforovbruno@gmail.com",
      phone: "+372 5863 0442",
      location: "Tallinn, Estonia",
    },
    navigation: [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/insights", label: "Insights" },
      { href: "/portfolio", label: "Examples" },
      { href: "/why-choose-me", label: "Why Me" },
      { href: "/process", label: "Process" },
      { href: "/pricing", label: "Pricing" },
      { href: "/contact", label: "Contact" },
    ],
    serviceHighlights: [
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
    ],
    services: [
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
    ],
    projects: [
      {
        slug: "restaurant-website-example",
        name: "Restaurant Website Example",
        business: "Restaurant",
        theme: "restaurant",
        problem:
          "Many restaurant websites make menus hard to read, bookings hard to find, and the business feel less premium than it really is.",
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
    ],
    examplePages: [
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
    ],
    differentiators: [
      "Fast-loading pages that stop potential customers from leaving.",
      "SEO-first structure that helps the right buyers find your business.",
      "Modern visual design that makes your brand feel credible and premium.",
      "Clear communication, fast turnaround, and business-first execution.",
    ],
    testimonials: [
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
    ],
    processSteps: [
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
    ],
    pricingPlans: [
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
        price: "from EUR 29/mo",
        description: "For businesses that want speed, updates, and reliability without chasing fixes.",
        points: ["Content updates", "Performance checks", "SEO upkeep", "Priority support"],
      },
    ],
    seoKeywords: {
      home: [
        "web developer Tallinn",
        "website developer Estonia",
        "freelance web developer Tallinn",
        "small business website Estonia",
        "local business web design Tallinn",
      ],
      services: [
        "SEO websites Tallinn",
        "web design services Estonia",
        "website redesign Tallinn",
        "website maintenance Estonia",
        "business website SEO Estonia",
      ],
      insights: [
        "website tips Estonia",
        "small business website advice Tallinn",
        "local SEO insights Estonia",
        "website conversion tips Estonia",
      ],
      portfolio: [
        "website examples Estonia",
        "small business website examples Estonia",
        "Tallinn website examples",
        "business website case studies Estonia",
      ],
      whyChooseMe: [
        "web developer Tallinn Estonia",
        "modern business websites Estonia",
        "reliable freelance web developer Tallinn",
      ],
      process: [
        "website design process Estonia",
        "small business website launch process Estonia",
      ],
      pricing: [
        "website pricing Estonia",
        "small business website cost Tallinn",
        "web design pricing Estonia",
      ],
      contact: [
        "hire web developer Tallinn",
        "contact freelance web developer Estonia",
        "web developer near Tallinn",
      ],
    },
    ui: {
      languageSwitcherLabel: "Language switcher",
      languageEnglish: "ENG",
      languageEstonian: "EST",
      switchToLightTheme: "Switch to light theme",
      switchToDarkTheme: "Switch to dark theme",
      freeAudit: "Free Audit",
      getFreeAudit: "Get Free Audit",
      openNavigation: "Open navigation menu",
      closeNavigation: "Close navigation menu",
      logoAlt: "Bruno Hristoforov logo",
      footerTitle:
        "Fast, persuasive websites for businesses that cannot afford to look slow, outdated, or invisible.",
      footerText:
        "Built for small businesses and local service companies that need a sharper first impression, better visibility, and a clearer path to enquiries.",
      footerPages: "Pages",
      footerContact: "Contact",
      ctaEyebrow: "Urgency",
      ctaTitle: "Every week you delay, more buyers leave your website and pay someone else.",
      ctaDescription:
        "Get a free website audit and see exactly where your current site looks slow, weak, or invisible.",
      ctaButton: "Get a Free Website Audit Before You Lose Customers",
      ctaReplyTime: "Reply time: usually within 24 hours.",
    },
  },
  et: {
    contact: {
      email: "hristoforovbruno@gmail.com",
      phone: "+372 5863 0442",
      location: "Tallinn, Eesti",
    },
    navigation: [
      { href: "/", label: "Avaleht" },
      { href: "/services", label: "Teenused" },
      { href: "/insights", label: "Nõuanded" },
      { href: "/portfolio", label: "Näited" },
      { href: "/why-choose-me", label: "Miks mina" },
      { href: "/process", label: "Protsess" },
      { href: "/pricing", label: "Hinnad" },
      { href: "/contact", label: "Kontakt" },
    ],
    serviceHighlights: [
      {
        title: "Kiired äriveebid",
        problem: "Aeglased lehed peletavad ostjad minema juba enne, kui nad sinu pakkumist loevad.",
        result: "Kiirusele ehitatud veebid hoiavad tähelepanu, loovad usaldust ja muudavad külastused kõnedeks.",
      },
      {
        title: "SEO, mis toob ostjaid",
        problem: "Kui sinu ettevõtet ei leita, saab müügi konkurent.",
        result: "Täpsem lehestruktuur, kohaliku otsingu sihtimine ja sisu, mis aitab sul nähtavale tulla ning päringuid saada.",
      },
      {
        title: "Ümberdisainid, mis müüvad",
        problem: "Aegunud veebilehed jätavad riskantse, odava ja ununeva mulje.",
        result: "Premium-tasemel ümberdisainid, mis muudavad sinu ettevõtte usaldusväärseks, kaasaegseks ja kontaktiväärseks.",
      },
      {
        title: "Usaldusväärne igakuine tugi",
        problem: "Katkised vormid, vananenud sisu ja väikesed vead söövad vaikselt käivet.",
        result: "Jooksev hooldus hoiab sinu veebilehe viimistletud, turvalise ja konverteerimiseks valmis.",
      },
    ],
    services: [
      {
        title: "Veebilehe arendus",
        keyword: "kiired äriveebid Eestis",
        pain: "Sinu praegune veebileht laeb aeglaselt, näeb aegunud välja ja kaotab iga päev potentsiaalseid kliente.",
        solution:
          "Ehitan modernseid äriveebe, mis laevad kiiresti, mõjuvad kvaliteetselt ning aitavad inimestel sind usaldada ja tegutseda.",
        outcomes: ["Kiirem esmamulje", "Tugevam usaldus", "Rohkem kõnesid ja päringuid"],
      },
      {
        title: "SEO optimeerimine",
        keyword: "SEO veebilehed Tallinn",
        pain: "Ilus veebileht ei tähenda midagi, kui sinu ideaalsed kliendid seda kunagi ei näe.",
        solution:
          "Parandan lehe sõnumit, struktuuri ja otsingunähtavust, et sinu ettevõtte leiaksid inimesed, kes on valmis ostma.",
        outcomes: ["Rohkem kohalikku nähtavust", "Parem kvaliteetne liiklus", "Väärtuslikumad kontaktid"],
      },
      {
        title: "Veebilehe ümberdisain",
        keyword: "veebilehe ümberdisain Tallinn",
        pain: "Vana veebileht paneb isegi hea ettevõtte turust maha jäänuna paistma.",
        solution:
          "Muudan aegunud veebid teravateks ja veenvateks müügikanaliteks, mis mõjuvad usaldusväärselt igal ekraanil.",
        outcomes: ["Kaasaegne brändikuvand", "Selgem kasutajatee", "Suurem konversioonipotentsiaal"],
      },
      {
        title: "Hooldusplaanid",
        keyword: "veebihooldus Eestis",
        pain: "Uuenduste ja jõudlusprobleemide ignoreerimine laseb käibel kaduda pragudesse, mida märkad alles siis, kui on valus.",
        solution:
          "Igakuine tugi hoiab sinu lehe ajakohase, kiire ja konverteerimiseks valmis, samal ajal kui sina keskendud äri juhtimisele.",
        outcomes: ["Vähem seisakuid", "Värske sisu", "Stabiilne jõudlus"],
      },
    ],
    projects: [
      {
        slug: "restaurant-website-example",
        name: "Restorani veebilehe näide",
        business: "Restoran",
        theme: "restaurant",
        problem:
          "Paljud restoranide veebilehed teevad menüü lugemise keeruliseks, broneerimise raskesti leitavaks ja jätavad ärist vähem kvaliteetse mulje, kui see tegelikult on.",
        build:
          "Puhas restorani stiilis näide, mis keskendub menüü selgusele, tugevamale usaldusele ja lihtsamale reserveerimisteekonnale.",
        results: ["Broneerimisele keskenduv ülesehitus", "Selge menüü", "Premium restorani positsioneerimine"],
      },
      {
        slug: "dental-clinic-website-example",
        name: "Hambakliiniku veebilehe näide",
        business: "Hambakliinik",
        theme: "clinic",
        problem:
          "Kliinikute veebilehed mõjuvad tihti aegunult või segaselt, mistõttu uued patsiendid kõhklevad enne ühenduse võtmist.",
        build:
          "Usaldusele keskenduv kliiniku näide, kus on selgemad raviteenuste plokid, rahulik struktuur ja tugevamad vastuvõtu kutseelemendid.",
        results: ["Usaldust loov ülesehitus", "Selge raviteenuste struktuur", "Patsiendikeskne sõnum"],
      },
      {
        slug: "gym-website-example",
        name: "Jõusaali veebilehe näide",
        business: "Jõusaal",
        theme: "gym",
        problem:
          "Jõusaalide veebilehed mõjuvad tihti lamedalt, aegunult või mobiilis nõrgalt, mis vähendab proovitreeningute registreerumisi ja esmamuljet.",
        build:
          "Tugevama energiaga jõusaali näide julgete CTA-de, treeningkavade eelvaadete ja selgema teekonnaga prooviliikmeks saamiseni.",
        results: ["Energiline ülesehitus", "Mobiilikeskne paigutus", "Tugevam prooviliikme voog"],
      },
      {
        slug: "local-service-website-example",
        name: "Kohaliku teenuse veebilehe näide",
        business: "Kohalik teenus",
        theme: "service",
        problem:
          "Kohalike teenusettevõtete veebilehed peidavad sageli kontaktivõimalused, teeninduspiirkonnad ja kiireloomulisuse märgid, mida kliendid kohe vajavad.",
        build:
          "Teenindusettevõtte näide kiirete kontaktikutsungite, selgemate teenuste plokkide ja tugevamate usaldussignaalidega.",
        results: ["Kontaktidele suunatud struktuur", "Kiire kontaktivoog", "Selge teeninduspiirkonna sõnum"],
      },
    ],
    examplePages: [
      {
        slug: "restaurant-website-example",
        category: "Restorani näide",
        title: "Teravam restoraniveeb, mis teeb broneerimise lihtsaks.",
        description:
          "See näidisleht näitab, kuidas restoran saab veebis mõjuda kvaliteetsemalt, suunata külalised kiiremini menüüni ja muuta külastused broneeringuteks.",
        heroLabel: "Kaasaegne söögielamus",
        heroIntro:
          "Loodud selleks, et aidata restoranidel paista meeldejäävamalt, mõjuda kvaliteetsemalt ja suunata inimesi kõhkluse asemel broneerima.",
        primaryCta: "Broneeri laud",
        secondaryCta: "Vaata menüüd",
        stats: [
          { value: "Menüü", label: "selge esimesest pilgust" },
          { value: "Mobiil", label: "broneerimissõbralik paigutus" },
          { value: "Usaldus", label: "premium esmamulje" },
        ],
        sections: [
          {
            title: "Miks see stiil töötab",
            text: "Restoranid võidavad siis, kui veebileht paneb koha ihaldusväärsena tunduma juba enne külalise saabumist. Tugev pildikeel, selged broneerimiskutsed ja lihtne menüüvoog vähendavad hõõrdumist.",
          },
          {
            title: "Millele see näide keskendub",
            text: "Rahulikum premium-paigutus, tugevam menüü hierarhia ja nähtavam reserveerimisteekond nii mobiili- kui lauaarvutikülastajatele.",
          },
        ],
        features: ["Hero-sektsioon broneerimise CTA-ga", "Esiletõstetud roogade plokk", "Menüü eelvaate kaardid", "Broneerimisele suunatud jalus"],
        theme: "restaurant",
      },
      {
        slug: "dental-clinic-website-example",
        category: "Kliiniku näide",
        title: "Kliiniku veebileht, mis mõjub usaldusväärselt enne esimest kõnet.",
        description:
          "See näidisleht näitab, kuidas hambakliinik saab mõjuda rahulikumalt, selgemalt ja usaldusväärsemalt uutele patsientidele, kes otsustavad, kas aeg broneerida.",
        heroLabel: "Usaldusväärne hambaravi",
        heroIntro:
          "Loodud selleks, et vähendada kõhklusi, selgitada ravi arusaadavalt ja teha kliinikuga ühenduse võtmine turvaliseks ning lihtsaks.",
        primaryCta: "Taotle aega",
        secondaryCta: "Uuri raviteenuseid",
        stats: [
          { value: "Selge", label: "raviteenuste ülevaade" },
          { value: "Rahulik", label: "usaldust loov disain" },
          { value: "Lihtne", label: "kontaktiteekond" },
        ],
        sections: [
          {
            title: "Miks see stiil töötab",
            text: "Tervishoiuveebid peavad ärevust kiiresti vähendama. Puhas ruumikasutus, rahustav sõnum ja lihtne teenuste struktuur aitavad patsientidel järgmise sammu mugavamalt teha.",
          },
          {
            title: "Millele see näide keskendub",
            text: "Raviteenuste selgus, hoolivust tõestavad sisublokid ja nähtav aja broneerimise tegevus ilma külastajat üle koormamata.",
          },
        ],
        features: ["Rahulik hero-sektsioon", "Raviteenuste kaardid", "Miks patsiendid meid valivad plokk", "Aja broneerimise CTA"],
        theme: "clinic",
      },
      {
        slug: "gym-website-example",
        category: "Jõusaali näide",
        title: "Jõusaaliveeb rohkem energiaga ja selgema registreerumissuunaga.",
        description:
          "See näidisleht näitab, kuidas jõusaal saab mõjuda aktiivsemalt, kaasaegsemalt ja agressiivsemalt proovitreeningute suunas.",
        heroLabel: "Treeni tugevamalt",
        heroIntro:
          "Loodud selleks, et tekitada kiireloomulisust, tuua esile trenne ja võimalusi ning suunata uued külastajad passiivse sirvimise asemel proovitreeningule.",
        primaryCta: "Võta tasuta proov",
        secondaryCta: "Vaata trenne",
        stats: [
          { value: "Julge", label: "energiline sõnum" },
          { value: "Kiire", label: "mobiilikeskne sirvimine" },
          { value: "Selge", label: "proovitreeningu voog" },
        ],
        sections: [
          {
            title: "Miks see stiil töötab",
            text: "Jõusaalid konkureerivad energia ja enesekindluse pealt. Tugevad pealkirjad, nähtavad pakkumised ja kiire paigutus aitavad tähelepanu muuta proovikontaktideks.",
          },
          {
            title: "Millele see näide keskendub",
            text: "Liikmeks astumise kiireloomulisus, trennide eelvaated ja tugevam tee maandumislehelt proovipakkumiseni.",
          },
        ],
        features: ["Julge hero-pakkumine", "Treeningkava eelvaade", "Treenerite esiletõstmine", "Proovitreeningule suunatud CTA plokk"],
        theme: "gym",
      },
      {
        slug: "local-service-website-example",
        category: "Kohaliku teenuse näide",
        title: "Kohaliku teenuse veebileht, mis surub kõnede ja kiirete päringute poole.",
        description:
          "See näidisleht näitab, kuidas kohalik teenusettevõte saab teha kiire kontaktivõtu lihtsamaks ja mõjuda kohe usaldusväärsemalt.",
        heroLabel: "Kiire kohalik abi",
        heroIntro:
          "Loodud selleks, et teha teeninduspiirkonnad selgemaks, tugevdada usaldussignaale ja muuta helistamisnupp nähtamatuks mittejäävaks, kui abi on kohe vaja.",
        primaryCta: "Helista kohe",
        secondaryCta: "Vaata teenuseid",
        stats: [
          { value: "Kiire", label: "kontaktikeskne struktuur" },
          { value: "Kohalik", label: "selge teeninduspiirkond" },
          { value: "Usaldusväärne", label: "tõenduspõhine paigutus" },
        ],
        sections: [
          {
            title: "Miks see stiil töötab",
            text: "Teenindusettevõtted kaotavad kontakte siis, kui kontaktinfo on peidetud. Kiire ligipääs kõnedele, teeninduspiirkondadele ja usaldusmärkidele parandab konversiooni tõenäosust.",
          },
          {
            title: "Millele see näide keskendub",
            text: "Kiireks reageerimiseks valmis kõnekutsed, nähtavad teenusekategooriad ja tugevam kindlustunne esmakordsetele klientidele.",
          },
        ],
        features: ["Kleepuv helistamise CTA", "Teeninduspiirkonna plokk", "Kiire hinnapäringu vormi eelvaade", "Tõestus- ja kindlustusblokid"],
        theme: "service",
      },
    ],
    differentiators: [
      "Kiirelt laadivad lehed, mis hoiavad potentsiaalsed kliendid lahkumast.",
      "SEO-keskne struktuur, mis aitab õigel ostjal sinu ettevõtte üles leida.",
      "Kaasaegne visuaalne disain, mis muudab sinu brändi usaldusväärseks ja kvaliteetseks.",
      "Selge suhtlus, kiire töötempo ja äritulemustele suunatud teostus.",
    ],
    testimonials: [
      {
        quote:
          "Bruno ehitas meie restorani veebilehe ümber ja vahe oli kohe tuntav. Mõne nädalaga hakkas tulema rohkem broneerimispäringuid, sest leht nägi lõpuks usaldusväärne ja lihtsasti kasutatav välja.",
        author: "Marta K.",
        role: "Omanik, Luna Table",
      },
      {
        quote:
          "Meie kliinik vajas veebilehte, mis mõjuks usaldusväärselt juba enne esimest kõnet. Bruno tegi selle puhtamaks, kiiremaks ja uute patsientide jaoks palju veenvamaks.",
        author: "Daniel R.",
        role: "Omanik, Harbor Dental",
      },
      {
        quote:
          "Vana jõusaaliveeb maksis meile registreerumisi. Uus leht tundub elav, laeb kiiresti ja suunab inimesed kadumise asemel proovitrenni võtma.",
        author: "Kevin S.",
        role: "Juht, Iron District",
      },
    ],
    processSteps: [
      {
        title: "Analüüs",
        description:
          "Selgitame välja, kus sinu praegune veebileht kaotab usaldust, liiklust ja käivet, et ümberehitus lahendaks õige probleemi.",
      },
      {
        title: "Disain",
        description:
          "Kaardistan puhtama kasutajatee ja kvaliteetse visuaalse suuna, mis teeb sinu ettevõtte valimisväärsemaks.",
      },
      {
        title: "Arendus",
        description:
          "Sinu leht ehitatakse kiiruse, selguse ja mobiilijõudluse jaoks, et külastajad jääksid pidama, mitte ei lahkuks.",
        },
        {
          title: "Käivitamine",
          description:
            "Pärast testimist avaldame sinu veebilehe koos SEO-valmis lehtede ja selge teekonnaga päringute, kõnede või broneeringuteni.",
        },
      ],
    pricingPlans: [
      {
        name: "Stardiveeb",
        price: "alates 900 €",
        description: "Kohalikele ettevõtetele, kes vajavad kiiresti tugevat veebiesindust.",
        points: ["Kuni 5 lehte", "Müügile suunatud copy suund", "Mobiilikeskne disain", "Baastaseme SEO seadistus"],
      },
      {
        name: "Täiustatud veeb",
        price: "alates 1800 €",
        description: "Ettevõtetele, kes vajavad rohkem usaldust, rohkem lehti ja tugevamat kontaktivoogu.",
        points: ["Kuni 10 lehte", "Kohandatud interaktiivsed sektsioonid", "Täiustatud on-page SEO", "Näidete või teenuste laiendus"],
      },
      {
        name: "Igakuine hooldus",
        price: "alates 29 €/kuu",
        description: "Ettevõtetele, kes tahavad kiirust, uuendusi ja töökindlust ilma parandusi taga ajamata.",
        points: ["Sisuuuendused", "Jõudluskontrollid", "SEO korrashoid", "Prioriteetne tugi"],
      },
    ],
    seoKeywords: {
      home: [
        "veebiarendaja Tallinn",
        "veebiarendaja Eesti",
        "freelance veebiarendaja Tallinn",
        "väikeettevõtte veebileht Eestis",
        "kohaliku ettevõtte veebidisain Tallinn",
      ],
      services: [
        "SEO veebilehed Tallinn",
        "veebidisaini teenused Eestis",
        "veebilehe ümberdisain Tallinn",
        "veebihooldus Eestis",
        "äriveebi SEO Eestis",
      ],
      insights: [
        "veebinõuanded Eestis",
        "väikeettevõtte veebinõuanded Tallinn",
        "kohaliku SEO nõuanded Eestis",
        "veebikonversiooni nõuanded Eestis",
      ],
      portfolio: [
        "veebilehe näited Eestis",
        "väikeettevõtte veebilehe näited Eestis",
        "Tallinna veebinäited",
        "äriveebi juhtuminäited Eestis",
      ],
      whyChooseMe: [
        "veebiarendaja Tallinn Eesti",
        "kaasaegsed äriveebid Eestis",
        "usaldusväärne freelance veebiarendaja Tallinn",
      ],
      process: [
        "veebidisaini protsess Eestis",
        "väikeettevõtte veebilehe avalikustamise protsess Eestis",
      ],
      pricing: [
        "veebilehe hinnad Eestis",
        "väikeettevõtte veebilehe hind Tallinn",
        "veebidisaini hinnad Eestis",
      ],
      contact: [
        "palka veebiarendaja Tallinn",
        "võta ühendust freelance veebiarendajaga Eestis",
        "veebiarendaja Tallinna lähedal",
      ],
    },
    ui: {
      languageSwitcherLabel: "Keelevahetaja",
      languageEnglish: "ENG",
      languageEstonian: "EST",
      switchToLightTheme: "Lülitu heledale teemale",
      switchToDarkTheme: "Lülitu tumedale teemale",
      freeAudit: "Tasuta audit",
      getFreeAudit: "Küsi tasuta auditit",
      openNavigation: "Ava navigeerimismenüü",
      closeNavigation: "Sulge navigeerimismenüü",
      logoAlt: "Bruno Hristoforovi logo",
      footerTitle:
        "Kiired ja veenvad veebilehed ettevõtetele, kes ei saa endale lubada aeglast, aegunud või nähtamatut kuvandit.",
      footerText:
        "Loodud väikeettevõtetele ja kohalikele teenusfirmadele, kes vajavad tugevamat esmamuljet, paremat nähtavust ja selgemat teed päringuteni.",
      footerPages: "Lehed",
      footerContact: "Kontakt",
      ctaEyebrow: "Kiireloomulisus",
      ctaTitle: "Iga nädal, mil viivitad, lahkub sinu veebilt rohkem ostjaid ja maksab kellelegi teisele.",
      ctaDescription:
        "Küsi tasuta veebiauditit ja vaata täpselt, kus sinu praegune leht mõjub aeglaselt, nõrgalt või nähtamatult.",
      ctaButton: "Küsi tasuta veebiauditit enne, kui kaotad veel kliente",
      ctaReplyTime: "Vastan tavaliselt 24 tunni jooksul.",
    },
  },
} as const;

export function getSiteContent(locale: Locale) {
  return siteContent[locale];
}

export const defaultLocale: Locale = "en";

export const seoKeywords = siteContent.en.seoKeywords;
export type SeoKeywordSection = keyof typeof siteContent.en.seoKeywords;

const estoniaSeoEntities = [
  "Tallinn",
  "Eesti",
  "Estonia",
  "Tallinn, Estonia",
  "Tallinn, Eesti",
];

export function getSeoKeywords(section: SeoKeywordSection) {
  return [...new Set([
    ...siteContent.en.seoKeywords[section],
    ...siteContent.et.seoKeywords[section],
    ...estoniaSeoEntities,
  ])];
}

type MetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: readonly string[];
  languages?: Partial<Record<Locale, string>>;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  languages,
}: MetadataOptions): Metadata {
  const canonical = `${siteUrl}${path}`;
  const languageAlternates = languages
    ? Object.fromEntries(
        Object.entries(languages).map(([locale, localePath]) => [locale, `${siteUrl}${localePath}`]),
      )
    : undefined;

  return {
    title,
    description,
    keywords: [...keywords],
    alternates: {
      canonical,
      ...(languageAlternates ? { languages: languageAlternates } : {}),
    },
    other: {
      "geo.region": "EE-HAR",
      "geo.placename": "Tallinn",
      "geo.position": "59.437;24.7536",
      ICBM: "59.437, 24.7536",
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Bruno Hristoforov",
      locale: "et_EE",
      alternateLocale: ["en_US"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
