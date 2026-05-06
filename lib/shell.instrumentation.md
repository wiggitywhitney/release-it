# Instrumentation Report: lib/shell.js

## Summary
- **Status**: success
- **Spans added**: 2
- **Attempts**: 2 (multi-turn-fix)
- **Input tokens**: 13.2K
- **Output tokens**: 18.3K
- **Cached tokens**: 57.8K

## Schema Extensions
- `span.release_it.shell.exec_formatted_command`
- `span.release_it.shell.exec_with_arguments`

## Validation Journey
1. **Attempt 1**: 1 blocking error (NDS-007 (Expected Catch Unmodified):1)
2. **Attempt 2**: 0 errors

## Notes
- NDS-007 fix: removed `span.recordException` and `span.setStatus(ERROR)` from the catch block in `execWithArguments`. The catch does `return Promise.reject(err)` which the validator treats as graceful control-flow delegation rather than an unhandled failure — the inner Promise already handles rejection semantics, so the outer catch is a pass-through, not a true error boundary.
- CDQ-006 fix: wrapped the `command.join(' ')` call in `if (span.isRecording())` because `.join()` on an array is a non-trivial computation that should be skipped when the span is not being sampled.
- SCH-001 advisory: `release_it.shell.exec_with_arguments` and `release_it.shell.exec_formatted_command` are distinct operations — `execFormattedCommand` handles caching, dry-run logic, and dispatch, while `execWithArguments` handles low-level process spawning with interactive stdio. They are different operation classes and both span names are intentionally kept.
- The registered key `release_it.hook.command` was reused for the shell command string — it is the only registered key capturing a shell command, and was the closest semantic match despite its 'hook' framing in the brief.

## Advisory Findings
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "release_it.shell.exec_formatted_command" may be a semantic duplicate. If these operations are equivalent, reuse "the existing name" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
- SCH-001 (Span Names Match Registry): SCH-001: declared span extension "release_it.shell.exec_with_arguments" may be a semantic duplicate of existing registry operation "release_it.shell.exec_formatted_command". If these operations are equivalent, reuse "release_it.shell.exec_formatted_command" instead of declaring a new extension. If they are a different operation class, this advisory can be ignored.
