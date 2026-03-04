# Portofor Starter Kit: Default

Install this starter with:

```sh
npm create portofor@latest -- --template default
```

> 🧑‍🚀 **Seasoned developer?** Delete this file. Have fun!

## This repository

This `templates/default` folder is part of the `create-portofor` generator repository. The generator repository itself contains tooling and additional templates used to scaffold projects from this starter.

- **Generator repo root (example)**: LICENSE, NOTES.md, package.json, torun.js, bin/, templates/
- **This template location**: `templates/default`

## 🚀 Project Structure (what you get)

When a user creates a project from this template, the generated project will include the following files and folders:

```text
/
├── public/
│   └── favicon.ico
│   └── favicon.svg
│   └── coding.gif
├── src/
│   ├── components/
│   │   └── Avatar.astro
│   │   └── BlogPostPreview.astro
│   │   └── ProjectCard.astro
│   ├── data/
│   │   ├── blog/
│   │   │   └── building-with-astro.md
│   │   │   └── hello-world.md
│   │   └── projects/
│   │       └── api-service.json
│   │       └── cli-tool.json
│   │       └── portfolio.json
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│     └── global.css
│   └── utils/
│       └── cn.ts
└── package.json
```

## Repository layout (for maintainers)

If you're editing the generator (this repo), you'll find extra files at the repository root that don't belong in generated projects. Typical items here include:

- `bin/` — CLI entrypoints used by the generator
- `torun.js` — helper script used during development
- `templates/` — all starter templates (including `default`)
- `package.json` — dependencies and scripts for the generator
- `README.md`, `LICENSE`, `NOTES.md` — repo docs and notes

## 🧞 Commands (for generated projects)

All commands are run from the root of the generated project (not the generator repo). Run these from the scaffolded project's directory:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more about Astro Framework?

Feel free to check [our documentation](https://docs.astro.build) or jump into Astro's [Discord server](https://astro.build/chat).
