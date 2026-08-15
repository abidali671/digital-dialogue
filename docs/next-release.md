# Next Release: Digital Dialogue

Prioritized improvements for the next release. Ordered by impact: fix crawl/UX bugs first, then discovery features, then growth and monetization.

---

## Release goals

- Fix soft-404 and misleading search behavior
- Improve article discovery (tags, related posts, TOC)
- Strengthen SEO and social sharing
- Make newsletter and feeds useful for returning readers

---

## 1. Bugs and correctness

### Soft 404 handling

- Return a real `404` for missing blog posts and author pages instead of redirecting to `/`
- Keep category pages using `notFound()` as they already do
- Files: `src/app/blogs/[category]/[blog_detail]/page.tsx`, `src/app/authors/[author]/page.tsx`

### Site-wide post search

- Search currently filters only the posts loaded on the current page (`BLOGS_PER_PAGE`)
- Replace with a Contentful query or dedicated search page so results cover all posts
- Apply the same behavior on blogs, category, and author listing clients
- Files: `src/app/blogs/page.tsx`, `src/components/blogs/BlogsClient.tsx`, `CategoryBlogsClient.tsx`, `AuthorPostsClient.tsx`

### Article JSON-LD dates

- Use ISO timestamps for `datePublished` and `dateModified` in structured data
- Stop using display strings such as `"September 16, 2024"`
- Prefer true publish date over `updatedAt` for “published”
- Files: `src/app/blogs/[category]/[blog_detail]/page.tsx`, `src/helper/index.ts`

### Category navigation links

- Use real `<Link>` / `href` for category menu items instead of click-only anchors
- Add accessible labels and expanded state for the mobile menu button
- Files: `src/components/Menu/index.tsx`, `src/components/Container/Navbar/index.tsx`

---

## 2. Content discovery

### Tag pages

- Tags already exist in Contentful (`label`, `slug`) but are rendered as non-clickable chips
- Add `/tags/[slug]` listing pages
- Make article keyword/tag chips link to related posts
- Files: `src/types/index.ts`, `src/components/Tag/index.tsx`, blog detail page

### Better related posts

- Replace random “Keep reading” picks with same-category first, then matching tags
- Keep 3 related posts max
- File: `src/app/blogs/[category]/[blog_detail]/page.tsx`

### Table of contents

- Generate a clickable TOC from article H2/H3 headings on long posts
- Improves scanability and on-page time

### Category page pagination

- Category pages currently load all posts with no pagination
- Add pagination consistent with `/blogs` and author pages
- File: `src/app/blogs/[category]/page.tsx`

---

## 3. SEO and social

### Default Open Graph image

- Add a branded default OG/Twitter image (`1200×630`) for home, listings, authors, and static pages
- Blog posts already set cover images; root metadata does not
- Files: `src/app/layout.tsx`, `public/`

### Breadcrumb and site schema

- Add `BreadcrumbList` JSON-LD on article pages (Blogs → Category → Post)
- Consider `Organization` / `WebSite` schema on the homepage

### RSS / Atom feed

- Add an RSS feed route for subscribers and aggregators
- Link it from `robots.txt` / site footer alongside the existing sitemap

---

## 4. Growth and engagement

### Newsletter upgrade

- Move off Formspree-only signup to a real email platform (double opt-in)
- Keep contact form separate from newsletter signup
- Add a newsletter CTA at the end of articles, not only on the homepage
- Files: `src/components/Newsletter/index.tsx`, `src/lib/config.ts`, `src/app/page.tsx`

### Author pages enrichment

- Expand author profiles with expertise areas, social links, and full post history
- Supports trust and E-E-A-T signals for the blog

---

## 5. Monetization (after traffic grows)

Do these only once discovery and retention pieces above are in place:

- Clear affiliate disclosure UI where affiliate links are used
- Optional sponsor / partnership slot (contact already mentions partnerships)
- Lead magnets such as checklists or templates tied to newsletter signup
- Avoid ads until pageviews and content volume justify them

---

## Suggested ship order

| Phase | Items |
|-------|--------|
| **A – Fixes** | Soft 404s, JSON-LD dates, real category links, search |
| **B – Discovery** | Tag pages, related posts by category/tags, TOC, category pagination |
| **C – Reach** | Default OG image, RSS, breadcrumb schema, newsletter ESP + article CTA |
| **D – Growth** | Author enrichment, affiliate/sponsor surfaces |

---

## Out of scope for this release

- Full redesign of the visual system
- Rewriting existing article body content in Contentful
- Changing category taxonomy beyond Contentful updates already planned
