import { log, select } from "@clack/prompts";
import type { Context } from "../context";
import { checkCancel } from "../shared";

export async function framework(ctx: Context) {
  if (ctx.framework) {
    log.info(`Using ${ctx.framework} framework`);
  } else {
    const frwk = await select({
      message: "Which framework would you like to use?",
      options: [
        { label: "Vanilla", value: "vanilla" },
        { label: "React", value: "react" },
      ],
    });

    checkCancel(frwk);

    ctx.framework = frwk as string;
  }
}
