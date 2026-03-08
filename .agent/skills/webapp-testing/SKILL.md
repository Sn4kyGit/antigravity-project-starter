---
name: webapp-testing
description: "Use when executing E2E tests, interacting with local web applications, capturing browser screenshots, or writing Playwright automation scripts. Highly useful for frontend UI validation."
category: domain
risk: safe
tags: "[testing, playwright, e2e, browser, automation, frontend]"
version: "1.0.0"
---

# Web Application Testing (Playwright)

Toolkit for interacting with and testing local web applications (especially Next.js frontends) using Playwright. 

## Purpose
To verify frontend functionality, debug UI behavior interactively, and capture state through screenshots and DOM inspection. 

## When to Include
- When you need to verify if a UI component renders correctly.
- When generating E2E tests for the frontend.
- When you must log in, click buttons, or perform user flows using browser automation.

## Core Rules & Anti-Patterns

### 1. The Wait for Network Idle Rule (CRITICAL)
For Next.js and other dynamic Single Page Applications (SPAs), the HTML sent by the server is often incomplete until JavaScript executes.
❌ **Don't** inspect the DOM immediately after `page.goto()`.
✅ **Do** wait for `networkidle` state before inspecting or interacting.

```python
page.goto('http://localhost:3000') 
page.wait_for_load_state('networkidle') # CRITICAL for Next.js
```

### 2. Reconnaissance-Then-Action Pattern
Don't guess DOM selectors blindly. Run a recon script first:
1. **Inspect rendered DOM:** Load the page, take a screenshot, dump the HTML.
2. **Identify Selectors:** Find the exact IDs, roles, or text.
3. **Draft the Test:** Write the final Playwright script using the discovered selectors.

### 3. Preferred Selectors
Playwright encourages user-centric selectors over generic CSS classes to ensure accessibility.
- ✅ `page.get_by_role("button", name="Submit")`
- ✅ `page.get_by_text("Welcome back")`
- ✅ `page.locator("#specific-id")`
- ❌ `page.locator(".flex > div:nth-child(2) > span")` (Extremely fragile)

## Example Sync Script

To create a quick automation or inspection script, use `sync_playwright`:

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    
    # Wait for JS hydration
    page.wait_for_load_state('networkidle')
    
    # Recon
    page.screenshot(path='/tmp/webapp-inspect.png', full_page=True)
    
    # Action
    page.get_by_role("button", name="Login").click()
    
    browser.close()
```

## Integration with existing skills
For full QA workflows, use this together with `qa-tdd-architect.md` to establish RED-GREEN-REFACTOR cycles, writing a failing Playwright test first before implementing the frontend feature.
