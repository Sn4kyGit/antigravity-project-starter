---
name: architecture-frontend-design
description: "Master of Frontend Design and UI/UX architecture. Enforces DFII, aesthetic intentionality, and usability standards. Use when planning layouts, themes, or UI components."
category: architecture
risk: safe
tags: "[frontend, design, ui, ux, aesthetics, guidelines, architecture]"
version: "1.0.0"
---

# Architecture: Frontend Design & UI/UX

## Purpose
This skill dictates the design philosophy and UX standards for the Next.js/React frontend. It complements the `nextjs-heroui-frontend` skill by ensuring high-craft, memorable, and accessible interfaces, avoiding generic "AI-generated" looks.

## When to Use
- **Gate 3 (PLAN):** During UI/UX brainstorming and wireframing.
- **Gate 4 (IMPLEMENT):** When building responsive layouts, accessibility, and animations.

## Core Design Mandate (Non-Negotiable)

### 1. Design Feasibility & Impact Index (DFII)
Before building, evaluate the design direction (Score -5 to +15):
- **+ (Positive):** Aesthetic Impact, Context Fit, Implementation Feasibility, Performance Safety.
- **- (Negative):** Consistency Risk.
**Rule:** Aim for DFII >= 8. Strong opinions, well-executed.

### 2. Intentional Aesthetics
- Choose a dominant tone (e.g., Brutalist, Luxury, Minimalist, Playful). Do not blend more than two.
- **Differentiation Anchor:** Ask "If the logo was removed, how would you recognize this app?"
- Avoid default "SaaS" generic templates. Use HeroUI intentionally.

### 3. UI/UX Pro Max Rules
- **Accessibility:** Minimum 4.5:1 contrast, visible focus rings, readable fonts (min 16px mobile).
- **Interaction:** Min 44x44px touch targets. Buttons show loading states during async ops. Avoid layout shifts on hover.
- **Motion:** Purposeful, sparse. Use 150-300ms for micro-interactions. Check `prefers-reduced-motion`.
- **Icons:** Use consistent SVGs (Lucide/Heroicons), NEVER emojis as structural UI icons.

## Operator Checklist (PRE-ACT)
- [ ] Is the aesthetic direction explicit and non-generic?
- [ ] Are touch targets large enough and interactions clear?
- [ ] Is Light/Dark mode contrast verified?
- [ ] Has 'cursor-pointer' been added to all interactive elements?
