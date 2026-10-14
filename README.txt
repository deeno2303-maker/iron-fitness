# Ironhouse Fitness Studio

A responsive, single-page website for Ironhouse Fitness Studio in Durban. The
site is built with React and Vite, styled with Tailwind CSS, and currently uses
hardcoded content with client-side-only interactions.

## Requirements

- Node.js and npm
- A modern web browser

## Getting started

Open a terminal in the project folder and install the dependencies:

```sh
npm install
```

Start the Vite development server:

```sh
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173/`). Keep the
terminal process running while you work. Do not open `index.html` directly or
use VS Code Live Server: this project relies on Vite to process JSX, CSS, and
asset imports.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server with hot reload. |
| `npm run build` | Build the optimized production site into `dist/`. |
| `npm run preview` | Serve the production build locally for a final check. Run `npm run build` first. |

To check a production build locally:

```sh
npm run build
npm run preview
```

Deploy the contents of `dist/` to a static web host that supports single-page
sites. Vite's `base` option may need to be configured if deploying to a
subdirectory rather than a domain root.

## Features

- Header navigation with links to the main page sections and a call to action.
- Hero section with an introductory message, calls to action, and training
  photograph.
- Gym photo showcase below the hero.
- Weekly class schedule with filters for All, Strength, Conditioning, and
  Mobility.
- Class cards with a controlled booking toggle.
- Trainer profiles and membership tier cards.
- Contact section with a map link and email link for trial bookings.
- Responsive layouts implemented with mobile-first Tailwind utility classes.
- Semantic page landmarks and a skip-to-main-content link.

## Project structure

```text
.
├── index.html                 # HTML entry point and page title
├── package.json               # Dependencies and npm scripts
├── vite.config.js             # Vite, React, and Tailwind plugin setup
└── src/
    ├── main.jsx               # React application bootstrap
    ├── App.jsx                # Page composition
    ├── index.css              # Tailwind import, theme tokens, base styles
    ├── data/
    │   └── studio.js          # Hardcoded classes, trainers, tiers, nav links
    ├── assets/
    │   ├── training.jpg       # Hero image
    │   └── hero-gym.jpg       # Gym showcase image
    └── components/
        ├── Header.jsx
        ├── Hero.jsx
        ├── GymShowcase.jsx
        ├── Schedule.jsx
        ├── ClassCard.jsx
        ├── BookToggle.jsx
        ├── Trainers.jsx
        ├── Membership.jsx
        ├── Contact.jsx
        └── Footer.jsx
```

## Content and interactions

Site content is kept in `src/data/studio.js` and imported by the components
that display it. Update this file to change the schedule, trainers, membership
tiers, or navigation links.

The schedule filter and booking toggles use React state in the browser. The
booking controls are a demonstration only: they do not submit reservations,
check availability, or save bookings after the page is refreshed. The trial
booking link opens the visitor's email application; it is not an online booking
form. The displayed schedule, prices, contact details, and membership terms are
sample site content and should be verified before public launch.

## Styling

Tailwind CSS is loaded from `src/index.css` and configured through the
`@tailwindcss/vite` plugin in `vite.config.js`. The project's custom color,
font, and radius tokens are defined in the `@theme` block in `src/index.css`.
Responsive utilities use mobile-first defaults with `sm:`, `md:`, `lg:`, and
`xl:` breakpoints where needed.

## Testing and checks

The project currently defines development, build, and preview commands. It does
not define automated test or lint commands. Run `npm run build` before
deployment to check that Vite can compile the app and resolve its assets.
