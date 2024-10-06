import { cancel, isCancel } from "@clack/prompts";
import fs from "fs";

export function isEmpty(dir: string) {
  if (!fs.existsSync(dir)) return true;
  return fs.readdirSync(dir).length === 0;
}

export function isValidName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName,
  );
}

export function toValidName(projectName: string) {
  if (isValidName(projectName)) return projectName;

  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z\d\-~]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function checkCancel(arg: string | boolean | symbol | unknown) {
  if (isCancel(arg)) {
    cancel("Operation cancelled");
    process.exit();
  }
}
