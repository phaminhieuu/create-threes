import arg from "arg";

export interface Task {
  start: string;
  end: string;
  run: (...args: any) => Promise<any>;
}

export interface Context {
  packageManager: string;
  help: boolean;
  projectName?: string;
  framework?: string;
  template?: string;
  typescript?: boolean;
  install?: boolean;
  git?: boolean;
  cwd: string;
  tasks: Task[];
}

export async function getContext(argv: string[]): Promise<Context> {
  // Define the flags
  const flags = arg(
    {
      // Types
      "--framework": String,
      "--template": String,
      "--typescript": Boolean,
      "--install": Boolean,
      "--git": Boolean,
      "--help": Boolean,

      // Aliases
      "-f": "--framework",
      "-tmpl": "--template",
      "-ts": "--typescript",
      "-i": "--install",
      "-g": "--git",
      "-h": "--help",
    },
    { argv, permissive: true },
  );

  // Get the current working directory
  const cwd = flags["_"][0];

  let {
    "--help": help = false,
    "--framework": framework,
    "--template": template,
    "--typescript": typescript,
    "--install": install,
    "--git": git,
  } = flags;

  const context: Context = {
    packageManager: detectPackageManager(),
    help,
    projectName: cwd,
    framework,
    template,
    typescript,
    install,
    git,
    cwd,
    tasks: [],
  };

  return context;
}

export function detectPackageManager() {
  const userAgent = process.env.npm_config_user_agent;
  if (!userAgent) return "npm";

  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");
  return pkgSpecArr[0];
}
