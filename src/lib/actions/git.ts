import { confirm, log } from "@clack/prompts";
import type { Context } from "../context";
import { shell } from "../shell";
import path from "path";
import fs from "fs";
import { checkCancel } from "../shared";

export async function git(ctx: Context) {
  if (fs.existsSync(path.join(ctx.cwd, ".git"))) {
    log.info("Git has already been initialized");
    return;
  }

  if (ctx.git !== undefined) {
    const git = await confirm({
      message: "Initialize a git repository?",
      initialValue: true,
    });

    checkCancel(git);

    ctx.git = git as boolean;
  }

  if (ctx.git) {
    ctx.tasks.push({
      start: "Git initializing ...",
      end: "Git initialized",
      run: () => init(ctx.cwd),
    });
  }
}

async function init(cwd: string) {
  await shell("git", ["init"], { cwd, stdio: "ignore" });
}
