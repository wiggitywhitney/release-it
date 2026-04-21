# Instrumentation Report: lib/shell.js

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 7.1K
- **Output tokens**: 6.2K
- **Cached tokens**: 28.3K

## Schema Extensions
- `span.release_it.shell.exec`

## Validation Journey
1. **Attempt 1**: 1 blocking error (LINT (Lint Clean):1)
2. **Attempt 2**: 0 errors

## Notes
- execFormattedCommand is the main orchestration method for all shell command execution — it handles dry-run mode, caching, and dispatches to execStringCommand or execWithArguments. It receives a span as the primary service entry point for shell operations.
- exec is a thin wrapper that immediately delegates to execFormattedCommand based on command type — skipped per RST-003 (thin wrappers do not need their own spans; the delegate already has one).
- execStringCommand and execWithArguments are internal class methods not independently exported — skipped per RST-004 (unexported helpers are covered by the execFormattedCommand parent span through context propagation).
- The span name 'release_it.shell.exec' is a schema extension — no existing span in the registry covers shell command dispatch. Added to schemaExtensions accordingly.
- release_it.hook.command and release_it.is_dry_run are both registered schema attributes and semantically match the cacheKey (string command) and isDryRun flag captured in execFormattedCommand. attributesCreated is 0 because no new unregistered keys were invented.

## Advisory Findings
- COV-004 (Async Operation Spans):87: "execWithArguments" (async class method) at line 87 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
