# Digital Dialogue

Next.js App Router blog powered by Contentful. Practical writing on freelancing, technology, and building things that ship.

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.example` and fill in:

| Variable | Purpose |
|---|---|
| `CONTENTFUL_DELIVERY_ACCESS_TOKEN` | Contentful Delivery API token |
| `CONTENTFUL_SPACE_ID` | Contentful space ID |
| `CONTENTFUL_ENVIRONMENT` | Usually `master` |
| `REVALIDATE_SECRET` | Secret for on-demand cache clear (`/api/revalidate`) |

Also set these in the Vercel project for production.

## Scripts

```bash
npm run dev       # local development
npm run build     # production build
npm run start     # serve production build
npm run analyze   # build + open bundle analyzer
npm run lint      # ESLint
```

## Caching

| Route type | Cache |
|---|---|
| Listing pages (home, blogs, authors, categories) | 1 day |
| Blog detail pages | 1 month |

Blog detail Contentful responses are tagged as `blog` and `blog:{slug}` so you can clear them on demand without waiting for the TTL.

## Clear blog cache (`/api/revalidate`)

Protected by `REVALIDATE_SECRET`. Use the same secret in the query string or as `Authorization: Bearer …`.

Replace:

- `YOUR_DOMAIN` → `http://localhost:3000` locally, or your production URL
- `YOUR_SECRET` → value of `REVALIDATE_SECRET`
- paths/slugs with real post values

### Clear one post

```bash
# By path
curl "https://YOUR_DOMAIN/api/revalidate?secret=YOUR_SECRET&path=/blogs/technology/my-post-slug"

# By slug (cache tag)
curl "https://YOUR_DOMAIN/api/revalidate?secret=YOUR_SECRET&slug=my-post-slug"

# By category + slug
curl "https://YOUR_DOMAIN/api/revalidate?secret=YOUR_SECRET&category=technology&slug=my-post-slug"
```

POST example:

```bash
curl -X POST "https://YOUR_DOMAIN/api/revalidate" \
  -H "Authorization: Bearer YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d "{\"slug\":\"my-post-slug\"}"
```

### Clear all blog detail caches

```bash
curl "https://YOUR_DOMAIN/api/revalidate?secret=YOUR_SECRET&allBlogs=1"
```

POST example:

```bash
curl -X POST "https://YOUR_DOMAIN/api/revalidate" \
  -H "Authorization: Bearer YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d "{\"allBlogs\":true}"
```

Successful responses look like:

```json
{
  "revalidated": true,
  "now": 1710000000000,
  "targets": ["tag:blog:my-post-slug"]
}
```

## Content prompts

See [`prompts.md`](./prompts.md) for rewrite / new-article prompts that return title, category, short description, keywords, and body for Contentful.

## Stack

- Next.js (App Router)
- Contentful CMS
- Tailwind CSS
- Vercel hosting
