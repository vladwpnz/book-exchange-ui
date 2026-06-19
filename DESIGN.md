---
name: Book Exchange
description: A dark editorial library interface for exchanging books, with a calm product workspace behind it.
colors:
  page-dark: "#1a1613"
  page-dark-raised: "#251f1a"
  paper-dark: "#2b231d"
  surface-dark: "#302820"
  surface-dark-strong: "#3a3027"
  ink-dark: "#f4eadb"
  ink-dark-soft: "#e2d3c1"
  muted-dark: "#b8aa98"
  border-dark: "#57473a"
  border-dark-strong: "#7a6452"
  copper: "#d7835c"
  copper-strong: "#f0a172"
  copper-soft-dark: "#493226"
  forest: "#9fbea5"
  forest-soft-dark: "#26362b"
  blue-muted: "#9db0a8"
  blue-soft-dark: "#25322f"
  gold: "#d6aa63"
  gold-soft-dark: "#49371f"
  danger: "#e48c76"
  danger-soft-dark: "#4c2b26"
  page-light: "#f7f0e6"
  paper-light: "#fffaf2"
  surface-light: "#fffdf8"
  ink-light: "#241c17"
  muted-light: "#675d53"
  border-light: "#ded1c1"
  accent-light: "#8f3f2b"
typography:
  display:
    fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0"
  headline:
    fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "0"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 750
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  sm: "0.375rem"
  md: "0.625rem"
  lg: "0.75rem"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "3.5rem"
components:
  button-primary:
    backgroundColor: "{colors.copper}"
    textColor: "{colors.page-dark}"
    rounded: "{rounded.md}"
    padding: "0.72rem 1rem"
  button-primary-hover:
    backgroundColor: "{colors.copper-strong}"
    textColor: "{colors.page-dark}"
    rounded: "{rounded.md}"
    padding: "0.72rem 1rem"
  button-secondary:
    backgroundColor: "{colors.surface-dark-strong}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.md}"
    padding: "0.72rem 1rem"
  input-field:
    backgroundColor: "{colors.page-dark-raised}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.md}"
    padding: "0.875rem 1rem"
  card-surface:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.lg}"
    padding: "1rem"
---

# Design System: Book Exchange

## 1. Overview

**Creative North Star: "The Lamplit Archive"**

Book Exchange already has the bones of a warm, serious library interface: dark shelves, paper surfaces, copper actions, restrained borders, serif display type, and compact product panels. The design should feel like an after-hours archive where a visitor discovers a carefully built exchange system, then steps into a practical workspace to manage real books.

The Landing page is allowed to become cinematic, story-led, and materially rich. The authenticated app is not. Product routes under `/app/*`, auth screens, forms, tables, toasts, and workflow panels should keep their current calm density and predictable controls while the Landing page carries the ambitious 3D book and scroll-driven story.

The system rejects playful, cartoonish, neon, fantasy, and generic SaaS patterns. It should avoid excessive cards, nested boxes, decorative clutter, repeated section eyebrows, template metric blocks, and any visual move that makes books feel secondary to UI furniture.

**Key Characteristics:**

- Dark editorial library atmosphere with warm paper and copper accents.
- Book-first visual language through covers, shelves, catalog cards, and exchange states.
- Serif display typography for editorial weight, system sans for task clarity.
- Quiet product components with visible focus, semantic states, and reduced-motion support.
- Landing ambition contained to the public brand surface, not leaked into routine workflows.

## 2. Colors

The palette is a dark warm-neutral system with copper as the primary action accent, paper tones as material surfaces, and muted forest, blue, gold, and danger tones reserved for status and book-cover variety.

### Primary

- **Copper Lamp** (`copper`): The main action and brand accent. Use for primary buttons, selected states, active navigation, focus-adjacent emphasis, and a small amount of Landing narrative detail.
- **Bright Copper Edge** (`copper-strong`): Hover and high-emphasis accent. Use sparingly so it feels like light catching on an edge, not a neon highlight.
- **Burnished Copper Wash** (`copper-soft-dark`): Dark-theme selected backgrounds and accent panels.

### Secondary

- **Catalog Green** (`forest`, `forest-soft-dark`): Success, available books, and one of the book-cover tones.
- **Muted Ledger Blue** (`blue-muted`, `blue-soft-dark`): Informational states, author metadata, and quiet secondary categorization.

### Tertiary

