# PMS Travel Website Demo — Codex Build Brief

## Goal
Build a polished, responsive **Travel & Tour Operator Demo Website** for the PMS Digital Solutions portfolio.

This is a **demo/portfolio concept**, not a real client website. It should be suitable for:
- PMS portfolio
- Instagram showcase posts
- live Vercel deployment
- prospect outreach

Use a fictional Jamaican tour company such as **IslandTrail Jamaica** with the tagline **Explore Jamaica. Your Way.**

## Tech Stack
- React
- Vite
- React Router
- JavaScript or TypeScript
- Standard CSS / component styling
- Lucide icons
- Vercel-ready deployment

Avoid Tailwind, authentication, databases, payments, and unnecessary backend infrastructure.

## Pages
1. Home
2. Tours
3. Tour Details
4. About
5. Gallery
6. Contact / Booking Inquiry

## Home Page
### Hero
- Headline: **Explore Jamaica. Your Way.**
- Supporting text: Discover unforgettable experiences, hidden gems, local culture, and guided adventures across Jamaica.
- Buttons: **Explore Tours** and **Book an Experience**
- Optional trust line: Local Guides • Flexible Experiences • Authentic Jamaica

### Featured Tours
Show 3–4 cards, for example:
- Dunn's River & Ocho Rios Adventure
- Blue Mountains Escape
- Kingston Culture Experience
- South Coast Explorer

Each card:
- image
- title
- location
- duration
- short description
- View Tour button

### Why Travel With Us
Four icon cards:
- Local Knowledge
- Personalized Experiences
- Reliable Service
- Easy Booking

### Experience Categories
- Adventure
- Culture
- Nature
- Food
- Beaches
- Private Tours

### Testimonials
Add 3 clearly fictional demo testimonials.

### Final CTA
**Ready to Experience Jamaica?**
Let us help you plan a memorable island experience.
Buttons: **Browse Tours** and **Contact Us**

## Tours Page
- Header: **Explore Our Tours**
- Category filters: All, Adventure, Culture, Nature, Food, Beach
- At least 6 tour cards
- Each card shows image, title, location, category, duration, short description, and View Details
- Functional filtering preferred

## Tour Details Page
Reusable dynamic route based on tour data.

Include:
- hero image
- tour title
- location
- duration
- category
- overview
- highlights
- what's included
- what to bring
- sample itinerary
- CTA: **Book / Inquire About This Tour**

The CTA should open the inquiry page and ideally prefill the selected tour.

## About Page
- Hero: **Discover Jamaica With People Who Know It**
- Short fictional company story
- Mission
- Values: Authenticity, Reliability, Hospitality, Local Knowledge
- Optional fictional guide/team cards

## Gallery Page
Responsive gallery with categories such as:
- Beaches
- Mountains
- Culture
- Food
- Adventure

Optional lightbox interaction.

## Contact / Booking Inquiry
Fields:
- Full Name
- Email
- Phone / WhatsApp
- Tour of Interest
- Preferred Date
- Number of Guests
- Pickup Area
- Message

Button: **Send Inquiry**

No real backend is required. Validate inputs and show a demo success state. Do not pretend a real booking has been processed.

## Navigation
Desktop:
- Home
- Tours
- About
- Gallery
- Contact
- CTA: **Book a Tour**

Mobile:
- hamburger menu
- large tap targets
- no horizontal overflow

## Footer
Include:
- IslandTrail Jamaica
- short description
- quick links
- placeholder email / WhatsApp
- Instagram / Facebook icons
- Jamaica
- **Demo Website Concept by PMS Digital Solutions**

## Visual Direction
The design should feel:
- tropical but professional
- modern
- clean
- energetic
- highly visual
- premium without looking luxury-only

Suggested palette:
- white / warm off-white base
- deep charcoal text
- tropical green accent
- warm gold / sand accent

Do not overuse gradients or Jamaican flag styling.

## Typography
Suggested:
- Headings: Poppins, Manrope, or Montserrat
- Body: Inter or Open Sans

## Responsive Requirements
Test at:
- 1440px
- 1024px
- 768px
- 430px
- 390px

Make sure navigation, cards, forms, images, typography, and buttons work at each size.

## Accessibility
Include:
- semantic HTML
- proper heading order
- image alt text
- keyboard-accessible interactions
- visible focus states
- good contrast
- labeled form inputs
- accessible mobile navigation

## Performance
- lazy-load noncritical images
- use optimized/compressed images
- avoid oversized dependencies
- avoid excessive animation
- use reusable components
- prevent obvious layout shift

## Suggested Structure
```text
src/
├── assets/
├── components/
│   ├── Navbar
│   ├── Footer
│   ├── Hero
│   ├── TourCard
│   ├── SectionHeader
│   ├── CTASection
│   ├── TestimonialCard
│   ├── FeatureCard
│   └── BookingForm
├── data/
│   └── tours.js
├── pages/
│   ├── Home
│   ├── Tours
│   ├── TourDetails
│   ├── About
│   ├── Gallery
│   └── Contact
├── App
└── main
```

## Tour Data
Use reusable local tour data rather than duplicating content.

Example:
```js
{
  id: "blue-mountains-escape",
  title: "Blue Mountains Escape",
  location: "Blue Mountains",
  category: "Nature",
  duration: "Full Day",
  image: "...",
  shortDescription: "...",
  description: "...",
  highlights: [],
  included: [],
  bring: [],
  itinerary: []
}
```

## Functional Interactions
At minimum:
- navigation
- mobile menu
- tour filtering
- dynamic tour detail routing
- inquiry form validation
- selected-tour prefill
- CTA routing
- responsive states
- optional gallery lightbox

## Demo Restrictions
Do not add:
- real payment processing
- real booking confirmation
- real customer data
- login/accounts
- admin dashboard
- fake awards
- fake partnerships
- fake “#1 in Jamaica” claims

Clearly present the project as a concept.

## PMS Portfolio Integration
After completion:
1. Deploy separately to Vercel.
2. Add a project card to the PMS website.
3. Include a thumbnail, title, short description, technology used, and **View Live Demo** button.
4. Link to the separate Vercel deployment.
5. Label it **Demo Website Concept**.

Suggested portfolio description:

> A responsive tourism website concept designed for a Jamaican tour operator, featuring tour discovery, detailed experience pages, gallery content, and a streamlined booking inquiry flow.

## Instagram Showcase
Capture:
1. Homepage hero
2. Featured tours
3. Tour details
4. Mobile view
5. Booking inquiry page

Label the post **Travel & Tourism Website — Demo Concept**.

## Codex Execution Stages
### Stage 1
Set up React + Vite, routing, base styles, reusable layout, and tour data.

### Stage 2
Build Home, Tours, and Tour Details.

### Stage 3
Build About, Gallery, and Contact / Booking Inquiry.

### Stage 4
Implement responsiveness, accessibility, filtering, form validation, and mobile navigation.

### Stage 5
Polish visual consistency, spacing, typography, performance, image loading, and QA.

Do not add major features outside this brief unless they materially improve the demo while keeping it lightweight.

## Definition of Done
The demo is complete when:
- all six pages work
- navigation works
- tour detail pages are dynamic/reusable
- filtering works
- mobile layout works
- inquiry form validates
- there are no obvious console errors
- the site feels commercially credible
- it is ready for Vercel deployment
- it is clearly labeled as a PMS Digital Solutions demo concept
