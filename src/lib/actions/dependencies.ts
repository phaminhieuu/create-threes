import { confirm } from "@clack/prompts";
import type { Context } from "../context";
import { shell } from "../shell";
import { checkCancel } from "../shared";

export async function dependencies(ctx: Context) {
  if (ctx.install === undefined) {
    const deps = await confirm({
      message: "Install dependencies?",
      initialValue: true,
    });

    checkCancel(deps);

    ctx.install = deps as boolean;
  }

  if (ctx.install) {
    ctx.tasks.push({
      start: `Installing dependencies with ${ctx.packageManager} ...`,
      end: "Dependencies installed",
      run: () => install(ctx),
    });
  }
}

async function install({ packageManager, cwd }: Context) {
  await shell(packageManager, ["install"], {
    cwd,
    timeout: 90_000,
    stdio: "ignore",
  });
}
