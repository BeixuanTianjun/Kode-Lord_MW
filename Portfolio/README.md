# Portfolio — dark / neon

A single-page personal portfolio built around motion: a reactive particle field
behind the hero, kinetic typography, scroll-driven reveals, animated skill
rings, a progressing timeline and a magnetic cursor.

No build step, no framework, no CDN. Open `index.html` and it runs.

## Edit your content in one place

**Everything on the page comes from `js/profile.js`.** Markup, styles and motion
never need touching to change what the site says. Open that file, replace the
placeholder text with your LinkedIn content, save, refresh.

```
meta            name, headline, location, the roles that type themselves out
links           email, LinkedIn, GitHub, Instagram, résumé (blank = hidden)
stats           the four numbers that count up in the hero
about           your LinkedIn About section + the facts list beside it
specialties     3-4 headline cards — the things you want to be hired for
skills          name + level (0-100) + group; group names become the filter pills
marquee         the words that scroll past under the hero
experience      one entry per LinkedIn role, newest first
education       schools and degrees
certifications  name, issuer, year
projects        selected work, with an optional link
contact         heading, blurb, button label
```

Two things are derived automatically, so don't hand-maintain them:

- **Skill filter pills** are generated from the distinct `group` values.
- **Section numbering** (01 — About, 02 — Specialties …) is written in the
  markup, so it only changes if you add or remove a whole section.

## Run it

```bash
open index.html                    # works straight off the filesystem

npx http-server . -p 8080 -c-1     # or serve it, if you prefer
```

Deploying is a folder upload — GitHub Pages, Netlify, Vercel, cPanel, anything.

## Structure

```
Portfolio/
├── index.html          # markup shell; sections are empty containers
├── css/
│   ├── fonts.css       # @font-face for self-hosted Manrope
│   └── style.css       # tokens, then components, then reduced-motion
├── js/
│   ├── profile.js      # ← all of your content
│   ├── hero.js         # the particle constellation (canvas 2D)
│   └── main.js         # renders every section, then wires the motion
└── assets/fonts/       # Manrope 300-800 (woff2)
```

`main.js` runs in two passes: render every section from `PROFILE`, then attach
the observers. That order matters — the observers have nothing to watch until
the content exists.

## What moves, and why

| Effect | Where |
| --- | --- |
| Particle constellation, repelled by the cursor | `hero.js` |
| Name cascading in character by character | `splitText()` in `main.js` |
| Role text typing and deleting on a loop | `main.js` |
| Stat and percentage counters | `countUp()` |
| Blur-and-lift reveals, staggered per group | `IntersectionObserver` + `[data-reveal]` |
| Skill rings drawing to their level | SVG `stroke-dashoffset`, `.skill.is-in` |
| Timeline rail filling as you scroll past | `#timelineFill` in `onScroll()` |
| Spotlight following the cursor across cards | `--mx` / `--my` custom properties |
| 3D tilt on specialty cards | `.tilt` handler, pointer devices only |
| Custom cursor with a trailing ring, magnetic buttons | `.cursor`, `.magnetic` |

The hero canvas stops itself when it scrolls out of view or the tab is hidden,
so it isn't burning frames in the background.

## Accessibility

- `prefers-reduced-motion: reduce` kills every animation, freezes the canvas on
  a single still frame, hides the custom cursor and shows all content at rest.
- Content is real text, never baked into images.
- Focus rings are visible and the mobile menu manages `aria-expanded`.
- Everything from `profile.js` is HTML-escaped before it reaches the DOM.

## The contact form

There's no backend. Submitting validates the three fields, then hands the
message to the visitor's mail client via `mailto:` using `links.email`. If you
want real form submissions, point the `<form>` at Formspree, Netlify Forms or
similar and delete the submit handler at the bottom of `main.js`.
