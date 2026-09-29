# Instrumentation Report: lib/prompt.js

## Summary
- **Status**: success
- **Spans added**: 1
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 5.0K
- **Output tokens**: 6.5K
- **Cached tokens**: 20.4K

## Schema Extensions
- `span.release_it.prompt.show`
- `release_it.prompt.namespace`
- `release_it.prompt.name`
- `release_it.prompt.enabled`
- `release_it.prompt.type`

## Validation Journey
1. **Attempt 1**: 1 blocking error (LINT (Lint Clean):1)
2. **Attempt 2**: 0 errors

## Notes
- register is a synchronous method with no I/O or async operations — skipped per RST-001 (no spans on pure synchronous utilities).
- span.release_it.prompt.show: new span name declared as a schema extension. No existing registry span matches the prompt display operation. The namespace prefix release_it matches the registry convention.
- release_it.prompt.namespace: new string attribute capturing which plugin namespace the prompt belongs to. No registered key semantically matches a prompt namespace identifier.
- release_it.prompt.name: new string attribute capturing which prompt is being shown by name. No registered key semantically matches a prompt name within its namespace.
- release_it.prompt.enabled: new boolean attribute capturing whether the prompt was enabled before execution. Set before the early-return guard so all span paths carry this context.
- release_it.prompt.type: new string attribute capturing the inquirer prompt type (confirm, input, list). No registered key semantically matches the prompt interaction type. Set after the enabled guard since it requires prompt lookup.

## Advisory Findings
- CDQ-007 (Attribute Data Quality):37: Fired for one or more of: a PII attribute name (like author, email, or username) or a raw filesystem path where a basename would be safer. PII in traces can violate privacy policies and is worth fixing. For the path finding, prefer basename() when already imported, or inline filePath.split(/[\\/]/).filter(Boolean).pop() ?? '' otherwise — no new import required either way.

## Agent Thinking

### Attempt 1

```
Let me analyze this file and instrument it according to the schema and rules.

Key observations:
1. `show` is an async entry point (COV-001) - needs a span
2. `register` is synchronous - skip (RST-001)
3. The schema has spans for `release_it.config.init`, `release_it.config.load_local_config`, `release_it.config.load_options` - none match `show`
4. Need to invent a span name for `show`: `release_it.prompt.show`

For attributes on the `show` span:
- `namespace` parameter - no registered key matches, need extension: `release_it.prompt.namespace`
- `promptName`, `enabled`, and `prompt.type` also lack registered keys, so I'll extend with `release_it.prompt.name`, `release_it.prompt.enabled`, and `release_it.prompt.type` to capture which prompt is shown, its type, and whether it's active. I also need to be careful that `prompt` is only accessed after the enabled check, so attribute placement has to respect that ordering.

I'll set `namespace`, `promptName`, and `enabled` before the early return guard, then `prompt.type` afterward. Now I'm writing the instrumented Prompt class with tracer setup and imports for the inquirer prompt types...

Writing the register and show methods...

Finishing the prompt method with error handling that records exceptions to the span and ensures it ends in a finally block. Now I'm reviewing the schema extensions needed—new attributes like namespace, name, enabled, and type for the prompt span—and double-checking against the pre-instrumentation analysis for the `show` field placement.

Now I'm tallying up span categories: no external calls, one service entry point (show), and I'm debating whether to count the constructor as one of the file's functions, leaning toward including it for a total of three.

Checking CDQ-006, none of the attribute reads (namespace, promptName, enabled, prompt.type) need isRecording guards since they're just simple property accesses.

Now I'm listing out the schema extensions for the prompt span, covering namespace, name, enabled, and type attributes.

`register` skips RST-001 since it's synchronous with no I/O, and these are new extension attributes since there's no matching registered keys. Time to finalize the output.


```

### Attempt 2

```
The issue is a line length violation. The `const answer = await (...)` line is too long (>120 chars) and Prettier is reformatting it. Let me apply the Prettier diff to fix the formatting.
```
