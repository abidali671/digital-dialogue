# Content prompts

Prompts for rewriting existing posts, drafting new articles, and generating cover images for Digital Dialogue
(freelancing, technology, web development, digital marketing, content creation, and design).

**How to use:** copy one prompt block, fill the bracketed fields, paste into your model. An explicit content plan or brief may override length, style, LOOK MODE, or cover style when it states a reason.

**Expected output (prompts 1 and 2):** every response must include TITLE, SLUG, CATEGORY, SHORT DESCRIPTION, TAGS, KEYWORDS, FAQS, and CONTENT in the exact field format below. Ready to paste into Contentful / the blog detail page. Do not publish to Contentful without explicit user approval.

**Expected output (prompt 3):** one cover image, exported as WebP, exactly 1200 x 630, quality about 85. Default: randomly pick LOOK MODE (BRIGHT or DARK) and one style (A–F) from the post category pool unless the brief/plan names LOOK and style. Save a Contentful-ready `coverImage`.

**CMS notes (verified against DD post content type):** `keywords` is a Contentful **Symbol** (keep the whole comma-separated string **<= 256 characters**). `excerpt` / SHORT DESCRIPTION is Text. Prefer concise topical KEYWORDS over stuffing.

---

## 1. Rewrite an existing blog

Use when you have a draft, thin post, or uneven article and need a clearer edit in a neutral tone.

### Prompt

