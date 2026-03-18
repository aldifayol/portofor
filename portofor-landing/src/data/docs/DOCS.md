# Portofor CLI Documentation

This document provides instructions on how to use the `create-portofor` CLI to generate and customize your personal portfolio website.

## Getting Started

### Installation

There is no installation step required. You can use the CLI directly with `npx`.

### Creating a New Project

To create a new portfolio project, run the following command in your terminal:

```bash
npx create-portofor@latest
```

You will be prompted to enter a name for your project. If you don't provide a name, a default name will be used. The CLI will then create a new directory with the project name, scaffold the portfolio, and install the necessary dependencies.

## Tech Stack

This project is built with the following technologies:

- **Astro:** The web framework for building fast, content-focused websites.
- **React:** Used for UI components.
- **Tailwind CSS:** For styling the application.
- **shadcn/ui:** A collection of re-usable components.
- **TypeScript:** For type safety.

## Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   ├── components
│   ├── layouts
│   └── pages
└── package.json
```

## Customizing Your Portfolio

After the project is created, you can start customizing your portfolio.

### Editing the Homepage

The main entry point for the homepage is `src/pages/index.astro`. You can edit this file to change the layout and content of your homepage.

#### Customizing the Avatar

The avatar component is located at `src/components/Avatar.astro`. You can customize it by:

1.  **Changing Images:** Open `src/components/Avatar.astro` and update the variables at the top:
    - `defaultImage`: The static image shown by default.
    - `hoverImage`: The image (or GIF) shown when hovering over the avatar.
    - `clickedImage`: The image shown in the modal when the avatar is clicked.
2.  **Updating the Tooltip:** Look for the `ava-tooltip` attribute in the `div` with `id="avatar"`. Change its value to customize the hover text.

#### Customizing the Typewriter and Description

The homepage uses a typewriter effect for your role or description. This is located in `src/pages/index.astro`.

1.  **Edit Description:** Locate the `<Typewriter />` component and update the `messages` array attribute with your own descriptions.
2.  **Edit Name Tooltip:** In the same file, find the `span` wrapping the `BadgeCheck` component. You can edit the `icon-tooltip` attribute to change the verified badge text.

### Editing Personal Information

To edit your personal information, such as your brief story, skills, experience, and contact information, open `src/pages/about.astro` and modify the content.

### Editing Project Data

Your projects are stored as JSON files in the `src/data/projects/` directory. Each file represents a single project. To add, remove, or edit a project, you can modify the JSON files in this directory.

**Example Project JSON (`src/data/projects/portfolio.json`):**

```json
{
  "title": "My Awesome Project",
  "description": "This is a description of my awesome project.",
  "url": "https://example.com",
  "tags": ["Astro", "Tailwind CSS", "TypeScript"]
}
```

### Editing Blog Data

Your blog posts are stored as Markdown files in the `src/data/blog/` directory. Each file represents a single blog post. To add, remove, or edit a blog post, you can modify the Markdown files in this directory.

**Example Blog Post (`src/data/blog/hello-world.md`):**

```markdown
---
title: 'Hello World'
description: 'This is my first blog post.'
publishDate: '2026-03-18'
---

This is the content of my first blog post.
```

## Available Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

## Development Server

To start the development server, navigate to your project directory and run:

```bash
npm run dev
```

This will start a local development server, and you can view your portfolio at `http://localhost:4321`.

## Building for Production

To build your portfolio for production, run:

```bash
npm run build
```

The built files will be located in the `dist/` directory. You can then deploy these files to your preferred hosting provider.
