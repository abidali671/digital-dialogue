# Content prompts

Prompts for rewriting existing posts, drafting new articles, and generating cover images for Digital Dialogue  
(freelancing, technology, web development, digital marketing, content creation, and design).

**How to use:** copy one prompt block, fill the bracketed fields, paste into your model.

**Expected output (prompts 1 and 2):** every response must include title, slug, category, short description, keywords, and full blog content. FAQS is optional. Ready to paste into Contentful / the blog detail page.

**Expected output (prompt 3):** one cover image, exported as WebP, 1000 x 667. The model randomly picks one style (A/B/C/D) from the post category pool, then saves a Contentful-ready `coverImage`.

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

Use when a post needs a `coverImage` for Contentful. Pick a style from the category pool below (do not force the old code-editor look on every category). Shared brand accents: charcoal / black base, teal-cyan highlights, cinematic lighting.

### Prompt

```text
Generate one blog cover image for Digital Dialogue (digitaldialogue.pk).

BRIEF
TITLE: [POST TITLE]
SLUG: [kebab-case-slug]
CATEGORY: [Content Creation | Technology | Digital Marketing | Freelancing | Web Development | Design & Creativity]
SCENE FOCUS: [1 short line on what the image should communicate, e.g. YouTube Premium comparison, CSS layout fundamentals, freelance proposal workflow]
OUTPUT PATH: [e.g. rewrites/youtube-premium-vs-free-is-it-worth-it.webp]

STYLE SELECTION (required)
1) Look at CATEGORY.
2) From that category's STYLE POOL below, randomly pick ONE style (A, B, C, or D).
3) In your first output line before the image, write: STYLE PICKED: [Category] / [A|B|C|D] - [style name]
4) Generate using only that picked style. Do not blend multiple styles.
5) If regenerating the same post, pick a different style letter than last time when possible.

SHARED LOOK (all styles)
- Photorealistic or high-end editorial CGI. Sharp, cinematic, professional publication quality.
- Palette: charcoal, near-black, soft mist gray, teal/cyan accents. Warm amber highlight optional.
- Soft film grain OK. Shallow depth of field OK at edges only.
- Fill the frame with one strong composition. No collage of many tiny cards.
- No people, faces, or hands.
- No real brand logos (no YouTube, Google, Meta, Figma wordmarks/icons). Use generic UI chrome only.
- No watermarks, no stock-photo cliches, no giant poster title of the article on top of the image.
- Small readable UI text inside a mock screen is OK. Do not invent fake stats or follower counts.

CATEGORY STYLE POOLS

CONTENT CREATION (pick A, B, C, or D at random)
- A) Creator desk still life: desk-top camera or mic silhouette in soft side light, open notebook or script pages, muted LED accent; product-photo feel, not a gaming RGB desk.
- B) Video workspace: large monitor showing a generic dark video player + simple sidebar (no logos); beside it a script or shot-list document; moody cinematic night grading.
- C) Publish board: wall or desk with printed thumbnail drafts, sticky notes for titles/hooks, one tablet showing a clean channel-style dashboard mock (generic).
- D) Editorial frame: one strong still from a generic article or video scene (object + lighting, no people), framed like a magazine cover photo with teal rim light.

WEB DEVELOPMENT (pick A, B, C, or D at random)
- A) Split monitor: left dark code editor (generic), right browser preview of the topic UI; teal accents; faint grid on preview.
- B) Single ultrawide IDE close-up: readable code for the topic (HTML/CSS/JS), soft bokeh desk edge.
- C) Browser-first layout: full-bleed dark browser with a clean local app/page for the topic; subtle editor peek at the side.
- D) Stack diagram: isometric dark blocks for HTML / CSS / JS (or the topic stack), connected by thin teal lines, no logos.

TECHNOLOGY (pick A, B, C, or D at random)
- A) Abstract tech object: layered glass panels, circuit-like light paths, teal glow; conceptual not sci-fi chaos.
- B) Terminal + diagram: dark terminal window with simple commands next to a clean architecture/flowchart panel.
- C) Device still life: phone + laptop showing a related tech UI mock, desk top-down or 3/4 angle.
- D) Macro hardware: close-up of a generic chip, cable, or server rack edge with teal specular highlights; documentary product lighting.

FREELANCING (pick A, B, C, or D at random)
- A) Proposal desk: laptop with a clean proposal/doc UI, notebook with rate notes, coffee cup; calm morning light.
- B) Profile mock: browser showing a generic freelancer profile/dashboard (no marketplace logos), portfolio tiles visible.
- C) Client workflow board: kanban-style cards (Brief / Draft / Delivery) on a dark desk with a tablet calendar.
- D) Invoice still life: printed invoice or contract, calculator, pen, and a laptop showing a simple billing UI; quiet studio light.

DIGITAL MARKETING (pick A, B, C, or D at random)
- A) Analytics wall: dark dashboard with simple charts and funnel blocks (no brand logos), teal highlights.
- B) Campaign desk: moodboard printouts, ad-creative drafts on tablet, sticky notes for audience/offer.
- C) Growth map: clean whiteboard or digital board with channel arrows (Search / Social / Email) and a laptop showing a landing page mock.
- D) Search intent board: oversized keyword cards and a SERP-style results mock (generic, no Google logo) on a dark desk.

DESIGN & CREATIVITY (pick A, B, C, or D at random)
- A) Design canvas: dark design-tool style artboard with color swatches, type samples, and a polished component mock (no Figma logo).
- B) Material desk: paper samples, printed palette chips, ruler, tablet with UI mock; soft studio light.
- C) Before/after frame: two side-by-side phone or browser frames showing weak vs refined layout for the topic.
- D) Type specimen: large letterforms and a small UI mock on a charcoal field, teal accent on one glyph; editorial print feel.

HARD CONSTRAINTS
- Final file: WebP only.
- Final size: exactly 1000 x 667 pixels (3:2).
- Generate at a close landscape ratio (4:3 is fine), then center-crop and resize to 1000 x 667.
- Export quality: high, optimized WebP (typically 80-90 quality).
- Filename: [SLUG].webp (unless OUTPUT PATH is provided).
- Match SCENE FOCUS to the picked style so the subject fits the category.

AFTER GENERATING
1) Center-crop to 3:2 if needed.
2) Resize to 1000 x 667.
3) Save as WebP at OUTPUT PATH (or rewrites/[SLUG].webp).
4) Confirm in one short line: STYLE PICKED, width, height, format. No extra commentary.
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
