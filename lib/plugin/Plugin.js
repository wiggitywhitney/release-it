import { trace, SpanStatusCode } from '@opentelemetry/api';
import { debug } from 'node:util';
import merge from 'lodash.merge';
import { get } from '../util.js';

const tracer = trace.getTracer('release-it');

class Plugin {
  static isEnabled() {
    return true;
  }

  static disablePlugin() {
    return null;
  }

  constructor({ namespace, options = {}, container = {} } = {}) {
    this.namespace = namespace;
    this.options = Object.freeze(this.getInitialOptions(options, namespace));
    this.context = {};
    this.config = container.config;
    this.log = container.log;
    this.shell = container.shell;
    this.spinner = container.spinner;
    this.prompt = container.prompt;
    this.debug = debug(`release-it:${namespace}`);
  }

  getInitialOptions(options, namespace) {
    return options[namespace] || {};
  }

  init() {}
  getName() {}
  getLatestVersion() {}
  getChangelog() {}
  getIncrement() {}
  getIncrementedVersionCI() {}
  getIncrementedVersion() {}
  beforeBump() {}
  bump() {}
  beforeRelease() {}
  release() {}
  afterRelease() {}

  getContext(path) {
    const context = merge({}, this.options, this.context);

    return path ? get(context, path) : context;
  }

  setContext(context) {
    merge(this.context, context);
  }

  exec(command, { options, context = {} } = {}) {
    const ctx = Object.assign(context, this.config.getContext(), { [this.namespace]: this.getContext() });
    return this.shell.exec(command, options, ctx);
  }

  registerPrompts(prompts) {
    this.prompt.register(prompts, this.namespace);
  }

  async showPrompt(options) {
    options.namespace = this.namespace;
    return tracer.startActiveSpan('release_it.plugin.show_prompt', async span => {
      try {
        span.setAttribute('release_it.plugin.namespace', this.namespace);
        if (options.prompt != null) {
          span.setAttribute('release_it.prompt.name', options.prompt);
        }
        const result = await this.prompt.show(options);
        return result;
      } catch (error) {
        span.recordException(error);
        span.setStatus({ code: SpanStatusCode.ERROR });
        throw error;
      } finally {
        span.end();
      }
    });
  }

  step(options) {
    const context = Object.assign({}, this.config.getContext(), { [this.namespace]: this.getContext() });
    const opts = Object.assign({}, options, { context });
    const isException = this.config.isPromptOnlyVersion && ['incrementList', 'publish', 'otp'].includes(opts.prompt);
    return this.config.isCI && !isException ? this.spinner.show(opts) : this.showPrompt(opts);
  }
}

export default Plugin;
