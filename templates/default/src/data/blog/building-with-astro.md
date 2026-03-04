---
title: "Building a Portfolio with Astro"
description: "A deep dive into why I chose Astro for my portfolio and how I set it up with Tailwind CSS v4."
date: 2025-02-01
tags: ["astro", "webdev", "tailwindcss"]
draft: false
---

# Building a Portfolio with Astro

When it came time to rebuild my portfolio, I had a lot of options. Next.js, Remix, SvelteKit, and plain HTML were all on the table. I ended up choosing Astro, and here's why.

## Why Astro?

Astro has a unique approach to building websites. It ships **zero JavaScript by default**, which means incredibly fast page loads. But when you need interactivity, you can add it with any framework you like.

### Key Benefits

1. **Performance** - Zero JS by default means fast sites
2. **Flexibility** - Use React, Vue, Svelte, or plain HTML
3. **Content Collections** - Built-in content management with type safety
4. **View Transitions** - Smooth page transitions out of the box

## The Tech Stack

For this portfolio, I'm using:

- **Astro 5** - The latest version with the new Content Layer API
- **Tailwind CSS v4** - CSS-first configuration
- **TypeScript** - For type safety throughout

## Content Collections in Astro 5

One of my favorite features is the new Content Layer API. Here's how I set up my blog:

```typescript
// src/content.config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

This gives me full type safety when querying posts:

```typescript
const posts = await getCollection("blog");
// posts is fully typed!
```

## View Transitions

Astro 5 renamed `ViewTransitions` to `ClientRouter`. Adding smooth page transitions is as simple as:

```astro
---
import { ClientRouter } from "astro:transitions";
---

<html>
  <head>
    <ClientRouter />
  </head>
</html>
```

Now all navigation is animated automatically!

## Tailwind CSS v4

Tailwind v4 introduces a CSS-first configuration approach. Instead of `tailwind.config.js`, you define everything in CSS:

```css
@import "tailwindcss";

@theme {
  --color-accent: #22d3ee;
  --font-mono: "Geist Mono", monospace;
}
```

This feels more natural and keeps all styling concerns in one place.

## Conclusion

Astro has been a joy to work with. If you're building a content-focused site like a blog or portfolio, I highly recommend giving it a try.

The source code for this site is available on [GitHub](https://github.com) if you want to take a look!