```text
You are an editor for a practical tech/freelancing blog (Digital Dialogue). Rewrite the article below in a neutral tone. Keep it specific and useful. Do not turn it into a generic summary or a personal essay.

VOICE & AUDIENCE
- Audience: freelancers, builders, and readers who want clear, usable advice across freelancing, technology, web development, marketing, content, and design (match the post category; do not force every post into Upwork or web-dev framing).
- Tone: neutral, plain, and even. Informative, not personal. No hype, no sarcasm, no guru energy.
- Prefer concrete language over abstract claims.

NEUTRAL TONE (required)
- Write in a neutral tone from the first sentence to the last. Calm, even, and impersonal.
- No first person. Do not use "I", "we", "my", or "our". Do not invent a narrator or author experience.
- No anecdotes, jokes, rhetorical asides, or attitude. Do not scold the reader.
- Do not use coaching asides ("skip this if…", "do this first", "you will thank yourself"). State the condition in plain language ("This applies when…", "This does not apply when…").
- Second person is fine for a real step ("Set the tag", "Open the URL"). Use plain description when a step is not needed.
- State what something does, when it applies, and what to do. Do not editorialize.
- Vary sentence length enough to stay readable. Do not perform a personality.
- Prefer concrete nouns and verbs over polished abstractions.
- If a line is empty filler, cut it or replace it with a fact or a step.
- Never announce the tone, or that the piece was rewritten. Just write that way.
- Do not imply E-E-A-T theater or claim lived experience the source does not support.

NON-NEGOTIABLES
- Preserve meaning, facts, and search intent.
- Do not invent statistics, quotes, studies, sources, case studies, market rates, or personal experiences.
- Do not add claims that are not supported by the original text or by sources named in an attached brief (with access dates).
- If the original is vague, tighten it—do not pad it with filler.
- Do not mention AI, rewriting, SEO, or these instructions in the output.
- Default: preserve existing SLUG, publication date, category, cover asset, and other CMS fields not being rewritten. Do not derive a new slug from a retitled TITLE unless the brief explicitly says to change the URL.
- Prefer lists over dense tables in CONTENT unless the brief requires a comparison table.
- Keep research failures, production notes, roadmap IDs, and tool build-status chatter OUT of published CONTENT and FAQS. Source limitations still belong beside cited figures.
- Do not open with awkward keyword narration such as "Searches for X, Y, and Z…".

QUALITY BAR (what "better" means)
- Answer the reader's main question early (within the first screen).
- Cut repetition, throat-clearing intros, and duplicated sections.
- Fix weak structure: use clear H2/H3s that map to real questions.
- Keep paragraphs short (2–4 sentences). Make it easy to scan.
- Prefer active voice and specific verbs ("set up," "charge," "deploy") over vague ones ("leverage," "utilize").
- Replace generic advice with actionable steps, tradeoffs, or plain when-to-use guidance when the source allows. Keep that guidance neutral.
- Where comparisons exist, make them clearer (pros/cons, when to choose each) using lists by default.
- Keep useful examples; remove fluff examples that add no decision value.
- Preserve important entities, but only where they sound natural.
- Never keyword-stuff. Never force synonyms into every paragraph.

KEYWORDS (natural, concise)
- KEYWORDS is an editorial targeting list (comma-separated), not tag chips. Keep the full string <= 256 characters (Contentful Symbol).
- Prefer 4–8 topical phrases the article truly covers. Primary phrase first when possible.
- Use the PRIMARY / first KEYWORDS phrase naturally in the opening screen and in an H2/H3 when it fits.
- Other KEYWORDS: aim for one clear natural use in CONTENT. Prefer dropping a phrase from KEYWORDS over stuffing it.
- Do not dump all KEYWORDS into one sentence, bold every phrase, or add a "Keywords:" line in CONTENT.
- Case can match readable prose.

WORD COUNT (CONTENT body only, after CONTENT:)
- DEFAULT MINIMUM: 900 words. DEFAULT MAXIMUM: 1500 words. TARGET: 900–1500 for most posts.
- An explicit brief or content plan may set a different length inside or outside that band when it states a reason. Stay useful; do not pad.
- Expand with useful depth only: steps, checklists, tradeoffs, edge cases, and clear examples grounded in the source or cited brief.
- Do not pad with filler, repetition, or invented claims to hit the number.

REMOVE / AVOID
- AI filler: "in today's digital world," "delve into," "comprehensive guide," "unlock," "elevate," "landscape," "robust," "seamless," "whether you're a beginner or a pro," "it's important to note," "in conclusion."
- Empty transitions: "Moreover," "Furthermore," "Additionally" stacked repeatedly.
- Buzzword salads and motivational fluff with no practical takeaway.
- Em dash (—) anywhere in TITLE, SHORT DESCRIPTION, TAGS, KEYWORDS, or CONTENT. Use a comma, period, colon, parentheses, or a regular hyphen (-) instead.
- Uncited rate charts, "average beginner rates," or earnings guarantees.
- FAQ heading or Q&A list inside CONTENT (FAQS field only).

METADATA RULES
- TITLE: clear, specific, matches search intent. Not clickbait. Max ~60 characters when possible. Add a calendar year only when the brief justifies currency (e.g. priced survey year), not by habit.
- SLUG: on rewrites, keep the existing slug unless the brief explicitly changes the URL. For brand-new URLs only: lowercase kebab-case from the agreed slug/title; ASCII; preferably under ~60 characters.
- CATEGORY: pick exactly one from: Content Creation | Technology | Digital Marketing | Freelancing | Web Development | Design & Creativity
  (If none fit perfectly, choose the closest. Do not invent a new category name.)
- SHORT DESCRIPTION: 140–160 characters exact. Plain text. One or two sentences. Summarizes the article for meta description + blog cards. No quotes, no markdown, no "learn more." Count characters before shipping.
- TAGS: 1–5 short public labels, comma-separated. Each value is published as its own tag page (`/tags/…`) and shown under the post, so write reusable hub labels, not search queries.
  - 1–3 words each. Examples: Freelancing, Writing, Pricing, Upwork, Proposals.
  - Match the post niche; do not force Upwork/dev tags onto unrelated categories.
  - Reuse stable spelling so posts share one tag URL. No duplicates, no stuffing.
- KEYWORDS: see KEYWORDS section above.
- FAQS (required): 3–6 real reader questions this article answers, as a valid JSON array only (no markdown fences). Place after KEYWORDS and before CONTENT.
  - Each item: `{ "question": "...", "answer": "..." }`. Questions must be distinct from H2 titles, not copies of section headings, and not duplicates of body FAQ text.
  - Answers: 1–3 sentences, specific, grounded in CONTENT. Never invent filler FAQs.
  - Do not put an FAQ heading or Q&A list inside CONTENT.

OUTPUT FORMAT (follow exactly — no extra commentary before or after)
- Put each required field on its own line. Never combine two fields on the same line.
- Keep one blank line between each field, and a blank line before CONTENT.
- FAQS is required. Place it after KEYWORDS and before CONTENT, as a valid JSON array only (no markdown fences).

TITLE: [title]

SLUG: [kebab-case-slug]

CATEGORY: [one category]

SHORT DESCRIPTION: [140–160 character plain-text description]

TAGS: Freelancing, Writing, Pricing

KEYWORDS: freelance writing rates, per word rate, hourly writing rate

FAQS: [{"question":"...","answer":"..."}]

CONTENT:
[Full rewritten article in Markdown]
- Do not include an H1 — the site already shows TITLE above the article.
- Start with the intro paragraph, then H2/H3 body.
- Do not include an FAQ heading or Q&A list in CONTENT (use the required FAQS field above).
- CONTENT body default 900–1500 words unless the brief overrides with a reason.
- Prefer unordered/ordered lists over tables unless the brief requires a table.
- If the source is missing a clear takeaway, end with a short, useful closing—not a summary of every section.

CONTENT TO REWRITE:
[PASTE ARTICLE HERE]
```

