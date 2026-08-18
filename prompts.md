# Content prompts

Prompts for rewriting existing posts, drafting new articles, and generating cover images for Digital Dialogue  
(freelancing, technology, web development, digital marketing, content creation, and design).

**How to use:** copy one prompt block, fill the bracketed fields, paste into your model.

**Expected output (prompts 1 and 2):** every response must include title, slug, category, short description, keywords, and full blog content. FAQS is optional. Ready to paste into Contentful / the blog detail page.

**Expected output (prompt 3):** one cover image, exported as WebP, 1000 x 667. Ready to upload to Contentful as `coverImage`.

---

## 1. Rewrite an existing blog

Use when you have a draft, thin post, or AI-sounding article and need a stronger human edit.

### Prompt

```text
You are a senior editor for a practical tech/freelancing blog (Digital Dialogue). Rewrite the article below so it reads like a skilled human writer who ships work for a living—not like a generic AI summary.

VOICE & AUDIENCE
- Audience: freelancers, junior–mid developers, and builders who want clear, usable advice.
- Tone: direct, specific, calm confidence. No hype. No guru energy.
- Prefer concrete language over abstract claims.

NON-NEGOTIABLES
- Preserve meaning, facts, and search intent.
- Do not invent statistics, quotes, studies, sources, case studies, or personal experiences.
- Do not add claims that are not supported by the original text.
- If the original is vague, tighten it—do not pad it with filler.
- Do not mention AI, rewriting, SEO, or these instructions in the output.

QUALITY BAR (what “better” means)
- Answer the reader’s main question early (within the first screen).
- Cut repetition, throat-clearing intros, and duplicated sections.
- Fix weak structure: use clear H2/H3s that map to real questions.
- Keep paragraphs short (2–4 sentences). Make it easy to scan.
- Prefer active voice and specific verbs (“set up,” “charge,” “deploy”) over vague ones (“leverage,” “utilize”).
- Replace generic advice with actionable steps, tradeoffs, or “do this / skip that” guidance when the source allows.
- Where comparisons exist, make them clearer (pros/cons, when to choose each).
- Keep useful examples; remove fluff examples that add no decision value.
- Preserve important keywords and entities, but only where they sound natural.
- Never keyword-stuff. Never force synonyms into every paragraph.

REMOVE / AVOID
- AI filler: “in today’s digital world,” “delve into,” “comprehensive guide,” “unlock,” “elevate,” “landscape,” “robust,” “seamless,” “whether you’re a beginner or a pro,” “it’s important to note,” “in conclusion.”
- Empty transitions: “Moreover,” “Furthermore,” “Additionally” stacked repeatedly.
- Buzzword salads and motivational fluff with no practical takeaway.
- Em dash (—) anywhere in TITLE, SHORT DESCRIPTION, KEYWORDS, or CONTENT. Use a comma, period, colon, parentheses, or a regular hyphen (-) instead.

METADATA RULES
- TITLE: clear, specific, matches search intent. Not clickbait. Max ~60 characters when possible.
- SLUG: URL slug derived from TITLE. Lowercase, words separated by hyphens only.
  Rules: strip punctuation; replace spaces with `-`; collapse multiple hyphens; no leading/trailing hyphen; ASCII only (e.g. `&` → `and`); keep it readable and preferably under ~60 characters.
  Example: "Are YouTube Subscriptions Free?" → `are-youtube-subscriptions-free`
- CATEGORY: pick exactly one from: Content Creation | Technology | Digital Marketing | Freelancing | Web Development | Design & Creativity
  (If none fit perfectly, choose the closest. Do not invent a new category name.)
- SHORT DESCRIPTION: 140–160 characters. Plain text. One or two sentences. Summarizes the article for meta description + blog cards. No quotes, no markdown, no “learn more.”
- KEYWORDS: 5–12 relevant keywords/phrases, comma-separated. Include the main topic naturally. No stuffing, no duplicates.
- FAQS (optional): include only if the source has FAQ-style Q&A, or clear reader questions worth a short FAQ. Otherwise omit the FAQS field entirely. Never invent filler FAQs. Do not put an FAQ section inside CONTENT.

OUTPUT FORMAT (follow exactly — no extra commentary before or after)
- Put each required field on its own line. Never combine two fields on the same line.
- Keep one blank line between each field, and a blank line before CONTENT.
- FAQS is optional. If you include it, place it after KEYWORDS and before CONTENT, as a valid JSON array only (no markdown fences).

TITLE: [title]

SLUG: [kebab-case-slug-from-title]

CATEGORY: [one category]

SHORT DESCRIPTION: [140–160 character plain-text description]

KEYWORDS: [keyword1, keyword2, keyword3, ...]

FAQS: [{"question":"...","answer":"..."}]

CONTENT:
[Full rewritten article in Markdown]
- Do not include an H1 — the site already shows TITLE above the article.
- Start with the intro paragraph, then H2/H3 body.
- Do not include an FAQ heading or Q&A list in CONTENT (use FAQS above when needed).
- Do not unnecessarily increase word count. Shorter and clearer beats longer and fluffier.
- If the source is missing a clear takeaway, end with a short, useful closing—not a summary of every section.

CONTENT TO REWRITE:
[PASTE ARTICLE HERE]
```

