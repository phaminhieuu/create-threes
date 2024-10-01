#! /usr/bin/env bun

import { program } from "commander";
import { checkbox, input, select } from "@inquirer/prompts";
import {
  isEmptyDirectory,
  isExistingDirectory,
  isValidPackageName,
  removeDirectory,
  runCommand,
} from "./lib/utils";
import chalk from "chalk";
import cliSpinners from "cli-spinners";
import ora from "ora";

program.version("0.0.1").description("CLI for creating threejs projects");

program.argument("[name]").action(async (name) => {
  let projectName = name;

  if (!projectName) {
    projectName = await input({
      message: "Project name:",
      default: "my-project",
    });
  }

  if (isExistingDirectory(projectName) && !isEmptyDirectory(projectName)) {
    const choice = await select({
      message: `Directory "${projectName}" already exists. Please choose how to proceed:`,
      choices: [
        {
          name: "Remove existing files and continue",
          value: "remove",
        },
        {
          name: "Cancel operation",
          value: "cancel",
        },
      ],
    });

    if (choice === "cancel") process.exit(1);

    if (choice === "remove") {
      removeDirectory(projectName);
    }
  }

  if (!isValidPackageName(projectName)) {
    console.error(chalk.red(" Invalid package.json name"));
    process.exit(1);
  }

  console.log();

  const framework = await select({
    message: "Select a framework:",
    choices: [
      {
        name: "Vanilla",
        value: "vanilla",
        short: "vanilla",
      },
      {
        name: "React",
        value: "react",
      },
    ],
  });

  const sample = await select({
    message: "How would you like to start?",
    choices: [
      {
        name: "Basic scene",
        value: "basic",
      },
      {
        name: "Shader",
        value: "shader",
      },
      {
        name: "Physics",
        value: "physics",
      },
      {
        name: "Postprocessing",
        value: "postprocessing",
      },
      {
        name: "Model with environment map",
        value: "model",
      },
      {
        name: "Empty",
        value: "empty",
      },
    ],
  });

  const isTs = await select({
    message: "Would you like to use TypeScript?",
    choices: [
      {
        name: "Yes",
        value: true,
      },
      {
        name: "No",
        value: false,
      },
    ],
  });

  let command = `npm create vite@latest ${projectName} --`;

  switch (framework) {
    case "vanilla":
      if (isTs) command += " --template vanilla-ts";
      else command += " --template vanilla";
      break;
    case "react":
      if (isTs) command += " --template react-ts";
      else command += " --template react";
      break;
  }

  const spinner = ora({
    text: "Creating project...",
    spinner: cliSpinners.material,
  }).start();

  await runCommand(command);

  spinner.succeed("Project created successfully");
});

program.parse(process.argv);
