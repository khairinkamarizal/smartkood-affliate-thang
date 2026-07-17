# SmartKood Affiliate UI Redesign Plan

## Outcome

Redesign the current SmartKood and SmartAffiliate journey as a cohesive, production-quality affiliate ecommerce experience. The proposed direction is **Reward Parade**: warm, playful commerce with tactile details, a clear earnings story, and controlled color.

The experience should feel authored by a senior ecommerce product designer: characterful but disciplined, colorful but legible, conversion-focused without manipulation, and portable into another React codebase.

## Core Design Direction

The signature visual is a **commission ticket**: a colorful reward panel with a slightly offset border, a restrained perforated edge, and a dotted journey:

`Share → Friend buys → You earn`

Use this motif consistently across the product page, sharing flow, conversion email, and claim page. Avoid decorating every surface or mixing unrelated visual styles.

Suggested design foundation:

```css
:root {
  --color-ink: #19151f;
  --color-canvas: #fff8ed;
  --color-paper: #ffffff;
  --color-grape: #6847f5;
  --color-mango: #ffbd2e;
  --color-coral: #ff6b61;
  --color-mint: #32c997;
  --color-sky: #73c8f2;
  --color-muted: #746f7a;
  --color-line: #ddd5ca;

  --font-display: "Bricolage Grotesque", "Arial Black", sans-serif;
  --font-body: "Manrope", system-ui, sans-serif;
  --font-code: "IBM Plex Mono", monospace;

  --radius-control: 12px;
  --radius-card: 20px;
  --shadow-card: 0 18px 45px rgb(25 21 31 / 10%);
  --ease-out: cubic-bezier(.22, 1, .36, 1);
}
```

Color should communicate journey stages:

- Mango: earning opportunity
- Grape: primary brand/action
- Coral: sharing and social energy
- Mint: confirmed earnings/success
- Sky: informational states

Use one dominant accent per surface. Do not distribute every accent across every component.

## Current Component Audit

| Area | Current limitation | Redesign direction |
|---|---|---|
| App shell | Two-column wireframe tool; preview disappears below the entire sidebar on mobile | Three-pane desktop workspace; preview-first mobile layout |
| Sidebar | Dense flat list with weak journey context | Group screens into Discover, Share, Reward, Claim; add flow markers and compact controls |
| Product card | Placeholder image and no commerce actions | Real product media, rating, verified badge, price hierarchy, fulfillment details and purchase CTA |
| Affiliate card | Visually strong, but the black/plasma treatment feels disconnected from the storefront | Commission ticket with exact per-sale earning, projection, trust statement and affiliate journey |
| Share flow | Functional but visually generic; success state is cramped | Responsive dialog/bottom sheet, clear progression, focused social choices and better recovery states |
| Conversion email | Looks like a generic transactional email | Branded reward receipt with product thumbnail, conversion details, balance breakdown and bulletproof CTA |
| Claim page | Sterile centered form with little motivation or trust | Split reward summary/form layout, password feedback, security messaging and earnings continuity |
| Form primitives | Labels are not reliably associated with inputs; states are limited | Reusable IDs, helper/error text, validation, required indicators and 44px targets |
| Localization | Chinese content is corrupted; calculations parse localized strings | Separate data from copy, repair encoding, use `Intl.NumberFormat`, and add typed translation keys |
| Plasma | Continuous WebGL is expensive for one decorative card | Replace with lightweight CSS texture or render only when visible and motion is allowed |

## Experience Plan

### 1. Product Discovery

The product screen should feel like a real storefront rather than a wireframe:

- Real 4:5 product image with an optional thumbnail rail
- Verified seller badge and rating
- Clear current price and optional previous price
- Delivery, returns, authenticity, and stock information
- Primary purchase action
- Affiliate opportunity immediately below the purchase block
- No invented promotional claims, fake timers, or artificial scarcity

The affiliate offer should lead with an exact earning:

```text
Earn RM22.95 every time a friend buys
```

The current projected amount becomes supporting context:

```text
10 successful referrals = RM229.50
```

This is clearer, more credible, and easier to understand than leading with `RM230+`.

### 2. Affiliate Offer Card

Recommended hierarchy:

1. “Earn with this product” eyebrow
2. Large exact commission amount
3. Three-step dotted affiliate journey
4. Trust row: “No inventory · No upfront cost · Automatically tracked”
5. Primary CTA: “Create my share link”
6. Expandable “How rewards work” disclosure