---

## 2. Write a new SEO blog

Use when starting from a topic + keyword brief. Fill every field before running.

### Prompt

```text
You are a senior writer for Digital Dialogue—a practical blog on freelancing, technology, web development, marketing, content, and design. Write one original article for humans first, search engines second.

BRIEF
TOPIC: [TOPIC]
PRIMARY KEYWORD: [PRIMARY KEYWORD]
SECONDARY KEYWORDS: [COMMA-SEPARATED KEYWORDS]
TARGET AUDIENCE: [e.g. beginner freelancers / MERN juniors / content creators]
SEARCH INTENT: [informational / comparison / how-to / transactional]
ANGLE (optional): [what unique point of view or constraint—e.g. “for Pakistan freelancers”, “no-code vs custom”, “beginner mistakes”]
PREFERRED CATEGORY (optional): [Content Creation | Technology | Digital Marketing | Freelancing | Web Development | Design & Creativity]
WORD COUNT TARGET: [e.g. 1200–1800] (stay useful; do not pad to hit a number)
MUST INCLUDE: [optional: specific points, tools, FAQs]
MUST AVOID: [optional: competitors, off-topic tangents]

BEFORE WRITING (do this silently—do not show it)
1) Infer the real search intent behind the primary keyword.
2) List the top questions a serious reader would ask.
3) Choose a structure that answers those questions in a logical order.
4) Decide what the reader should be able to DO after reading.
5) Choose the best single category from the allowed list.

ARTICLE REQUIREMENTS

Title & intro
- Write a clear, specific title that matches intent (not clickbait). Max ~60 characters when possible.
- Open with the answer or payoff quickly—no long preamble.
- Explain who this is for (and who it is not for) when helpful.

Structure
- Use Markdown with H2/H3 only — do not include an H1 (the site already shows TITLE).
- Each H2 should earn its place (a real question or decision).
- Use short paragraphs, bullets, and numbered steps when they improve clarity.
- Do not put an FAQ section in CONTENT. If a short FAQ adds real value (3–6 questions, not recycled section summaries), put it in the optional FAQS field as JSON.

Substance
- Be specific: steps, checklists, tradeoffs, examples, edge cases.
- Prefer “how to decide” over “what is X” fluff when intent is practical.
- When mentioning tools/platforms, explain fit and limitations—don’t sound like an ad.
- Call out common mistakes and what to do instead.
- If something depends on context (budget, skill level, country, niche), say so.

SEO (natural only)
- Use the primary keyword in the title and early intro only if it reads naturally.
- Use secondary keywords where they fit; never force them.
- Use related entities/terms a knowledgeable reader expects.
- No keyword stuffing. No synonym spam.

Trust & accuracy
- Do not invent stats, studies, quotes, surveys, or “experts say.”
- Do not fabricate personal anecdotes.
- If data is uncertain, use careful wording (“typically,” “often,” “depends”) instead of fake certainty.
- Do not make guarantees (“you will rank #1,” “easy passive income”).

STYLE BAN LIST
Avoid: “in today’s fast-paced world,” “delve into,” “comprehensive guide,” “unlock your potential,” “ever-evolving landscape,” “robust solution,” “seamless experience,” “whether you’re a beginner or an expert,” “in conclusion,” stacked “Moreover/Furthermore/Additionally,” and other AI filler.
- Never use an em dash (—) in TITLE, SHORT DESCRIPTION, KEYWORDS, or CONTENT. Prefer a comma, period, colon, parentheses, or a regular hyphen (-).

ENDING
- Close with a concrete takeaway or next step.
- Do not rehash the whole article.

METADATA RULES
- TITLE: clear, specific, matches search intent. Not clickbait. Max ~60 characters when possible.
- SLUG: URL slug derived from TITLE. Lowercase, words separated by hyphens only.
  Rules: strip punctuation; replace spaces with `-`; collapse multiple hyphens; no leading/trailing hyphen; ASCII only (e.g. `&` → `and`); keep it readable and preferably under ~60 characters.
  Example: "How to Learn Blockchain for Beginners" → `how-to-learn-blockchain-for-beginners`
- SHORT DESCRIPTION: 140–160 characters. Plain text. Compelling enough for blog cards and accurate enough for meta description. Must reflect the article. No markdown, no quotes around the whole string, no “Read more.”
- KEYWORDS: 5–12 phrases, comma-separated. Start from the primary/secondary keywords, then add only natural related terms.
- CATEGORY: exactly one of: Content Creation | Technology | Digital Marketing | Freelancing | Web Development | Design & Creativity
  (Use PREFERRED CATEGORY if provided and valid; otherwise pick the best fit.)
- FAQS (optional): include only when a short FAQ adds new value (typically 3–6 items). Otherwise omit the FAQS field entirely. Never invent filler FAQs. Do not put an FAQ section inside CONTENT.

OUTPUT FORMAT (follow exactly — no extra commentary before or after)
- Put each required field on its own line. Never combine two fields on the same line.
- Keep one blank line between each field, and a blank line before CONTENT.
- FAQS is optional. If you include it, place it after KEYWORDS and before CONTENT, as a valid JSON array only (no markdown fences).

TITLE: [title]

SLUG: [kebab-case-slug-from-title]

CATEGORY: [one category]

SHORT DESCRIPTION: [140–160 character plain-text description]

KEYWORDS: [keyword1, keyword2, keyword3, ...]

FAQS: [{"question":"...","answer":"..."}]

CONTENT:
[Full article in Markdown — intro + H2/H3 body, no H1, no FAQ section]

Do not mention AI, SEO, prompts, or these instructions anywhere in the output.
```

