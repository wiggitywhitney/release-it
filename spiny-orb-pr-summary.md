## Summary

- **Files processed**: 23
- **Committed**: 9
- **No changes needed**: 10
- **Failed**: 4

## Per-File Results

| File | Status | Spans | Attempts | Cost | Libraries | Schema Extensions |
|------|--------|-------|----------|------|-----------|-------------------|
| lib/config.js | success | 3 | 3 | $0.55 | — | 4 (see Schema Changes) |
| lib/prompt.js | success | 1 | 2 | $0.27 | — | 5 (see Schema Changes) |
| lib/util.js | success | 1 | 2 | $0.30 | — | 2 (see Schema Changes) |
| lib/plugin/Plugin.js | success | 1 | 1 | $0.18 | — | 1 (see Schema Changes) |
| lib/plugin/GitBase.js | failed: Validation failed: LINT — LINT check failed: the original file was Prettier-compliant but the instrumented output is not. Prettier config: /Users/whitney.lee/Documents/Repositories/release-it/.prettierrc.json. The agent introduced formatting violations.  Prettier would reformat your output as follows — regenerate the file with these changes applied: ```diff          const latestTagName = await this.getLatestTagName();          const ref = latestTagName ? `${latestTagName}..HEAD` : 'HEAD'; -        const result = await this.exec(`git rev-list ${ref} --count ${commitsPath ? `-- ${commitsPath}` : ''}`, { options }).then(Number); +        const result = await this.exec(`git rev-list ${ref} --count ${commitsPath ? `-- ${commitsPath}` : ''}`, { -        span.setAttribute('release_it.git.commits_since_tag', result); +          options -        return result; +        }).then(Number); -      } catch (error) { +        span.setAttribute('release_it.git.commits_since_tag', result); -        span.recordException(error); +        return result; -        span.setStatus({ code: SpanStatusCode.ERROR }); +      } catch (error) { -        throw error; +        span.recordException(error); -      } finally { +        span.setStatus({ code: SpanStatusCode.ERROR }); -        span.end(); +        throw error; -      } +      } finally { -    }); +        span.end(); -  } +      } - +    }); -  async getChangelog() { +  } -    return tracer.startActiveSpan('release_it.git_base.get_changelog', async span => { + -      try { +  async getChangelog() { -        const { snapshot } = this.config.getContext(); +    return tracer.startActiveSpan('release_it.git_base.get_changelog', async span => { -        const { latestTag, secondLatestTag } = this.config.getContext(); +      try { -        const context = { latestTag, from: latestTag, to: 'HEAD' }; +        const { snapshot } = this.config.getContext(); -        const { changelog, commit } = this.options; +        const { latestTag, secondLatestTag } = this.config.getContext(); -        if (!changelog) return null; +        const context = { latestTag, from: latestTag, to: 'HEAD' }; - +        const { changelog, commit } = this.options; -        if (latestTag && !this.config.isIncrement) { +        if (!changelog) return null; -          if ((await this.getCommitsSinceLatestTag()) === 0) { + -            context.from = secondLatestTag; +        if (latestTag && !this.config.isIncrement) { -            context.to = `${latestTag}^1`; +          if ((await this.getCommitsSinceLatestTag()) === 0) { -          } else if (commit === false) { +            context.from = secondLatestTag; -            context.to = 'HEAD^1'; +            context.to = `${latestTag}^1`; -          } +          } else if (commit === false) { -        } +            context.to = 'HEAD^1'; - +          } -        // For now, snapshots do not get a changelog, as it often goes haywire (easy to add to release manually) +        } -        if (snapshot) return ''; + - +        // For now, snapshots do not get a changelog, as it often goes haywire (easy to add to release manually) -        if (!context.from && changelog.includes('${from}')) { +        if (snapshot) return ''; -          const result = await this.exec(changelogFallback); + -          if (result != null) { +        if (!context.from && changelog.includes('${from}')) { -            span.setAttribute('release_it.changelog.length', result.length); +          const result = await this.exec(changelogFallback); -          } +          if (result != null) { -          return result; +            span.setAttribute('release_it.changelog.length', result.length); -        } +          } - +          return result; -        const result = await this.exec(changelog, { context, options }); +        } -        if (result != null) { + -          span.setAttribute('release_it.changelog.length', result.length); +        const result = await this.exec(changelog, { context, options }); -        } +        if (result != null) { -        return result; +          span.setAttribute('release_it.changelog.length', result.length); -      } catch (error) { +        } -        span.recordException(error); +        return result; -        span.setStatus({ code: SpanStatusCode.ERROR }); +      } catch (error) { -        throw error; +        span.recordException(error); -      } finally { +        span.setStatus({ code: SpanStatusCode.ERROR }); -        span.end(); +        throw error; -      } +      } finally { -    }); +        span.end(); -  } +      } - +    }); -  bump(version) { +  } -    const { tagTemplate } = this.config.getContext(); + -    const context = Object.assign(this.config.getContext(), { version }); +  bump(version) { -    const tagName = format(tagTemplate, context) \|\| version; +    const { tagTemplate } = this.config.getContext(); -    this.setContext({ version }); +    const context = Object.assign(this.config.getContext(), { version }); -    this.config.setContext({ tagName }); +    const tagName = format(tagTemplate, context) \|\| version; -  } +    this.setContext({ version }); - +    this.config.setContext({ tagName }); -  isRemoteName(remoteUrlOrName) { +  } -    return remoteUrlOrName && !remoteUrlOrName.includes('/'); + -  } +  isRemoteName(remoteUrlOrName) { - +    return remoteUrlOrName && !remoteUrlOrName.includes('/'); -  async getRemoteUrl() { +  } -    return tracer.startActiveSpan('release_it.git_base.get_remote_url', async span => { + -      try { +  async getRemoteUrl() { -        const remoteNameOrUrl = this.options.pushRepo \|\| (await this.getRemote()) \|\| 'origin'; +    return tracer.startActiveSpan('release_it.git_base.get_remote_url', async span => { -        span.setAttribute('release_it.git.remote_ref', remoteNameOrUrl); +      try { -        return this.isRemoteName(remoteNameOrUrl) +        const remoteNameOrUrl = this.options.pushRepo \|\| (await this.getRemote()) \|\| 'origin'; -          ? this.exec(`git remote get-url ${remoteNameOrUrl}`, { options }).catch(() => +        span.setAttribute('release_it.git.remote_ref', remoteNameOrUrl); -              this.exec(`git config --get remote.${remoteNameOrUrl}.url`, { options }).catch(() => null) +        return this.isRemoteName(remoteNameOrUrl) -            ) +          ? this.exec(`git remote get-url ${remoteNameOrUrl}`, { options }).catch(() => -          : remoteNameOrUrl; +              this.exec(`git config --get remote.${remoteNameOrUrl}.url`, { options }).catch(() => null) -      } catch (error) { +            ) -        span.recordException(error); +          : remoteNameOrUrl; -        span.setStatus({ code: SpanStatusCode.ERROR }); +      } catch (error) { -        throw error; +        span.recordException(error); -      } finally { +        span.setStatus({ code: SpanStatusCode.ERROR }); -        span.end(); +        throw error; -      } +      } finally { -    }); +        span.end(); -  } +      } - +    }); -  async getRemote() { +  } -    return tracer.startActiveSpan('release_it.git_base.get_remote', async span => { + -      try { +  async getRemote() { -        const branchName = await this.getBranchName(); +    return tracer.startActiveSpan('release_it.git_base.get_remote', async span => { -        if (branchName != null) { +      try { -          span.setAttribute('vcs.ref.head.name', branchName); +        const branchName = await this.getBranchName(); -        } +        if (branchName != null) { -        return branchName ? await this.getRemoteForBranch(branchName) : null; +          span.setAttribute('vcs.ref.head.name', branchName); -      } catch (error) { +        } -        span.recordException(error); +        return branchName ? await this.getRemoteForBranch(branchName) : null; ... (diff truncated) ``` | 0 | 3 | $0.68 | — | — |
| lib/plugin/GitRelease.js | success | 2 | 2 | $0.27 | — | 3 (see Schema Changes) |
| lib/plugin/git/Git.js | failed: Validation failed: LINT — LINT check failed: the original file was Prettier-compliant but the instrumented output is not. Prettier config: /Users/whitney.lee/Documents/Repositories/release-it/.prettierrc.json. The agent introduced formatting violations.  Prettier would reformat your output as follows — regenerate the file with these changes applied: ```diff              await this.rollbackTagPush();            } catch (tagError) { -            this.log.warn(`An error was encountered when trying to rollback the tag on the remote: ${tagError.message}`); +            this.log.warn( -          } +              `An error was encountered when trying to rollback the tag on the remote: ${tagError.message}` - +            ); -          throw error; +          } -        } + -      } catch (error) { +          throw error; -        span.recordException(error); +        } -        span.setStatus({ code: SpanStatusCode.ERROR }); +      } catch (error) { -        throw error; +        span.recordException(error); -      } finally { +        span.setStatus({ code: SpanStatusCode.ERROR }); -        span.end(); +        throw error; -      } +      } finally { -    }); +        span.end(); -  } +      } - +    }); -  async rollbackTagPush() { +  } -    return tracer.startActiveSpan('release_it.git.rollback_tag_push', async span => { + -      try { +  async rollbackTagPush() { -        const { isTagged } = this.getContext(); +    return tracer.startActiveSpan('release_it.git.rollback_tag_push', async span => { -        if (isTagged) { +      try { -          const { tagName } = this.config.getContext(); +        const { isTagged } = this.getContext(); -          span.setAttribute('release_it.git.tag_name', tagName); +        if (isTagged) { -          this.log.info(`Rolling back remote tag push ${tagName}`); +          const { tagName } = this.config.getContext(); -          await this.exec(`git push origin --delete ${tagName}`); +          span.setAttribute('release_it.git.tag_name', tagName); -        } +          this.log.info(`Rolling back remote tag push ${tagName}`); -      } catch (error) { +          await this.exec(`git push origin --delete ${tagName}`); -        span.recordException(error); +        } -        span.setStatus({ code: SpanStatusCode.ERROR }); +      } catch (error) { -        throw error; +        span.recordException(error); -      } finally { +        span.setStatus({ code: SpanStatusCode.ERROR }); -        span.end(); +        throw error; -      } +      } finally { -    }); +        span.end(); -  } +      } - +    }); -  afterRelease() { +  } -    this.disableRollback(); + -  } +  afterRelease() { -} +    this.disableRollback(); - +  } -export default Git; +}   +export default Git; + ``` | 0 | 3 | $0.96 | — | — |
| lib/plugin/github/GitHub.js | success | 13 | 2 | $0.74 | — | 13 (see Schema Changes) |
| lib/plugin/gitlab/GitLab.js | success | 9 | 2 | $0.64 | — | 13 (see Schema Changes) |
| lib/plugin/npm/npm.js | failed: Validation failed: NDS-003, NDS-003, NDS-003, NDS-003 — NDS-003: original line 73 missing/modified: return this.spinner.show({ task, label: 'npm version' }); The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code. If lines are missing because you joined a multi-line statement or expression onto fewer lines (variable declarations, method chains, function call arguments, conditional expressions, or any other code spanning multiple lines), restore every line to its exact original form — each original line must appear as its own line. | 0 | 2 | $0.65 | — | — |
| lib/plugin/version/Version.js | success | 1 | 1 | $0.23 | — | 1 (see Schema Changes) |
| lib/plugin/factory.js | success | 2 | 2 | $0.45 | — | 4 (see Schema Changes) |
| lib/shell.js | failed: Validation failed: SCH-002 — SCH-002 check failed: declared attribute extension "release_it.shell.command" is used with an inconsistent value source at line 99 ("command") — it was first used with "cacheKey" at line 36, a different concept. Declare a separate attribute key for this value, or use this key consistently for the same concept everywhere it appears in this file. | 0 | 3 | $0.62 | — | — |

