import { trace, SpanStatusCode } from '@opentelemetry/api';
import { pick, readJSON } from '../util.js';
import GitBase from './GitBase.js';

const defaultConfig = readJSON(new URL('../../config/release-it.json', import.meta.url));
const tracer = trace.getTracer('release-it');

class GitRelease extends GitBase {
  static isEnabled(options) {
    return options.release;
  }

  getInitialOptions(options) {
    const baseOptions = super.getInitialOptions(...arguments);
    const git = options.git || defaultConfig.git;
    const gitOptions = pick(git, [
      'tagExclude',
      'tagName',
      'tagMatch',
      'getLatestTagFromAllRefs',
      'pushRepo',
      'changelog',
      'commit'
    ]);

    return Object.assign({}, gitOptions, baseOptions);
  }

  get token() {
    const { tokenRef } = this.options;
    return process.env[tokenRef] || null;
  }

  async beforeRelease() {
    return tracer.startActiveSpan('release_it.git_release.before_release', async span => {
      try {
        const { releaseNotes: script } = this.options;
        const { changelog } = this.config.getContext();
        const releaseNotes =
          typeof script === 'function' || typeof script === 'string'
            ? await this.processReleaseNotes(script)
            : changelog;
        this.setContext({ releaseNotes });
        if (releaseNotes != null) {
          span.setAttribute('release_it.changelog.length', releaseNotes.length);
        }
        if (releaseNotes !== changelog) {
          this.log.preview({ title: 'release notes', text: releaseNotes });
        }
      } catch (error) {
        span.recordException(error);
        span.setStatus({ code: SpanStatusCode.ERROR });
        throw error;
      } finally {
        span.end();
      }
    });
  }

  async processReleaseNotes(script) {
    return tracer.startActiveSpan('release_it.git_release.process_release_notes', async span => {
      try {
        span.setAttribute('release_it.git_release.script_type', typeof script === 'function' ? 'function' : 'string');
        if (typeof script === 'function') {
          const ctx = Object.assign({}, this.config.getContext(), { [this.namespace]: this.getContext() });
          return script(ctx);
        }

        if (typeof script === 'string') {
          span.setAttribute('release_it.hook.command', script);
          return this.exec(script);
        }
      } catch (error) {
        span.recordException(error);
        span.setStatus({ code: SpanStatusCode.ERROR });
        throw error;
      } finally {
        span.end();
      }
    });
  }

  afterRelease() {
    const { isReleased, releaseUrl, discussionUrl } = this.getContext();
    if (isReleased) {
      this.log.log(`🔗 ${releaseUrl}`);
    }
    if (discussionUrl) {
      this.log.log(`🔗 ${discussionUrl}`);
    }
  }
}

export default GitRelease;