Use a tactile outline, subtle paper grain, and one restrained coin animation. Remove the endless glowing plasma and spinning CTA border.

### 3. Share Dialog

Use a proper modal on desktop and a bottom sheet on mobile.

- Step 1: verify email
- Step 2: link created
- Loading state retains useful context
- Success uses one short celebratory coin/confetti motion, then stops
- Copy action announces success using `aria-live`
- Prioritize WhatsApp, Facebook, Telegram, and native share
- Place remaining networks under “More”
- Rate-limit state explains exactly when retry becomes available
- Revoked state provides a safe return action
- Focus is trapped within the modal and restored when it closes

### 4. Email and Claim Journey

The production email must be implemented separately as email-safe HTML:

- 600px maximum width
- Table layout and inline CSS
- No MUI, JavaScript, WebGL, CSS Grid, or unsupported effects
- Bulletproof CTA
- Product and conversion receipt
- Pending versus available balance clearly distinguished
- Useful plain-text fallback

The claim screen should preserve momentum from the email:

- “RM42.00 waiting for you” as the lead
- Product/referral context
- Three short account benefits
- Password visibility and strength feedback
- Inline validation
- Trust and privacy explanation
- Loading, success, and server-error states

## Playground Structure

Desktop layout:

```text
┌─────────────────┬────────────────────────────┬──────────────────────┐
│ Journey sidebar │ Responsive product preview │ Developer handoff    │
│                 │                            │ React / HTML / Prompt│
└─────────────────┴────────────────────────────┴──────────────────────┘
```

Recommended desktop columns:

```css
grid-template-columns: 272px minmax(420px, 1fr) 400px;
```

Responsive behavior:

- Below approximately 1180px, move the handoff panel into a drawer
- Below 760px, show the preview first
- Move screen navigation into a top drawer
- Move controls into a compact bottom sheet
- Open developer handoff from a `</>` toolbar button
- Never place the entire screen-navigation sidebar before the preview on mobile

## Right Developer Handoff Panel

Add a `HandoffPanel` with three tabs.

### React

- Typed props
- JSX usage example
- Token imports
- Required dependencies
- Controlled state examples
- Loading, success, disabled, and error variants

### HTML/CSS

- Self-contained semantic HTML
- CSS custom properties
- No MUI-generated class names
- Copy button with accessible confirmation
- Clear note that business logic belongs in the React integration

### Agent Prompt

- Complete visual brief
- Component states
- Responsive rules
- Accessibility and performance requirements
- Explicit anti-patterns
- Copy action and version label

Recommended source structure:

```text
src/
  design-system/
    tokens.ts
    theme.ts
    typography.ts
  features/affiliate/
    AffiliateOfferCard.tsx
    ShareDialog.tsx
    EarningsReceipt.tsx
    ClaimEarningsForm.tsx
  playground/
    JourneySidebar.tsx
    PreviewStage.tsx
    HandoffPanel.tsx
  handoff/
    affiliateHtmlTemplate.ts
    affiliateAgentPrompt.ts
```

## React Architecture Standards

- Keep product, commission, balance, and customer data separate from translations
- Never parse business values from localized display strings
- Format currency and percentages with `Intl.NumberFormat`
- Use typed component props and discriminated unions for UI states
- Keep components controlled where application state is involved
- Build screens from reusable feature components rather than copying markup
- Use the MUI theme for tokens instead of repeating raw values in `sx`
- Give every form control a stable ID and associated label
- Provide helper, validation, disabled, loading, success, and error states
- Keep touch targets at least 44×44px
- Preserve visible keyboard focus
- Use `aria-live` for asynchronous copy, submit, and reward updates
- Respect `prefers-reduced-motion`
- Avoid color-only communication
- Add component stories or visual fixtures for independent adoption

## Localization and Data Repair

Before visual implementation:

1. Repair the corrupted Simplified Chinese strings and remove placeholder question marks.
2. Move the screen definitions and metadata into one typed manifest.
3. Remove unused screen IDs or implement their missing screens.
4. Remove dead seller/editor copy if those flows are out of scope.
5. Introduce typed translation keys.
6. Use locale-aware currency, percentage, and number formatting.
7. Keep commission calculations in domain utilities with unit tests.

## Motion and Performance

- Use motion to explain state changes, not to decorate every surface
- Target 180–360ms for UI transitions
- Play celebration motion once on link creation or confirmed commission
- Pause decorative rendering when offscreen
- Provide a static fallback for reduced motion and WebGL failure
- Prefer transforms and opacity over layout-affecting animations
- Avoid persistent glow, cursor-following effects, and magnetic controls in conversion-critical UI

