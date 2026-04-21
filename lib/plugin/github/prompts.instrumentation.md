# Instrumentation Report: lib/plugin/github/prompts.js

## Summary
- **Status**: success
- **Spans added**: 0
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.2K
- **Output tokens**: 0.3K

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- The only function in this file, `message`, is a pure synchronous formatter — it takes a context object, calls `format()`, and returns a string. It performs no I/O, no async operations, and no external calls. No span is warranted (RST-001: no spans on synchronous pure utilities). No instrumentation was added to this file.
