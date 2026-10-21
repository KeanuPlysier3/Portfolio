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
| `ToggleButton` | `react-aria-components` | [`app/components/nav.jsx`](app/components/nav.jsx) | The light/dark toggle. It exposes its on/off state to screen readers (`aria-pressed`), works with the keyboard and shows a focus ring. The sun is drawn inside it. I first built it as a `SwitchField` + `SwitchButton`, but a switch's only focusable element is a hidden `<input>`, so a tooltip never opened on hover. A `ToggleButton` is one visible, focusable element. |
| `TooltipTrigger` + `Tooltip` | `@react-spectrum/s2` | [`app/components/nav.jsx`](app/components/nav.jsx) | The toggle is only a sun icon, so the tooltip says "Toggle theme" on hover and on keyboard focus. Both `delay` and `closeDelay` are 0: by default the tooltip waits 1.5 s to open and 0.5 s to close. S2's types leave `closeDelay` out, but it is passed through to React Aria at runtime, so it may stop working after an S2 update. |
| `ListBox` + `ListBoxItem` | `react-aria-components` | [`app/components/moreCode.jsx`](app/components/moreCode.jsx), [`work.jsx`](app/components/work.jsx), [`about.jsx`](app/components/about.jsx), [`design.jsx`](app/components/design.jsx) | The "More code" project list, the tags on each project, and the Design cards. The arrow keys move between items, Enter opens a link, and each list is one tab stop instead of one per item. Tab and Shift+Tab move between lists. Items that link out are real links (`href`). |
| `Button` | `react-aria-components` | [`app/components/contact.jsx`](app/components/contact.jsx) | The COPY button for my email address. Press handling is consistent across mouse, touch and keyboard, and it exposes hover, pressed and focus states for styling. Pressing it copies the address and shows the toast above. |
| `DialogTrigger` + `ModalOverlay` + `Modal` + `Dialog` | `react-aria-components` | [`app/components/work.jsx`](app/components/work.jsx) | The lightbox on the Work project images. Each image is a `Button` (a bare `<img>` is not pressable) inside a `DialogTrigger`, and pressing it opens the image large. Escape, a click on the backdrop (`isDismissable`) and the close button (the `close` function from `Dialog`'s render prop) all close it; focus is trapped inside while open and returns to the image afterwards. The overlay and modal are styled with `data-entering` and `data-exiting` for the fade. |
| `Link` | `react-aria-components` | [`contact.jsx`](app/components/contact.jsx), [`work.jsx`](app/components/work.jsx), [`design.jsx`](app/components/design.jsx) | The external links: GitHub, Behance, Figma, "View project" and the Design cards. They get hover and keyboard-focus states (`data-hovered`, `data-focus-visible`) that don't stick after a tap on a touch screen, and they go through the same router setup as the rest of the app. Same-page anchors like `#about` stay plain `<a>` so the browser scrolls natively. |

`@react-spectrum/s2` also provides a `style()` macro for styling its own components. It is set up in [`vite.config.ts`](vite.config.ts) (through `unplugin-parcel-macros`) and its CSS layer order is declared in [`app/app.css`](app/app.css), but no S2-styled component other than the toast is used yet.

### How the components fit together

**Triggers need a pressable child.** `TooltipTrigger` and `DialogTrigger` hold the open/closed state and pass it to their children through React context, so there is no `useState` and no visible link between the trigger and what it opens. The first child must be something focusable and pressable (`Button`, `Link`, `ToggleButton`), because the library attaches its hover, focus and press handlers to it. That is why the lightbox image is wrapped in a `Button`, and why the theme toggle is a `ToggleButton` instead of a switch: a switch's only focusable element is a visually hidden `<input>`, so the tooltip's hover handlers and position anchor ended up on an element nobody can point at.

**Closing the lightbox.** `ModalOverlay` is the dimmed backdrop and takes `isDismissable`, so a click outside closes the dialog. `Modal` is the box in front of it. `Dialog` gives its children a `close` function through a render prop (`{({ close }) => ...}`), which the ✕ button calls, and Escape closes it by default. Because the overlay renders in a portal at the end of `<body>`, it sits outside the `.project` element that the scroll-reveal animation targets.

**Styling through `data-*` attributes.** React Aria Components render no styles of their own, but they set attributes for each state, and the CSS reacts to those:

| Attribute | Set when | Used for |
|---|---|---|
| `data-hovered` | the pointer is over the element | the sun rotating on the toggle, link and card hover |
| `data-pressed` | the element is being pressed | the COPY button |
| `data-selected` | a toggle or list item is on | the sun turning Ink in dark mode |
| `data-focus-visible` | keyboard focus, not mouse | focus rings on every control |
| `data-entering` / `data-exiting` | an overlay is opening or closing | the lightbox fade |

**Keyboard behaviour.** Each `ListBox` is a single tab stop: arrow keys move between its items and Enter opens a link, so a list of tags doesn't add a dozen tab stops. The toggle, COPY button, image buttons and links are all reachable with Tab and show a focus ring.

**Which library, and why.** Anything with Adobe's look comes from S2 (the toast, the tooltip, and the `Provider`). Anything whose look is mine comes from React Aria Components. The tooltip is S2 because a small dark label is the one case where Adobe's default is fine, and it also works with the unstyled `ToggleButton` from React Aria.

## Other libraries

| Library | Used for |
|---|---|
| React 19 + React Router 8 | The app. React Router runs in framework mode with server rendering off, so the site is a static single-page app. |
| Vite 8 | Dev server and build. |
| GSAP, `@gsap/react` | The hero intro (SplitText on the title) and the scroll-driven fade-ins (ScrollTrigger). All animation is skipped for visitors who prefer reduced motion. |
| respimagen | Generates the resized WebP images in `assets/responsive/`: `npx respimagen ./assets -s 350,500,700 -t webp`. Each `<img>` uses a `srcSet` of those widths plus a `sizes` hint, so browsers download only the size they need. |
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
  responsive/            WebP versions of each image at 350, 500 and 700 px wide
public/                  favicon (the sun)
```

## Accessibility notes

- Interactive elements come from React Aria Components, so keyboard navigation, focus rings and ARIA roles are handled by the library.
- Animation respects `prefers-reduced-motion`.
- The "Email copied" toast is announced to screen readers as an alert, as well as shown.
- Colour is set through theme tokens, so text keeps its contrast in both the light and the dark theme.
