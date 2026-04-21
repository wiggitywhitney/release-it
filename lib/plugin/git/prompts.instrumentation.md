# Instrumentation Report: lib/plugin/git/prompts.js

## Summary
- **Status**: success
- **Spans added**: 0
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 0.3K
- **Output tokens**: 0.4K

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- This file exports a plain object containing prompt configuration for git operations. All functions in the file are short, synchronous, pure message-formatting helpers — none perform I/O, make network calls, or represent service entry points. They are all skipped under RST-001 (no spans on pure synchronous utilities with no I/O) and RST-002/RST-003 (trivial one-liner accessors or thin wrappers). No instrumentation was added.