**No changes needed** (10 files, 0 spans): lib/args.js, lib/cli.js, lib/index.js, lib/log.js, lib/plugin/github/util.js, lib/plugin/npm/prompts.js, lib/plugin/git/prompts.js, lib/plugin/github/prompts.js, lib/plugin/gitlab/prompts.js, lib/spinner.js

## Span Category Breakdown

*Self-reported by the LLM, not independently verified against the diff. "External Calls" counts manually-wrapped spans only — calls covered by an auto-instrumentation library are not included.*

| File | External Calls | Schema-Defined | Service Entry Points | Total Functions | Attrs Reused / New |
|------|---------------|----------------|---------------------|-----------------|---------------------|
| lib/config.js | 1 | 0 | 2 | 24 | 0 / 1 |
| lib/prompt.js | 0 | 0 | 1 | 3 | 0 / 4 |
| lib/util.js | 0 | 0 | 1 | 20 | 0 / 1 |
| lib/plugin/Plugin.js | 0 | 0 | 1 | 22 | 0 / 0 |
| lib/plugin/GitRelease.js | 0 | 0 | 2 | 6 | 0 / 1 |
| lib/plugin/github/GitHub.js | 0 | 0 | 13 | 22 | 0 / 0 |
| lib/plugin/gitlab/GitLab.js | 1 | 0 | 9 | 12 | 0 / 4 |
| lib/plugin/version/Version.js | 0 | 0 | 1 | 10 | 0 / 0 |
| lib/plugin/factory.js | 0 | 0 | 1 | 3 | 0 / 2 |

