import { confirm, log } from "@clack/prompts";
import type { Context } from "../context";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "node:url";
import { checkCancel } from "../shared";

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
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "../../templates",
    ctx.framework!,
    ctx.typescript ? "ts" : "js",
    ctx.template!,
  );

  console.log(templateDir);

  // Create directory
  fs.mkdirSync(ctx.cwd, { recursive: true });

  // Copy template files to project directory
  copy(templateDir, ctx.cwd);

  // Update package.json name
  await update(ctx);
}

// Recursively copy files from src to dest
function copy(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
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
