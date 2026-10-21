# Portfolio — Keanu Plysier

**[View the live site → https://keanuplysier3.github.io/Portfolio/](https://keanuplysier3.github.io/Portfolio/)**

A one-page portfolio for a Digital Design & Development student at Howest (major Development, minor UX), built with React Router and React Spectrum. It is made for the internship search of 2027.

The page runs top to bottom through six parts:

| Part | What it shows |
|---|---|
| Hero | Name, a short tagline and the sun mark on a heat gradient, with an intro animation |
| Ticker | A looping strip of the technologies I work with |
| 01 About me | Who I am, education, languages and a few traits |
| 02 Selected work | Three development projects (Plan A, HeatCheck, MoMu Dirk) |
| 03 UX & visual design | Four smaller UX and design projects as cards |
| 04 More code | A keyboard-navigable list of smaller code projects on GitHub |
| 05 Contact | Email with a copy button, phone, GitHub, Behance and Figma, then the footer |

It has a light and a dark theme (the sun in the nav switches between them), follows the visitor's system setting on first load, and has its own layout for phones.

## How it was made

**Design.** The design was mainly made with Claude, based on design inspiration I brought myself (a Swiss-poster look: one hot colour, big Inter type, small mono labels). I then made multiple adjustments to it. The result lives in a Figma brandboard that covers the mark, colour, type, mood and interface elements. The CSS variables in [`app/brand.css`](app/brand.css) come from that board.

**Build.** I built the project myself in React and used Claude Code as a coding assistant along the way. All layout, styling, animation and content decisions were checked against the design and adjusted by hand.

## React Spectrum in this project

React Spectrum is Adobe's design system. It is split into layers, and this project uses two of them:

```
@react-spectrum/s2        React Spectrum S2    Adobe's styled components and theming
        │ built on
react-aria-components     React Aria Components   the same components, with behaviour and accessibility but no styling
        │ built on
react-aria / react-stately   React Aria + React Stately   the hooks underneath: interaction, accessibility, state
```

Spectrum's value is **behaviour and accessibility**: keyboard use, focus handling, screen-reader roles, and press events that work the same for mouse, touch and keyboard. Its own styling is Adobe's look, though, and this portfolio has its own brand. So I used each layer for what it is good at:

- **S2** for the app-level setup (`Provider`) and the one place where Adobe's own look is acceptable, the toast notification.
- **React Aria Components** for every interactive element whose look matters. They give the behaviour with no styling, and I style them with my own tokens through their `data-*` attributes (`data-hovered`, `data-pressed`, `data-selected`, `data-focus-visible`).
- **Plain HTML** (`h1`, `p`, `img`) for text and images, where Spectrum would add nothing and fight the branding.

### Components used

| Component | Library | Where | Why |
|---|---|---|---|
| `Provider` | `@react-spectrum/s2` | [`app/root.tsx`](app/root.tsx) | The root every Spectrum app needs. Its `router` prop connects React Spectrum and React Aria links to React Router, so links navigate without reloading the page. I wrapped React Router's `useHref` so external URLs like `https://github.com/...` pass through untouched; without that they were rewritten into broken paths. |
| `ToastContainer` + `ToastQueue` | `@react-spectrum/s2` | [`app/root.tsx`](app/root.tsx), [`app/components/contact.jsx`](app/components/contact.jsx) | The "Email copied" notification. `ToastContainer` is rendered once in the root, and `ToastQueue.positive("Email copied", { timeout: 5000 })` is a single function call that shows a toast. It dismisses itself, has a close button, and is announced to screen readers as an alert. S2's toast has no `className` or `style` prop, so its colours (Bone background, Ink text, orange check icon) are set from outside with a few CSS rules at the end of [`app/app.css`](app/app.css). Those rules depend on S2's current markup, so they are worth re-checking after an S2 update. |
| `SwitchField` + `SwitchButton` | `react-aria-components` | [`app/components/nav.jsx`](app/components/nav.jsx) | The light/dark toggle. It is a real accessible switch: it announces its on/off state, works with the keyboard and shows a focus ring. The sun is drawn inside it. I used this pair because the older `Switch` is marked deprecated in the installed version. |
| `ListBox` + `ListBoxItem` | `react-aria-components` | [`app/components/moreCode.jsx`](app/components/moreCode.jsx), [`work.jsx`](app/components/work.jsx), [`about.jsx`](app/components/about.jsx), [`design.jsx`](app/components/design.jsx) | The "More code" project list, the tags on each project, and the Design cards. The arrow keys move between items, Enter opens a link, and each list is one tab stop instead of one per item. Tab and Shift+Tab move between lists. Items that link out are real links (`href`). |
| `Button` | `react-aria-components` | [`app/components/contact.jsx`](app/components/contact.jsx) | The COPY button for my email address. Press handling is consistent across mouse, touch and keyboard, and it exposes hover, pressed and focus states for styling. Pressing it copies the address and shows the toast above. |
| `Link` | `react-aria-components` | [`contact.jsx`](app/components/contact.jsx), [`work.jsx`](app/components/work.jsx), [`design.jsx`](app/components/design.jsx) | The external links: GitHub, Behance, Figma, "View project" and the Design cards. They get hover and keyboard-focus states (`data-hovered`, `data-focus-visible`) that don't stick after a tap on a touch screen, and they go through the same router setup as the rest of the app. Same-page anchors like `#about` stay plain `<a>` so the browser scrolls natively. |

`@react-spectrum/s2` also provides a `style()` macro for styling its own components. It is set up in [`vite.config.ts`](vite.config.ts) (through `unplugin-parcel-macros`) and its CSS layer order is declared in [`app/app.css`](app/app.css), but no S2-styled component other than the toast is used yet.

### Future components

Ideas for using more of Spectrum later. Everything below exists in the installed versions of S2 and React Aria Components.

| Component | Where | Idea |
|---|---|---|
| `TooltipTrigger` + `Tooltip` | the theme toggle in the nav | The toggle is only a sun icon, so nothing says what it does. A tooltip would say "Switch to dark mode" on hover and keyboard focus. |
| `DialogTrigger` + `Modal` + `Dialog` | the Work project images | Open an image large, with Escape to close and focus kept inside the dialog. |
| `ToggleButtonGroup` or `TagGroup` | More code | Filter the projects by type (mobile app, hardware, static site, ...), with selection state and arrow-key navigation built in. |
| `Disclosure` or S2's `Accordion` | About, on phones | Collapse the Education and Languages blocks on small screens to shorten the page. |
| `MenuTrigger` + `Menu` | the nav, on phones | The phone design has a "MENU" button. A menu popup could bring the section links back without crowding the header, if I decide the phone nav is worth having. |

## Other libraries

| Library | Used for |
|---|---|
| React 19 + React Router 8 | The app. React Router runs in framework mode with server rendering off, so the site is a static single-page app. |
| Vite 8 | Dev server and build. |
| GSAP, `@gsap/react` | The hero intro (SplitText on the title) and the scroll-driven fade-ins (ScrollTrigger). All animation is skipped for visitors who prefer reduced motion. |
| Inter, Geist Mono | The two typefaces, loaded from Google Fonts. |

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build      # static site in build/client
```

**Deploying.** Every push to the main branch runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which typechecks, builds and publishes to GitHub Pages. GitHub project sites live under `/<repo-name>/`, so the workflow sets `BASE_PATH` to the repository name, which the router and Vite pick up. Locally it is unset and the site is served from `/`.

## Project structure

```
app/
  routes/home.tsx        the page: hero, ticker, sections, footer
  components/            one file per section (hero, nav, about, work, design, moreCode, contact, footer, ticker)
                         plus SunIcon, the brand mark as an inline SVG coloured with currentColor
  hooks/                 useReveal (scroll fade-in), useTitleReveal (big-title word animation)
  brand.css              design tokens from the brandboard: colours, type, spacing, radii, themes
  reset.css              CSS reset, in a cascade layer below Spectrum's styles
  app.css                layout and component styles, including the phone layout at the end
  root.tsx               document shell, Spectrum Provider, favicon and font links
assets/                  project screenshots and the portrait
public/                  favicon (the sun)
```

## Accessibility notes

- Interactive elements come from React Aria Components, so keyboard navigation, focus rings and ARIA roles are handled by the library.
- Animation respects `prefers-reduced-motion`.
- The "Email copied" toast is announced to screen readers as an alert, as well as shown.
- Colour is set through theme tokens, so text keeps its contrast in both the light and the dark theme.
