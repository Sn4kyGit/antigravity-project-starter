---
name: writing-clearly-and-concisely
description: Write with clarity and force. Covers Strunk's Elements of Style and avoids common AI writing patterns ("puffery", "delve", "leverage"). Use when writing documentation, commits, UI copy, or any prose for humans.
---

# Writing Clearly and Concisely

## When to use this skill
- Writing **Documentation**, **READMEs**, or Technical Explanations
- Composing **Commit Messages** or **Pull Request Descriptions**
- Designing **UI Copy**, **Error Messages**, or **Help Text**
- Summarizing content or writing reports
- Editing existing text to improve clarity and impact

## Core Principles (Elements of Style)
Adhere to William Strunk Jr.'s modifications for clear, forceful writing.

### 1. Elementary Principles of Composition
- **Use Active Voice**: "The system processes the request" (Active) vs "The request is processed by the system" (Passive).
- **Put Statements in Positive Form**: "He usually arrived late" vs "He was not very often on time".
- **Use Definite, Specific, Concrete Language**: Avoid vague qualifiers.
- **Omit Needless Words**: "The question as to whether" -> "Whether". "He is a man who" -> "He".
- **Express Co-ordinate Ideas in Similar Form**: Parallel structure in lists and comparisons.
- **Keep Related Words Together**: Subject and verb should not be separated by long phrases.

### 2. AI Anti-Patterns to Avoid
Do not sound like a generic LLM. **AVOID** the following:
- **Puffery**: Words like *pivotal, crucial, vital, testament, enduring legacy, tapestry*.
- **Empty "-ing" Phrases**: *ensuring reliability, showcasing features, highlighting capabilities*.
- **Promotional Adjectives**: *groundbreaking, seamless, robust, cutting-edge, state-of-the-art*.
- **Overused AI Vocabulary**: *delve, leverage, multifaceted, foster, realm*.
- **Formatting Overuse**: Do not bold every other word. Do not use emoji decorations unless requested.

## Workflow
1.  **Draft**: Write the content focusing on the core message.
2.  **Review**: Check against the "Omit Needless Words" rule. Can any word be removed without losing meaning?
3.  **De-AI**: improved scan for "delve", "leverage", "crucial", "seamless". Replace with specific verbs/adjectives.
    - *Bad*: "This seamless integration leverages the robust API..."
    - *Good*: "This integration uses the API..."
4.  **Verify**: Read it aloud. Does it sound like a human expert or a marketing brochure?

## Examples

**Bad (AI-Style):**
> "This robust solution ensures seamless compatibility, leveraging cutting-edge algorithms to foster a multifaceted user experience. It is crucial to delve into the configuration options."

**Good (Strunk-Style):**
> "This solution fits your device. It uses new algorithms to improve response times. Check the configuration options."

**Bad (Passive/Wordy):**
> "It should be noted that the file is required to be saved by the user before the application is closed."

**Good (Active/Direct):**
> "Save the file before closing the application."