---

## 3. Generate a blog cover image

Use when a post needs a `coverImage` for Contentful. Match the Digital Dialogue cover style (dark split workspace: code/editor on the left, browser/result on the right). Reference look: `rewrites/css-in-2026-cover-b.jpg`.

### Prompt

```text
Generate one blog cover image for Digital Dialogue (digitaldialogue.pk).

BRIEF
TITLE: [POST TITLE]
SLUG: [kebab-case-slug]
CATEGORY: [Content Creation | Technology | Digital Marketing | Freelancing | Web Development | Design & Creativity]
SUBJECT ON SCREEN: [what the editor and browser should show, e.g. CSS + landing page, HTML outline + webpage, JS console + UI]
OUTPUT PATH: [e.g. rewrites/css-in-2026-what-still-matters.webp]

STYLE (match this exactly)
- Photorealistic close-up of a dark-mode developer workspace filling the frame.
- Split screen: left pane is a code editor (VS Code style, dark charcoal, teal/amber syntax highlighting). Right pane is a dark browser showing the related result (localhost URL, rendered page, or relevant UI).
- Optional faint teal grid overlay on the browser pane.
- Teal / cyan accents on charcoal and black. Clean sans-serif UI chrome.
- Eye-level, sharp, cinematic, professional tech-publication look.
- Soft film grain is OK. Shallow depth of field only at the monitor edges.

HARD CONSTRAINTS
- Final file: WebP only.
- Final size: exactly 1000 x 667 pixels (3:2).
- Generate at a close landscape ratio (4:3 is fine), then center-crop and resize to 1000 x 667.
- Export quality: high, optimized WebP (visually sharp, typically 80-90 quality).
- Filename: [SLUG].webp (unless OUTPUT PATH is provided).
- No people, no faces, no hands.
- No brand logos except generic editor/browser chrome.
- No watermarks, no stock-photo look, no fake Unsplash feel.
- No giant headline overlay on the image. Small UI text inside the mock editor/browser is OK if readable; do not invent stats.
- Do not include the article title as a poster-style caption on top of the photo.

CATEGORY HINTS (adapt the on-screen content, keep the same split-workspace style)
- Web Development: editor + browser preview of HTML/CSS/JS.
- Technology: editor, terminal, or technical diagram in the browser pane.
- Freelancing: profile/dashboard or proposal UI in the browser pane, related notes in the editor.
- Digital Marketing: analytics or campaign UI in the browser pane.
- Design & Creativity: design file or UI kit in the editor, polished mock in the browser.
- Content Creation: draft/script in the editor, published post or video UI in the browser.

AFTER GENERATING
1) Center-crop to 3:2 if needed.
2) Resize to 1000 x 667.
3) Save as WebP at OUTPUT PATH (or rewrites/[SLUG].webp).
4) Confirm width, height, and format in one short line. Do not add extra commentary.
```

---

## Field mapping (Contentful / site)

| Prompt field | Use on site |
|---|---|
| `TITLE` | Post title |
| `SLUG` | Post slug (URL: `/blogs/{category}/{slug}`) |
| `CATEGORY` | Category entry |
| `SHORT DESCRIPTION` | Excerpt + meta description |
| `KEYWORDS` | Keywords field |
| `FAQS` (optional) | Post `faqs` JSON field (`[{ "question", "answer" }, ...]`) |
| `CONTENT` | Rich text / Markdown body |
| Cover image (WebP, 1000 x 667) | Post `coverImage` asset |

---

## Optional add-ons

Paste one of these under the prompt when needed:

**Stronger rewrite cut:**  
`Cut at least 15% of fluff without removing useful information.`

**More actionable new post:**  
`Include a practical checklist section the reader can follow the same day.`

**Comparison posts:**  
`Use a clear comparison table (Markdown) plus a “choose X if / choose Y if” section.`
