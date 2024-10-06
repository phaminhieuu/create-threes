import { log, select } from "@clack/prompts";
import type { Context } from "../context";
import { checkCancel } from "../shared";

export async function template(ctx: Context) {
  if (ctx.template) {
    log.info(`Using ${ctx.template} template`);
  } else {
    const tmpl = await select({
      message: "How would you like to start?",
      initialValue: "basic",
      options: [
        { value: "basic", label: "Basic scene" },
        { value: "shader", label: "Shader glsl example" },
        { value: "physic", label: "Physic with Cannon.js" },
        { value: "postprocessing", label: "Post-processing example" },
        { value: "model", label: "Model with environment map" },
        { value: "webgpu", label: "WebGPU with TSL" },
        { value: "empty", label: "Empty" },
      ],
    });

    checkCancel(tmpl);

    ctx.template = tmpl as string;
  }
}
