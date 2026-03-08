---
name: advanced-evaluation
description: "Use when the user asks to implement LLM-as-judge, compare model outputs, create evaluation rubrics, mitigate evaluation bias, or run automated quality assessments on generated outputs. Covers direct scoring and pairwise comparison."
category: domain
risk: safe
tags: "[evaluation, llm-as-judge, quality, testing, rubrics]"
version: "1.0.0"
---

# Advanced Evaluation

This skill covers production-grade techniques for evaluating LLM outputs using LLMs as judges. It is highly relevant for `project_game_pulse` because it relies heavily on AI mechanics (RAG, generation).

## Purpose
Establishing reliable output quality. LLM-as-a-Judge is not a single technique but a family of approaches. Choosing the right approach and mitigating known biases is the core competency this skill develops.

## When to Include
- Building automated evaluation pipelines for LLM outputs (e.g. for PydanticAI agents).
- Comparing multiple model responses to select the best one.
- Establishing consistent quality standards across tests.
- Formulating rubrics for human or automated evaluation.

## Evaluation Taxonomy

### 1. Direct Scoring
A single LLM rates one response on a defined scale.
- **Best for:** Objective criteria (factual accuracy, instruction following).
- **Failure mode:** Score calibration drift, inconsistent scale interpretation.

### 2. Pairwise Comparison
An LLM compares two responses and selects the better one.
- **Best for:** Subjective preferences (tone, style, persuasiveness).
- **Failure mode:** Position bias (preferring the first option), length bias.

## Bias Mitigation Rules

- **Position Bias:** First-position responses receive preferential treatment in pairwise comparison. **Mitigation:** Evaluate twice with swapped positions, use majority vote.
- **Length Bias:** Longer responses are rated higher regardless of quality. **Mitigation:** Explicitly tell the LLM judge to ignore length.
- **Self-Enhancement Bias:** Models rate their own outputs higher. **Mitigation:** Use different models for generation and evaluation when possible.

## Implementation Patterns

### Direct Scoring Pattern
All scoring prompts must require justification *before* the score (Chain-of-Thought). This improves reliability by 15-25%.

```markdown
## Task
Evaluate the following response against each criterion.

## Criteria
{for each criterion: name, description, weight}

## Instructions
1. Find specific evidence in the response
2. Score according to the rubric (1-{max} scale)
3. Justify your score with evidence before stating the final score
```

### Pairwise Position Swap Protocol
1. **First pass:** Response A in first position, Response B in second.
2. **Second pass:** Response B in first position, Response A in second.
3. **Consistency check:** If passes disagree, return TIE.

## Anti-Patterns
- ❌ **Scoring without justification:** Always require evidence-based justification before generating the final score JSON.
- ❌ **Single-pass pairwise comparison:** Single-pass comparison is corrupted by position bias. Always swap.
- ❌ **Overloaded criteria:** One criterion = one measurable aspect. Do not mix "Accuracy and Tone" into one score.