## Schema Changes

### Summary of Schema Changes
#### Registry versions
Baseline: 0.1.0

Head: 0.1.0

#### Registry Attributes
##### Added
- release_it.config.file
- release_it.git_release.script_type
- release_it.gitlab.asset.name
- release_it.gitlab.milestones_count
- release_it.gitlab.release.name
- release_it.gitlab.request.endpoint
- release_it.plugin.enabled_count
- release_it.plugin.external_count
- release_it.prompt.enabled
- release_it.prompt.name
- release_it.prompt.namespace
- release_it.prompt.type
- release_it.util.collection_size

### New Span IDs

**lib/config.js**
- `span.release_it.config.init`
- `span.release_it.config.load_local_config`
- `span.release_it.config.load_options`

**lib/prompt.js**
- `span.release_it.prompt.show`

**lib/util.js**
- `span.release_it.util.reduce_until`

**lib/plugin/Plugin.js**
- `span.release_it.plugin.show_prompt`

**lib/plugin/GitRelease.js**
- `span.release_it.git_release.before_release`
- `span.release_it.git_release.process_release_notes`

**lib/plugin/github/GitHub.js**
- `span.release_it.github.comment_on_resolved_items`
- `span.release_it.github.create_release`
- `span.release_it.github.create_web_release`
- `span.release_it.github.generate_web_url`
- `span.release_it.github.get_commits`
- `span.release_it.github.get_latest_release`
- `span.release_it.github.get_octokit_release_options`
- `span.release_it.github.init`
- `span.release_it.github.is_authenticated`
- `span.release_it.github.is_collaborator`
- `span.release_it.github.release`
- `span.release_it.github.render_release_notes`
- `span.release_it.github.update_release`

