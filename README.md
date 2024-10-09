# create-threes

## Scaffolding new Three.js project

**With NPM:**

```bash
npm create threes@latest
```

**With Yarn:**

```bash
yarn create threes
```

**With PNPM:**

```bash
pnpm create threes
```

`create-threes` automatically runs in _interactive_ mode, but you can also specify your project name and template with command line arguments.

```bash
# npm
npm create threes@latest threes-project -- --template basic

# yarn
yarn create threes threes-project --template basic

# pnpm
pnpm create threes threes-project --template basic
```

[Check out the full list][templates] of example templates, available on GitHub.

### CLI Flags

May be provided in place of prompts

| Name                                  | Description                                            |
| :------------------------------------ | :----------------------------------------------------- |
| `--help` (`-h`)                       | Display available flags.                               |
| `--framework` (`-f`)                  | Choose framework: `vanilla` / `react`                  |
| `--template <name>` (`-tmpl <name>`)  | Specify your template.                                 |
| `--typescript` (`-ts`)                | Using typescript.                                      |
| `--install` (`-g`)                    | Install dependencies.                                  |
| `--git` (`-g`)                        | Initialize git repo.                                   |