## Agent Implementation Prompt

```text
Redesign and implement a production-quality affiliate ecommerce journey for
SmartKood and SmartAffiliate using React, TypeScript and MUI.

AESTHETIC
Create a “Reward Parade” visual system: playful modern commerce with warm
off-white surfaces, deep ink typography, tactile borders and purposeful mango,
grape, coral and mint accents. The signature motif is a commission ticket with
a perforated edge and a dotted Share → Friend buys → You earn path.

Do not create a generic SaaS dashboard. Avoid excessive gradients,
glassmorphism, neon-purple backgrounds, arbitrary floating blobs, oversized
pills, emoji decoration, fake urgency, and identical rounded cards everywhere.

TYPOGRAPHY
Use Bricolage Grotesque for expressive display headings, Manrope for body and
controls, and IBM Plex Mono only for referral links, tokens and developer code.
Provide system fallbacks and use font-display: swap.

CORE PRODUCT EXPERIENCE
Build:
1. A credible ecommerce product card with real product media, verification,
   rating, price, fulfillment information and a purchase action.
2. A prominent affiliate offer showing the exact per-sale earning first.
3. A supporting projection for 10 successful referrals.
4. A three-step affiliate journey and concise trust messaging.
5. A primary “Create my share link” action.

SHARING FLOW
Implement initial, submitting, success, rate-limited and revoked states.
Use an accessible desktop dialog and mobile bottom sheet. Announce copied links
with aria-live. Prioritize WhatsApp, Facebook, Telegram and native share.
Celebration motion should play once and respect prefers-reduced-motion.

REWARD LIFECYCLE
Create a conversion email preview and an earnings-claim account screen.
The actual email export must use email-safe table markup and inline CSS.
Clearly distinguish pending and available earnings.

ARCHITECTURE
Use typed, reusable components and data-driven state definitions. Do not parse
business values from translated strings. Format currency and percentages with
Intl.NumberFormat. Associate labels and inputs correctly. Expose loading,
disabled, validation, success and error states through props.

PLAYGROUND
Use a three-pane desktop layout:
- journey navigation on the left;
- responsive preview in the center;
- a developer handoff panel on the right.

The handoff panel must contain React, HTML/CSS and Agent Prompt tabs with copy
actions. On mobile, show the preview first and move navigation, controls and
handoff into drawers or bottom sheets.

QUALITY BAR
Meet WCAG AA contrast, support keyboard navigation, use 44px minimum touch
targets, preserve visible focus, respect reduced motion, avoid color-only state
communication, and test at 360, 768, 1024 and 1440 pixel widths.

The final result should feel authored by a senior ecommerce product designer:
characterful but controlled, colorful but legible, conversion-focused without
being manipulative, and portable into another React codebase.
```

## Implementation Order

1. Repair the data and localization layer.
2. Add the MUI theme and shared design tokens.
3. Rebuild the playground shell and responsive navigation.
4. Redesign the product and affiliate offer together.
5. Refactor all share-dialog states.
6. Redesign the email and claim journey.
7. Add the React, HTML/CSS, and agent-prompt handoff tabs.
8. Validate accessibility, localization, performance, and all breakpoints.
9. Add component stories or visual fixtures.

## Validation Matrix

Test every relevant state at 360px, 768px, 1024px, and 1440px widths.

- Keyboard-only navigation and focus restoration
- Screen-reader labels and live announcements
- WCAG AA color contrast
- Reduced-motion behavior
- Long English, Malay, and Chinese text
- Empty, loading, disabled, success, and server-error states
- Clipboard failure and unavailable native sharing
- Rate limiting and revoked affiliate tokens
- Email rendering in major desktop and mobile clients
- Static HTML and React handoff output
- Production build, lint, and visual regression checks

## Definition of Done

- Every screen belongs to one coherent affiliate-commerce visual system.
- The affiliate earning amount and reward mechanics are immediately understandable.
- The mobile preview is reachable before navigation and configuration controls.
- All controls are keyboard and screen-reader accessible.
- Localization and currency formatting are correct and data-driven.
- The email export is safe for real email clients.
- The right handoff panel provides copyable React, HTML/CSS, and agent-prompt artifacts.
- Another developer can adopt the components without reverse-engineering playground-specific code.