**lib/plugin/gitlab/GitLab.js**
- `span.release_it.gitlab.before_release`
- `span.release_it.gitlab.check_release_milestones`
- `span.release_it.gitlab.create_release`
- `span.release_it.gitlab.init`
- `span.release_it.gitlab.is_authenticated`
- `span.release_it.gitlab.is_collaborator`
- `span.release_it.gitlab.release`
- `span.release_it.gitlab.request`
- `span.release_it.gitlab.upload_asset`

**lib/plugin/version/Version.js**
- `span.release_it.version.get_incremented_version`

**lib/plugin/factory.js**
- `span.release_it.plugin.get_plugins`
- `span.release_it.plugin.load`

### New Attribute Extensions

**lib/config.js**
- `release_it.config.file`

**lib/prompt.js**
- `release_it.prompt.enabled`
- `release_it.prompt.name`
- `release_it.prompt.namespace`
- `release_it.prompt.type`

**lib/util.js**
- `release_it.util.collection_size`

**lib/plugin/GitRelease.js**
- `release_it.git_release.script_type`

**lib/plugin/gitlab/GitLab.js**
- `release_it.gitlab.asset.name`
- `release_it.gitlab.milestones_count`
- `release_it.gitlab.release.name`
- `release_it.gitlab.request.endpoint`

