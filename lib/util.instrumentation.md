# Instrumentation Report: lib/util.js

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 2.5K
- **Output tokens**: 3.6K

## Schema Extensions
- `span.release_it.util.reduce_until`
- `release_it.util.collection_size`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- reduceUntil is the only function instrumented — it is the only exported async function in the file (COV-001). All other exported functions are synchronous with no I/O and are skipped (RST-001).
- The schema has no registered span name matching reduceUntil, so 'release_it.util.reduce_until' was invented following the project's namespace and dotted-notation convention. Reported as a schema extension.
- No registered attribute key matches the concept of 'how many items were in the iterable collection passed to reduceUntil'. The closest registered keys are plugin/version counts which are domain-specific to different operations. A new key 'release_it.util.collection_size' was invented using the project namespace. The value is guarded with a `!= null` check on `.length` because the collection could be any iterable (Set, generator, etc.) where `.length` is undefined.
- hasAccess and get both have catch blocks that swallow errors and return default values — these are graceful-degradation catches (NDS-007) and were not given error recording. tryStatFile is similar and is also unexported (RST-004).