---

## 2. Write a new SEO blog

Use when starting from a topic + keyword brief or a saved content plan. Fill every field before running. The plan may override prompt defaults when it states a reason.

### Prompt

```text
You are a writer for Digital Dialogue, a practical blog on freelancing, technology, web development, marketing, content, and design. Write one original article in a neutral tone, for readers first. Keep it specific and useful. Do not write a generic summary or a personal essay.

BRIEF
TOPIC: [TOPIC]
PRIMARY KEYWORD: [PRIMARY KEYWORD]
SECONDARY KEYWORDS: [COMMA-SEPARATED KEYWORDS]
TARGET AUDIENCE: [e.g. beginner freelancers globally / MERN juniors / content creators]
SEARCH INTENT: [informational / comparison / how-to / transactional]
ANGLE (optional): [constraint—e.g. "method over rate chart", "no invented market rates"]
PREFERRED CATEGORY (optional): [Content Creation | Technology | Digital Marketing | Freelancing | Web Development | Design & Creativity]
WORD COUNT TARGET: [default 900–1500] (explicit plan may override with reason; stay useful; do not pad)
MUST INCLUDE: [optional: sources with access dates, illustrative maths labels, live internal links only]
MUST AVOID: [optional: soft-404 links, unbuilt tools, uncited rates, first person, tables]
AGREED SLUG (optional): [keep stable roadmap slug when provided; do not invent a new URL]
CONTENT PLAN (optional): [paste or path — plan rules win when they conflict with defaults below]

BEFORE WRITING (do this silently—do not show it)
1) Infer the real search intent behind the primary keyword.
2) List the top questions a serious reader would ask.
3) Choose a structure that answers those questions in a logical order.
4) Decide what the reader should be able to DO after reading.
5) Choose the best single category from the allowed list.
6) If rates, prices, or survey figures appear, separate cited benchmarks from illustrative calculations.

NEUTRAL TONE (required)
- Write in a neutral tone from the first sentence to the last. Calm, even, and impersonal.
- No first person. Do not use "I", "we", "my", or "our". Do not invent a narrator, personal story, or author portfolio of rates.
- No anecdotes, jokes, rhetorical asides, or attitude. Do not scold the reader.
- Do not use coaching asides ("skip this if…", "do this first", "you will thank yourself"). State the condition in plain language ("This applies when…", "This does not apply when…").
- Second person is fine for a real step ("Set the tag", "Open the URL"). Use plain description when a step is not needed.
- State what something does, when it applies, and what to do. Do not editorialize.
- Vary section openings so the piece is readable. Do not perform a personality, and do not copy the same template under every H2.
- Prefer concrete nouns and verbs over abstract marketing language.
- If a line is empty filler, cut it or replace it with a fact or a step.
- Never announce the tone, or that the article is "human-written" or "AI-free." Just write that way.
- Do not imply E-E-A-T theater.

ARTICLE REQUIREMENTS

Title & intro
- Write a clear, specific title that matches intent (not clickbait). Max ~60 characters when possible.
- Open with the answer or payoff quickly—no long preamble.
- State who the advice applies to, in plain language, when that limit matters.
- Calendar year in TITLE only when justified by the brief.

Structure
- Use Markdown with H2/H3 only — do not include an H1 (the site already shows TITLE).
- Each H2 should earn its place (a real question or decision).
- Use short paragraphs, bullets, and numbered steps when they improve clarity.
- Default: no Markdown tables in CONTENT (use lists). A brief may require a table for a true comparison.
- Do not put an FAQ section in CONTENT. Put 3–6 real reader questions in the required FAQS field as JSON (not recycled H2 summaries; not duplicated as a body FAQ block).

Substance
- Be specific: steps, checklists, tradeoffs, examples, edge cases.
- Prefer "how to decide" over "what is X" fluff when intent is practical.
- When mentioning tools/platforms, explain fit and limitations—don't sound like an ad. Link only live, useful URLs (or relative DD paths known live).
- Call out common mistakes and what to do instead.
- If something depends on context (budget, skill level, country, niche), say so.
- For money/rates: cite sources with access dates and survey limitations; label illustrative maths as hypothetical; never guarantee earnings; do not claim a tool exists if it is not built.

Word count
- DEFAULT: 900–1500 words in the CONTENT body (count after CONTENT: only).
- An explicit BRIEF/plan may override with a stated reason. Never pad with filler, synonym loops, or fake stories.

SEO (natural only)
- Use the PRIMARY KEYWORD in the TITLE and in the early intro when it reads naturally.
- Build KEYWORDS from PRIMARY + only those SECONDARY phrases the article covers; keep the full KEYWORDS string <= 256 characters.
- Primary: natural use in opening screen; again in an H2/H3 when it fits.
- Other KEYWORDS: one natural use preferred; drop unused phrases instead of forcing them.
- Use related entities a knowledgeable reader expects. No stuffing. No synonym spam.

Trust & accuracy
- Do not invent stats, studies, quotes, surveys, market rates, or "experts say."
- Do not fabricate personal anecdotes or author rate history.
- If data is uncertain, use careful wording ("typically," "often," "depends," "in that survey sample") instead of fake certainty.
- Do not make guarantees ("you will rank #1," "easy passive income," "beginners earn $X").
- Distinguish benchmarks (cited surveys/marketplaces) from illustrative quote calculations.
- Keep research failures, production notes, roadmap IDs, and tool build-status chatter OUT of published CONTENT and FAQS (put those in a separate verification or plan file). Source limitations still belong beside cited figures in the body.
- Do not open with awkward keyword narration such as "Searches for X, Y, and Z…" or similar bait lists. Introduce services and decisions in plain language; place KEYWORDS naturally inside real advice.

STYLE BAN LIST
Avoid: "in today's fast-paced world," "delve into," "comprehensive guide," "unlock your potential," "ever-evolving landscape," "robust solution," "seamless experience," "whether you're a beginner or an expert," "in conclusion," stacked "Moreover/Furthermore/Additionally," and other AI filler.
- Never use an em dash (—) in TITLE, SHORT DESCRIPTION, TAGS, KEYWORDS, or CONTENT. Prefer a comma, period, colon, parentheses, or a regular hyphen (-).

ENDING
- Close with a concrete takeaway or next step.
- Do not rehash the whole article.

METADATA RULES
- TITLE: clear, specific, matches search intent. Not clickbait. Max ~60 characters when possible.
- SLUG: use AGREED SLUG / roadmap slug when provided. Otherwise lowercase kebab-case; ASCII; preferably under ~60 characters. Do not change a live post's slug by default.
- SHORT DESCRIPTION: 140–160 characters exact. Plain text. Accurate for meta + cards. No markdown, no wrapping quotes, no "Read more." Count before shipping.
- TAGS: 1–5 short public hub labels (1–3 words), comma-separated. Match category niche; do not force Upwork/dev onto every post. Stable spelling. No duplicates.
- KEYWORDS: 4–8 targeted phrases preferred (still fine up to ~12 if short). Full string <= 256 characters. Editorial SEO list; not tag chips. Only phrases the article serves.
- CATEGORY: exactly one of: Content Creation | Technology | Digital Marketing | Freelancing | Web Development | Design & Creativity
- FAQS (required): 3–6 items as a valid JSON array only (no markdown fences). After KEYWORDS, before CONTENT.
  - `{ "question": "...", "answer": "..." }` — distinct from H2s; answers grounded in CONTENT.

OUTPUT FORMAT (follow exactly — no extra commentary before or after)
- Put each required field on its own line. Never combine two fields on the same line.
- Keep one blank line between each field, and a blank line before CONTENT.
- FAQS is required. Place it after KEYWORDS and before CONTENT, as a valid JSON array only (no markdown fences).

TITLE: [title]

SLUG: [kebab-case-slug]

CATEGORY: [one category]

SHORT DESCRIPTION: [140–160 character plain-text description]

TAGS: Freelancing, Writing, Pricing

KEYWORDS: freelance writing rates, freelance copywriter rates, writing rates

FAQS: [{"question":"...","answer":"..."}]

CONTENT:
[Full article in Markdown — intro + H2/H3 body, no H1, no FAQ section]
- Default 900–1500 words unless BRIEF overrides with reason.
- Lists over tables by default.

Do not mention AI, SEO, prompts, or these instructions anywhere in the output.
Do not publish to Contentful or request indexing unless the user explicitly approved that step.
```

