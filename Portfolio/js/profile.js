/* ============================================================================
   profile.js — THE ONLY FILE YOU NEED TO EDIT.
   Every word on the website comes from this object. Paste your LinkedIn
   content in here and the whole site rebuilds itself.

   Lines tagged TODO below are placeholder text — replace them.
   ========================================================================= */

window.PROFILE = {

  /* --- 1. IDENTITY ------------------------------------------------------ */
  meta: {
    /* TODO: your real name */
    name: "Your Name",
    /* short version used in the nav logo + footer */
    initials: "YN",
    /* TODO: your LinkedIn headline, verbatim */
    headline: "Computer Science Student · Frontend Developer · UI Motion",
    /* the words that type themselves out in the hero, one after another */
    roles: [
      "Frontend Developer",
      "UI / Motion Designer",
      "Creative Technologist",
      "Problem Solver"
    ],
    location: "Jakarta, Indonesia",
    availability: "Open to internships & freelance",
    /* one or two sentences under the big name */
    tagline:
      "I build interfaces that move — fast, accessible, and a little bit alive."
  },

  /* --- 2. LINKS --------------------------------------------------------- */
  links: {
    email: "you@example.com",
    linkedin: "https://linkedin.com/in/your-handle",
    github: "https://github.com/BeixuanTianjun",
    instagram: "",
    resume: ""                       /* path or URL to a PDF, "" hides it */
  },

  /* --- 3. NUMBERS that count up in the hero ----------------------------- */
  stats: [
    { value: 3,  suffix: "+",  label: "Years building" },
    { value: 12, suffix: "",   label: "Projects shipped" },
    { value: 5,  suffix: "",   label: "Organizations" },
    { value: 4,  suffix: "",   label: "Certifications" }
  ],

  /* --- 4. ABOUT --------------------------------------------------------- */
  about: {
    heading: "About",
    /* TODO: paste your LinkedIn "About" section. One string per paragraph. */
    paragraphs: [
      "Paste your LinkedIn About section here. Each string in this array becomes its own paragraph, so you can keep the same structure you already wrote.",
      "A second paragraph works well for what you are looking for right now — the kind of team, the kind of problem, the kind of work you want more of."
    ],
    /* small facts printed as a definition list beside the text */
    facts: [
      { k: "Based in",  v: "Jakarta, Indonesia" },
      { k: "Focus",     v: "Frontend · Motion · Design systems" },
      { k: "Languages", v: "Indonesian (native) · English (professional)" },
      { k: "Studying",  v: "Computer Science, Binus University" }
    ]
  },

  /* --- 5. SPECIALTIES — the headline cards ------------------------------ */
  /* Keep this to 3 or 4. These are the things you want to be hired for. */
  specialties: [
    {
      title: "Interface Engineering",
      blurb:
        "Turning static designs into responsive, accessible, production-ready interfaces — with the details that make them feel expensive.",
      tags: ["HTML/CSS", "JavaScript", "React", "Accessibility"]
    },
    {
      title: "Motion & Interaction",
      blurb:
        "Scroll-driven storytelling, micro-interactions and WebGL touches that guide attention instead of fighting for it.",
      tags: ["GSAP", "Canvas", "three.js", "CSS Animation"]
    },
    {
      title: "Visual & Brand Design",
      blurb:
        "Type, colour and layout systems that hold together across a whole product rather than one pretty screen.",
      tags: ["Figma", "Design Systems", "Branding", "Typography"]
    },
    {
      title: "Product Thinking",
      blurb:
        "Scoping the smallest thing worth building, shipping it, then letting real feedback decide what comes next.",
      tags: ["Research", "Prototyping", "Analytics", "Iteration"]
    }
  ],

  /* --- 6. SKILLS -------------------------------------------------------- */
  /* level is 0-100 and drives the animated ring. Be honest, it shows. */
  skills: [
    { name: "JavaScript",     level: 88, group: "Engineering" },
    { name: "HTML & CSS",     level: 94, group: "Engineering" },
    { name: "React",          level: 78, group: "Engineering" },
    { name: "TypeScript",     level: 70, group: "Engineering" },
    { name: "Python",         level: 72, group: "Engineering" },
    { name: "Git & GitHub",   level: 82, group: "Engineering" },
    { name: "GSAP / Motion",  level: 85, group: "Motion" },
    { name: "Canvas & WebGL", level: 68, group: "Motion" },
    { name: "three.js",       level: 64, group: "Motion" },
    { name: "Figma",          level: 90, group: "Design" },
    { name: "Design Systems", level: 80, group: "Design" },
    { name: "Typography",     level: 76, group: "Design" },
    { name: "Public Speaking",level: 80, group: "Human" },
    { name: "Team Leadership",level: 75, group: "Human" },
    { name: "Copywriting",    level: 70, group: "Human" }
  ],

  /* words that scroll past in the marquee strip */
  marquee: [
    "Frontend", "Motion Design", "UI Engineering", "Creative Coding",
    "Design Systems", "Accessibility", "Prototyping", "WebGL"
  ],

  /* --- 7. EXPERIENCE ---------------------------------------------------- */
  /* Newest first. Copy each LinkedIn role straight in. */
  experience: [
    {
      role: "Frontend Developer",
      org: "Company or Organization",
      type: "Internship",            /* Full-time / Part-time / Freelance ... */
      period: "Jan 2025 — Present",
      location: "Jakarta · Hybrid",
      bullets: [
        "What you owned — the system, the surface, the outcome.",
        "A result with a number in it, if you have one.",
        "Something you introduced that outlived your time there."
      ],
      tags: ["React", "TypeScript", "Figma"]
    },
    {
      role: "Project Lead",
      org: "Student Organization",
      type: "Part-time",
      period: "Aug 2024 — Dec 2024",
      location: "Binus University",
      bullets: [
        "Led a team of N through a project from brief to launch.",
        "The hard part, and how you got around it."
      ],
      tags: ["Leadership", "Planning"]
    },
    {
      role: "Freelance Web Designer",
      org: "Self-employed",
      type: "Freelance",
      period: "2023 — 2024",
      location: "Remote",
      bullets: [
        "Designed and shipped sites for small businesses end to end.",
        "Handled scoping, pricing and client handover yourself."
      ],
      tags: ["Web Design", "Client Work"]
    }
  ],

  /* --- 8. EDUCATION + CERTIFICATIONS ------------------------------------ */
  education: [
    {
      school: "Binus University",
      degree: "Bachelor of Computer Science",
      period: "2023 — 2027",
      detail: "Relevant coursework, GPA or a note about what you focused on."
    }
  ],

  certifications: [
    { name: "Certification name", issuer: "Issuing body", year: "2025" },
    { name: "Certification name", issuer: "Issuing body", year: "2024" }
  ],

  /* --- 9. PROJECTS ------------------------------------------------------ */
  projects: [
    {
      title: "Spill de Tea",
      year: "2025",
      blurb:
        "Brand site for a pre-order milk tea business, with an interactive 3D cup built procedurally in three.js and motion running the length of the page.",
      tags: ["three.js", "Motion", "Branding"],
      link: "../Spill_de_Tea/index.html"
    },
    {
      title: "Project name",
      year: "2024",
      blurb:
        "One or two sentences: what it is, what was hard about it, what it does for whoever uses it.",
      tags: ["Tag", "Tag"],
      link: ""
    },
    {
      title: "Project name",
      year: "2024",
      blurb:
        "Another project. Screenshots are optional — a clear sentence beats a blurry mockup.",
      tags: ["Tag", "Tag"],
      link: ""
    }
  ],

  /* --- 10. CONTACT ------------------------------------------------------ */
  contact: {
    heading: "Let's build something",
    blurb:
      "Open to internships, freelance work and collaborations. The fastest way to reach me is email — I reply within a day.",
    cta: "Send a message"
  }
};
