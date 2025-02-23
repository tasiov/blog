# tasio.dev - Personal Blog

A minimalist personal blog built with Next.js, featuring:

- ⚡️ Next.js 14 with App Router
- 🎨 Dark/Light theme support
- 📝 Markdown-based blog posts
- 🖼️ Auto-generated post images
- 🔍 SEO optimized with Open Graph tags
- 📱 Fully responsive design
- ⚡️ Fast page loads with static generation

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - React components
- `/lib` - Utility functions and data fetching
- `/posts` - Markdown blog posts

## Writing Posts

Create new blog posts by adding markdown files to the `/posts` directory. Each post should include frontmatter with title and date:

```markdown
---
title: 'Your Post Title'
date: 'YYYY-MM-DD'
---

Your post content here...
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support
- [date-fns](https://date-fns.org/) - Date formatting
- [remark](https://github.com/remarkjs/remark) - Markdown processing

## License

MIT
