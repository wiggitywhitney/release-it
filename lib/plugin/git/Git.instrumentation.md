# Instrumentation Report: lib/plugin/git/Git.js

## Summary
- **Status**: success
- **Spans added**: 10
- **Attempts**: 2 (retry-initial)
- **Input tokens**: 6.6K
- **Output tokens**: 60.8K

## Schema Extensions
- `span.release_it.git.is_git_repo`
- `span.release_it.git.is_enabled`
- `span.release_it.git.init`
- `span.release_it.git.before_release`
- `span.release_it.git.release`
- `span.release_it.git.is_required_branch`
- `span.release_it.git.has_upstream_branch`
- `span.release_it.git.get_upstream_args`
- `span.release_it.git.push`
- `span.release_it.git.rollback_tag_push`
- `release_it.git.is_repo`
- `release_it.git.enabled`
- `release_it.git.has_upstream`
- `release_it.git.push_repo`

## Validation Journey
1. **Attempt 1**: LLM response had null parsed_output — no structured output was returned.
stop_reason: max_tokens
output_tokens: 32400
raw_preview: <no text content>
2. **Attempt 2**: 0 errors

## Notes
- 10 out of 23 functions (~43%) receive spans, exceeding the ~20% ratio backstop. All 10 are required: 9 are COV-001 entry points explicitly identified in pre-instrumentation analysis and 1 (isGitRepo) is required by COV-004 as an async I/O function. The high ratio reflects that this file is a service plugin whose public interface is almost entirely async entry points.
- In push(), the attribute set for release_it.git.push_repo and the getUpstreamArgs() call occur before the existing try/catch block (Pattern A — the existing try/catch becomes the outer wrapper). If getUpstreamArgs() throws unexpectedly, span.end() is still called via finally but no error status is recorded on the push span. This is an accepted limitation: getUpstreamArgs() now has its own span that will capture and record that error.
- In rollbackTagPush(), release_it.git.tag_name is set only inside the if (isTagged) branch. When isTagged is false the span has no attributes, but the operation is a no-op and span timing alone provides sufficient diagnostic value. No registered attribute covers the isTagged boolean without creating an additional extension.
- Four new attribute extensions were created because no registered key covers these concepts: release_it.git.is_repo (boolean result of the git repo detection check), release_it.git.enabled (boolean result of the isEnabled static method), release_it.git.has_upstream (boolean result of hasUpstreamBranch), and release_it.git.push_repo (the configured push remote name or URL, distinct from vcs.repository.url.full which is defined as the canonical repository URL — pushRepo may be a remote name like 'origin' rather than a full URL).
- The synchronous methods rollback, enableRollback, disableRollback, tagExists, isWorkingDirClean, stage, stageDir, reset, status, commit, tag, and afterRelease are all skipped. Although several return Promises via .then()/.catch() chaining, they are unexported class internals (RST-004) and pure synchronous data transformations with no direct I/O orchestration that isn't already covered by their callers' spans (RST-001).

## Advisory Findings
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "release_it.git.is_enabled" may be a semantic duplicate of existing registry operation "release_it.git.is_git_repo". If these operations are equivalent, reuse "release_it.git.is_git_repo" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "release_it.git.release" may be a semantic duplicate. If these operations are equivalent, reuse "the existing name" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
