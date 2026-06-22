## Summary

- **Files processed**: 23
- **Committed**: 3
- **No changes needed**: 18
- **Failed**: 2

## Per-File Results

| File | Status | Spans | Attempts | Cost | Libraries | Schema Extensions |
|------|--------|-------|----------|------|-----------|-------------------|
| lib/config.js | success | 3 | 2 | $0.41 | — | `span.release_it.config.init`, `span.release_it.config.load_options`, `span.release_it.config.load_local_config` |
| lib/plugin/factory.js | success | 2 | 3 | $0.63 | — | `span.release_it.plugin.load`, `span.release_it.plugin.get_plugins`, `release_it.plugin.external_count` |
| lib/plugin/git/Git.js | failed: Anthropic API call failed: terminated | 0 | 2 | $0.43 | — | — |
| lib/plugin/gitlab/GitLab.js | failed: Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: COV-002 (×1) at COV-002:188 | 0 | 3 | $0.00 | — | — |
| lib/util.js | success | 1 | 1 | $0.13 | — | `span.release_it.util.reduce_until`, `release_it.util.collection_size` |

**No changes needed** (18 files, 0 spans): lib/args.js, lib/cli.js, lib/index.js, lib/log.js, lib/plugin/GitBase.js, lib/plugin/GitRelease.js, lib/plugin/Plugin.js, lib/plugin/git/prompts.js, lib/plugin/github/GitHub.js, lib/plugin/github/prompts.js, lib/plugin/github/util.js, lib/plugin/gitlab/prompts.js, lib/plugin/npm/npm.js, lib/plugin/npm/prompts.js, lib/plugin/version/Version.js, lib/prompt.js, lib/shell.js, lib/spinner.js

## Span Category Breakdown

| File | External Calls | Schema-Defined | Service Entry Points | Total Functions |
|------|---------------|----------------|---------------------|-----------------|
| lib/config.js | 1 | 0 | 3 | 24 |
| lib/plugin/factory.js | 0 | 0 | 2 | 3 |
| lib/util.js | 0 | 0 | 1 | 21 |

## Schema Changes

# Summary of Schema Changes
## Registry versions
Baseline: 0.1.0

Head: 0.1.0

## Registry Attributes
### Added
- release_it.plugin.external_count
- release_it.util.collection_size




### New Span IDs (6)

- `span.release_it.config.init`
- `span.release_it.config.load_local_config`
- `span.release_it.config.load_options`
- `span.release_it.plugin.get_plugins`
- `span.release_it.plugin.load`
- `span.release_it.util.reduce_until`

## Review Attention

### Advisory Findings

**lib/plugin/GitBase.js**
- COV-004 (Async Operation Spans): "init" (async class method) at line 9 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "getCommitsSinceLatestTag" (async class method) at line 35 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "getChangelog" (async class method) at line 41 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "getRemoteUrl" (async class method) at line 79 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "getRemote" (async class method) at line 88 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "getSecondLatestTagName" (async class method) at line 128 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.

**lib/plugin/GitRelease.js**
- COV-004 (Async Operation Spans): "beforeRelease" (async class method) at line 32 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "processReleaseNotes" (async class method) at line 43 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.

**lib/plugin/Plugin.js**
- COV-004 (Async Operation Spans): "showPrompt" (async class method) at line 62 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.

**lib/plugin/factory.js**
- CDQ-007 (Attribute Data Quality): setAttribute value "enabledExternalPlugins.length" at line 104 accesses a property of "enabledExternalPlugins" without a null/undefined guard. If "enabledExternalPlugins" can be null or undefined, this will throw at runtime. Add an `if (enabledExternalPlugins)` check or use optional chaining (`enabledExternalPlugins?.length`).
- SCH-001 (Span Names Match Registry): declared span extension "release_it.plugin.load" may be a semantic duplicate of existing registry operation "release_it.config.load_local_config". If these operations are equivalent, reuse "release_it.config.load_local_config" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): declared span extension "release_it.plugin.get_plugins" may be a semantic duplicate of existing registry operation "release_it.plugin.load". If these operations are equivalent, reuse "release_it.plugin.load" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.

**lib/plugin/github/GitHub.js**
- COV-004 (Async Operation Spans): "init" (async class method) at line 49 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "isAuthenticated" (async class method) at line 103 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "isCollaborator" (async class method) at line 116 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "release" (async class method) at line 131 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "getLatestRelease" (async class method) at line 197 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "getOctokitReleaseOptions" (async class method) at line 210 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "createRelease" (async class method) at line 258 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "generateWebUrl" (async class method) at line 355 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "createWebRelease" (async class method) at line 371 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "updateRelease" (async class method) at line 385 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "commentOnResolvedItems" (async class method) at line 408 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "getCommits" (async class method) at line 444 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "renderReleaseNotes" (async class method) at line 452 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.

**lib/plugin/npm/npm.js**
- COV-004 (Async Operation Spans): "init" (async class method) at line 29 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "bump" (async class method) at line 80 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "isCollaborator" (async class method) at line 142 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "getLatestRegistryVersion" (async class method) at line 181 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "getRegistryPreReleaseTags" (async class method) at line 204 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "guessPreReleaseTag" (async class method) at line 232 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "resolveTag" (async class method) at line 245 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "publish" (async class method) at line 255 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.

**lib/plugin/version/Version.js**
- COV-004 (Async Operation Spans): "getIncrementedVersion" (async class method) at line 72 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.

**lib/prompt.js**
- COV-004 (Async Operation Spans): "show" (async class method) at line 16 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.

**lib/shell.js**
- COV-004 (Async Operation Spans): "execFormattedCommand" (async class method) at line 23 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.
- COV-004 (Async Operation Spans): "execWithArguments" (async class method) at line 71 has no span. Async functions and await expressions require spans for latency tracking and error visibility. Add a span wrapping this function's body.

## Agent Notes

Each instrumented file has a companion `.instrumentation.md` file in the same directory (e.g., `src/api.js` → `src/api.instrumentation.md`) containing the agent's full decision notes.

## Token Usage

| | Ceiling | Actual |
|---|---------|--------|
| **Cost** | $53.82 | $1.59 |
| **Input tokens** | 2,300,000 | 33,238 |
| **Output tokens** | — | 73,884 |
| **Cache read tokens** | — | 33,170 |
| **Cache write tokens** | — | 99,660 |

Model: `claude-sonnet-4-6` | Files: 23 | Total file size: 90,040 bytes

## Live-Check Compliance

OK (no spans received — live-check did not validate any telemetry)

## Agent Version

`1.0.0`

## Warnings

- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/git/Git.js — Anthropic API call failed: terminated
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/gitlab/GitLab.js — Oscillation detected during fresh regeneration: Duplicate errors across consecutive attempts: COV-002 (×1) at COV-002:188
- Live-check partial: 2 file(s) failed instrumentation (/Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/git/Git.js, /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/gitlab/GitLab.js). Compliance report may be incomplete — spans from failed files are missing. This warning is advisory — the run completed; successfully instrumented files are unaffected. To get full coverage, review the failed files above and re-run spiny-orb on them.