/* ============================================================================
   profile.js — THE ONLY FILE YOU NEED TO EDIT.
   Every word on the website comes from this object.

   Sources: the LinkedIn profile at linkedin.com/in/michael-wibowo, and
   CV MICHAEL WIBOWO.pdf (Sep 2025). Where the two overlap, the longer
   wording won. Lines tagged TODO are still open — search for them.
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
      "Founder ×3"
    ],
    location: "Jakarta Metropolitan Area",
    availability: "Open to work · Jakarta · on-site or hybrid",
    /* Path to your photo, relative to index.html. "" hides the avatar. */
    photo: "assets/michael-wibowo.jpg",
    tagline:
      "Five years trading live markets with my own capital, three businesses " +
      "built from nothing — now pointed at financial modeling, valuation and " +
      "a seat on a banking desk."
  },

  /* --- 2. LINKS --------------------------------------------------------- */
  links: {
    email: "michaelwibo@gmail.com",
    linkedin: "https://www.linkedin.com/in/michael-wibowo",
    github: "",
    instagram: "",
    /* TODO — your CV isn't linked here on purpose: the PDF carries your phone
       number, and publishing it puts the number on the open web where it gets
       scraped. If you want a downloadable CV, make a version without the phone
       (or with it as an image), drop it in this folder, and put the filename
       here — e.g. "cv-michael-wibowo.pdf". */
    resume: ""
  },

  /* --- 3. NUMBERS that count up in the hero ----------------------------- */
  stats: [
    { value: 5,   suffix: "+", label: "Years trading markets" },
    { value: 100, suffix: "+", label: "Traders in the community" },
    { value: 500, suffix: "M", label: "Rupiah revenue, GrowYourUMKM" },
    { value: 5,   suffix: "",  label: "Competition placings" }
  ],

  /* --- 4. ABOUT --------------------------------------------------------- */
  /* TODO — your LinkedIn still has no About section. This draft is built from
     your own CV and experience entries; rewrite it in your voice, then paste
     the result back into LinkedIn so the two tell the same story. */
  about: {
    heading: "About",
    paragraphs: [
      "I'm an Industrial Engineering undergraduate at BINUS University working towards a career in investment banking. I've been trading live markets with my own capital since 2021, and the habits that came out of that — size the risk before the upside, write the thesis down, be wrong quickly and cheaply — are the ones I bring to modeling and valuation work.",
      "I've been building businesses since school. A food stand run to a 50% margin inside three months. GrowYourUMKM, a marketing agency helping the government make its small-business programmes actually work, which reached Rp 500 million in revenue. MWcrypto, a trading community past 100 active traders where I call live market commentary and risk. BullzTCG, where I price, source and sell collectible card assets end to end.",
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
      title: "Building Businesses",
      blurb:
        "Four ventures from a standing start — a food stand at a 50% margin, a marketing agency to Rp 500M, a trading community, a collectibles business. Pricing, cost control and the customer, every time.",
      tags: ["Business Management", "Pricing", "Cost Control", "Growth"]
    },
    {
      title: "Leading & Coordinating",
      blurb:
        "Head of an entrepreneur division for two years, finance division coordinator for BINECA 2026, and a semester mentoring first-year students through onboarding and a capstone run to completion.",
      tags: ["Leadership", "Project Management", "Mentoring", "Communication"]
    }
  ],

  /* --- 6. SKILLS -------------------------------------------------------- */
  /* Levels are self-assessed, and the site says so out loud (skillsNote
     below) so nobody reads them as a certified score.

     Calibrated on one rule: YEARS OF DOING IT beats STUDYING IT NOW.
     - 85-90  you do this live, under real money or real deadlines, and
              other people come to you for it
     - 70-84  you do it regularly and competently in real work
     - 55-69  you are actively learning it and have used it on small things
     - below  you have touched it, not much more

     This is why the markets and business rows sit above the modeling and
     valuation rows. It reads as self-aware rather than inflated: a 78% on
     Financial Modeling directly beside "FMVA candidate" is a contradiction
     a recruiter spots in two seconds, and it makes them doubt the 90% on
     Technical Analysis, which you have genuinely earned.

     Move any number you disagree with — it's your claim, not mine. */
  skills: [
    { name: "Technical Analysis",  level: 90, group: "Markets" },
    { name: "Trade Execution",     level: 86, group: "Markets" },
    { name: "Crypto Markets",      level: 85, group: "Markets" },
    { name: "Risk Management",     level: 80, group: "Markets" },

    { name: "Market Research",     level: 75, group: "Finance" },
    { name: "Financial Modeling",  level: 58, group: "Finance" },
    { name: "Valuation",           level: 55, group: "Finance" },
    { name: "Equity Research",     level: 48, group: "Finance" },

    { name: "Business Management", level: 78, group: "Business" },
    { name: "Sales & Marketing",   level: 75, group: "Business" },
    { name: "Project Management",  level: 75, group: "Business" },
    { name: "Problem Solving",     level: 76, group: "Business" },

    { name: "Microsoft Excel",     level: 72, group: "Tools" },
    { name: "PowerPoint",          level: 70, group: "Tools" },
    { name: "Data Analysis",       level: 62, group: "Tools" },

    { name: "Communication",       level: 85, group: "Human" },
    { name: "Leadership",          level: 82, group: "Human" },
    { name: "Teamwork",            level: 82, group: "Human" },
    { name: "Adaptability",        level: 80, group: "Human" }
  ],

  /* Printed under the Skills heading. Saying the numbers are self-assessed
     costs nothing and stops a reader treating them as a test score. */
  skillsNote:
    "Self-assessed, on one rule: years of doing it beats studying it now. " +
    "The markets rows are where I've spent five years of my own money; the " +
    "modeling and valuation rows are what I'm certifying in right now.",

  /* words that scroll past in the marquee strip */
  marquee: [
    "Financial Modeling", "Valuation", "Investment Banking", "Technical Analysis",
    "Risk Management", "Market Research", "DCF", "Entrepreneurship"
  ],

  /* --- 7. EXPERIENCE ---------------------------------------------------- */
  /* Current roles first, then past roles by end date. Merged from LinkedIn
     and the CV — the CV supplied the three oldest entries. */
  experience: [
    {
      role: "Coordinator of Finance Division, BINECA 2026",
      org: "HIMTRI BINUS",
      type: "Organization",
      period: "Jul 2026 — Present",
      location: "Hybrid",
      /* TODO — neither source had a description, so this is written from what
         the role is rather than what you did. Swap in the real numbers: the
         budget you're responsible for, how many attendees BINECA draws, how
         big your division is. A number here is worth more than three
         adjectives. */
      bullets: [
        "Run the finance division for BINECA 2026: budgeting the event, tracking spend against plan, and settling reimbursements across the committee.",
        "Keep the budget in one auditable Excel model so every division can see what is left before they commit to it."
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
      role: "Founder & Community Manager",
      org: "MWcrypto",
      type: "Full-time",
      period: "Nov 2024 — Present",
      location: "Jakarta, Indonesia · Hybrid",
      bullets: [
        "Founded and scaled a trading community to 100+ active traders, providing live market commentary, execution strategy, and real-time risk management guidance during active trading sessions.",
        "Conducted regular market analysis to identify opportunities for new business development and competitive advantages."
      ],
      tags: ["Technical Analysis", "Market Research", "Risk Management", "Community"]
    },
    {
      role: "Trader",
      org: "Self-employed",
      type: "Self-employed",
      period: "Feb 2021 — Present",
      location: "Jakarta, Indonesia · Hybrid",
      /* TODO — five years is the longest thing on your CV and neither source
         described it, so this is inference. Correct it: what you actually
         trade, what your edge is, how you size a position, and what makes
         you cut one. Specifics here are what separate you from every other
         student who says they trade. */
      bullets: [
        "Trading my own capital since 2021, primarily crypto, with every position sized against a defined maximum loss rather than a target return.",
        "Keep a written record of entries, sizing and outcomes — the 2025 book is the one I show when someone asks whether the approach survives a full year rather than a good month."
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
    },
    {
      role: "Market Sales Manager",
      org: "Uicreativa",
      type: "Full-time",
      period: "2024",
      location: "Jakarta, Indonesia",
      bullets: [
        "Directed the development and implementation of comprehensive sales and marketing strategies, achieving growth objectives and expanding the client base."
      ],
      tags: ["Sales & Marketing", "Business Management"]
    },
    {
      role: "Founder",
      org: "GrowYourUMKM",
      type: "Self-employed",
      period: "2023 — 2024",
      location: "Banjarmasin, South Borneo",
      bullets: [
        "Built a marketing agency that helps government improve the effectiveness of UMKM (micro, small and medium enterprise) programmes, and helps entrepreneurs build creative businesses that keep up with the times.",
        "Reached Rp 500 million in total revenue."
      ],
      tags: ["Business Management", "Sales & Marketing", "Public Sector"]
    },
    {
      role: "Head of Entrepreneur Division",
      org: "OSIS",
      type: "Student government",
      period: "2021 — 2023",
      location: "Banjarmasin, South Borneo",
      bullets: [
        "Launched and managed a successful food stand, achieving a 50% profit margin within the first three months of operation by implementing effective cost control measures and strategic pricing.",
        "Organized school events and university marketing campaigns that increased foot traffic and customer engagement, leading to a notable rise in sales during the event."
      ],
      tags: ["Leadership", "Cost Control", "Pricing", "Events"]
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
    },
    {
      school: "Kanaan Christian High School",
      degree: "High School Diploma",
      period: "Graduated 2024",
      detail: "Banjarmasin, South Borneo."
    }
  ],

  /* TODO — the four in your headline, all listed as candidate / in progress.
     Once one is passed, replace the year with the year you passed it. */
  certifications: [
    { name: "FMVA — Financial Modeling & Valuation Analyst", issuer: "CFI",           year: "In progress" },
    { name: "CFA",                                          issuer: "CFA Institute",  year: "Candidate" },
    { name: "WMI — Wakil Manajer Investasi",                issuer: "OJK",            year: "Candidate" },
    { name: "WPPE — Wakil Perantara Pedagang Efek",         issuer: "Finplan / OJK",  year: "In progress" }
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

  /* --- 10. ACHIEVEMENTS -------------------------------------------------- */
  /* `place` drives the badge: anything starting 1st / 2nd / 3rd / Winner /
     Champion / Gold / Best gets the solid gradient, everything else an
     outline, so a win stays louder than a finalist spot. */
  achievements: [
    {
      name: "Cedea Cooking Competition",
      place: "1st place",
      year: "2023",
      blurb: "A culinary competition organised by Cedea Seafood, judged on creations made with their products."
    },
    {
      name: "KalPhyCo Rocket Championship",
      place: "Best Design",
      year: "2024",
      blurb: "An annual championship bringing together young engineers and rocket enthusiasts from across the province."
    },
    {
      name: "Kihajar STEM by Kemendikbud",
      place: "Finalist",
      year: "2024",
      blurb: "A national programme from the Ministry of Education supporting innovative student work in science, technology, engineering and mathematics."
    },
    {
      name: "Jurnalistik FLS2N",
      place: "Finalist",
      year: "2023",
      blurb: "The journalism category of FLS2N, the national student arts festival, judged on journalistic skill and creativity."
    },
    {
      name: "AVIMSA Doctor Championship",
      place: "Top 30",
      year: "2023 & 2024",
      blurb: "The Avicenna Medical Science Award, an annual national medical science competition for high school students."
    }
  ],

  /* --- 11. CONTACT ------------------------------------------------------ */
  contact: {
    heading: "Let's talk markets",
    blurb:
      "Open to analyst internships and finance roles in Jakarta — investment banking, equity research, corporate finance or valuation. Email reaches me fastest.",
    cta: "Send a message"
  }
};
