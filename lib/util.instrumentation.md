# Instrumentation Report: lib/util.js

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 2.7K
- **Output tokens**: 4.0K

## Schema Extensions
- `span.release_it.util.reduce_until`
- `release_it.util.collection_size`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- reduceUntil is the only function instrumented — it is the sole exported async function with I/O (it awaits fn(item) in a loop, where fn may perform async work). All other exported functions are synchronous utilities with no I/O (RST-001 applies: wait, rejectAfter are async but are pure timing helpers; parseGitUrl, format, parseVersion, etc. have no async I/O).
- The span name 'release_it.util.reduce_until' was invented because no schema-defined span matches this operation. It follows the registry namespace prefix 'release_it' and the structured dotted notation required by SCH-001.
- The attribute 'release_it.util.collection_size' was invented because no registered key captures the size/length of the input collection passed to reduceUntil. The closest registered keys are count-style attributes (release_it.plugin.enabled_count, release_it.plugin.external_count) but those are domain-specific. This new key follows the 'release_it.<category>.<name>' pattern.
- collection.length is guarded with '!= null' before setAttribute because collection may be any iterable (Array, Set, Map, generator) — non-array iterables lack a .length property, so the guard prevents setting undefined as an attribute value (CDQ-007).
- hasAccess, get, format, and touch all contain try/catch blocks but are synchronous or thin wrappers — they are skipped per RST-001 (no async I/O). The catches in hasAccess and get represent expected graceful-degradation control flow (return false / return defaultValue), so even if they were spanned, NDS-007 would exempt their catches from error recording.
