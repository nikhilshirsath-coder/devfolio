# Devfolio — Premium Freelancing Website

Production-ready, conversion-focused freelancing website built with **pure HTML5, CSS3 and Vanilla JavaScript**. No frameworks, no jQuery, no build step.

## 🚀 Quick Start

Just open `index.html` in any modern browser. That's it.

For local development with auto-reload, you can serve it with any static server:

```bash
# Python 3
python3 -m http.server 8080

# Node.js
npx serve .
```

Then visit `http://localhost:8080`.

## 📁 Folder Structure

```
/
├── index.html          ← Home page (3D hero, stats, marquee, services, portfolio, testimonials, CTA, newsletter)
├── about.html          ← Bio, skills, timeline, why-hire-me, certifications, map
├── services.html       ← 9 service cards with pricing, plus process steps
├── portfolio.html      ← Filterable + searchable masonry grid, lightbox, case study
├── contact.html        ← Form with 5+ validations, contact info, map, mini FAQ
├── faq.html            ← Full accordion-style FAQ
├── privacy.html        ← Privacy Policy page
├── 404.html            ← Custom error page
├── robots.txt          ← SEO crawl directives
├── sitemap.xml         ← SEO sitemap
│
├── css/
│   ├── variables.css   ← Design tokens (colors, spacing, fonts, shadows)
│   ├── style.css       ← Main stylesheet (all components)
│   ├── animations.css  ← Scroll reveals, gradient borders, floating shapes
│   └── responsive.css  ← Breakpoints + reduced-motion + print
│
├── js/
│   ├── main.js         ← Loader, nav, cursor, magnetic buttons, FAQ, toast, particles
│   ├── theme.js        ← Dark/Light theme with localStorage
│   ├── animation.js    ← Scroll-reveal, typing effect, counters, skill bars
│   ├── validation.js   ← 5+ form validations with anti-duplicate submission
│   ├── portfolio.js    ← Category filter, live search, image lightbox
│   └── slider.js       ← Testimonials carousel (autoplay + swipe)
│
├── images/             ← (Reserved for project assets — site currently uses Unsplash CDN)
├── videos/             ← (Reserved for self-hosted clips — YouTube iframe used by default)
└── icons/              ← (Reserved — all icons are inline SVG)
```

## ✨ Feature Highlights

### Design
- Modern dark/light theme with glassmorphism + neumorphism
- 3D floating code card in hero with parallax tilt
- Animated gradient mesh background + aurora layer + particles canvas
- Custom blend-mode cursor with smooth ring follower
- Magnetic buttons with cursor-attracted micro-interactions
- Animated logo marquee (infinite horizontal scroll)
- Smooth scroll-reveal animations via IntersectionObserver
- Gradient text shimmer, soft shadows, glowing accents

### Functionality
- Loader screen with progress fill animation
- Scroll progress bar at top of viewport
- Dark / Light theme toggle persisting in localStorage
- Animated number counters (stats section)
- Animated skill progress bars on scroll
- Typing effect on hero headline
- Testimonials carousel with autoplay, dots, arrows, swipe-on-touch
- Portfolio category filter + live search
- Image lightbox with keyboard / overlay close
- FAQ accordion (semantic `<details>` + JS-enhanced)
- Toast notification system (success / error / warning)
- Success dialog after form submission
- Visitor counter + live date/time in footer
- WhatsApp floating button with pulse ring
- Back-to-top button

### Forms (5+ Validations as required)
1. **Name** — required, min 3 chars, alphabets only
2. **Email** — valid email regex
3. **Phone** — exactly 10 digits, numbers only (with input mask)
4. **Budget** — must be > ₹1,000
5. **Description** — min 30 characters
6. **Bonus**: subject required, duplicate-submission guard, live character counter, success modal, error popup, inline error icons

### SEO / Performance / A11y
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<details>`, `<summary>`, `<dialog>`)
- Per-page meta title, description, canonical, OG tags, Twitter card
- JSON-LD `ProfessionalService` schema markup
- `robots.txt` + `sitemap.xml`
- Inline SVG favicon (no extra request)
- All images use `loading="lazy"`
- All YouTube/Maps iframes also use `loading="lazy"`
- `prefers-reduced-motion` honored
- Custom scrollbar (does not break a11y)
- Google Analytics scaffolding ready (replace `G-XXXXXXXXXX`)

### Customization
- All design tokens live in `css/variables.css` — change one variable to retheme
- All copy is in English and written for conversion (PAS / FAB framing)
- Replace placeholder phone/email/WhatsApp numbers in HTML files
- Replace `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX` in `index.html` with your real GA4 ID
- Resume download links point to `#` — drop your PDF in `/` and update `href`

## 🛠 Browser Support
Chrome / Edge / Firefox / Safari — last 2 versions. Falls back gracefully on older browsers (animations disabled, layout still works).

## 📄 License
You're free to use this template for personal or client projects. Attribution appreciated but not required.

---

Built with care, ready to ship. 🚀