---

## 3. Generate a blog cover image

Use when a post needs a `coverImage` for Contentful. Pick a style from the category pool below (do not force a code-editor look on every category).

**Default:** randomly choose LOOK MODE first (**BRIGHT** or **DARK**), then pick a style letter from the category pool.

**Override:** an explicit brief or content plan may lock LOOK MODE and/or style (for example BRIGHT + Freelancing E rate-card flat lay) when the topic needs a specific visual. Topic-relevant style beats a generic random cover when the plan says so.

### Prompt

```text
Generate one blog cover image for Digital Dialogue (digitaldialogue.pk).

BRIEF
TITLE: [POST TITLE]
SLUG: [kebab-case-slug]
CATEGORY: [Content Creation | Technology | Digital Marketing | Freelancing | Web Development | Design & Creativity]
SCENE FOCUS: [1 short line on what the image should communicate]
OUTPUT PATH: [e.g. articles/freelance-writing-rates.webp]
LOOK OVERRIDE (optional): [BRIGHT | DARK | random]
STYLE OVERRIDE (optional): [A-F name, or random]

STYLE SELECTION (required)
1) If LOOK OVERRIDE is set, use it. Otherwise randomly pick LOOK MODE with equal chance: BRIGHT or DARK.
2) Look at CATEGORY.
3) If STYLE OVERRIDE is set, use that letter. Otherwise from that category's STYLE POOL, randomly pick ONE style (A–F).
4) In your first output line before the image, write: STYLE PICKED: [Category] / [A|B|C|D|E|F] - [style name] / LOOK: [BRIGHT|DARK]
5) Generate using only that picked style + look mode. Do not blend styles. Do not blend look modes.
6) Apply the scene composition from the style, then re-light and re-color it to match LOOK MODE (see SHARED LOOK).
7) If regenerating the same post without a locked override, pick a different style letter and/or the other look mode when possible.

SHARED LOOK (all styles)
- Photorealistic or high-end editorial CGI. Sharp, cinematic, professional publication quality.
- Soft film grain OK. Shallow depth of field OK at edges only.
- Fill the frame with one strong composition. No collage of many tiny cards.
- No people, faces, or hands.
- No real brand logos (no YouTube, Google, Meta, Figma, Upwork, Fiverr wordmarks/icons). Use generic UI chrome only.
- No watermarks, no stock-photo cliches, no giant poster title of the article on top of the image.
- Small readable UI text inside a mock screen is OK only if generic. Do not invent fake stats, follower counts, or fake market-rate dollar/cent figures on rate sheets.

LOOK MODE: BRIGHT (colorful look)
- The image must read as colorful at a glance, not as a black/gray frame with a thin accent.
- Use at least 3 distinct hues beyond neutrals (teal/cyan, warm amber/gold, coral/soft red, soft violet, lime/mint, sky blue, paper cream, sage green).
- Brand accents: teal/cyan and warm amber should appear, but they are accents—not the whole palette.
- Prefer lit scenes: daylight, golden-hour window light, soft studio gels, or a bright UI theme.
- Backgrounds: soft color washes, warm wood, paper cream, frosted glass, or gently tinted surfaces—not flat black or charcoal voids.
- Screens/UI: prefer light or mid-tone interfaces. Dark UI only if the rest of the scene still carries strong color.
- Reject BRIGHT renders that end up mostly black/gray with only a thin teal rim light; regenerate brighter if needed.

LOOK MODE: DARK (classic cinematic look)
- Palette: charcoal, near-black, soft mist gray, teal/cyan accents. Warm amber highlight optional.
- Moody cinematic lighting, soft rim lights, subtle specular highlights.
- Backgrounds may be charcoal, near-black, or dark mist; keep the scene readable with teal/cyan (and optional amber) accents.
- Screens/UI: dark editors, dashboards, and browsers are preferred.
- Still keep one strong subject and clean composition.
- Do not force daylight wood desks or pastel props when LOOK is DARK; adapt the same style scene to the dark palette.

CATEGORY STYLE POOLS
(Scene recipes only. Lighting, background, and UI theme must follow the picked LOOK MODE.)

CONTENT CREATION (pick A, B, C, D, E, or F at random)
- A) Creator desk still life: camera or mic, open notebook or script pages, desk lamp accent; product-photo feel, not a gaming RGB desk.
- B) Video workspace: large monitor with a generic video timeline/player + simple sidebar (no logos); script or shot-list beside it.
- C) Publish board: wall or desk with printed thumbnail drafts, sticky notes for titles/hooks, one tablet showing a clean channel-style dashboard mock (generic).
- D) Editorial frame: one strong still from a generic article or video scene (object + lighting, no people), framed like a magazine cover photo with teal rim light.
- E) Podcast / voice kit: condenser mic, headphones, and a tablet showing a simple waveform or episode list UI.
- F) Thumbnail craft table: printed swatches, cut paper shapes, marker sketches for hooks, and a tablet with a generic cover-layout mock.

WEB DEVELOPMENT (pick A, B, C, D, E, or F at random)
- A) Split monitor: left code editor (generic), right browser preview of the topic UI; teal accents; faint grid on preview.
- B) Single ultrawide IDE close-up: readable code for the topic (HTML/CSS/JS); soft bokeh desk edge.
- C) Browser-first layout: full-bleed browser with a clean local app/page for the topic; subtle editor peek at the side.
- D) Stack diagram: isometric blocks for HTML / CSS / JS (or the topic stack), connected by thin teal lines, no logos.
- E) Component playground: floating UI cards (buttons, forms, nav) in a design-system layout with color tokens visible.
- F) Responsive trio: phone, tablet, and laptop showing the same topic UI; desk with a notebook and cable accents.

TECHNOLOGY (pick A, B, C, D, E, or F at random)
- A) Abstract tech object: layered glass panels, circuit-like light paths, teal glow; conceptual, not sci-fi chaos.
- B) Terminal + diagram: terminal window with simple commands next to a clean architecture/flowchart panel.
- C) Device still life: phone + laptop showing a related tech UI mock; top-down or 3/4 angle.
- D) Macro hardware: close-up of a generic chip, cable, or server rack edge with teal specular highlights; documentary product lighting.
- E) Cloud map: soft isometric nodes and data paths on a fog or mist ground; clean and readable, not neon cyberpunk chaos.
- F) Wearable / gadget tray: earbuds, smartwatch, and phone on a tray showing simple status UI.

FREELANCING (pick A, B, C, D, E, or F at random)
- A) Proposal desk: laptop with a clean proposal/doc UI, notebook with rate notes, coffee cup.
- B) Profile mock: browser showing a generic freelancer profile/dashboard (no marketplace logos), portfolio tiles visible.
- C) Client workflow board: kanban-style cards (Brief / Draft / Delivery) with a tablet calendar.
- D) Invoice still life: printed invoice or contract, calculator, pen, and a laptop showing a simple billing UI.
- E) Rate card flat lay: printed rate sheet, sticky "scope / extras / revisions" notes, pens, and a tablet with a simple pricing table UI (labels only; no fabricated market-rate numbers).
- F) Kickoff kit: branded folder (generic), project brief printout, sticky milestones, and a laptop with a kickoff checklist UI.

DIGITAL MARKETING (pick A, B, C, D, E, or F at random)
- A) Analytics wall: dashboard with charts and funnel blocks (no brand logos), teal highlights.
- B) Campaign desk: moodboard printouts, ad-creative drafts on tablet, sticky notes for audience/offer.
- C) Growth map: whiteboard or digital board with channel arrows (Search / Social / Email) and a laptop showing a landing page mock.
- D) Search intent board: oversized keyword cards and a SERP-style results mock (generic, no Google logo).
- E) Email / nurture desk: printed email wireframes, subject-line sticky notes, and a tablet showing a newsletter mock.
- F) Offer ladder: stacked product/offer cards (Lead magnet / Tripwire / Core offer) beside a laptop with a simple funnel UI.

DESIGN & CREATIVITY (pick A, B, C, D, E, or F at random)
- A) Design canvas: design-tool style artboard with color swatches, type samples, and a polished component mock (no Figma logo).
- B) Material desk: paper samples, printed palette chips, ruler, tablet with UI mock.
- C) Before/after frame: two side-by-side phone or browser frames showing weak vs refined layout for the topic.
- D) Type specimen: large letterforms and a small UI mock, teal accent on one glyph; editorial print feel.
- E) Brand system board: logo mark placeholders, color tokens, spacing grid, and icon set laid out like a style guide poster.
- F) Texture + UI mix: fabric/paper textures beside a tablet showing a refined interface.

HARD CONSTRAINTS
- Final file: WebP only.
- Final size: exactly 1200 x 630 pixels (1.91:1).
- Generate at a close landscape ratio (16:9 is fine), then center-crop and resize to 1200 x 630.
- Export quality: high, optimized WebP (typically 80-90 quality; prefer ~85).
- Filename: [SLUG].webp (unless OUTPUT PATH is provided).
- Match SCENE FOCUS to the picked style so the subject fits the category.
- Match LOOK MODE strictly: BRIGHT stays colorful; DARK stays charcoal/teal cinematic.
- Generate with an image model / GenerateImage path. Do not substitute a hand-drawn or code-rendered fake cover if generation is blocked; report the blocker instead.

AFTER GENERATING
1) Center-crop to 1.91:1 if needed.
2) Resize to 1200 x 630.
3) Save as WebP at OUTPUT PATH (or rewrites/[SLUG].webp).
4) Confirm in one short line: STYLE PICKED, LOOK, width, height, format. No extra commentary.
```

