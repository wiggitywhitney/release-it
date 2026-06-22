# Instrumentation Report: lib/plugin/Plugin.js

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 1 (initial-generation)
- **Input tokens**: 1.2K
- **Output tokens**: 7.9K
- **Cached tokens**: 33.8K

## Schema Extensions
- `span.release_it.plugin.show_prompt`

## Validation Journey
1. **Attempt 1**: 0 errors

## Notes
- showPrompt is the only async method in Plugin — it delegates to this.prompt.show() which is the interactive prompt display path, making it a service entry point (COV-001). It receives a span named release_it.plugin.show_prompt (reported in schemaExtensions as no matching schema span exists for this prompt-display operation).
- release_it.plugin.namespace is a registered attribute key and accurately captures this.namespace, which identifies which plugin is showing the prompt. No new attribute keys were invented.
- All other methods (isEnabled, disablePlugin, constructor, getInitialOptions, init, getName, getLatestVersion, getChangelog, getIncrement, getIncrementedVersionCI, getIncrementedVersion, beforeBump, bump, beforeRelease, release, afterRelease, getContext, setContext, exec, registerPrompts, step) are synchronous or thin wrappers with no async I/O — skipped per RST-001 and RST-003. exec returns this.shell.exec() but is itself synchronous in structure and covered by the pre-instrumentation analysis.
- span.release_it.plugin.show_prompt is a new span name not in the registry. No existing schema span matches this prompt-display operation — the existing schema spans (release_it.config.init, release_it.config.load_options, release_it.config.load_local_config) are all config-scoped. This span is plugin-scoped and covers the interactive prompt display lifecycle.

## Advisory Findings
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "release_it.plugin.show_prompt" may be a semantic duplicate of existing registry operation "release_it.config.load_options". If these operations are equivalent, reuse "release_it.config.load_options" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
