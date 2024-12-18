import {
  spawn,
  type ChildProcess,
  type StdioOptions,
} from "node:child_process";
import type { Readable } from "node:stream";

import { text as textFromStream } from "node:stream/consumers";

export interface ExecOptions {
  cwd?: string | URL;
  stdio?: StdioOptions;
  timeout?: number;
}
export interface Output {
  stdout: string;
  stderr: string;
  exitCode: number;
}
const text = (stream: NodeJS.ReadableStream | Readable | null) =>
  stream ? textFromStream(stream).then((t) => t.trimEnd()) : "";

export async function shell(
  command: string,
  flags: string[],
  opts: ExecOptions = {},
): Promise<Output> {
  let child: ChildProcess;
  let stdout = "";
  let stderr = "";
  try {
    child = spawn(command, flags, {
      cwd: opts.cwd,
      shell: true,
      stdio: opts.stdio,
      timeout: opts.timeout,
    });
    const done = new Promise((resolve) => child.on("close", resolve));
    [stdout, stderr] = await Promise.all([
      text(child.stdout),
      text(child.stderr),
    ]);
    await done;
  } catch {
    throw { stdout, stderr, exitCode: 1 };
  }
  const { exitCode } = child;
  if (exitCode === null) {
    throw new Error("Timeout");
  }
  if (exitCode !== 0) {
    throw new Error(stderr);
  }
  return { stdout, stderr, exitCode };
}
