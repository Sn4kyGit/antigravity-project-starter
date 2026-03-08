---
name: design-system-architect
description: "Master of creating Semantic Design Systems into DESIGN.md files based on references or mockups. Useful for UI/UX standardization."
---

# Design System Architect

This skill guides the creation of a comprehensive, semantic `DESIGN.md` file that captures the visual language of a project.

## Purpose

When building the UI for an application, consistency is critical. The `DESIGN.md` file serves as the source of truth for AI agents (like elite-frontend-architect) when generating UI components. It abstracts visual details into semantic tokens.

## How to Apply

When tasked with "Project Design", "Frontend Planning", or standardizing UI:

1. **Information Gathering:** Ask the user for design references, screenshots, or existing mockups if available.
2. **Analysis:** Extract color palettes, typography, spacing rules, and component styles.
3. **Synthesis:** Generate the `DESIGN.md` document.

## Structure of a DESIGN.md

Ensure your generated `DESIGN.md` follows this structure:

### 1. Global Vision
- Describe the overall "vibe" (e.g., "Minimalist, high-contrast dashboard with technical aesthetics").

### 2. Design Tokens
- **Colors:** Base, Surface, Primary, Secondary, Destructive, Warning, Success. (Include Hex codes and usage).
- **Typography:** Font families (Primary/Secondary), weights, and a scale (H1-H6, Body, Small).
- **Spacing scale:** Defined unit steps (e.g., 4px, 8px, 16px).
- **Radii:** Border radius definitions (e.g., sm: 4px, rounded: 9999px).

### 3. Component Patterns
- Explain the layout structure (e.g., Sidebar + Top Nav + Content Area).
- Explain standard button styles (Solid, Outline, Ghost).
- Detail form elements, cards, and modal styling.

## Example Output

When running this skill, output the structured markdown content into a file named `DESIGN.md` in the project root.