---

## Field mapping (Contentful / site)

| Prompt field | Use on site |
|---|---|
| `TITLE` | Post title |
| `SLUG` | Post slug (URL: `/blogs/{category-path}/{slug}`) |
| `CATEGORY` | Category entry |
| `SHORT DESCRIPTION` | Excerpt + meta description (aim 140–160 characters) |
| `TAGS` | Contentful `tags` field. Short hub labels (1–5). Drive `/tags/…` pages and chips under the post |
| `KEYWORDS` | Contentful `keywords` Symbol field (<= 256 characters). Targeted search phrases (meta / editorial SEO; not tag chips) |
| `FAQS` (required) | Post `faqs` JSON field (`[{ "question", "answer" }, ...]`) |
| `CONTENT` | Rich text / Markdown body |
| Cover image (WebP, 1200 x 630) | Post `coverImage` asset |

---

## Optional add-ons

Paste one of these under the prompt when needed:

**Stronger rewrite cut:**  
`Cut at least 15% of fluff without removing useful information.`

**More actionable new post:**  
`Include a practical checklist section the reader can follow the same day.`

**Comparison posts:**  
`If a true side-by-side comparison is required, use a compact Markdown table plus a "choose X if / choose Y if" list. Otherwise prefer lists.`

**Neutral tone check:**  
`Keep the tone neutral: no first person, no asides, no hype, no sarcasm. State the fact or the step.`

**Rates / money posts:**  
`Cite only opened sources with access dates and sample limits. Label illustrative quote maths as hypothetical. No earnings guarantees. No unbuilt calculator claims. Keep roadmap/tool-status/research-failure notes out of the article body and FAQs.`

**No keyword-bait openers:**  
`Do not start sections with "Searches for X, Y, and Z…" or similar keyword lists. Write the service distinction in plain language.`
