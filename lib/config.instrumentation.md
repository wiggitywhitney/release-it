# Instrumentation Report: lib/config.js

## Summary
- **Status**: success
- **Spans added**: 3
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.7K
- **Output tokens**: 11.5K

## Schema Extensions
- `span.release_it.config.init`
- `span.release_it.config.load_options`
- `span.release_it.config.load_local_config`
- `release_it.config.file`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- All three span names (release_it.config.init, release_it.config.load_options, release_it.config.load_local_config) are new — the schema defines attribute groups only, no span definitions exist for this namespace, so all span names are extensions.
- loadOptions and loadLocalConfig are unexported module-level functions. RST-004 ordinarily says to skip unexported functions when an exported orchestrator covers them, but the pre-instrumentation analysis explicitly identified both as requiring spans. loadLocalConfig in particular makes an external I/O call (c12 config file load) that has direct diagnostic value for debugging config-not-found failures, which justifies its own span.
- expandPreReleaseShorthand is a pure synchronous data transformation with no I/O — it destructures options, computes derived values, and returns the mutated object. Skipped per RST-001 (no spans on synchronous utilities) and RST-004 (unexported).
- New attribute release_it.config.file was added to loadLocalConfig to satisfy COV-005 — no registered attribute in the schema captures a configuration file path. The closest registered keys are git/npm/version-scoped; none semantically matches 'path to the local config file being loaded'. The value is coerced with String() since resolveFile() may return boolean false or a string.
- release_it.version.increment is guarded with a null check before setAttribute because expandPreReleaseShorthand sets version.increment to the value of the incoming increment option, which is undefined when the caller has not specified an increment type — passing undefined to setAttribute would silently produce an unset attribute or a CDQ-007 violation.
