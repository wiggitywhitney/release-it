# Instrumentation Report: lib/plugin/npm/prompts.js

## Summary
- **Status**: success
- **Spans added**: 0
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.2K
- **Output tokens**: 0.3K
- **Cached tokens**: 14.2K

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- This file exports a static configuration object containing two inline arrow functions (`message` callbacks for prompt definitions). Both are pure synchronous data transformations — they take a context object and return a string. Neither performs I/O, async operations, nor external calls, so neither qualifies for instrumentation (RST-001: no spans on pure synchronous utilities with no I/O).
