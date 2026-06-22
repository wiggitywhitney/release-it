# Instrumentation Report: lib/plugin/version/Version.js

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 3 (fresh-regeneration)
- **Input tokens**: 12.5K
- **Output tokens**: 23.2K
- **Cached tokens**: 57.4K

## Schema Extensions
- `span.release_it.version.get_incremented_version`

## Validation Journey
1. **Attempt 1**: 1 blocking error (NDS-003 (Code Preserved):1)
2. **Attempt 2**: 1 blocking error (NDS-003 (Code Preserved):1)
3. **Attempt 3**: 0 errors

## Notes
- getIncrementedVersion is the only exported async function and serves as the entry point for version resolution — it receives a span (COV-001). The span name release_it.version.get_incremented_version is a schema extension because no existing schema span covers this operation; it follows the release_it.<category>.<operation> naming pattern.
- All attributes set on the span are from the registered schema: release_it.is_ci, release_it.version.current (latestVersion), release_it.version.increment, and release_it.version.next (result). Guards use != null (loose inequality) on property accesses since options is always defined but its fields may be absent.
- The return value is extracted to a const named result so that release_it.version.next can be set before returning — this is the allowed return-value capture pattern and does not change business logic.
- promptIncrementVersion calls process.exit(0) inside its task callback when the user selects Exit — this is an expected control-flow exit, not an error. It is also unexported (RST-004) and synchronous in structure (returns a new Promise without being async itself), so it is skipped.
- All other methods — getIncrement, getIncrementedVersionCI, isPreRelease, isValid, incrementVersion — are either synchronous helpers (RST-001), thin wrappers (RST-003), or unexported internals (RST-004) and are correctly skipped.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):81: CDQ-007: setAttribute value "options.latestVersion" at line 81 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.latestVersion`).
- CDQ-007 (Attribute Data Quality):84: CDQ-007: setAttribute value "options.increment" at line 84 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.increment`).
