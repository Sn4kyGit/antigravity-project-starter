---
name: vercel-composition-patterns
description: "React and Next.js composition patterns that scale. Use when refactoring components with boolean prop proliferation, building flexible component libraries, designing reusable APIs, or applying Next.js/React 19 Server/Client component architecture. Triggers on React tasks, Next.js components, Compound Components, or context providers."
category: domain
risk: safe
tags: "[react, nextjs, frontend, architecture, patterns, composition]"
version: "1.0.0"
---

# React & Next.js Composition Patterns

Composition patterns for building flexible, maintainable React components, tailored for Vercel/Next.js architectures. Avoid boolean prop proliferation by using compound components, lifting state, and composing internals.

## Purpose
These patterns ensure components scale easily without turning into massive, unmaintainable monoliths filled with `if/else` logic based on dozens of boolean props. It makes the codebase easier for both humans and AI agents to work with.

## When to Use
- Refactoring UI components with many boolean props (`isLarge`, `hasIcon`, `primary`).
- Building reusable component libraries (e.g., using HeroUI or Radix).
- Designing flexible API boundaries between React Server Components (RSC) and Client Components.
- Working with Context Providers or compound components.

## Core Architectural Rules

### 1. Avoid Boolean Prop Proliferation (HIGH)
**Why:** Adding a boolean flag for every new feature creates exponential complexity combinations.
**Rule:** Don't add boolean props (e.g., `hasHeader`, `showFooter`) to customize structural behavior. Use composition (`children`) instead.

**❌ Bad:**
```tsx
<Modal 
  isOpen={true} 
  title="Save Changes" 
  hasCloseButton={true} 
  showFooter={true} 
  confirmText="Save" 
/>
```

**✅ Good (Composition):**
```tsx
<Modal isOpen={true}>
  <ModalHeader>
    <ModalTitle>Save Changes</ModalTitle>
    <ModalCloseButton />
  </ModalHeader>
  <ModalBody>...</ModalBody>
  <ModalFooter>
    <Button variant="primary">Save</Button>
  </ModalFooter>
</Modal>
```

### 2. Compound Components & Shared Context (HIGH)
Use React Context to implicitly share state between composed structural components without prop-drilling.
The Provider is the ONLY place that knows how state is managed.

```tsx
// 1. Create Context
const TabsContext = createContext<TabsState | null>(null);

// 2. Parent provides state
export function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return <TabsContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabsContext.Provider>;
}

// 3. Children consume state implicitly
export function TabTrigger({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;
  return <button onClick={() => setActiveTab(value)} data-active={isActive}>{children}</button>;
}
```

### 3. Explicit Variants over Boolean Modes (MEDIUM)
When a component has distinct visual modes, use a `variant` prop or distinct exported components instead of multiple conflicting boolean props (`isPrimary`, `isSecondary`, `isDanger`).

**❌ Bad:** `<Button isPrimary />` OR `<Button isSecondary outline />`
**✅ Good:** `<Button variant="primary" />` OR `<Button variant="secondary" appearance="outline" />`

### 4. Children over Render Props (MEDIUM)
Modern React prefers simple `children` composition over complex render props functions.

**❌ Bad:** `<List renderItem={(item) => <ListItem data={item} />} />`
**✅ Good:** 
```tsx
<List>
  {items.map(item => <ListItem key={item.id} data={item} />)}
</List>
```

## Next.js / React 19 Specific APIs

### React 19: Drop `forwardRef`
React 19 supports `ref` as a standard prop. You no longer need to wrap components in `forwardRef`.

**❌ Bad (React 18):**
```tsx
const Input = forwardRef(({ className, ...props }, ref) => (
  <input ref={ref} className={className} {...props} />
));
```

**✅ Good (React 19):**
```tsx
const Input = ({ className, ref, ...props }) => (
  <input ref={ref} className={className} {...props} />
);
```

### React 19: Use the `use()` hook for Context
Prefer the new `use()` API over `useContext()`.

**✅ Good (React 19):**
```tsx
import { use } from 'react';
const { activeTab } = use(TabsContext);
```

## References
Always strictly apply these patterns when generating Frontend code in `project_game_pulse`. Combine these with your local `nextjs-heroui-frontend.md` restrictions.
