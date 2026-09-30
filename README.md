# CalculatePregnancy.com

> Simple, calm, and evidence-based pregnancy and due date calculations with 100% client-side data privacy.

CalculatePregnancy.com is the web and SEO utility platform providing accurate gestational dating, milestone tracking, and fetal development guides based on recognized clinical models (ACOG, NHS, and INTERGROWTH-21st).

## Key Features

- **Pregnancy Calculator**: Comprehensive gestational dating from Last Menstrual Period (LMP) with cycle-length adjustments.
- **Due Date Calculator**: Accurate Estimated Delivery Date (EDD) projections using Naegele's 280-day obstetric model.
- **Pregnancy Week Calculator**: Real-time gestational age (weeks + days) and future date projections.
- **Trimester Calculator**: Precise calendar date boundaries for First (Weeks 1–13), Second (Weeks 14–27), and Third (Weeks 28–40+) Trimesters.
- **Baby Size by Week (Weeks 4–40)**: Visual developmental metaphors with explicit fetal measurement conventions (Crown-Rump Length CRL vs Crown-to-Heel).
- **Pregnancy Week by Week**: Complete 40-week timeline with developmental milestones.
- **Strict Client-Side Privacy**: All mathematical calculations execute locally in the visitor's browser memory. Zero health or date parameters are transmitted to any server or third-party service.
- **Source-Verified Content**: All 37 pregnancy-week entries are grounded in authoritative published medical literature (ACOG, NHS UK, and INTERGROWTH-21st fetal-growth standards).

## Architecture & Technology Stack

- **Framework**: Next.js 16 (App Router, Turbopack, 100% Static Prerendering)
- **Language**: TypeScript
- **Styling**: Vanilla CSS Design System (Custom properties, responsive typography, accessible focus states)
- **Testing**: Vitest automated unit test suite (30/30 unit tests covering boundary conditions, leap years, and trimester algorithms)
- **SEO & Metadata**: Complete dynamic sitemap (`sitemap.xml`), robots (`robots.txt`), Open Graph / Twitter cards (`1200x630`), Web App Manifest, and multi-format favicons.

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run automated tests
npm test

# Build production bundle
npm run build

# Start production server
npm run start
```

## License

Private / Proprietary.
