import { trace, SpanStatusCode } from '@opentelemetry/api';
import { confirm, input, select } from '@inquirer/prompts';

const tracer = trace.getTracer('release-it');
const types = { confirm, input, list: select };

class Prompt {
  constructor({ container }) {
    this.createPrompt = container.createPrompt;
    this.prompts = {};
  }

  register(pluginPrompts, namespace = 'default') {
    this.prompts[namespace] = this.prompts[namespace] || {};
    Object.assign(this.prompts[namespace], pluginPrompts);
  }

  async show({ enabled = true, prompt: promptName, namespace = 'default', task, context }) {
    return tracer.startActiveSpan('release_it.prompt.show', async span => {
      try {
        span.setAttribute('release_it.prompt.namespace', namespace);
        span.setAttribute('release_it.prompt.name', promptName);
        span.setAttribute('release_it.prompt.enabled', enabled);
        if (!enabled) return false;

        const prompt = this.prompts[namespace][promptName];
        const options = {
          message: prompt.message(context)
        };

        if ('default' in prompt) options.default = prompt.default;
        if ('choices' in prompt) options.choices = prompt.choices(context);
        if ('transformer' in prompt) options.transformer = prompt.transformer(context);
        if ('validate' in prompt) options.validate = prompt.validate;
        if ('pageSize' in prompt) options.pageSize = prompt.pageSize;

        span.setAttribute('release_it.prompt.type', prompt.type);

        const answer = await (this.createPrompt
          ? this.createPrompt(prompt.type, options)
          : types[prompt.type](options));

        const doExecute = prompt.type === 'confirm' ? answer : true;

        return doExecute && task ? await task(answer) : false;
      } catch (error) {
        span.recordException(error);
        span.setStatus({ code: SpanStatusCode.ERROR });
        throw error;
      } finally {
        span.end();
      }
    });
  }
}

export default Prompt;
