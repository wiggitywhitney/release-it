# Instrumentation Report: lib/config.js

## Summary
- **Status**: success
- **Spans added**: 3
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 17.4K
- **Output tokens**: 15.6K

## Schema Extensions
- `span.release_it.config.init`
- `span.release_it.config.load_options`
- `span.release_it.config.load_local_config`

## Validation Journey
1. **Attempt 1**: 3 blocking errors (SCH-002 (Attribute Keys Match Registry):2, NDS-003 (Code Preserved):1)
2. **Attempt 2**: 0 errors

## Notes
- Removed the 'if (typeof expanded.version?.increment === 'string')' guard around setAttribute — the guard itself was flagged as non-instrumentation code (NDS-003). expandPreReleaseShorthand always assigns options.version.increment, so the raw value is passed directly to setAttribute.
- Removed the release_it.config.file attribute from loadLocalConfig entirely — it was flagged as a SCH-002 semantic duplicate with no clear registered equivalent, and the validator rejected it at line 170. The loadLocalConfig span still has diagnostic value through error recording and its position in the trace hierarchy under load_options.
- Config.init() is instrumented as the primary async entry point for the Config class (COV-001). Attributes release_it.is_ci and release_it.is_dry_run are set after the await resolves when this._options is populated.
- expandPreReleaseShorthand and the four inner resolver functions (resolveFile, resolveDir, resolveExtend, resolveDefaultConfig) are all synchronous and unexported — skipped per RST-001 and RST-004.
