# NOVERA OSS

> A Lost Saga revival - landing site & player dashboard. Dark esports meets playful arcade energy.

[![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React%2019-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io)

## About

NOVERA OSS is the web portal for a community revival of the classic Korean action brawler
**Lost Saga** - a fast-paced mercenary fighting game with PvP rooms, guilds, and dozens of
playable heroes.

This repository contains the marketing site and the player dashboard, built with a
**dark neon game-client aesthetic**:

- Deep navy base (`#0B0E1A`) with electric blue -> magenta -> orange gradient accents
- Glassmorphism cards, glowing borders, bold display typography (Chakra Petch + Inter)
- Animated particle and light-streak hero background
- A playful "balloon-pop" dashboard sidebar with floating, glossy bubble navigation
- Mobile-first responsive layout (most players browse via phone)

## Features

### Landing Page (`/`)

- Full-screen hero with animated particles, light streaks, and server-status pill
- Mercenary showcase - 10 hero cards with real artwork and rarity/type data from the Lost Saga database
- Bento-style game modes grid (Boss Raid, Ladder PvP, Guild War, Football Mode, ...)
- Feature blocks, patch notes feed, Top 10 ladder ranking
- Download section with system requirements and install guide

### Player Dashboard (`/dashboard`)

- **Overview** - identity card, HUD stat chips, ladder progress, daily contracts, recent battles
- **Battle Logs** - filterable match history (result / mode / hero)
- **Mercenary Locker** - owned heroes with levels and mastery, locked silhouette slots
- **Guild** - roster with roles and online status, guild war schedule and results
- **Gashapon** - featured rate-up banner, pity counter, pull history with rarity glows
- **Season Pass** - horizontal reward track with chevron navigation, free & premium tracks, claim states
- **Webshop** - featured bundles and currency packs, with a mock checkout flow
- **Settings** - profile, privacy toggles, account management

### Auth (`/login`, `/register`, `/forgot`)

- Split-panel login/register cards with hero artwork
- Discord + Google OAuth buttons (decorative)
- Forgot-password flow with "reset link sent" state
- Bubble-styled inputs, password visibility toggle, strength meter

## Screenshots

<!-- TODO: add screenshots -->

| Landing | Dashboard | Season Pass | Auth |
| --- | --- | --- | --- |
| _todo_ | _todo_ | _todo_ | _todo_ |

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4 (CSS-first theme in `globals.css`) |
| Language | TypeScript |
| Icons | `react-icons` - Game Icons, Font Awesome, Heroicons 2 |
| Fonts | Chakra Petch (display) + Inter (body) via `next/font` |
| Package manager | pnpm |

No UI kit or component library - everything is hand-rolled Tailwind.

## Project Structure

```
src/
|-- app/
|   |-- layout.tsx              # Root layout, fonts, metadata
|   |-- page.tsx                # Landing page
|   |-- globals.css             # Tailwind v4 theme tokens + custom utilities
|   |-- not-found.tsx           # Custom 404
|   |-- error.tsx               # Error boundary
|   |-- global-error.tsx        # Root-level error fallback
|   |-- (auth)/                 # Auth route group (standalone layout)
|   |   |-- login/  register/  forgot/
|   `-- dashboard/              # Dashboard section (bubble sidebar layout)
|       |-- page.tsx            # Overview
|       |-- matches/  heroes/  guild/  gashapon/
|       |-- season-pass/  settings/
|       `-- webshop/            # + webshop/checkout
|-- components/
|   |-- navbar, hero, mercenaries, modes, features,
|   |   news, ranking, download, footer, reveal   # Landing sections
|   |-- auth/                   # auth-card, oauth-buttons, forms
|   `-- dashboard/              # nav-rail, battle-log, matches-browser,
|                               # season-track, checkout-form, settings-form
`-- data/                       # Mock data layer (see below)
    |-- heroes.ts               # Hero refs + rarity styles
    |-- player.ts  matches.ts  guild.ts  gashapon.ts
    `-- season-pass.ts  webshop.ts  heroes-locker.ts

public/
`-- heroes/                     # Hero artwork PNGs (scraped)
```

## Getting Started

**Prerequisites:** [Node.js](https://nodejs.org) 20+ and [pnpm](https://pnpm.io).

```bash
# install dependencies
pnpm install

# start the dev server (http://localhost:3000)
pnpm dev

# production build
pnpm build
pnpm start

# lint
pnpm lint
```

## Data Layer & API Wiring

All content currently comes from **mock data modules** in `src/data/` - no backend is
required to run the project. Components import these modules directly, which keeps the
swap to a real API contained:

- `heroes.ts` - hero names, types (melee/range/magic/special), rarities
  (normal/rare/premium/unique/idol), artwork paths, and icon mappings
- `player.ts`, `matches.ts`, `guild.ts`, `gashapon.ts`, `season-pass.ts`, `webshop.ts`,
  `heroes-locker.ts` - per-page mock datasets

To wire a real API, replace the static exports in `src/data/*` with fetches (server-side,
in the page components) or a small data-fetching layer - the components' props stay the
same.

Hero data and artwork were sourced from the public Lost Saga database at
`lostsaga.xyz` (API: `apis.lostsaga.xyz/json-hero`).

## Credits

- **Hero data & artwork** - [lostsaga.xyz](https://lostsaga.xyz) Hero Database. All game
  assets, names, and characters belong to their respective owners (Lost Saga /
  the original developers). Used here non-commercially for a fan revival project.
- **Icons** - [Game Icons](https://game-icons.net) (CC BY 3.0),
  [Font Awesome](https://fontawesome.com), and
  [Heroicons](https://heroicons.com) via [react-icons](https://react-icons.github.io/react-icons/).
- **Fonts** - [Chakra Petch](https://fonts.google.com/specimen/Chakra+Petch) and
  [Inter](https://fonts.google.com/specimen/Inter).

## License

The code in this repository is licensed under the [MIT License](LICENSE).

**Important:** this license applies to the project code only. Lost Saga, its name,
characters, hero artwork, and all related game assets are the property of their
respective owners and are **not** covered by this license. This is a non-commercial
fan revival project.

---

Copyright NOVERA OSS - All Rights Reserved
