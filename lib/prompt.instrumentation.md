# Instrumentation Report: lib/prompt.js

## Summary
- **Status**: success
- **Spans added**: 0
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.0K
- **Output tokens**: 0.0K

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- Pre-scan: no instrumentable functions — all are pure sync utilities or unexported helpers. No LLM call made.

## Advisory Findings
- COV-004 (Async Operation Spans):16: "show" (async class method) at line 16 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
