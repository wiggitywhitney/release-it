# Instrumentation Report: lib/config.js

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 6.7K
- **Output tokens**: 5.7K

## Schema Extensions
- `span.release_it.config.init`

## Validation Journey
1. **Attempt 1**: 1 blocking error (LINT (Lint Clean):1)
2. **Attempt 2**: 0 errors

## Notes
- Config.init() is the sole async entry point for configuration loading — it gets a span as the service entry point for the Config lifecycle. Attributes release_it.is_ci and release_it.is_dry_run are set after loadOptions resolves, using values from the loaded options object and the imported ci-info value.
- loadOptions and loadLocalConfig are unexported async functions that orchestrate config loading and call c12 externally. They are skipped per RST-004 — unexported internal functions are not instrumented directly; their I/O becomes a child of the Config.init() span through context propagation.
- expandPreReleaseShorthand is a pure synchronous data transformation with no I/O — it is skipped per RST-001 (no spans on synchronous utility functions).
- All Config class getters and setCI are trivial synchronous accessors or setters — skipped per RST-001 and RST-002 (no spans on trivial accessors or synchronous utilities).
- The span name span.release_it.config.init is a schema extension — no span groups are defined in the provided schema, and the namespace 'release-it' (rendered as 'release_it' for consistency with attribute key naming) was used as the prefix per the span naming rules.

## Advisory Findings
- COV-004 (Async Operation Spans):107: "loadOptions" (async function) at line 107 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans):148: "loadLocalConfig" (async function) at line 148 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