**lib/plugin/factory.js**
- `release_it.plugin.enabled_count`
- `release_it.plugin.external_count`

## Review Attention

- **lib/plugin/github/GitHub.js**: 13 spans added (average: 4) — outlier, review recommended
- **lib/plugin/gitlab/GitLab.js**: 9 spans added (average: 4) — outlier, review recommended

### Advisory Findings

**lib/prompt.js**
- CDQ-007 (Attribute Data Quality):37: Fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. For the path finding, prefer basename() when already imported, or inline filePath.split(/[\\/]/).filter(Boolean).pop() ?? '' otherwise — no new import required either way.

**lib/plugin/Plugin.js**
- CDQ-007 (Attribute Data Quality):71: Fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. For the path finding, prefer basename() when already imported, or inline filePath.split(/[\\/]/).filter(Boolean).pop() ?? '' otherwise — no new import required either way.

**lib/plugin/github/GitHub.js**
- CDQ-007 (Attribute Data Quality): Fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. For the path finding, prefer basename() when already imported, or inline filePath.split(/[\\/]/).filter(Boolean).pop() ?? '' otherwise — no new import required either way. (lines 344, 345, 346, 457, 458, 459, 513, 636)

**lib/plugin/version/Version.js**
- CDQ-007 (Attribute Data Quality): Fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. For the path finding, prefer basename() when already imported, or inline filePath.split(/[\\/]/).filter(Boolean).pop() ?? '' otherwise — no new import required either way. (lines 81, 84)

## Agent Notes

Each instrumented file has a companion `.instrumentation.md` file in the same directory (e.g., `src/api.js` → `src/api.instrumentation.md`) containing the agent's full decision notes.

## Short-Lived Process Setup Guidance

This project is configured as a short-lived process (`targetType: short-lived`). CLIs, scripts, Lambda functions, and batch jobs need special telemetry setup to ensure spans are exported before the process exits.

### Span Processor

Use `SimpleSpanProcessor` instead of the default `BatchSpanProcessor`. Batch processing delays export by up to 5 seconds — a CLI that finishes in under 5 seconds will exit before the batch timer fires, losing all spans silently.

```javascript
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

spanProcessors: [new SimpleSpanProcessor(new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
}))]
```

### process.exit Interception

If your application calls `process.exit()`, intercept it to flush spans before terminating:

```javascript
let isShuttingDown = false;
const originalExit = process.exit;
process.exit = (code) => {
  if (isShuttingDown) return originalExit.call(process, code);
  isShuttingDown = true;
  process.exitCode = code ?? 0;
  sdk.shutdown()
    .catch((err) => console.error('OTel SDK shutdown error:', err))
    .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
    .finally(() => originalExit.call(process, process.exitCode));
};
```

## SDK Bootstrap Checklist

Verify that your SDK init file includes all required resource attributes. Missing attributes reduce observability and cause RES-001 compliance failures.

```javascript
import { randomUUID } from 'node:crypto';

resource: resourceFromAttributes({
  'service.name': 'your-service-name',
  'service.version': process.env.npm_package_version || '0.0.0',
  'service.instance.id': randomUUID(),
}),
```

> **`service.instance.id`** uniquely identifies a running process instance. Without it, traces from different deployments share identical resource metadata — spans are indistinguishable across restarts and parallel processes.

## Token Usage

