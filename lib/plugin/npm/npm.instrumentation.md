# Instrumentation Report: lib/plugin/npm/npm.js

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
- COV-004 (Async Operation Spans):29: "init" (async class method) at line 29 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans):80: "bump" (async class method) at line 80 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans):142: "isCollaborator" (async class method) at line 142 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans):181: "getLatestRegistryVersion" (async class method) at line 181 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans):204: "getRegistryPreReleaseTags" (async class method) at line 204 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans):232: "guessPreReleaseTag" (async class method) at line 232 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans):245: "resolveTag" (async class method) at line 245 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans):255: "publish" (async class method) at line 255 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
