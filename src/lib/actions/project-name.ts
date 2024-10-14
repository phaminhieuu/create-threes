import { log, text } from "@clack/prompts";
import type { Context } from "../context";
import { checkCancel, isEmpty, toValidName } from "../shared";
import path from "node:path";
import pc from "picocolors";

export async function projectName(ctx: Context) {
  const initial = "./threes-project";

  if (!ctx.cwd || !isEmpty(ctx.cwd)) {
    if (!isEmpty(ctx.cwd)) {
      log.warn(`${pc.yellow(ctx.cwd)} is not empty!`);
    }

    const name = await text({
      message: "Where should we create your new project?",
      defaultValue: initial,
      placeholder: initial,
      validate: (value) => {
        // Must check value length first because the value not initialized with initial value
        if (value.length === 0) {
          if (!isEmpty(initial)) return "Directory is not empty!";
        }

        if (!isEmpty(value)) return "Directory is not empty!";

        // Check for non - printable characters
        if (value.match(/[^\x20-\x7E]/g) !== null)
          return `Invalid non-printable character present!`;
      },
    });

    checkCancel(name);

    ctx.cwd = (name as string).trim();
    ctx.projectName = toValidName(name as string);
  } else {
    let name = ctx.cwd;

    if (name === "." || name === "./") {
      const parts = process.cwd().split(path.sep);
      name = parts[parts.length - 1];
    } else if (name.startsWith("./") || name.startsWith("../")) {
      const parts = name.split("/");
      name = parts[parts.length - 1];
    }

    ctx.projectName = toValidName(name);

    log.info(`Using ${pc.green(ctx.cwd)} as project directory`);
  }

  if (!ctx.cwd) process.exit(1);
}
