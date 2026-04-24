# Design Brief: Self-Learning Companion

## Purpose & Tone
Educational platform bridging learner motivation with AI-powered adaptive tutoring. Tone: warm, encouraging, authoritative tutor energy. Emotional state: optimism, progress, achievement.

## Visual Direction
**Aesthetic:** Premium educational tech with layered depth hierarchy. **Differentiation:** Animated progress indicators, gamification highlights (badges, streaks, points), multi-zone card composition reflecting learning flow (dashboard → module → quiz → report).

## Color Palette

| Role                 | OKLCH (Light)        | OKLCH (Dark)         | Purpose                          |
| -------------------- | -------------------- | -------------------- | -------------------------------- |
| primary              | 0.7 0.11 250 (blue)  | 0.75 0.12 250        | Trust, learning focus, CTAs      |
| accent               | 0.68 0.25 45 (orng)  | 0.72 0.28 45         | Badges, points, highlights, wins |
| secondary            | 0.85 0.09 250        | 0.2 0 0              | Subtle depth, alt surfaces       |
| muted                | 0.92 0 0             | 0.2 0 0              | Disabled, faded states           |
| destructive          | 0.55 0.22 25 (red)   | 0.65 0.19 22         | Errors, warnings                 |
| chart-1 to chart-5   | Vibrant multi-hue    | Vibrant multi-hue    | Progress reports, visualizations |

**Palette strategy:** Warm blue primary (0.7 sat, hue 250) establishes trust and focus. Vibrant accent orange (0.68 L, 0.25 C, hue 45) signals achievements, rewards, motivation. Muted greys create breathing room. Light mode: cream backgrounds (0.98 L) with subtle borders (0.88 L). Dark mode: deep navy (0.12 L) with elevated cards (0.16 L).

## Typography
- **Display:** General Sans, 700 weight for headings (dashboard titles, badge labels)
- **Body:** General Sans, 400–500 for body text, chat messages, form labels (clean, high-readability sans-serif)
- **Mono:** Geist Mono for code blocks, user IDs, timestamps in chat history

## Elevation & Depth
- **Layer 0 (background):** Lightest zone, page-level background
- **Layer 1 (card):** Medium-light, content cards with subtle shadow (shadow-subtle: 2px 8px)
- **Layer 2 (elevated):** Prominent surfaces—chat bubbles, badges, highlighted progress rings (shadow-elevated: 12px 32px)
- **Layer 3 (modal):** Overlay, topmost; popover & dialogs use primary ring color

## Structural Zones

| Zone                   | Light Mode             | Dark Mode              | Behavior                                   |
| ---------------------- | ---------------------- | ---------------------- | ------------------------------------------ |
| Header                 | bg-card, border-b      | bg-card, border-b      | White card with subtle border; user profile icon, points counter, theme toggle, logout |
| Sidebar Navigation     | bg-sidebar, border-r   | bg-sidebar, border-r   | Vertical nav: Dashboard, Topics, Quiz, Progress, Profile; active state uses sidebar-primary |
| Main Content           | bg-background          | bg-background          | Full-bleed content area; white/dark grey minimal texture |
| Content Cards          | bg-card + shadow-subtle | bg-card + shadow-subtle | Topic cards, quiz cards, progress modules with hover lift effect (shadow-elevated) |
| Chat Area              | bg-muted/5             | bg-muted/5             | Subtle background for message flow; AI messages (bg-secondary), user messages (bg-primary/10) |
| Progress Visualization | Chart colors (1–5)     | Chart colors (1–5)     | Line charts, bar charts, ring indicators; uses chart-1 through chart-5 OKLCH tokens |
| Badges & Gamification  | bg-accent, shadow-elevated | bg-accent, shadow-elevated | Streak indicators, badge displays, point counters with accent-glow and badge-pulse animation |
| Footer                 | bg-muted/30, border-t  | bg-muted/30, border-t  | Legal, privacy links; minimal secondary-foreground text |

## Spacing & Rhythm
- **Gutters:** 16px mobile (sm:), 24px tablet (md:), 32px desktop (lg:)
- **Card padding:** 20px internal spacing for content cards
- **Typography spacing:** 4px between lines in chat, 8px between messages
- **Grid rhythm:** 4px base unit; cards span on 12-column grid

## Component Patterns
- **Cards:** Rounded corners (var(--radius) = 10px), subtle borders, transition-smooth on hover
- **Buttons:** Primary (bg-primary, text-primary-foreground), ghost (border-primary), small/medium/large size variants
- **Forms:** Input bg-input with border-border, focus ring-primary; labels uppercase, 12px weight-600
- **Chat bubbles:** AI (bg-secondary, rounded-full radiating effect), User (bg-primary, shadow-elevated), timestamps in muted-foreground
- **Progress rings:** Animated stroke-dashoffset, uses progress-ring animation, accent color

## Motion & Interaction
- **Default transition:** transition-smooth (0.3s cubic-bezier) on all interactive elements
- **Chat messages:** message-fade animation (0.3s, fade + slide up)
- **Badge unlocks:** badge-pulse (2s, opacity wobble) + accent glow streak-glow
- **Progress updates:** progress-ring (0.6s stroke animation)
- **Hover states:** Lift cards with shadow-elevated, buttons darken hue by 5% via oklch
- **Disable state:** Opacity 50%, pointer-events-none

## Responsive Breakpoints
- **sm (640px):** Single-column layout, hamburger sidebar, full-width cards
- **md (768px):** 2-column grid, sidebar toggles visible, 24px padding
- **lg (1024px):** 3-column grid, persistent sidebar, 32px padding
- **2xl (1400px):** Container padding caps at 32rem center content, sidebar fixed 240px

## Signature Detail
**Animated progress ring indicator** on dashboard: SVG circle with dynamic stroke-dashoffset reflecting % completion of daily goal. On unlocking badges, ring scales briefly with streak-glow box-shadow effect, celebrating achievement.

## Constraints & Guardrails
- NO purple gradients; NO generic "Bootstrap blue"
- Primary blue is 0.7 L, 0.11 C, 250 H — warm, muted, sophisticated
- Accent orange is NEVER used for background fills except badges/buttons
- ALL transitions use transition-smooth cubic-bezier, NO linear timing
- Chart colors strictly: chart-1 (accent orange), chart-2 (primary blue), chart-3/4/5 (cool palette variants)
- Sidebar navigation active state: bg-sidebar-accent with sidebar-primary text, NOT inverted primary color
- Dark mode is NOT inverted; backgrounds lighter than light mode's card, but depth preserved via secondary/muted layering

## Dark Mode Strategy
Light mode: Warm, cream-based backgrounds (0.98 L) with muted blues in UI chrome. Dark mode: Deep navy (0.12 L) with slightly raised card surfaces (0.16 L), maintaining visual hierarchy through layer-stacking rather than pure lightness flip. Primary color warmed slightly (0.75 L vs 0.7 L) for visibility. All text contrast ≥ 4.5:1 (WCAG AA+).
