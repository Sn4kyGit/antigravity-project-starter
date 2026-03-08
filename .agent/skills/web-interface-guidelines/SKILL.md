---
name: web-interface-guidelines
description: "Master of Web Interface Guidelines and high-craft Frontend Aesthetics. Enforces Vercel UI rules (Accessibility, Focus, Forms) and uncompromising, bold design directions (no generic AI aesthetics). Use when building, reviewing, or styling any React/Next.js/HTML UI."
category: frontend
risk: safe
tags: "[frontend, design, ui, ux, guidelines, aesthetics, vercel, a11y, styling]"
version: "1.0.0"
---

# Web Interface Guidelines & Aesthetics

## Purpose
This skill ensures that all UI code generated for `project_game_pulse` strictly follows the highest standards of interaction design (adapted from Vercel Labs) AND possesses a bold, differentiated aesthetic character (avoiding "AI slop").

## When to Use
- **Gate 3 (PLAN):** When conceptualizing the look and feel of a new page or component.
- **Gate 4 (IMPLEMENT):** When writing interactive React/Next.js components, CSS, and animations.
- **Gate 5 (VERIFY):** When auditing a UI for accessibility, usability, and design quality.

---

## Part 1: High-Craft Aesthetics (The "No Generic AI" Mandate)

Before coding, commit to an intentional aesthetic direction:
- **Bold Direction:** Choose a defined look (Minimalist, Brutalist, Retro, Luxury, etc.). Do not blend into a generic middle-ground.
- **Typography:** Avoid generic default fonts (Arial, standard Inter) as the sole identity. Pair a characterful display font with a highly legible body font.
- **Color & Theme:** Define strong, cohesive CSS palettes. Avoid default "purple-gradient-on-white" cliches unless strictly aligned with the brand.
- **Layout & Space:** Embrace asymmetry, purposeful white space, or controlled density. Avoid predictable cookie-cutter "card" layouts if the context allows for more creative framing.
- **Details:** Use textures (noise/grain), subtle borders, geometric patterns, or layered transparencies to build depth.

---

## Part 2: Strict UI/UX Rules (Vercel Guidelines)

The code MUST comply with the following interaction and technical standards:

### 1. Interactive States
- **Focus:** Every interactive element MUST have visible focus (`focus-visible:ring-*`). Never `outline-none` without replacement. Prefer `:focus-visible` over `:focus`.
- **Hover:** Buttons/links need clear visual feedback (`hover:`).
- **Disabled:** Provide clear disabled states with reduced opacity/cursor changes.

### 2. Forms & Inputs
- **Autocomplete:** Inputs need `autocomplete` and meaningful `name` attributes.
- **Types:** Use exact input types (`email`, `tel`, `url`, `number`) and `inputmode`.
- **Labels:** ALWAYS use `htmlFor` or wrap the input. No unlabelled inputs.
- **UX:** Never block paste (`onPaste` + `preventDefault`).
- **Feedback:** Submit buttons stay enabled during requests but show a spinner. Errors must appear inline.

### 3. Motion & Animation
- **Accessibility:** Honor `prefers-reduced-motion`.
- **Performance:** ONLY animate `transform` and `opacity` for compositor-friendly animations.
- **Explicit Transitions:** NEVER use `transition: all`. List properties explicitly.

### 4. Typography Content Handling
- **Microcopy:** Use actual ellipses `…` not `...`. Use curly quotes `""`.
- **Data Rendering:** Use `font-variant-numeric: tabular-nums` for data columns.
- **Overflow:** Handle long content safely (`truncate`, `line-clamp`, `break-words`, `min-w-0` on flex children).

### 5. Advanced Frontend Mechanisms
- **Links vs Buttons:** Links use `<a>` (for Cmd+Click support). Actions use `<button>`. Never put `onClick` navigation on an anchor without proper routing techniques.
- **Images:** Always set explicit `width` and `height` to prevent Cumulative Layout Shift (CLS). Use `loading="lazy"` for below-fold.
- **Hydration:** Avoid mismatch errors. Use `value` with `onChange` or `defaultValue` for uncontrolled inputs.
- **System Theme:** Support dark mode correctly (`color-scheme: dark`).

## Operator Checklist (PRE-ACT)
- [ ] Is the aesthetic direction bold and intentionally non-generic?
- [ ] Are focus states (`focus-visible`) defined for all new interactive elements?
- [ ] Are animations performant (transform/opacity only) and respectful of reduced motion?
- [ ] Do all images have explicit dimensions?
- [ ] Are form labels and appropriate input types used?
