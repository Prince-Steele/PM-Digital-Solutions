# IslandTrail Jamaica

A responsive travel and tourism website concept by **PMS Digital Solutions**. Built from `PMS_Travel_Website_Demo_BUILD.md` with React, Vite, React Router, standard CSS, and Lucide icons.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Production output: `npm run build`. Preview that output: `npm run preview`.

## Included

- Home, Tours, reusable Tour Details, About, Gallery, and Contact pages.
- Six data-driven tours, category filters with shareable URLs, and browser history support.
- Inquiry prefill through `/contact?tour=blue-mountains-escape`.
- Required-field, email, phone, date, and guest-count validation. Valid submissions show an explicit demo success state.
- Gallery filtering and an accessible modal with Escape, keyboard focus containment, and focus return.
- Mobile navigation, skip link, visible keyboard focus, reduced-motion support, and descriptive image alternatives.
- Responsive local WebP images, local fonts, and image fallback artwork.
- Vercel configuration for deep-link routing and security headers. No deployment has been made; deployment and portfolio integration are deferred as requested.

## Demo boundaries

IslandTrail is fictional. Tour offerings, sample itineraries, contact details, and testimonials are illustrative. The form never sends, logs, or persists personal data. No authentication, database, payments, analytics, or backend is included. Social icons are explicitly labelled as demo-only, rather than linking to invented accounts.

Photography illustrates the concept; it is not a promise of the exact location or experience of a sample tour. See `ASSET_CREDITS.md`. The site is marked `noindex` to avoid presenting the fictional company as a real operator.

## Quality checks

```sh
npm run lint
npm test
npm run build
```

Install the test browser once with `npm exec playwright install chromium` if needed. Tests cover all six page types at 1440, 1024, 768, 430, and 390 pixels; image loading; console errors; navigation; filters; dynamic tour routes; form validation and non-submission; mobile menu; gallery keyboard behavior; and automated WCAG AA checks.

## Showcase

With the development server running, execute `npm run showcase`. Screenshots are saved in `showcase/`, including the homepage hero, featured tours, tour detail, mobile view, and inquiry form.

Suggested caption: **Travel & Tourism Website — Demo Concept**

A responsive tourism website concept designed for a Jamaican tour operator, featuring tour discovery, detailed experience pages, gallery content, and a streamlined booking inquiry flow.

## Structure

`src/data/tours.js` is the content source. Shared UI and layout live in `src/components`; individual pages live in `src/pages`. `src/styles.css` contains the responsive design system. No environment variables or external accounts are required to run the website.