- **Aged Gold** (`gold`, `gold-soft-dark`): Warning, pending, and cautionary states. It should read as operational attention, not luxury decoration.
- **Return Red** (`danger`, `danger-soft-dark`): Destructive or recovery actions only.

### Neutral

- **Archive Black** (`page-dark`): Default page background in dark mode.
- **Raised Shelf** (`page-dark-raised`): Slightly lifted page layer and table head atmosphere.
- **Dark Paper** (`paper-dark`): Editorial and panel material in dark mode.
- **Desk Surface** (`surface-dark`, `surface-dark-strong`): Main product panels, cards, menus, and controls.
- **Warm Ink** (`ink-dark`, `ink-dark-soft`): Primary and secondary readable text.
- **Shelf Dust** (`muted-dark`): Supporting copy and metadata. Keep contrast high enough for body text.
- **Old Binding Line** (`border-dark`, `border-dark-strong`): Borders, dividers, and controlled separation.
- **Light Mode Paper Set** (`page-light`, `paper-light`, `surface-light`, `ink-light`, `muted-light`, `border-light`, `accent-light`): Existing light theme fallback. Preserve it, but treat dark as the brand-default atmosphere.

### Named Rules

**The Copper Rarity Rule.** Copper is a signal, not a wash. If more than roughly 10 percent of a product screen is copper, the interface is shouting.

**The Paper Material Rule.** Paper tones should feel like surfaces that hold content. Do not use warm neutrals as filler decoration around unrelated UI.

**The Status Discipline Rule.** Forest, blue, gold, and danger are semantic colors first. Do not repurpose them as decorative palette noise on the authenticated app.

## 3. Typography

**Display Font:** Georgia, Cambria, 'Times New Roman', Times, serif
**Body Font:** Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
**Label/Mono Font:** No mono family is currently part of the system.

**Character:** The current pairing is traditional and pragmatic: a familiar serif gives books and headings an editorial gravity, while the sans stack keeps forms, nav, labels, and tables efficient. Do not add another decorative family casually; future Landing typography should be chosen as a deliberate brand decision, not a reflex.

### Hierarchy

- **Display** (600, up to about 4.5rem, line-height 1): Landing hero titles and major page headers only.
- **Headline** (600, 2rem to 3rem, line-height 1.1 to 1.2): Section headings, product page titles, catalog titles, and form headings.
- **Title** (600, 1.5rem to 2rem, line-height 1.15 to 1.25): Book titles, card headings, workflow titles, and compact panel headings.
- **Body** (400 to 600, 0.875rem to 1rem, line-height 1.5 to 1.75): Descriptions, form help, table metadata, and state messages. Keep prose lines near 65 to 75 characters when it is not tabular data.
- **Label** (700 to 800, 0.75rem to 0.875rem, letter-spacing 0.14em to 0.18em): Short section labels and state labels only. Repetition of tiny tracked labels across every Landing section is prohibited.

### Named Rules

**The Library Voice Rule.** Serif type is for bookish hierarchy and atmosphere; sans type is for action and comprehension.

**The No Costume Mono Rule.** Do not add monospace as shorthand for "technical" unless the content is genuinely code, logs, or tabular identifiers.

## 4. Elevation

The system uses a hybrid of tonal layering, 1px borders, and restrained shadows. Resting product panels rely mostly on surface color and borders. Hovered cards and menus lift with a deeper shadow, but the authenticated app should remain quiet and readable.

### Shadow Vocabulary

- **Resting Restraint** (`0 1px 2px rgba(...)`): Default panel, card, button, and menu grounding.
- **Hover Lift** (`0 18px 36px rgba(...)`): Hovered cards, dropdown menus, and toasts. Use for real interactive elevation only.
- **Book Cover Inset** (`inset 0 0 0 1px ... , 0 12px 22px ...`): The distinctive physical-book treatment for `BookCover`.
- **Focus Ring** (`0 0 0 3px rgba(...)`): Inputs and controls use visible copper focus treatment.

### Named Rules

**The Lift Has a Job Rule.** Shadows appear because something is interactive, floating, selected, or urgent. Never add soft shadows just to make a section feel designed.

**The No New Ghost Cards Rule.** New Landing work should prefer full-bleed scenes, type, WebGL/canvas, and material transitions over stacks of bordered cards with broad decorative shadows.

## 5. Components

### Buttons

