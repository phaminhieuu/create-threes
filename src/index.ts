import { spinner, intro, note, outro, log } from "@clack/prompts";

import color from "picocolors";
import { getContext } from "./lib/context";
import { projectName } from "./lib/actions/project-name";
import { framework } from "./lib/actions/framework";
import { template } from "./lib/actions/template";
import { dependencies } from "./lib/actions/dependencies";
import { typescript } from "./lib/actions/typescript";
import { git } from "./lib/actions/git";

async function main() {
  console.clear();

  const cleanArgv = process.argv.slice(2).filter((arg) => arg !== "--");
  intro(`${color.bgCyan(color.black(" create-threes "))}`);

  // Get the project context arguments
  const ctx = await getContext(cleanArgv);

  // Run the steps
  const steps = [
    projectName,
    framework,
    template,
    typescript,
    dependencies,
    git,
  ];

  for (const step of steps) {
    await step(ctx);
  }

  // Run the tasks
  for (const task of ctx.tasks) {
    const s = spinner();
    s.start(task.start);

    try {
      await task.run();
      s.stop(task.end);
    } catch (e: any) {
      log.error(e.message);
      process.exit(1);
    }
  }

  const { cwd, install, packageManager } = ctx;

  let nextSteps = `cd ${cwd}\n${install ? "" : `${packageManager} install\n`}${packageManager} dev`;

  note(nextSteps, "Next steps.");

  outro(`Problems? ${color.underline(color.cyan("https://github"))}`);

  process.exit(0);
}

main().catch(console.error);
