# Instrumentation Report: lib/plugin/version/Version.js

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 7.0K
- **Output tokens**: 6.3K
- **Cached tokens**: 14.2K

## Schema Extensions
- `span.release_it.version.get_incremented_version`

## Validation Journey
1. **Attempt 1**: 1 blocking error (LINT (Lint Clean):1)
2. **Attempt 2**: 0 errors

## Notes
- getIncrementedVersion is the only method instrumented — it is the async entry point for computing the next version, calling either incrementVersion or prompting the user interactively. It receives a span with release_it.is_ci, release_it.version.current, release_it.version.increment, and release_it.version.next from the schema's registered attribute keys.
- promptIncrementVersion was skipped because it contains process.exit(0) inside its task callback. Adding a span would cause the span to leak (never ended) when the user selects Exit, violating CDQ-001. Instrumentation of this function is blocked by this control flow pattern.
- getIncrementedVersionCI and getIncrement are synchronous thin wrappers that immediately delegate to another method — they were skipped per RST-003 (thin wrappers) and RST-001 (no async I/O).
- isPreRelease, isValid, incrementVersion, getIncrementChoices, and versionTransformer are all pure synchronous computations with no network or disk I/O — they were skipped per RST-001.
- The span name release_it.version.get_incremented_version was invented because the schema defines only attribute groups, not span definitions. It follows the release_it namespace prefix and is reported as a schema extension.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):81: CDQ-007: setAttribute value "options.latestVersion" at line 81 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.latestVersion`).
- CDQ-007 (Attribute Data Quality):84: CDQ-007: setAttribute value "options.increment" at line 84 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.increment`).
