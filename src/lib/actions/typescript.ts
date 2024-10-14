import { confirm, log } from "@clack/prompts";
import type { Context } from "../context";
import path from "node:path";
import fs from "node:fs";
import { checkCancel } from "../shared";
import { downloadTemplate } from "@bluwy/giget-core";

const auth = "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";

export async function typescript(ctx: Context) {
  if (ctx.typescript === undefined) {
    const ts = await confirm({
      message: "Would you like to use TypeScript?",
      initialValue: true,
    });

    checkCancel(ts);

    ctx.typescript = ts as boolean;
  } else if (ctx.typescript) {
    log.info("Using TypeScript configuration");
  }

  ctx.tasks.push({
    start: "Template copying ...",
    end: "Template copied",
    run: () => copyTemplate(ctx),
  });
}

async function copyTemplate(ctx: Context) {
  const templateDir = `github:phaminhieuu/create-threes/templates/${ctx.framework}/${ctx.typescript ? "ts" : "js"
    }/${ctx.template}`;

  try {
    await downloadTemplate(templateDir, {
      force: true,
      cwd: ctx.cwd,
      dir: ".",
      providerOptions: {
        auth,
      },
    });
  } catch (e: any) {
    if (e.message?.includes("404")) {
      throw new Error("Template dose not exist");
    }

    if (e.message) log.error(e.message);

    if ("cause" in e) {
      log.error(e.cause);
      if ("cause" in e.cause) log.error(e.cause.cause);
    }

    throw new Error("Failed to download template");
  }

  // Update package.json name
  await update(ctx);
}

async function update(ctx: Context) {
  // Get package.json file location
  const fileLoc = path.resolve(ctx.cwd, "package.json");

  if (fs.existsSync(fileLoc)) {
    return fs.promises.readFile(fileLoc, "utf-8").then((value) => {
      // Match first indent in the file or fallback to `\t`
      const indent = /(^\s+)/m.exec(value)?.[1] ?? "\t";

      return fs.promises.writeFile(
        fileLoc,
        JSON.stringify(
          Object.assign(
            JSON.parse(value),
            Object.assign({
              name: ctx.projectName,
            }),
          ),
          null,
          indent,
        ),
        "utf-8",
      );
    });
  }
}
