---
name: architecture-react-nextjs
description: "Master of React and Next.js performance and rendering architecture. Enforces server/client boundaries, waterfall elimination, and render optimization."
category: architecture
risk: safe
tags: "[react, nextjs, frontend, performance, architecture, server components]"
version: "1.0.0"
---

# Architecture: React & Next.js Performance

## Purpose
This skill establishes strict architectural guidelines for React 19 and Next.js 15. It focuses heavily on performance, rendering strategies, and avoiding common React anti-patterns. It works alongside `web-interface-guidelines.md` (which handles UI/UX) and `nextjs-heroui-frontend.md` (which handles components).

## When to Use
- **Gate 3 (PLAN):** When designing the component tree, data fetching strategies, or deciding between Client/Server components.
- **Gate 4 (IMPLEMENT):** When optimizing renders, managing state, or fixing hydration issues.

## Core React Doctrine (Non-Negotiable)

### 1. Eliminating Waterfalls (CRITICAL)
- Never nest sequential `await` calls for independent data in Server Components.
- Use `Promise.all` to fetch parallel data simultaneously.
- If data depends on previous data, fetch the absolute minimum required first, then parallelize the rest.

### 2. Server vs. Client Components (HIGH)
- **Default to Server Components (RSC):** Everything is a Server Component unless interactivity is strictly required. Provide `page.tsx` as an async RSC.
- **Push `'use client'` Down:** Only add `'use client'` to the specific leaf node that needs state (`useState`), effects (`useEffect`), or browser APIs.
- NEVER pass non-serializable data (functions, classes) from Server to Client components.

### 3. Rendering & State Optimization (MEDIUM-HIGH)
- **State Colocation:** Keep state as close to where it's used as possible to prevent excessive re-rendering of parent components.
- **Derived State:** Do not put data in `useState` if it can be calculated from existing state or props during render.
- **Avoid Falsy `&&`:** Use ternaries (`condition ? <Component /> : null`) or cast to boolean (`!!condition && <Component />`) to avoid rendering `0` or `NaN` into the DOM.

### 4. Client-Side Data Fetching
- For client-side fetching/mutations, exclusively use standard libraries with caching and revalidation (e.g., SWR, React Query) or Next.js Server Actions. Do not write raw `useEffect` fetchers.

## Operator Checklist (PRE-ACT)
- [ ] Are independent async calls wrapped in `Promise.all`?
- [ ] Is `'use client'` pushed as deep down the tree as possible?
- [ ] Is state derived during render instead of duplicated in `useState`?
- [ ] Are conditional renders protected against falsy numerical values?
