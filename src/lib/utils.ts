import path from "path";
import fs from "fs";
import validatePackageName from "validate-npm-package-name";
import { exec } from "child_process";

export const isExistingDirectory = (name: string) => {
  const projectPath = path.resolve(process.cwd(), name);
  console.log(projectPath);
  const check = fs.existsSync(path.resolve(process.cwd(), name));
  return check;
};

export const isEmptyDirectory = (dir: string) => {
  return fs.readdirSync(dir).length === 0;
};

export const isValidPackageName = (name: string) => {
  const validation = validatePackageName(name);

  return validation.validForNewPackages;
};

export const removeDirectory = (name: string) => {
  const projectPath = path.resolve(process.cwd(), name);

  fs.rmdirSync(projectPath, { recursive: true });
};

export const runCommand = (command: string, cwd: string = process.cwd()) => {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        reject(error);
      }

      if (stderr) {
        console.error(stderr);
        reject(stderr);
      }

      resolve(stdout);
    });
  });
};
