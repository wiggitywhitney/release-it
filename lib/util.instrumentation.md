# Instrumentation Report: lib/util.js

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 9.2K
- **Output tokens**: 7.4K
- **Cached tokens**: 14.3K

## Schema Extensions
- `span.release_it.util.reduce_until`
- `release_it.util.collection_size`

## Validation Journey
1. **Attempt 1**: 1 blocking error (LINT (Lint Clean):1)
2. **Attempt 2**: 0 errors

## Notes
- reduceUntil is the only exported async function in this file and receives a span as the sole service entry point. All other exported functions are synchronous utilities, thin wrappers, or pure data transformations and are skipped per RST-001 (no spans on synchronous utilities with no I/O).
- span.release_it.util.reduce_until is a new schema extension — no matching schema span existed for a generic async collection reducer. The span name follows the project namespace convention.
- release_it.util.collection_size is a new attribute extension — the schema has no registered key for a generic collection size in a utility function. No existing key (e.g. release_it.github.assets_count) is semantically equivalent to the size of an arbitrary iteration collection passed to a utility.
- hasAccess, format, parseVersion, e, touch, fixArgs, getNpmEnv, and get are all synchronous (even where they do file operations via synchronous fs APIs) and are pure utility/data transformation helpers — skipped per RST-001. The catch blocks in hasAccess and get handle expected conditions gracefully (returning false / defaultValue) so no error recording would be appropriate even if spans were added.
- once and rejectAfter are thin wrappers delegating to before() and wait().then() respectively — skipped per RST-003.