| | Ceiling | Actual |
|---|---------|--------|
| **Cost** | $53.82 | $6.55 (claude-sonnet-4-6) |
| **Input tokens** | 2,300,000 | 219,735 |
| **Output tokens** | — | 254,763 |
| **Cache read tokens** | — | 199,693 |
| **Cache write tokens** | — | 535,431 |

Model: `claude-sonnet-4-6` | Files: 23 | Total file size: 90,040 bytes

## Live-Check Compliance

Live-Check: OK (1239 spans, 5555 advisory findings — see compliance report)

Full compliance report: [spiny-orb-live-check-report.json](./spiny-orb-live-check-report.json)

## Agent Version

`2.0.0`

## Warnings

- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/GitBase.js — Validation failed: LINT — LINT check failed: the original file was Prettier-compliant but the instrumented output is not. Prettier config: /Users/whitney.lee/Documents/Repositories/release-it/.prettierrc.json. The agent introduced formatting violations.

Prettier would reformat your output as follows — regenerate the file with these changes applied:
```diff
         const latestTagName = await this.getLatestTagName();
         const ref = latestTagName ? `${latestTagName}..HEAD` : 'HEAD';
-        const result = await this.exec(`git rev-list ${ref} --count ${commitsPath ? `-- ${commitsPath}` : ''}`, { options }).then(Number);
+        const result = await this.exec(`git rev-list ${ref} --count ${commitsPath ? `-- ${commitsPath}` : ''}`, {
-        span.setAttribute('release_it.git.commits_since_tag', result);
+          options
-        return result;
+        }).then(Number);
-      } catch (error) {
+        span.setAttribute('release_it.git.commits_since_tag', result);
-        span.recordException(error);
+        return result;
-        span.setStatus({ code: SpanStatusCode.ERROR });
+      } catch (error) {
-        throw error;
+        span.recordException(error);
-      } finally {
+        span.setStatus({ code: SpanStatusCode.ERROR });
-        span.end();
+        throw error;
-      }
+      } finally {
-    });
+        span.end();
-  }
+      }
-
+    });
-  async getChangelog() {
+  }
-    return tracer.startActiveSpan('release_it.git_base.get_changelog', async span => {
+
-      try {
+  async getChangelog() {
-        const { snapshot } = this.config.getContext();
+    return tracer.startActiveSpan('release_it.git_base.get_changelog', async span => {
-        const { latestTag, secondLatestTag } = this.config.getContext();
+      try {
-        const context = { latestTag, from: latestTag, to: 'HEAD' };
+        const { snapshot } = this.config.getContext();
-        const { changelog, commit } = this.options;
+        const { latestTag, secondLatestTag } = this.config.getContext();
-        if (!changelog) return null;
+        const context = { latestTag, from: latestTag, to: 'HEAD' };
-
+        const { changelog, commit } = this.options;
-        if (latestTag && !this.config.isIncrement) {
+        if (!changelog) return null;
-          if ((await this.getCommitsSinceLatestTag()) === 0) {
+
-            context.from = secondLatestTag;
+        if (latestTag && !this.config.isIncrement) {
-            context.to = `${latestTag}^1`;
+          if ((await this.getCommitsSinceLatestTag()) === 0) {
-          } else if (commit === false) {
+            context.from = secondLatestTag;
-            context.to = 'HEAD^1';
+            context.to = `${latestTag}^1`;
-          }
+          } else if (commit === false) {
-        }
+            context.to = 'HEAD^1';
-
+          }
-        // For now, snapshots do not get a changelog, as it often goes haywire (easy to add to release manually)
+        }
-        if (snapshot) return '';
+
-
+        // For now, snapshots do not get a changelog, as it often goes haywire (easy to add to release manually)
-        if (!context.from && changelog.includes('${from}')) {
+        if (snapshot) return '';
-          const result = await this.exec(changelogFallback);
+
-          if (result != null) {
+        if (!context.from && changelog.includes('${from}')) {
-            span.setAttribute('release_it.changelog.length', result.length);
+          const result = await this.exec(changelogFallback);
-          }
+          if (result != null) {
-          return result;
+            span.setAttribute('release_it.changelog.length', result.length);
-        }
+          }
-
+          return result;
-        const result = await this.exec(changelog, { context, options });
+        }
-        if (result != null) {
+
-          span.setAttribute('release_it.changelog.length', result.length);
+        const result = await this.exec(changelog, { context, options });
-        }
+        if (result != null) {
-        return result;
+          span.setAttribute('release_it.changelog.length', result.length);
-      } catch (error) {
+        }
-        span.recordException(error);
+        return result;
-        span.setStatus({ code: SpanStatusCode.ERROR });
+      } catch (error) {
-        throw error;
+        span.recordException(error);
-      } finally {
+        span.setStatus({ code: SpanStatusCode.ERROR });
-        span.end();
+        throw error;
-      }
+      } finally {
-    });
+        span.end();
-  }
+      }
-
+    });
-  bump(version) {
+  }
-    const { tagTemplate } = this.config.getContext();
+
-    const context = Object.assign(this.config.getContext(), { version });
+  bump(version) {
-    const tagName = format(tagTemplate, context) || version;
+    const { tagTemplate } = this.config.getContext();
-    this.setContext({ version });
+    const context = Object.assign(this.config.getContext(), { version });
-    this.config.setContext({ tagName });
+    const tagName = format(tagTemplate, context) || version;
-  }
+    this.setContext({ version });
-
+    this.config.setContext({ tagName });
-  isRemoteName(remoteUrlOrName) {
+  }
-    return remoteUrlOrName && !remoteUrlOrName.includes('/');
+
-  }
+  isRemoteName(remoteUrlOrName) {
-
+    return remoteUrlOrName && !remoteUrlOrName.includes('/');
-  async getRemoteUrl() {
+  }
-    return tracer.startActiveSpan('release_it.git_base.get_remote_url', async span => {
+
-      try {
+  async getRemoteUrl() {
-        const remoteNameOrUrl = this.options.pushRepo || (await this.getRemote()) || 'origin';
+    return tracer.startActiveSpan('release_it.git_base.get_remote_url', async span => {
-        span.setAttribute('release_it.git.remote_ref', remoteNameOrUrl);
+      try {
-        return this.isRemoteName(remoteNameOrUrl)
+        const remoteNameOrUrl = this.options.pushRepo || (await this.getRemote()) || 'origin';
-          ? this.exec(`git remote get-url ${remoteNameOrUrl}`, { options }).catch(() =>
+        span.setAttribute('release_it.git.remote_ref', remoteNameOrUrl);
-              this.exec(`git config --get remote.${remoteNameOrUrl}.url`, { options }).catch(() => null)
+        return this.isRemoteName(remoteNameOrUrl)
-            )
+          ? this.exec(`git remote get-url ${remoteNameOrUrl}`, { options }).catch(() =>
-          : remoteNameOrUrl;
+              this.exec(`git config --get remote.${remoteNameOrUrl}.url`, { options }).catch(() => null)
-      } catch (error) {
+            )
-        span.recordException(error);
+          : remoteNameOrUrl;
-        span.setStatus({ code: SpanStatusCode.ERROR });
+      } catch (error) {
-        throw error;
+        span.recordException(error);
-      } finally {
+        span.setStatus({ code: SpanStatusCode.ERROR });
-        span.end();
+        throw error;
-      }
+      } finally {
-    });
+        span.end();
-  }
+      }
-
+    });
-  async getRemote() {
+  }
-    return tracer.startActiveSpan('release_it.git_base.get_remote', async span => {
+
-      try {
+  async getRemote() {
-        const branchName = await this.getBranchName();
+    return tracer.startActiveSpan('release_it.git_base.get_remote', async span => {
-        if (branchName != null) {
+      try {
-          span.setAttribute('vcs.ref.head.name', branchName);
+        const branchName = await this.getBranchName();
-        }
+        if (branchName != null) {
-        return branchName ? await this.getRemoteForBranch(branchName) : null;
+          span.setAttribute('vcs.ref.head.name', branchName);
-      } catch (error) {
+        }
-        span.recordException(error);
+        return branchName ? await this.getRemoteForBranch(branchName) : null;
... (diff truncated)
```
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/git/Git.js — Validation failed: LINT — LINT check failed: the original file was Prettier-compliant but the instrumented output is not. Prettier config: /Users/whitney.lee/Documents/Repositories/release-it/.prettierrc.json. The agent introduced formatting violations.

