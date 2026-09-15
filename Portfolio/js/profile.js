/* ============================================================================
   profile.js — THE ONLY FILE YOU NEED TO EDIT.
   Every word on the website comes from this object.

   Filled in from the LinkedIn profile at linkedin.com/in/michael-wibowo.
   Lines tagged TODO are the ones LinkedIn didn't give us — read those and
   replace them. Everything else is your own wording, copied across verbatim.
   ========================================================================= */

window.PROFILE = {

  /* --- 1. IDENTITY ------------------------------------------------------ */
  meta: {
    name: "Michael Wibowo",
    initials: "MW",
    headline:
      "Industrial Engineering @ BINUS · Financial Modeling & Valuation · Aspiring Investment Banking Analyst",
    /* the words that type themselves out in the hero, one after another */
    roles: [
      "Financial Modeling & Valuation",
      "Aspiring Investment Banking Analyst",
      "Trader since 2021",
      "Founder ×2"
    ],
    location: "Jakarta Metropolitan Area",
    availability: "Open to work · Jakarta · on-site or hybrid",
    tagline:
      "Five years trading live markets with my own capital, now pointed at " +
      "financial modeling, valuation and a seat on a banking desk."
  },

  /* --- 2. LINKS --------------------------------------------------------- */
  links: {
    /* TODO — the contact form and the Email button stay hidden until this
       is filled in. Put the address you actually want recruiters using. */
    email: "",
    linkedin: "https://www.linkedin.com/in/michael-wibowo",
    github: "",
    instagram: "",
    resume: ""                       /* path or URL to a PDF, "" hides it */
  },

  /* --- 3. NUMBERS that count up in the hero ----------------------------- */
  stats: [
    { value: 5,   suffix: "+", label: "Years trading markets" },
    { value: 100, suffix: "+", label: "Traders in the community" },
    { value: 2,   suffix: "",  label: "Ventures founded" },
    { value: 4,   suffix: "",  label: "Certifications underway" }
  ],

  /* --- 4. ABOUT --------------------------------------------------------- */
  /* TODO — your LinkedIn has no About section yet (it was still prompting
     you to write one). This is a draft built from your own experience
     entries. Rewrite it in your voice, then paste the same text back into
     LinkedIn so the two match. */
  about: {
    heading: "About",
    paragraphs: [
      "I'm an Industrial Engineering undergraduate at BINUS University working towards a career in investment banking. I've been trading live markets with my own capital since 2021, and the habits that came out of that — size the risk before the upside, write the thesis down, be wrong quickly and cheaply — are the ones I bring to modeling and valuation work.",
      "Alongside the degree I run two ventures. MWcrypto is a trading community I grew past 100 active traders, where I give live market commentary, execution strategy and real-time risk guidance during sessions. BullzTCG is a collectibles business where I handle procurement, valuation and sales end to end. I'm currently working through the FMVA, CFA, WMI and WPPE.",
      "I'm open to analyst internships in Jakarta — investment banking, equity research, corporate finance or valuation. On-site or hybrid."
    ],
    facts: [
      { k: "Based in",   v: "Jakarta Metropolitan Area" },
      { k: "Studying",   v: "Industrial Engineering, BINUS University" },
      { k: "Focus",      v: "Financial modeling · Valuation · Markets" },
      { k: "Working on", v: "FMVA · CFA · WMI · WPPE" },
      { k: "Open to",    v: "Analyst internships · on-site or hybrid" }
    ]
  },

  /* --- 5. SPECIALTIES — the headline cards ------------------------------ */
  specialties: [
    {
      title: "Financial Modeling & Valuation",
      blurb:
        "Three-statement models, DCFs and comparable company analysis built from the filings up in Excel — the assumptions written down where anyone can argue with them.",
      tags: ["Excel", "DCF", "Comparables", "Three-statement"]
    },
    {
      title: "Markets & Risk",
      blurb:
        "Five years executing my own trades and, since 2024, calling them live for a community of 100+ traders. Technical analysis to find the entry, position sizing to survive being wrong.",
      tags: ["Technical Analysis", "Trade Execution", "Risk Management", "Market Research"]
    },
    {
      title: "Commercial & Deal Sense",
      blurb:
        "Running BullzTCG means pricing an asset, sourcing it, and selling it at a margin that holds — procurement, valuation and client relationships in one loop.",
      tags: ["Procurement", "Pricing", "Client Relations", "Market Positioning"]
    },
    {
      title: "Coordinating & Mentoring",
      blurb:
        "Coordinating the finance division of BINECA 2026, and a semester spent mentoring first-year students through onboarding and a capstone run to completion.",
      tags: ["Coordination", "Project Management", "Mentoring", "Communication"]
    }
  ],

  /* --- 6. SKILLS -------------------------------------------------------- */
  /* TODO — the skill names come from your LinkedIn endorsements and your
     headline, but the levels (0-100) are ESTIMATES. They drive the animated
     rings, so a recruiter reads them as a claim. Go through and set your
     own honest numbers before this goes public. */
  skills: [
    { name: "Financial Modeling",  level: 78, group: "Finance" },
    { name: "Valuation",           level: 75, group: "Finance" },
    { name: "Market Research",     level: 84, group: "Finance" },
    { name: "Equity Research",     level: 68, group: "Finance" },
    { name: "Risk Management",     level: 85, group: "Markets" },
    { name: "Technical Analysis",  level: 90, group: "Markets" },
    { name: "Trade Execution",     level: 88, group: "Markets" },
    { name: "Crypto Markets",      level: 88, group: "Markets" },
    { name: "Microsoft Excel",     level: 86, group: "Tools" },
    { name: "PowerPoint",          level: 78, group: "Tools" },
    { name: "Data Analysis",       level: 72, group: "Tools" },
    { name: "Communication",       level: 86, group: "Human" },
    { name: "Coordinating Skills", level: 82, group: "Human" },
    { name: "Growth Strategies",   level: 76, group: "Human" },
    { name: "Project Management",  level: 78, group: "Human" }
  ],

  /* words that scroll past in the marquee strip */
  marquee: [
    "Financial Modeling", "Valuation", "Investment Banking", "Technical Analysis",
    "Risk Management", "Market Research", "DCF", "Trading"
  ],

  /* --- 7. EXPERIENCE ---------------------------------------------------- */
  /* Straight from LinkedIn, newest first. LinkedIn shows "Show all" on your
     profile, so if there are roles below Freshmen Partner, add them here. */
  experience: [
    {
      role: "Coordinator of Finance Division, BINECA 2026",
      org: "HIMTRI BINUS",
      type: "Organization",
      period: "Jul 2026 — Present",
      location: "Hybrid",
      /* TODO — no description on LinkedIn. Two or three lines: the budget you
         hold, the size of the event, what the finance division actually does. */
      bullets: [
        "Coordinating the finance division for BINECA 2026."
      ],
      tags: ["Coordinating Skills", "Microsoft Excel", "Growth Strategies"]
    },
    {
      role: "Founder",
      org: "BullzTCG",
      type: "Self-employed",
      period: "Mar 2026 — Present",
      location: "Jakarta, Indonesia · On-site",
      bullets: [
        "Oversaw procurement, valuation, and sales of Pokemon and One Piece TCG assets, driving high-margin profitability through targeted market positioning and excellent client communication."
      ],
      tags: ["Communication", "Market Research", "Procurement"]
    },
    {
      role: "Founder",
      org: "MWcrypto",
      type: "Full-time",
      period: "Nov 2024 — Present",
      location: "Jakarta, Indonesia · Hybrid",
      bullets: [
        "Founded and scaled a trading community to 100+ active traders, providing live market commentary, execution strategy, and real-time risk management guidance during active trading sessions."
      ],
      tags: ["Technical Analysis", "Market Research", "Risk Management", "Community"]
    },
    {
      role: "Trader",
      org: "Self-employed",
      type: "Self-employed",
      period: "Feb 2021 — Present",
      location: "Jakarta, Indonesia · Hybrid",
      /* TODO — no description on LinkedIn, and this is your longest-running
         role. What you trade, how you decide, how you manage risk. */
      bullets: [
        "Trading my own capital across crypto and equities since 2021, with a documented track record."
      ],
      tags: ["Trade Execution", "Technical Analysis", "Risk Management"]
    },
    {
      role: "Freshmen Partner",
      org: "BINUS University",
      type: "Part-time",
      period: "Sep 2025 — Jan 2026",
      location: "West Jakarta, Indonesia · On-site",
      bullets: [
        "Mentored first-year students through university onboarding, tracked academic compliance for mandatory assessments, and directed a capstone tree-planting initiative from execution to completion."
      ],
      tags: ["Mentoring", "Project Management", "Communication"]
    }
  ],

  /* --- 8. EDUCATION + CERTIFICATIONS ------------------------------------ */
  education: [
    {
      school: "BINUS University",
      degree: "Bachelor of Industrial Engineering",
      period: "Sep 2023 — Sep 2028",
      detail: "Project Management and Communication."
      /* TODO — add GPA or relevant coursework if you want it on here. */
    },
    {
      school: "Finplan",
      degree: "WPPE — Finance, General",
      period: "Sep 2026 — Present",
      detail: "Securities broker-dealer representative certification programme."
    }
  ],

  /* TODO — these are the four in your headline, all listed as candidate /
     in progress. Once one is passed, put the year in place of "In progress". */
  certifications: [
    { name: "FMVA — Financial Modeling & Valuation Analyst", issuer: "CFI",       year: "In progress" },
    { name: "CFA",                                          issuer: "CFA Institute", year: "Candidate" },
    { name: "WMI — Wakil Manajer Investasi",                 issuer: "OJK / Indonesia", year: "Candidate" },
    { name: "WPPE — Wakil Perantara Pedagang Efek",          issuer: "Finplan / OJK",   year: "In progress" }
  ],

  /* --- 9. PROJECTS ------------------------------------------------------ */
  /* Concrete things, so this section isn't just the experience list again. */
  projects: [
    {
      title: "2025 Crypto Track Record",
      year: "2025",
      blurb:
        "A full year of trades kept and documented — entries, sizing and outcomes — the record I point at when someone asks whether the approach actually works.",
      tags: ["Trade Execution", "Risk Management", "Documentation"],
      link: ""
      /* TODO — link the record, or a write-up of it, if you're happy to show it. */
    },
    {
      title: "BullzTCG Pop-Up, Mall Taman Anggrek",
      year: "2026",
      blurb:
        "A physical booth run with @hiddentreasuresociety: pricing inventory on the day, handling buyers face to face, and turning a card collection into a margin.",
      tags: ["Retail", "Pricing", "Client Relations"],
      link: ""
    },
    {
      title: "Campus Tree-Planting Capstone",
      year: "2025",
      blurb:
        "Directed a tree-planting initiative from execution through to completion as part of the Freshmen Partner programme at BINUS.",
      tags: ["Project Management", "Leadership"],
      link: ""
    }
  ],

  /* --- 10. CONTACT ------------------------------------------------------ */
  contact: {
    heading: "Let's talk markets",
    blurb:
      "Open to analyst internships and finance roles in Jakarta — investment banking, equity research, corporate finance or valuation. LinkedIn is the fastest way to reach me.",
    cta: "Send a message"
  }
};
