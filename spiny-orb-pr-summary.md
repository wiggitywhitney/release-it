## Summary

- **Files processed**: 5
- **Committed**: 0
- **No changes needed**: 3
- **Failed**: 2

## Per-File Results

| File | Status | Spans | Attempts | Cost | Libraries | Schema Extensions |
|------|--------|-------|----------|------|-----------|-------------------|
| lib/config.js | failed: Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: LINT (×1) | 0 | 3 | $0.29 | — | — |
| lib/index.js | failed: Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: LINT (×1) | 0 | 3 | $0.35 | — | — |

**No changes needed** (3 files, 0 spans): lib/args.js, lib/cli.js, lib/log.js

## Span Category Breakdown

| File | External Calls | Schema-Defined | Service Entry Points | Total Functions |
|------|---------------|----------------|---------------------|-----------------|
| lib/log.js | 0 | 0 | 0 | 9 |

## Schema Changes

No schema changes detected.

## Review Attention

### Advisory Findings

**(run-level)**
- CDQ-008 (Tracer Naming): No trace.getTracer() calls found.

## Token Usage

| | Ceiling | Actual |
|---|---------|--------|
| **Cost** | $53.82 | $0.68 |
| **Input tokens** | 2,300,000 | 21,132 |
| **Output tokens** | — | 32,710 |
| **Cache read tokens** | — | 69,115 |
| **Cache write tokens** | — | 27,646 |

Model: `claude-sonnet-4-6` | Files: 23 | Total file size: 90,040 bytes

## Live-Check Compliance

[1m[34mSamples[0m[0m
  - total: 0

[1m[34mAdvisories given[0m[0m
  - total: 0

[1m[34mRegistry coverage[0m[0m
  - entities seen: 0.0%



## Agent Version

`1.0.0`

## Warnings

- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/config.js — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: LINT (×1)
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/index.js — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: LINT (×1)
- Checkpoint test run failed at file 5/23 (/Users/whitney.lee/Documents/Repositories/release-it/lib/log.js): tests failed
- Baseline test suite has pre-existing failures — checkpoint test rollback disabled
- End-of-run test suite failed: Command failed: sh -c npm test

- Failed to stop Weaver gracefully via /stop endpoint: fetch failed
- Live-check partial: 2 file(s) failed instrumentation (/Users/whitney.lee/Documents/Repositories/release-it/lib/config.js, /Users/whitney.lee/Documents/Repositories/release-it/lib/index.js). Compliance report may be incomplete — spans from failed files are missing.