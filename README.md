# Ironhouse Fitness Studio

Single-page fitness studio site built with plain HTML5 and CSS3 — no frameworks, no build step.

## Run it

Open `index.html` in a browser. That's it.

## What's inside

- **Class schedule** — weekly timetable (Mon–Sat, 4 time slots)
- **Trainer bios** — four coach cards
- **Membership tiers** — three pricing cards with a featured middle tier

## Where Flexbox and Grid are used

| Layout technique | Where |
| --- | --- |
| CSS Grid | Class schedule (`schedule-grid` — 7 columns: time + 6 days) and pricing tiers (`pricing-grid` — 3 columns) |
| Flexbox | Header nav, trainer cards (`trainer-flex` with `flex: 1 1 240px` so cards wrap), footer |

On screens under 640px the schedule restacks from a grid into one card per
time slot, with day labels added via `::before` — same HTML, different CSS.

## CSS notes

- `box-sizing: border-box` is set globally on `*, *::before, *::after`
- All colors are custom properties in `:root` (e.g. `--color-primary`)
- Responsive breakpoints: 820px (pricing stacks), 640px (schedule restacks), 560px (nav stacks)
- `overflow-x: hidden` on `body` as a safety net against horizontal scroll
