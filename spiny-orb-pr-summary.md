## Summary

- **Files processed**: 23
- **Committed**: 0
- **No changes needed**: 3
- **Failed**: 20

## Per-File Results

| File | Status | Spans | Attempts | Cost | Libraries | Schema Extensions |
|------|--------|-------|----------|------|-----------|-------------------|
| lib/args.js | failed: Rolled back: checkpoint test failure at file 5/23 | 0 | 1 | $0.00 | — | — |
| lib/cli.js | failed: Rolled back: checkpoint test failure at file 5/23 | 0 | 1 | $0.00 | — | — |
| lib/config.js | failed: Rolled back: checkpoint test failure at file 5/23 | 1 | 2 | $0.21 | — | — |
| lib/index.js | failed: Validation failed: LINT — LINT check failed: the original file was Prettier-compliant but the instrumented output is not. Prettier config: /Users/whitney.lee/Documents/Repositories/release-it/.prettierrc.json. The agent introduced formatting violations.  Prettier would reformat your output as follows — regenerate the file with these changes applied: ```diff    const runTasks = async (opts, di) => { -  return tracer.startActiveSpan('release_it.run_tasks', async (span) => { +  return tracer.startActiveSpan('release_it.run_tasks', async span => {      let container = {};   ...        if (!isReleaseVersion) {          const action = config.isIncrement ? 'release' : 'update'; -        const suffix = version && config.isIncrement ? `${latestVersion}...${version}` : `currently at ${latestVersion}`; +        const suffix = -        log.obtrusive(`🚀 Let's ${action} ${name} (${suffix})`); +          version && config.isIncrement ? `${latestVersion}...${version}` : `currently at ${latestVersion}`; -        log.preview({ title: 'changelog', text: changelog }); +        log.obtrusive(`🚀 Let's ${action} ${name} (${suffix})`); -      } +        log.preview({ title: 'changelog', text: changelog }); - +      } -      if (config.isIncrement) { + -        version = version \|\| (await reduceUntil(plugins, plugin => plugin.getIncrementedVersion(incrementBase))); +      if (config.isIncrement) { -      } +        version = version \|\| (await reduceUntil(plugins, plugin => plugin.getIncrementedVersion(incrementBase))); - +      } -      if (isReleaseVersion) { + -        if (version) { +      if (isReleaseVersion) { -          console.log(version); +        if (version) { -          process.exit(0); +          console.log(version); -        } else { +          process.exit(0); -          log.warn(`No new version to release`); +        } else { -          process.exit(1); +          log.warn(`No new version to release`); -        } +          process.exit(1); -      } +        } - +      } -      if (version) { + -        config.setContext(parseVersion(version)); +      if (version) { - +        config.setContext(parseVersion(version)); -        if (config.isPromptOnlyVersion) { + -          config.setCI(true); +        if (config.isPromptOnlyVersion) { -        } +          config.setCI(true); - +        } -        for (const hook of ['beforeBump', 'bump', 'beforeRelease']) { + -          for (const plugin of plugins) { +        for (const hook of ['beforeBump', 'bump', 'beforeRelease']) { -            const args = hook === 'bump' ? [version] : []; +          for (const plugin of plugins) { -            await runLifeCycleHook(plugin, hook, ...args); +            const args = hook === 'bump' ? [version] : []; -          } +            await runLifeCycleHook(plugin, hook, ...args); -        } +          } - +        } -        plugins = [...internal, ...external]; + - +        plugins = [...internal, ...external]; -        for (const hook of ['release', 'afterRelease']) { + -          for (const plugin of plugins) { +        for (const hook of ['release', 'afterRelease']) { -            await runLifeCycleHook(plugin, hook); +          for (const plugin of plugins) { -          } +            await runLifeCycleHook(plugin, hook); -        } +          } -      } else { +        } -        log.obtrusive(`No new version to release`); +      } else { -      } +        log.obtrusive(`No new version to release`); - +      } -      if (version != null) { + -        span.setAttribute('release_it.version.next', version); +      if (version != null) { -      } +        span.setAttribute('release_it.version.next', version); -      if (incrementBase.increment != null) { +      } -        span.setAttribute('release_it.version.increment', incrementBase.increment); +      if (incrementBase.increment != null) { -      } +        span.setAttribute('release_it.version.increment', incrementBase.increment); - +      } -      log.log(`🏁 Done (in ${Math.floor(process.uptime())}s.)`); + - +      log.log(`🏁 Done (in ${Math.floor(process.uptime())}s.)`); -      return { + -        name, +      return { -        changelog, +        name, -        latestVersion, +        changelog, -        version +        latestVersion, -      }; +        version -    } catch (err) { +      }; -      span.recordException(err); +    } catch (err) { -      span.setStatus({ code: SpanStatusCode.ERROR }); +      span.recordException(err); - +      span.setStatus({ code: SpanStatusCode.ERROR }); -      const { log } = container; + - +      const { log } = container; -      const errorMessage = err.message \|\| err; + -      const logger = log \|\| console; +      const errorMessage = err.message \|\| err; - +      const logger = log \|\| console; -      err.cause === 'INFO' ? logger.info(errorMessage) : logger.error(errorMessage); + - +      err.cause === 'INFO' ? logger.info(errorMessage) : logger.error(errorMessage); -      throw err; + -    } finally { +      throw err; -      span.end(); +    } finally { -    } +      span.end(); -  }); +    } -}; +  }); - +}; -export default runTasks; + - +export default runTasks; -export { default as Config } from './config.js'; + - +export { default as Config } from './config.js'; -export { default as Plugin } from './plugin/Plugin.js'; + - +export { default as Plugin } from './plugin/Plugin.js'; + ``` | 0 | 3 | $0.54 | — | — |
| lib/log.js | failed: Rolled back: checkpoint test failure at file 5/23 | 0 | 1 | $0.03 | — | — |
| lib/plugin/GitBase.js | failed: Validation failed: LINT — LINT check failed: the original file was Prettier-compliant but the instrumented output is not. Prettier config: /Users/whitney.lee/Documents/Repositories/release-it/.prettierrc.json. The agent introduced formatting violations.  Prettier would reformat your output as follows — regenerate the file with these changes applied: ```diff  class GitBase extends Plugin {    async init() { -    return tracer.startActiveSpan('release-it.git.init', async (span) => { +    return tracer.startActiveSpan('release-it.git.init', async span => {        try {          const remoteUrl = await this.getRemoteUrl(); ...      async getCommitsSinceLatestTag(commitsPath = '') { -    return tracer.startActiveSpan('release-it.git.get_commits_since_latest_tag', async (span) => { +    return tracer.startActiveSpan('release-it.git.get_commits_since_latest_tag', async span => {        try {          const latestTagName = await this.getLatestTagName(); ...            span.setAttribute('release_it.git.tag_name', latestTagName);          } -        return this.exec(`git rev-list ${ref} --count ${commitsPath ? `-- ${commitsPath}` : ''}`, { options }).then(Number); +        return this.exec(`git rev-list ${ref} --count ${commitsPath ? `-- ${commitsPath}` : ''}`, { options }).then( -      } catch (error) { +          Number -        span.recordException(error); +        ); -        span.setStatus({ code: SpanStatusCode.ERROR }); +      } catch (error) { -        throw error; +        span.recordException(error); -      } finally { +        span.setStatus({ code: SpanStatusCode.ERROR }); -        span.end(); +        throw error; -      } +      } finally { -    }); +        span.end(); -  } +      } - +    }); -  async getChangelog() { +  } -    return tracer.startActiveSpan('release-it.git.get_changelog', async (span) => { + -      try { +  async getChangelog() { -        const { snapshot } = this.config.getContext(); +    return tracer.startActiveSpan('release-it.git.get_changelog', async span => { -        const { latestTag, secondLatestTag } = this.config.getContext(); +      try { -        const context = { latestTag, from: latestTag, to: 'HEAD' }; +        const { snapshot } = this.config.getContext(); -        const { changelog, commit } = this.options; +        const { latestTag, secondLatestTag } = this.config.getContext(); -        if (latestTag != null) { +        const context = { latestTag, from: latestTag, to: 'HEAD' }; -          span.setAttribute('release_it.git.tag_name', latestTag); +        const { changelog, commit } = this.options; -        } +        if (latestTag != null) { -        if (!changelog) return null; +          span.setAttribute('release_it.git.tag_name', latestTag); - +        } -        if (latestTag && !this.config.isIncrement) { +        if (!changelog) return null; -          if ((await this.getCommitsSinceLatestTag()) === 0) { + -            context.from = secondLatestTag; +        if (latestTag && !this.config.isIncrement) { -            context.to = `${latestTag}^1`; +          if ((await this.getCommitsSinceLatestTag()) === 0) { -          } else if (commit === false) { +            context.from = secondLatestTag; -            context.to = 'HEAD^1'; +            context.to = `${latestTag}^1`; -          } +          } else if (commit === false) { -        } +            context.to = 'HEAD^1'; - +          } -        // For now, snapshots do not get a changelog, as it often goes haywire (easy to add to release manually) +        } -        if (snapshot) return ''; + - +        // For now, snapshots do not get a changelog, as it often goes haywire (easy to add to release manually) -        if (!context.from && changelog.includes('${from}')) { +        if (snapshot) return ''; -          return this.exec(changelogFallback); + -        } +        if (!context.from && changelog.includes('${from}')) { - +          return this.exec(changelogFallback); -        return this.exec(changelog, { context, options }); +        } -      } catch (error) { + -        span.recordException(error); +        return this.exec(changelog, { context, options }); -        span.setStatus({ code: SpanStatusCode.ERROR }); +      } catch (error) { -        throw error; +        span.recordException(error); -      } finally { +        span.setStatus({ code: SpanStatusCode.ERROR }); -        span.end(); +        throw error; -      } +      } finally { -    }); +        span.end(); -  } +      } - +    }); -  bump(version) { +  } -    const { tagTemplate } = this.config.getContext(); + -    const context = Object.assign(this.config.getContext(), { version }); +  bump(version) { -    const tagName = format(tagTemplate, context) \|\| version; +    const { tagTemplate } = this.config.getContext(); -    this.setContext({ version }); +    const context = Object.assign(this.config.getContext(), { version }); -    this.config.setContext({ tagName }); +    const tagName = format(tagTemplate, context) \|\| version; -  } +    this.setContext({ version }); - +    this.config.setContext({ tagName }); -  isRemoteName(remoteUrlOrName) { +  } -    return remoteUrlOrName && !remoteUrlOrName.includes('/'); + -  } +  isRemoteName(remoteUrlOrName) { - +    return remoteUrlOrName && !remoteUrlOrName.includes('/'); -  async getRemoteUrl() { +  } -    const remoteNameOrUrl = this.options.pushRepo \|\| (await this.getRemote()) \|\| 'origin'; + -    return this.isRemoteName(remoteNameOrUrl) +  async getRemoteUrl() { -      ? this.exec(`git remote get-url ${remoteNameOrUrl}`, { options }).catch(() => +    const remoteNameOrUrl = this.options.pushRepo \|\| (await this.getRemote()) \|\| 'origin'; -          this.exec(`git config --get remote.${remoteNameOrUrl}.url`, { options }).catch(() => null) +    return this.isRemoteName(remoteNameOrUrl) -        ) +      ? this.exec(`git remote get-url ${remoteNameOrUrl}`, { options }).catch(() => -      : remoteNameOrUrl; +          this.exec(`git config --get remote.${remoteNameOrUrl}.url`, { options }).catch(() => null) -  } +        ) - +      : remoteNameOrUrl; -  async getRemote() { +  } -    const branchName = await this.getBranchName(); + -    return branchName ? await this.getRemoteForBranch(branchName) : null; +  async getRemote() { -  } +    const branchName = await this.getBranchName(); - +    return branchName ? await this.getRemoteForBranch(branchName) : null; -  getBranchName() { +  } -    return this.exec('git rev-parse --abbrev-ref HEAD', { options }).catch(() => null); + -  } +  getBranchName() { - +    return this.exec('git rev-parse --abbrev-ref HEAD', { options }).catch(() => null); -  getRemoteForBranch(branch) { +  } -    return this.exec(`git config --get branch.${branch}.remote`, { options }).catch(() => null); + -  } +  getRemoteForBranch(branch) { - +    return this.exec(`git config --get branch.${branch}.remote`, { options }).catch(() => null); -  fetch(remoteUrl) { +  } -    return this.exec('git fetch').catch(err => { + -      this.debug(err); +  fetch(remoteUrl) { -      throw new Error(`Unable to fetch from ${remoteUrl}${EOL}${err.message}`); +    return this.exec('git fetch').catch(err => { -    }); +      this.debug(err); -  } +      throw new Error(`Unable to fetch from ${remoteUrl}${EOL}${err.message}`); - +    }); -  getLatestTagName() { +  } ... (diff truncated) ``` | 0 | 3 | $0.51 | — | — |
| lib/plugin/GitRelease.js | failed: Validation failed: LINT — LINT check failed: the original file was Prettier-compliant but the instrumented output is not. Prettier config: /Users/whitney.lee/Documents/Repositories/release-it/.prettierrc.json. The agent introduced formatting violations.  Prettier would reformat your output as follows — regenerate the file with these changes applied: ```diff      async beforeRelease() { -    return tracer.startActiveSpan('release_it.git_release.before_release', async (span) => { +    return tracer.startActiveSpan('release_it.git_release.before_release', async span => {        try {          const { releaseNotes: script } = this.options;          const { changelog } = this.config.getContext();          const releaseNotes = -          typeof script === 'function' \|\| typeof script === 'string' ? await this.processReleaseNotes(script) : changelog; +          typeof script === 'function' \|\| typeof script === 'string' -        this.setContext({ releaseNotes }); +            ? await this.processReleaseNotes(script) -        if (releaseNotes !== changelog) { +            : changelog; -          this.log.preview({ title: 'release notes', text: releaseNotes }); +        this.setContext({ releaseNotes }); -        } +        if (releaseNotes !== changelog) { -        if (releaseNotes != null) { +          this.log.preview({ title: 'release notes', text: releaseNotes }); -          span.setAttribute('release_it.changelog.length', releaseNotes.length); +        } -        } +        if (releaseNotes != null) { -      } catch (error) { +          span.setAttribute('release_it.changelog.length', releaseNotes.length); -        span.recordException(error); +        } -        span.setStatus({ code: SpanStatusCode.ERROR }); +      } catch (error) { -        throw error; +        span.recordException(error); -      } finally { +        span.setStatus({ code: SpanStatusCode.ERROR }); -        span.end(); +        throw error; -      } +      } finally { -    }); +        span.end(); -  } +      } - +    }); -  async processReleaseNotes(script) { +  } -    if (typeof script === 'function') { + -      const ctx = Object.assign({}, this.config.getContext(), { [this.namespace]: this.getContext() }); +  async processReleaseNotes(script) { -      return script(ctx); +    if (typeof script === 'function') { -    } +      const ctx = Object.assign({}, this.config.getContext(), { [this.namespace]: this.getContext() }); - +      return script(ctx); -    if (typeof script === 'string') { +    } -      return this.exec(script); + -    } +    if (typeof script === 'string') { -  } +      return this.exec(script); - +    } -  afterRelease() { +  } -    const { isReleased, releaseUrl, discussionUrl } = this.getContext(); + -    if (isReleased) { +  afterRelease() { -      this.log.log(`🔗 ${releaseUrl}`); +    const { isReleased, releaseUrl, discussionUrl } = this.getContext(); -    } +    if (isReleased) { -    if (discussionUrl) { +      this.log.log(`🔗 ${releaseUrl}`); -      this.log.log(`🔗 ${discussionUrl}`); +    } -    } +    if (discussionUrl) { -  } +      this.log.log(`🔗 ${discussionUrl}`); -} +    } - +  } -export default GitRelease; +}   +export default GitRelease; + ``` | 0 | 3 | $0.12 | — | — |
| lib/plugin/Plugin.js | failed: Rolled back: checkpoint test failure at file 10/23 | 0 | 1 | $0.04 | — | — |
| lib/plugin/factory.js | failed: Rolled back: checkpoint test failure at file 10/23 | 1 | 2 | $0.09 | — | — |
| lib/plugin/git/Git.js | failed: Validation failed: LINT — LINT check failed: the original file was Prettier-compliant but the instrumented output is not. Prettier config: /Users/whitney.lee/Documents/Repositories/release-it/.prettierrc.json. The agent introduced formatting violations.  Prettier would reformat your output as follows — regenerate the file with these changes applied: ```diff      async init() { -    return tracer.startActiveSpan('release_it.git.init', async (span) => { +    return tracer.startActiveSpan('release_it.git.init', async span => {        try {          span.setAttribute('release_it.plugin.namespace', 'git'); ...      async beforeRelease() { -    return tracer.startActiveSpan('release_it.git.before_release', async (span) => { +    return tracer.startActiveSpan('release_it.git.before_release', async span => {        try {          span.setAttribute('release_it.plugin.namespace', 'git'); ...      async release() { -    return tracer.startActiveSpan('release_it.git.release', async (span) => { +    return tracer.startActiveSpan('release_it.git.release', async span => {        try {          span.setAttribute('release_it.plugin.namespace', 'git'); ...      async push({ args = this.options.pushArgs } = {}) { -    return tracer.startActiveSpan('release_it.git.push', async (span) => { +    return tracer.startActiveSpan('release_it.git.push', async span => {        try {          span.setAttribute('release_it.plugin.namespace', 'git'); ...              await this.rollbackTagPush();            } catch (tagError) { -            this.log.warn(`An error was encountered when trying to rollback the tag on the remote: ${tagError.message}`); +            this.log.warn( -          } +              `An error was encountered when trying to rollback the tag on the remote: ${tagError.message}` - +            ); -          throw error; +          } -        } + -      } finally { +          throw error; -        span.end(); +        } -      } +      } finally { -    }); +        span.end(); -  } +      } - +    }); -  async rollbackTagPush() { +  } -    const { isTagged } = this.getContext(); + -    if (isTagged) { +  async rollbackTagPush() { -      const { tagName } = this.config.getContext(); +    const { isTagged } = this.getContext(); -      this.log.info(`Rolling back remote tag push ${tagName}`); +    if (isTagged) { -      await this.exec(`git push origin --delete ${tagName}`); +      const { tagName } = this.config.getContext(); -    } +      this.log.info(`Rolling back remote tag push ${tagName}`); -  } +      await this.exec(`git push origin --delete ${tagName}`); - +    } -  afterRelease() { +  } -    this.disableRollback(); + -  } +  afterRelease() { -} +    this.disableRollback(); - +  } -export default Git; +}   +export default Git; + ``` | 0 | 3 | $0.72 | — | — |
| lib/plugin/github/GitHub.js | failed: Validation failed: NDS-003, NDS-003, NDS-003, NDS-003, NDS-003, NDS-003, NDS-003 — NDS-003: original line 394 missing/modified: return this.retry(async bail => { The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code. | 0 | 2 | $0.76 | — | — |
| lib/plugin/gitlab/GitLab.js | failed: Validation failed: COV-003, COV-003, COV-003, COV-003 — COV-003 check failed: catch block at line 160 does not record error on span. Add span.recordException(error) and span.setStatus({ code: SpanStatusCode.ERROR }) in catch blocks to ensure errors are visible in traces. | 0 | 2 | $0.88 | — | — |
| lib/plugin/gitlab/prompts.js | failed: Rolled back: checkpoint test failure at file 20/23 | 0 | 1 | $0.06 | — | — |
| lib/plugin/npm/npm.js | failed: Validation failed: LINT — LINT check failed: the original file was Prettier-compliant but the instrumented output is not. Prettier config: /Users/whitney.lee/Documents/Repositories/release-it/.prettierrc.json. The agent introduced formatting violations.  Prettier would reformat your output as follows — regenerate the file with these changes applied: ```diff      async init() { -    return tracer.startActiveSpan('release_it.npm.init', async (span) => { +    return tracer.startActiveSpan('release_it.npm.init', async span => {        try { -        const { name, version: latestVersion, private: isPrivate, publishConfig } = readJSON(path.resolve(MANIFEST_PATH)); +        const { -        this.setContext({ name, latestVersion, private: isPrivate, publishConfig }); +          name, -        this.config.setContext({ npm: { name } }); +          version: latestVersion, -        span.setAttribute('release_it.npm.package_name', name); +          private: isPrivate, -        if (latestVersion != null) { +          publishConfig -          span.setAttribute('release_it.version.current', latestVersion); +        } = readJSON(path.resolve(MANIFEST_PATH)); -        } +        this.setContext({ name, latestVersion, private: isPrivate, publishConfig }); - +        this.config.setContext({ npm: { name } }); -        const { publish, skipChecks } = this.options; +        span.setAttribute('release_it.npm.package_name', name); - +        if (latestVersion != null) { -        const timeout = Number(this.options.timeout ?? DEFAULT_TIMEOUT) * 1000; +          span.setAttribute('release_it.version.current', latestVersion); - +        } -        if (publish === false \|\| isPrivate) return; + - +        const { publish, skipChecks } = this.options; -        if (skipChecks) return; + - +        const timeout = Number(this.options.timeout ?? DEFAULT_TIMEOUT) * 1000; -        const validations = Promise.all([this.isRegistryUp(), this.isAuthenticated(), this.getLatestRegistryVersion()]); + - +        if (publish === false \|\| isPrivate) return; -        await Promise.race([validations, rejectAfter(timeout, e(`Timed out after ${timeout}ms.`, docs))]); + - +        if (skipChecks) return; -        const [isRegistryUp, isAuthenticated, latestVersionInRegistry] = await validations; + - +        const validations = Promise.all([this.isRegistryUp(), this.isAuthenticated(), this.getLatestRegistryVersion()]); -        if (!isRegistryUp) { + -          throw e(`Unable to reach npm registry (timed out after ${timeout}ms).`, docs); +        await Promise.race([validations, rejectAfter(timeout, e(`Timed out after ${timeout}ms.`, docs))]); -        } + - +        const [isRegistryUp, isAuthenticated, latestVersionInRegistry] = await validations; -        if (!isAuthenticated) { + -          throw e('Not authenticated with npm. Please `npm login` and try again.', docs); +        if (!isRegistryUp) { -        } +          throw e(`Unable to reach npm registry (timed out after ${timeout}ms).`, docs); - +        } -        if (!(await this.isCollaborator())) { + -          const { username } = this.getContext(); +        if (!isAuthenticated) { -          throw e(`User ${username} is not a collaborator for ${name}.`, docs); +          throw e('Not authenticated with npm. Please `npm login` and try again.', docs);          }   -        if (!latestVersionInRegistry) { +        if (!(await this.isCollaborator())) { -          this.log.warn('No version found in npm registry. Assuming new package.'); +          const { username } = this.getContext(); -        } else { +          throw e(`User ${username} is not a collaborator for ${name}.`, docs); -          if (!semver.eq(latestVersion, latestVersionInRegistry)) { +        } -            this.log.warn( + -              `Latest version in registry (${latestVersionInRegistry}) does not match package.json (${latestVersion}).` +        if (!latestVersionInRegistry) { -            ); +          this.log.warn('No version found in npm registry. Assuming new package.'); -          } +        } else { -        } +          if (!semver.eq(latestVersion, latestVersionInRegistry)) { -      } catch (error) { +            this.log.warn( -        span.recordException(error); +              `Latest version in registry (${latestVersionInRegistry}) does not match package.json (${latestVersion}).` -        span.setStatus({ code: SpanStatusCode.ERROR }); +            ); -        throw error; +          } -      } finally { +        } -        span.end(); +      } catch (error) { -      } +        span.recordException(error); -    }); +        span.setStatus({ code: SpanStatusCode.ERROR }); -  } +        throw error; - +      } finally { -  getName() { +        span.end(); -    return this.getContext('name'); +      } -  } +    }); - +  } -  getLatestVersion() { + -    return this.options.ignoreVersion ? null : this.getContext('latestVersion'); +  getName() { -  } +    return this.getContext('name'); - +  } -  async bump(version) { + -    return tracer.startActiveSpan('release_it.npm.bump', async (span) => { +  getLatestVersion() { -      try { +    return this.options.ignoreVersion ? null : this.getContext('latestVersion'); -        const tag = this.options.tag \|\| (await this.resolveTag(version)); +  } -        this.setContext({ version, tag }); + -        span.setAttribute('release_it.version.next', version); +  async bump(version) { -        span.setAttribute('release_it.npm.dist_tag', tag); +    return tracer.startActiveSpan('release_it.npm.bump', async span => { - +      try { -        if (!this.config.isIncrement) return false; +        const tag = this.options.tag \|\| (await this.resolveTag(version)); - +        this.setContext({ version, tag }); -        const { versionArgs, allowSameVersion } = this.options; +        span.setAttribute('release_it.version.next', version); -        const args = [ +        span.setAttribute('release_it.npm.dist_tag', tag); -          version, + -          '--no-git-tag-version', +        if (!this.config.isIncrement) return false; -          '--workspaces=false', + -          allowSameVersion && '--allow-same-version', +        const { versionArgs, allowSameVersion } = this.options; -          ...fixArgs(versionArgs) +        const args = [ -        ]; +          version, -        const task = () => this.exec(`npm version ${args.filter(Boolean).join(' ')}`, { options: { env: getNpmEnv() } }); +          '--no-git-tag-version', -        const result = await this.spinner.show({ task, label: 'npm version' }); +          '--workspaces=false', -        return result; +          allowSameVersion && '--allow-same-version', -      } catch (error) { +          ...fixArgs(versionArgs) -        span.recordException(error); +        ]; -        span.setStatus({ code: SpanStatusCode.ERROR }); +        const task = () => -        throw error; +          this.exec(`npm version ${args.filter(Boolean).join(' ')}`, { options: { env: getNpmEnv() } }); -      } finally { +        const result = await this.spinner.show({ task, label: 'npm version' }); -        span.end(); +        return result; -      } +      } catch (error) { -    }); +        span.recordException(error); -  } +        span.setStatus({ code: SpanStatusCode.ERROR }); - +        throw error; -  release() { +      } finally { -    if (this.options.publish === false) return false; +        span.end(); -    if (this.getContext('private')) return false; +      } -    const publish = () => this.publish({ otpCallback }); +    }); -    const otpCallback = +  } -      this.config.isCI && !this.config.isPromptOnlyVersion ? null : task => this.step({ prompt: 'otp', task }); + ... (diff truncated) ``` | 0 | 3 | $0.82 | — | — |
| lib/plugin/npm/prompts.js | failed: Rolled back: checkpoint test failure at file 20/23 | 0 | 1 | $0.0089 | — | — |
| lib/plugin/version/Version.js | failed: Rolled back: checkpoint test failure at file 20/23 | 1 | 2 | $0.17 | — | — |
| lib/prompt.js | failed: Validation failed: LINT — LINT check failed: the original file was Prettier-compliant but the instrumented output is not. Prettier config: /Users/whitney.lee/Documents/Repositories/release-it/.prettierrc.json. The agent introduced formatting violations.  Prettier would reformat your output as follows — regenerate the file with these changes applied: ```diff      async show({ enabled = true, prompt: promptName, namespace = 'default', task, context }) { -    return tracer.startActiveSpan('release_it.prompt.show', async (span) => { +    return tracer.startActiveSpan('release_it.prompt.show', async span => {        try {          span.setAttribute('release_it.plugin.namespace', namespace); ...          if ('pageSize' in prompt) options.pageSize = prompt.pageSize;   -        const answer = await (this.createPrompt ? this.createPrompt(prompt.type, options) : types[prompt.type](options)); +        const answer = await (this.createPrompt - +          ? this.createPrompt(prompt.type, options) -        const doExecute = prompt.type === 'confirm' ? answer : true; +          : types[prompt.type](options));   -        return doExecute && task ? await task(answer) : false; +        const doExecute = prompt.type === 'confirm' ? answer : true; -      } catch (error) { + -        span.recordException(error); +        return doExecute && task ? await task(answer) : false; -        span.setStatus({ code: SpanStatusCode.ERROR }); +      } catch (error) { -        throw error; +        span.recordException(error); -      } finally { +        span.setStatus({ code: SpanStatusCode.ERROR }); -        span.end(); +        throw error; -      } +      } finally { -    }); +        span.end(); -  } +      } -} +    }); - +  } -export default Prompt; +}   +export default Prompt; + ``` | 0 | 3 | $0.22 | — | — |
| lib/shell.js | failed: Rolled back: end-of-run test failure | 1 | 2 | $0.12 | — | — |
| lib/spinner.js | failed: Rolled back: end-of-run test failure | 0 | 1 | $0.07 | — | — |
| lib/util.js | failed: Rolled back: end-of-run test failure | 1 | 2 | $0.20 | — | — |

**No changes needed** (3 files, 0 spans): lib/plugin/git/prompts.js, lib/plugin/github/prompts.js, lib/plugin/github/util.js

## Span Category Breakdown

| File | External Calls | Schema-Defined | Service Entry Points | Total Functions |
|------|---------------|----------------|---------------------|-----------------|
| lib/plugin/git/prompts.js | 0 | 0 | 0 | 4 |
| lib/plugin/github/prompts.js | 0 | 0 | 0 | 1 |

## Schema Changes

# Summary of Schema Changes
## Registry versions
Baseline: 0.1.0

Head: 0.1.0

## Registry Attributes
### Added
- release_it.util.collection_size




## Review Attention

### Advisory Findings

**lib/plugin/factory.js**
- CDQ-007 (Attribute Data Quality): setAttribute value "enabledPlugins.length" at line 93 accesses a property of "enabledPlugins" without a null/undefined guard. If "enabledPlugins" can be null or undefined, this will throw at runtime. Add an `if (enabledPlugins)` check or use optional chaining (`enabledPlugins?.length`).
- CDQ-007 (Attribute Data Quality): setAttribute value "enabledExternalPlugins.length" at line 94 accesses a property of "enabledExternalPlugins" without a null/undefined guard. If "enabledExternalPlugins" can be null or undefined, this will throw at runtime. Add an `if (enabledExternalPlugins)` check or use optional chaining (`enabledExternalPlugins?.length`).

**lib/plugin/version/Version.js**
- CDQ-007 (Attribute Data Quality): setAttribute value "options.latestVersion" at line 81 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.latestVersion`).
- CDQ-007 (Attribute Data Quality): setAttribute value "options.increment" at line 84 accesses a property of "options" without a null/undefined guard. If "options" can be null or undefined, this will throw at runtime. Add an `if (options)` check or use optional chaining (`options?.increment`).

**(run-level)**
- CDQ-008 (Tracer Naming): All tracer names follow a consistent naming pattern.

## Rolled Back Files

The following files were rolled back to their pre-instrumentation state due to test failures.

| File | Reason |
|------|--------|
| lib/args.js | Rolled back: checkpoint test failure at file 5/23 |
| lib/cli.js | Rolled back: checkpoint test failure at file 5/23 |
| lib/config.js | Rolled back: checkpoint test failure at file 5/23 |
| lib/log.js | Rolled back: checkpoint test failure at file 5/23 |
| lib/plugin/Plugin.js | Rolled back: checkpoint test failure at file 10/23 |
| lib/plugin/factory.js | Rolled back: checkpoint test failure at file 10/23 |
| lib/plugin/gitlab/prompts.js | Rolled back: checkpoint test failure at file 20/23 |
| lib/plugin/npm/prompts.js | Rolled back: checkpoint test failure at file 20/23 |
| lib/plugin/version/Version.js | Rolled back: checkpoint test failure at file 20/23 |
| lib/shell.js | Rolled back: end-of-run test failure |
| lib/spinner.js | Rolled back: end-of-run test failure |
| lib/util.js | Rolled back: end-of-run test failure |

## Token Usage

| | Ceiling | Actual |
|---|---------|--------|
| **Cost** | $53.82 | $5.69 |
| **Input tokens** | 2,300,000 | 225,881 |
| **Output tokens** | — | 257,702 |
| **Cache read tokens** | — | 269,858 |
| **Cache write tokens** | — | 284,704 |

Model: `claude-sonnet-4-6` | Files: 23 | Total file size: 90,040 bytes

## Live-Check Compliance

OK

## Agent Version

`1.0.0`

## Warnings

- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/args.js — Rolled back: checkpoint test failure at file 5/23
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/cli.js — Rolled back: checkpoint test failure at file 5/23
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/config.js — Rolled back: checkpoint test failure at file 5/23
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/index.js — Validation failed: LINT — LINT check failed: the original file was Prettier-compliant but the instrumented output is not. Prettier config: /Users/whitney.lee/Documents/Repositories/release-it/.prettierrc.json. The agent introduced formatting violations.

Prettier would reformat your output as follows — regenerate the file with these changes applied:
```diff
 
 const runTasks = async (opts, di) => {
-  return tracer.startActiveSpan('release_it.run_tasks', async (span) => {
+  return tracer.startActiveSpan('release_it.run_tasks', async span => {
     let container = {};
 
...
       if (!isReleaseVersion) {
         const action = config.isIncrement ? 'release' : 'update';
-        const suffix = version && config.isIncrement ? `${latestVersion}...${version}` : `currently at ${latestVersion}`;
+        const suffix =
-        log.obtrusive(`🚀 Let's ${action} ${name} (${suffix})`);
+          version && config.isIncrement ? `${latestVersion}...${version}` : `currently at ${latestVersion}`;
-        log.preview({ title: 'changelog', text: changelog });
+        log.obtrusive(`🚀 Let's ${action} ${name} (${suffix})`);
-      }
+        log.preview({ title: 'changelog', text: changelog });
-
+      }
-      if (config.isIncrement) {
+
-        version = version || (await reduceUntil(plugins, plugin => plugin.getIncrementedVersion(incrementBase)));
+      if (config.isIncrement) {
-      }
+        version = version || (await reduceUntil(plugins, plugin => plugin.getIncrementedVersion(incrementBase)));
-
+      }
-      if (isReleaseVersion) {
+
-        if (version) {
+      if (isReleaseVersion) {
-          console.log(version);
+        if (version) {
-          process.exit(0);
+          console.log(version);
-        } else {
+          process.exit(0);
-          log.warn(`No new version to release`);
+        } else {
-          process.exit(1);
+          log.warn(`No new version to release`);
-        }
+          process.exit(1);
-      }
+        }
-
+      }
-      if (version) {
+
-        config.setContext(parseVersion(version));
+      if (version) {
-
+        config.setContext(parseVersion(version));
-        if (config.isPromptOnlyVersion) {
+
-          config.setCI(true);
+        if (config.isPromptOnlyVersion) {
-        }
+          config.setCI(true);
-
+        }
-        for (const hook of ['beforeBump', 'bump', 'beforeRelease']) {
+
-          for (const plugin of plugins) {
+        for (const hook of ['beforeBump', 'bump', 'beforeRelease']) {
-            const args = hook === 'bump' ? [version] : [];
+          for (const plugin of plugins) {
-            await runLifeCycleHook(plugin, hook, ...args);
+            const args = hook === 'bump' ? [version] : [];
-          }
+            await runLifeCycleHook(plugin, hook, ...args);
-        }
+          }
-
+        }
-        plugins = [...internal, ...external];
+
-
+        plugins = [...internal, ...external];
-        for (const hook of ['release', 'afterRelease']) {
+
-          for (const plugin of plugins) {
+        for (const hook of ['release', 'afterRelease']) {
-            await runLifeCycleHook(plugin, hook);
+          for (const plugin of plugins) {
-          }
+            await runLifeCycleHook(plugin, hook);
-        }
+          }
-      } else {
+        }
-        log.obtrusive(`No new version to release`);
+      } else {
-      }
+        log.obtrusive(`No new version to release`);
-
+      }
-      if (version != null) {
+
-        span.setAttribute('release_it.version.next', version);
+      if (version != null) {
-      }
+        span.setAttribute('release_it.version.next', version);
-      if (incrementBase.increment != null) {
+      }
-        span.setAttribute('release_it.version.increment', incrementBase.increment);
+      if (incrementBase.increment != null) {
-      }
+        span.setAttribute('release_it.version.increment', incrementBase.increment);
-
+      }
-      log.log(`🏁 Done (in ${Math.floor(process.uptime())}s.)`);
+
-
+      log.log(`🏁 Done (in ${Math.floor(process.uptime())}s.)`);
-      return {
+
-        name,
+      return {
-        changelog,
+        name,
-        latestVersion,
+        changelog,
-        version
+        latestVersion,
-      };
+        version
-    } catch (err) {
+      };
-      span.recordException(err);
+    } catch (err) {
-      span.setStatus({ code: SpanStatusCode.ERROR });
+      span.recordException(err);
-
+      span.setStatus({ code: SpanStatusCode.ERROR });
-      const { log } = container;
+
-
+      const { log } = container;
-      const errorMessage = err.message || err;
+
-      const logger = log || console;
+      const errorMessage = err.message || err;
-
+      const logger = log || console;
-      err.cause === 'INFO' ? logger.info(errorMessage) : logger.error(errorMessage);
+
-
+      err.cause === 'INFO' ? logger.info(errorMessage) : logger.error(errorMessage);
-      throw err;
+
-    } finally {
+      throw err;
-      span.end();
+    } finally {
-    }
+      span.end();
-  });
+    }
-};
+  });
-
+};
-export default runTasks;
+
-
+export default runTasks;
-export { default as Config } from './config.js';
+
-
+export { default as Config } from './config.js';
-export { default as Plugin } from './plugin/Plugin.js';
+
-
+export { default as Plugin } from './plugin/Plugin.js';
+
```
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/log.js — Rolled back: checkpoint test failure at file 5/23
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/GitBase.js — Validation failed: LINT — LINT check failed: the original file was Prettier-compliant but the instrumented output is not. Prettier config: /Users/whitney.lee/Documents/Repositories/release-it/.prettierrc.json. The agent introduced formatting violations.

Prettier would reformat your output as follows — regenerate the file with these changes applied:
```diff
 class GitBase extends Plugin {
   async init() {
-    return tracer.startActiveSpan('release-it.git.init', async (span) => {
+    return tracer.startActiveSpan('release-it.git.init', async span => {
       try {
         const remoteUrl = await this.getRemoteUrl();
...
 
   async getCommitsSinceLatestTag(commitsPath = '') {
-    return tracer.startActiveSpan('release-it.git.get_commits_since_latest_tag', async (span) => {
+    return tracer.startActiveSpan('release-it.git.get_commits_since_latest_tag', async span => {
       try {
         const latestTagName = await this.getLatestTagName();
...
           span.setAttribute('release_it.git.tag_name', latestTagName);
         }
-        return this.exec(`git rev-list ${ref} --count ${commitsPath ? `-- ${commitsPath}` : ''}`, { options }).then(Number);
+        return this.exec(`git rev-list ${ref} --count ${commitsPath ? `-- ${commitsPath}` : ''}`, { options }).then(
-      } catch (error) {
+          Number
-        span.recordException(error);
+        );
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
-    return tracer.startActiveSpan('release-it.git.get_changelog', async (span) => {
+
-      try {
+  async getChangelog() {
-        const { snapshot } = this.config.getContext();
+    return tracer.startActiveSpan('release-it.git.get_changelog', async span => {
-        const { latestTag, secondLatestTag } = this.config.getContext();
+      try {
-        const context = { latestTag, from: latestTag, to: 'HEAD' };
+        const { snapshot } = this.config.getContext();
-        const { changelog, commit } = this.options;
+        const { latestTag, secondLatestTag } = this.config.getContext();
-        if (latestTag != null) {
+        const context = { latestTag, from: latestTag, to: 'HEAD' };
-          span.setAttribute('release_it.git.tag_name', latestTag);
+        const { changelog, commit } = this.options;
-        }
+        if (latestTag != null) {
-        if (!changelog) return null;
+          span.setAttribute('release_it.git.tag_name', latestTag);
-
+        }
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
-          return this.exec(changelogFallback);
+
-        }
+        if (!context.from && changelog.includes('${from}')) {
-
+          return this.exec(changelogFallback);
-        return this.exec(changelog, { context, options });
+        }
-      } catch (error) {
+
-        span.recordException(error);
+        return this.exec(changelog, { context, options });
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
-    const remoteNameOrUrl = this.options.pushRepo || (await this.getRemote()) || 'origin';
+
-    return this.isRemoteName(remoteNameOrUrl)
+  async getRemoteUrl() {
-      ? this.exec(`git remote get-url ${remoteNameOrUrl}`, { options }).catch(() =>
+    const remoteNameOrUrl = this.options.pushRepo || (await this.getRemote()) || 'origin';
-          this.exec(`git config --get remote.${remoteNameOrUrl}.url`, { options }).catch(() => null)
+    return this.isRemoteName(remoteNameOrUrl)
-        )
+      ? this.exec(`git remote get-url ${remoteNameOrUrl}`, { options }).catch(() =>
-      : remoteNameOrUrl;
+          this.exec(`git config --get remote.${remoteNameOrUrl}.url`, { options }).catch(() => null)
-  }
+        )
-
+      : remoteNameOrUrl;
-  async getRemote() {
+  }
-    const branchName = await this.getBranchName();
+
-    return branchName ? await this.getRemoteForBranch(branchName) : null;
+  async getRemote() {
-  }
+    const branchName = await this.getBranchName();
-
+    return branchName ? await this.getRemoteForBranch(branchName) : null;
-  getBranchName() {
+  }
-    return this.exec('git rev-parse --abbrev-ref HEAD', { options }).catch(() => null);
+
-  }
+  getBranchName() {
-
+    return this.exec('git rev-parse --abbrev-ref HEAD', { options }).catch(() => null);
-  getRemoteForBranch(branch) {
+  }
-    return this.exec(`git config --get branch.${branch}.remote`, { options }).catch(() => null);
+
-  }
+  getRemoteForBranch(branch) {
-
+    return this.exec(`git config --get branch.${branch}.remote`, { options }).catch(() => null);
-  fetch(remoteUrl) {
+  }
-    return this.exec('git fetch').catch(err => {
+
-      this.debug(err);
+  fetch(remoteUrl) {
-      throw new Error(`Unable to fetch from ${remoteUrl}${EOL}${err.message}`);
+    return this.exec('git fetch').catch(err => {
-    });
+      this.debug(err);
-  }
+      throw new Error(`Unable to fetch from ${remoteUrl}${EOL}${err.message}`);
-
+    });
-  getLatestTagName() {
+  }
... (diff truncated)
```
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/GitRelease.js — Validation failed: LINT — LINT check failed: the original file was Prettier-compliant but the instrumented output is not. Prettier config: /Users/whitney.lee/Documents/Repositories/release-it/.prettierrc.json. The agent introduced formatting violations.

Prettier would reformat your output as follows — regenerate the file with these changes applied:
```diff
 
   async beforeRelease() {
-    return tracer.startActiveSpan('release_it.git_release.before_release', async (span) => {
+    return tracer.startActiveSpan('release_it.git_release.before_release', async span => {
       try {
         const { releaseNotes: script } = this.options;
         const { changelog } = this.config.getContext();
         const releaseNotes =
-          typeof script === 'function' || typeof script === 'string' ? await this.processReleaseNotes(script) : changelog;
+          typeof script === 'function' || typeof script === 'string'
-        this.setContext({ releaseNotes });
+            ? await this.processReleaseNotes(script)
-        if (releaseNotes !== changelog) {
+            : changelog;
-          this.log.preview({ title: 'release notes', text: releaseNotes });
+        this.setContext({ releaseNotes });
-        }
+        if (releaseNotes !== changelog) {
-        if (releaseNotes != null) {
+          this.log.preview({ title: 'release notes', text: releaseNotes });
-          span.setAttribute('release_it.changelog.length', releaseNotes.length);
+        }
-        }
+        if (releaseNotes != null) {
-      } catch (error) {
+          span.setAttribute('release_it.changelog.length', releaseNotes.length);
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
-  async processReleaseNotes(script) {
+  }
-    if (typeof script === 'function') {
+
-      const ctx = Object.assign({}, this.config.getContext(), { [this.namespace]: this.getContext() });
+  async processReleaseNotes(script) {
-      return script(ctx);
+    if (typeof script === 'function') {
-    }
+      const ctx = Object.assign({}, this.config.getContext(), { [this.namespace]: this.getContext() });
-
+      return script(ctx);
-    if (typeof script === 'string') {
+    }
-      return this.exec(script);
+
-    }
+    if (typeof script === 'string') {
-  }
+      return this.exec(script);
-
+    }
-  afterRelease() {
+  }
-    const { isReleased, releaseUrl, discussionUrl } = this.getContext();
+
-    if (isReleased) {
+  afterRelease() {
-      this.log.log(`🔗 ${releaseUrl}`);
+    const { isReleased, releaseUrl, discussionUrl } = this.getContext();
-    }
+    if (isReleased) {
-    if (discussionUrl) {
+      this.log.log(`🔗 ${releaseUrl}`);
-      this.log.log(`🔗 ${discussionUrl}`);
+    }
-    }
+    if (discussionUrl) {
-  }
+      this.log.log(`🔗 ${discussionUrl}`);
-}
+    }
-
+  }
-export default GitRelease;
+}
 
+export default GitRelease;
+
```
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/Plugin.js — Rolled back: checkpoint test failure at file 10/23
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/factory.js — Rolled back: checkpoint test failure at file 10/23
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/git/Git.js — Validation failed: LINT — LINT check failed: the original file was Prettier-compliant but the instrumented output is not. Prettier config: /Users/whitney.lee/Documents/Repositories/release-it/.prettierrc.json. The agent introduced formatting violations.

Prettier would reformat your output as follows — regenerate the file with these changes applied:
```diff
 
   async init() {
-    return tracer.startActiveSpan('release_it.git.init', async (span) => {
+    return tracer.startActiveSpan('release_it.git.init', async span => {
       try {
         span.setAttribute('release_it.plugin.namespace', 'git');
...
 
   async beforeRelease() {
-    return tracer.startActiveSpan('release_it.git.before_release', async (span) => {
+    return tracer.startActiveSpan('release_it.git.before_release', async span => {
       try {
         span.setAttribute('release_it.plugin.namespace', 'git');
...
 
   async release() {
-    return tracer.startActiveSpan('release_it.git.release', async (span) => {
+    return tracer.startActiveSpan('release_it.git.release', async span => {
       try {
         span.setAttribute('release_it.plugin.namespace', 'git');
...
 
   async push({ args = this.options.pushArgs } = {}) {
-    return tracer.startActiveSpan('release_it.git.push', async (span) => {
+    return tracer.startActiveSpan('release_it.git.push', async span => {
       try {
         span.setAttribute('release_it.plugin.namespace', 'git');
...
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
-      } finally {
+          throw error;
-        span.end();
+        }
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
-    const { isTagged } = this.getContext();
+
-    if (isTagged) {
+  async rollbackTagPush() {
-      const { tagName } = this.config.getContext();
+    const { isTagged } = this.getContext();
-      this.log.info(`Rolling back remote tag push ${tagName}`);
+    if (isTagged) {
-      await this.exec(`git push origin --delete ${tagName}`);
+      const { tagName } = this.config.getContext();
-    }
+      this.log.info(`Rolling back remote tag push ${tagName}`);
-  }
+      await this.exec(`git push origin --delete ${tagName}`);
-
+    }
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
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/github/GitHub.js — Validation failed: NDS-003, NDS-003, NDS-003, NDS-003, NDS-003, NDS-003, NDS-003 — NDS-003: original line 394 missing/modified: return this.retry(async bail => {
The agent must preserve all original business logic. Only add instrumentation — do not modify, remove, or reorder existing code.
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/gitlab/GitLab.js — Validation failed: COV-003, COV-003, COV-003, COV-003 — COV-003 check failed: catch block at line 160 does not record error on span. Add span.recordException(error) and span.setStatus({ code: SpanStatusCode.ERROR }) in catch blocks to ensure errors are visible in traces.
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/gitlab/prompts.js — Rolled back: checkpoint test failure at file 20/23
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/npm/npm.js — Validation failed: LINT — LINT check failed: the original file was Prettier-compliant but the instrumented output is not. Prettier config: /Users/whitney.lee/Documents/Repositories/release-it/.prettierrc.json. The agent introduced formatting violations.

Prettier would reformat your output as follows — regenerate the file with these changes applied:
```diff
 
   async init() {
-    return tracer.startActiveSpan('release_it.npm.init', async (span) => {
+    return tracer.startActiveSpan('release_it.npm.init', async span => {
       try {
-        const { name, version: latestVersion, private: isPrivate, publishConfig } = readJSON(path.resolve(MANIFEST_PATH));
+        const {
-        this.setContext({ name, latestVersion, private: isPrivate, publishConfig });
+          name,
-        this.config.setContext({ npm: { name } });
+          version: latestVersion,
-        span.setAttribute('release_it.npm.package_name', name);
+          private: isPrivate,
-        if (latestVersion != null) {
+          publishConfig
-          span.setAttribute('release_it.version.current', latestVersion);
+        } = readJSON(path.resolve(MANIFEST_PATH));
-        }
+        this.setContext({ name, latestVersion, private: isPrivate, publishConfig });
-
+        this.config.setContext({ npm: { name } });
-        const { publish, skipChecks } = this.options;
+        span.setAttribute('release_it.npm.package_name', name);
-
+        if (latestVersion != null) {
-        const timeout = Number(this.options.timeout ?? DEFAULT_TIMEOUT) * 1000;
+          span.setAttribute('release_it.version.current', latestVersion);
-
+        }
-        if (publish === false || isPrivate) return;
+
-
+        const { publish, skipChecks } = this.options;
-        if (skipChecks) return;
+
-
+        const timeout = Number(this.options.timeout ?? DEFAULT_TIMEOUT) * 1000;
-        const validations = Promise.all([this.isRegistryUp(), this.isAuthenticated(), this.getLatestRegistryVersion()]);
+
-
+        if (publish === false || isPrivate) return;
-        await Promise.race([validations, rejectAfter(timeout, e(`Timed out after ${timeout}ms.`, docs))]);
+
-
+        if (skipChecks) return;
-        const [isRegistryUp, isAuthenticated, latestVersionInRegistry] = await validations;
+
-
+        const validations = Promise.all([this.isRegistryUp(), this.isAuthenticated(), this.getLatestRegistryVersion()]);
-        if (!isRegistryUp) {
+
-          throw e(`Unable to reach npm registry (timed out after ${timeout}ms).`, docs);
+        await Promise.race([validations, rejectAfter(timeout, e(`Timed out after ${timeout}ms.`, docs))]);
-        }
+
-
+        const [isRegistryUp, isAuthenticated, latestVersionInRegistry] = await validations;
-        if (!isAuthenticated) {
+
-          throw e('Not authenticated with npm. Please `npm login` and try again.', docs);
+        if (!isRegistryUp) {
-        }
+          throw e(`Unable to reach npm registry (timed out after ${timeout}ms).`, docs);
-
+        }
-        if (!(await this.isCollaborator())) {
+
-          const { username } = this.getContext();
+        if (!isAuthenticated) {
-          throw e(`User ${username} is not a collaborator for ${name}.`, docs);
+          throw e('Not authenticated with npm. Please `npm login` and try again.', docs);
         }
 
-        if (!latestVersionInRegistry) {
+        if (!(await this.isCollaborator())) {
-          this.log.warn('No version found in npm registry. Assuming new package.');
+          const { username } = this.getContext();
-        } else {
+          throw e(`User ${username} is not a collaborator for ${name}.`, docs);
-          if (!semver.eq(latestVersion, latestVersionInRegistry)) {
+        }
-            this.log.warn(
+
-              `Latest version in registry (${latestVersionInRegistry}) does not match package.json (${latestVersion}).`
+        if (!latestVersionInRegistry) {
-            );
+          this.log.warn('No version found in npm registry. Assuming new package.');
-          }
+        } else {
-        }
+          if (!semver.eq(latestVersion, latestVersionInRegistry)) {
-      } catch (error) {
+            this.log.warn(
-        span.recordException(error);
+              `Latest version in registry (${latestVersionInRegistry}) does not match package.json (${latestVersion}).`
-        span.setStatus({ code: SpanStatusCode.ERROR });
+            );
-        throw error;
+          }
-      } finally {
+        }
-        span.end();
+      } catch (error) {
-      }
+        span.recordException(error);
-    });
+        span.setStatus({ code: SpanStatusCode.ERROR });
-  }
+        throw error;
-
+      } finally {
-  getName() {
+        span.end();
-    return this.getContext('name');
+      }
-  }
+    });
-
+  }
-  getLatestVersion() {
+
-    return this.options.ignoreVersion ? null : this.getContext('latestVersion');
+  getName() {
-  }
+    return this.getContext('name');
-
+  }
-  async bump(version) {
+
-    return tracer.startActiveSpan('release_it.npm.bump', async (span) => {
+  getLatestVersion() {
-      try {
+    return this.options.ignoreVersion ? null : this.getContext('latestVersion');
-        const tag = this.options.tag || (await this.resolveTag(version));
+  }
-        this.setContext({ version, tag });
+
-        span.setAttribute('release_it.version.next', version);
+  async bump(version) {
-        span.setAttribute('release_it.npm.dist_tag', tag);
+    return tracer.startActiveSpan('release_it.npm.bump', async span => {
-
+      try {
-        if (!this.config.isIncrement) return false;
+        const tag = this.options.tag || (await this.resolveTag(version));
-
+        this.setContext({ version, tag });
-        const { versionArgs, allowSameVersion } = this.options;
+        span.setAttribute('release_it.version.next', version);
-        const args = [
+        span.setAttribute('release_it.npm.dist_tag', tag);
-          version,
+
-          '--no-git-tag-version',
+        if (!this.config.isIncrement) return false;
-          '--workspaces=false',
+
-          allowSameVersion && '--allow-same-version',
+        const { versionArgs, allowSameVersion } = this.options;
-          ...fixArgs(versionArgs)
+        const args = [
-        ];
+          version,
-        const task = () => this.exec(`npm version ${args.filter(Boolean).join(' ')}`, { options: { env: getNpmEnv() } });
+          '--no-git-tag-version',
-        const result = await this.spinner.show({ task, label: 'npm version' });
+          '--workspaces=false',
-        return result;
+          allowSameVersion && '--allow-same-version',
-      } catch (error) {
+          ...fixArgs(versionArgs)
-        span.recordException(error);
+        ];
-        span.setStatus({ code: SpanStatusCode.ERROR });
+        const task = () =>
-        throw error;
+          this.exec(`npm version ${args.filter(Boolean).join(' ')}`, { options: { env: getNpmEnv() } });
-      } finally {
+        const result = await this.spinner.show({ task, label: 'npm version' });
-        span.end();
+        return result;
-      }
+      } catch (error) {
-    });
+        span.recordException(error);
-  }
+        span.setStatus({ code: SpanStatusCode.ERROR });
-
+        throw error;
-  release() {
+      } finally {
-    if (this.options.publish === false) return false;
+        span.end();
-    if (this.getContext('private')) return false;
+      }
-    const publish = () => this.publish({ otpCallback });
+    });
-    const otpCallback =
+  }
-      this.config.isCI && !this.config.isPromptOnlyVersion ? null : task => this.step({ prompt: 'otp', task });
+
... (diff truncated)
```
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/npm/prompts.js — Rolled back: checkpoint test failure at file 20/23
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/version/Version.js — Rolled back: checkpoint test failure at file 20/23
- File failed: /Users/whitney.lee/Documents/Repositories/release-it/lib/prompt.js — Validation failed: LINT — LINT check failed: the original file was Prettier-compliant but the instrumented output is not. Prettier config: /Users/whitney.lee/Documents/Repositories/release-it/.prettierrc.json. The agent introduced formatting violations.

Prettier would reformat your output as follows — regenerate the file with these changes applied:
```diff
 
   async show({ enabled = true, prompt: promptName, namespace = 'default', task, context }) {
-    return tracer.startActiveSpan('release_it.prompt.show', async (span) => {
+    return tracer.startActiveSpan('release_it.prompt.show', async span => {
       try {
         span.setAttribute('release_it.plugin.namespace', namespace);
...
         if ('pageSize' in prompt) options.pageSize = prompt.pageSize;
 
-        const answer = await (this.createPrompt ? this.createPrompt(prompt.type, options) : types[prompt.type](options));
+        const answer = await (this.createPrompt
-
+          ? this.createPrompt(prompt.type, options)
-        const doExecute = prompt.type === 'confirm' ? answer : true;
+          : types[prompt.type](options));
 
-        return doExecute && task ? await task(answer) : false;
+        const doExecute = prompt.type === 'confirm' ? answer : true;
-      } catch (error) {
+
-        span.recordException(error);
+        return doExecute && task ? await task(answer) : false;
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
-}
+    });
-
+  }
-export default Prompt;
+}
 
+export default Prompt;
+
```
- Checkpoint test run failed at file 5/23 (/Users/whitney.lee/Documents/Repositories/release-it/lib/log.js): tests failed
- Rolled back 4 file(s) at checkpoint (file 5/23) due to test failure
- Checkpoint test run failed at file 10/23 (/Users/whitney.lee/Documents/Repositories/release-it/lib/plugin/git/Git.js): tests failed
- Rolled back 2 file(s) at checkpoint (file 10/23) due to test failure
- Checkpoint test run failed at file 20/23 (/Users/whitney.lee/Documents/Repositories/release-it/lib/prompt.js): tests failed
- Rolled back 3 file(s) at checkpoint (file 20/23) due to test failure
- End-of-run test suite failed: Command failed: sh -c npm test

- Live-check partial: 17 file(s) failed instrumentation (/Users/whitney.lee/Documents/Repositories/release-it/lib/args.js, /Users/whitney.lee/Documents/Repositories/release-it/lib/cli.js, /Users/whitney.lee/Documents/Repositories/release-it/lib/config.js, /Users/whitney.lee/Documents/Repositories/release-it/lib/index.js, /Users/whitney.lee/Documents/Repositories/release-it/lib/log.js...). Compliance report may be incomplete — spans from failed files are missing.
- Rolled back 3 file(s) due to end-of-run test failure