Prettier would reformat your output as follows — regenerate the file with these changes applied:
```diff
             await this.rollbackTagPush();
           } catch (tagError) {
-            this.log.warn(`An error was encountered when trying to rollback the tag on the remote: ${tagError.message}`);
+            this.log.warn(
-          }
+              `An error was encountered when trying to rollback the tag on the remote: ${tagError.message}`
-
+            );
-          throw error;
+          }
-        }
+
-      } catch (error) {
+          throw error;
-        span.recordException(error);
+        }
-        span.setStatus({ code: SpanStatusCode.ERROR });
+      } catch (error) {
-        throw error;
+        span.recordException(error);
-      } finally {
+        span.setStatus({ code: SpanStatusCode.ERROR });
-        span.end();
+        throw error;
-      }
+      } finally {
-    });
+        span.end();
-  }
+      }
-
+    });
-  async rollbackTagPush() {
+  }
-    return tracer.startActiveSpan('release_it.git.rollback_tag_push', async span => {
+
-      try {
+  async rollbackTagPush() {
-        const { isTagged } = this.getContext();
+    return tracer.startActiveSpan('release_it.git.rollback_tag_push', async span => {
-        if (isTagged) {
+      try {
-          const { tagName } = this.config.getContext();
+        const { isTagged } = this.getContext();
-          span.setAttribute('release_it.git.tag_name', tagName);
+        if (isTagged) {
-          this.log.info(`Rolling back remote tag push ${tagName}`);
+          const { tagName } = this.config.getContext();
-          await this.exec(`git push origin --delete ${tagName}`);
+          span.setAttribute('release_it.git.tag_name', tagName);
-        }
+          this.log.info(`Rolling back remote tag push ${tagName}`);
-      } catch (error) {
+          await this.exec(`git push origin --delete ${tagName}`);
-        span.recordException(error);
+        }
-        span.setStatus({ code: SpanStatusCode.ERROR });
+      } catch (error) {
-        throw error;
+        span.recordException(error);
-      } finally {
+        span.setStatus({ code: SpanStatusCode.ERROR });
-        span.end();
+        throw error;
-      }
+      } finally {
-    });
+        span.end();
-  }
+      }
-
+    });
-  afterRelease() {
+  }
-    this.disableRollback();
+
-  }
+  afterRelease() {
-}
+    this.disableRollback();
-
+  }
-export default Git;
+}
 
+export default Git;
+
```
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/npm/npm.js — Validation failed: NDS-003, NDS-003, NDS-003, NDS-003 — NDS-003: original line 73 missing/modified: return this.spinner.show({ task, label: 'npm version' });
The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code. If lines are missing because you joined a multi-line statement or expression onto fewer lines (variable declarations, method chains, function call arguments, conditional expressions, or any other code spanning multiple lines), restore every line to its exact original form — each original line must appear as its own line.
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/shell.js — Validation failed: SCH-002 — SCH-002 check failed: declared attribute extension "release_it.shell.command" is used with an inconsistent value source at line 99 ("command") — it was first used with "cacheKey" at line 36, a different concept. Declare a separate attribute key for this value, or use this key consistently for the same concept everywhere it appears in this file.
- Live-check partial: 4 file(s) failed instrumentation (/Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/GitBase.js, /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/git/Git.js, /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/npm/npm.js, /Users/whitney.lee/Documents/Repositories/release-it/lib/shell.js). Compliance report may be incomplete — spans from failed files are missing. This warning is advisory — the run completed; successfully instrumented files are unaffected. To get full coverage, review the failed files above and re-run spiny-orb on them.