- **Shape:** Gently squared controls (`0.625rem`) with stable height around `2.65rem`.
- **Primary:** Copper fill with strong weight, used for the main action on a surface.
- **Hover / Focus:** Small translate lift on hover, stronger copper on hover, visible outline or focus ring on keyboard focus.
- **Secondary / Ghost / Danger:** Secondary is surface-filled with border; ghost is transparent until hover; danger uses semantic red and should be reserved for transfer or recovery actions with consequence.

### Chips

- **Style:** Rounded pills with border, tonal background, and bold small text.
- **State:** Status chips use semantic colors: success for available or active, warning for pending or borrowed attention, info for neutral notices, accent for shared states.

### Cards / Containers

- **Corner Style:** Product cards and panels sit around `0.7rem` to `0.75rem`; avoid larger radii on cards.
- **Background:** Product surfaces use `surface-dark`, `surface-dark-strong`, `paper-dark`, and `page-dark-raised`.
- **Shadow Strategy:** Resting panels stay restrained; hover lift is allowed for clickable cards.
- **Border:** Borders are part of the material system. Do not add heavy side stripes to new Landing sections.
- **Internal Padding:** Compact product cards usually use `1rem`; larger panels use `1.25rem` to `1.5rem`.

### Inputs / Fields

- **Style:** Full-width, 1px border, warm dark input background, `0.625rem` radius, and comfortable vertical padding.
- **Focus:** Border shifts toward copper and receives a visible copper ring.
- **Error / Disabled:** Error is handled through `StateMessage` and semantic red; disabled fields retain border and muted text instead of disappearing.

### Navigation

- **Style:** Sticky top navigation with translucent dark surface and backdrop blur. Brand mark combines a small book glyph with the Book Exchange name and a contextual label.
- **Product Nav:** Desktop `/app/*` uses a left sidebar; mobile uses a horizontal scroll nav. Active states use copper border and soft accent background.
- **Landing Nav:** Public nav keeps language selection and auth actions visible. Future Landing animation must not obscure login/register access.

### Book Cover

The `BookCover` component is the signature primitive. It uses a narrow spine, paper-like gradients, serif initials, tiny genre labels, and subtle inset shadow to make books feel physical without relying on external images. Future 3D book work should evolve from this physical language rather than replace it with generic object rendering.

### Page Headers

`PageHeader` combines a page-hero panel, serif title, short tracked label, description, optional action, and a thin motion line. This is product-page hierarchy, not a Landing-section template. Do not repeat the same label/title/card grammar across a cinematic Landing story.

### State Messages and Toasts

State surfaces are semantic, compact, and readable. They use role/live attributes, colored markers, tonal backgrounds, and optional actions. Preserve this clarity for loading, empty, error, warning, success, and admin recovery states.

### Tables

Admin tables use warm table-head surfaces, clear row borders, semantic status chips, and horizontal overflow on smaller screens. Keep table affordances familiar and dense; do not cinematicize operational data.

## 6. Do's and Don'ts

### Do:

- **Do** treat the Landing page as the brand surface for cinematic book storytelling.
- **Do** preserve the authenticated product interface as a calm, task-first workspace.
- **Do** use warm paper, copper, serif display type, and physical book details when they clarify the Book Exchange identity.
- **Do** keep reduced-motion behavior for route transitions, theme changes, and the future scroll story.
- **Do** let the future 3D book feel materially connected to the existing `BookCover` language.
- **Do** use full-bleed scenes, scroll pacing, and asymmetric editorial moments on Landing when they serve the story.
- **Do** keep forms, tables, nav, errors, empty states, and toasts predictable and accessible.

### Don't:

- **Don't** make the brand playful, cartoonish, neon, fantasy, or generic SaaS.
- **Don't** add excessive cards, nested boxes, decorative clutter, loud gradients, mascot-like illustration, or stock startup dashboard visuals.
- **Don't** turn every Landing section into a tiny uppercase eyebrow plus headline plus identical card grid.
- **Don't** use template metric blocks as the proof of value; show books, exchange behavior, and atmosphere instead.
- **Don't** spread cinematic motion into `/app/*`, auth forms, admin tools, or routine exchange workflows.
- **Don't** use colored side-stripes or broad ghost-card shadows as new decorative scaffolding.
- **Don't** let the 3D or scroll-driven experience hide content, trap keyboard users, or fail when reduced motion is enabled.
