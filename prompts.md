# Content prompts

Prompts for rewriting existing posts and drafting new articles for Digital Dialogue  
(freelancing, technology, design, and shipping real work).

**How to use:** copy one prompt block, fill the bracketed fields, paste into your model.

**Expected output (both prompts):** every response must include title, category, short description, keywords, and full blog content — ready to paste into Contentful / the blog detail page.

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

METADATA RULES
- TITLE: clear, specific, matches search intent. Not clickbait. Max ~60 characters when possible.
- CATEGORY: pick exactly one from: Content Creation | Technology | Digital Marketing | Freelancing
  (If none fit perfectly, choose the closest. Do not invent a new category name.)
- SHORT DESCRIPTION: 140–160 characters. Plain text. One or two sentences. Summarizes the article for meta description + blog cards. No quotes, no markdown, no “learn more.”
- KEYWORDS: 5–12 relevant keywords/phrases, comma-separated. Include the main topic naturally. No stuffing, no duplicates.

OUTPUT FORMAT (follow exactly — no extra commentary before or after)
TITLE: [title]
CATEGORY: [one category]
SHORT DESCRIPTION: [140–160 character plain-text description]
KEYWORDS: [keyword1, keyword2, keyword3, ...]

CONTENT:
[Full rewritten article in Markdown]
- Start with a single H1 that matches TITLE (or is a natural variant).
- Then H2/H3 body.
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
You are a senior writer for Digital Dialogue—a practical blog on freelancing, technology, and building things that ship. Write one original article for humans first, search engines second.

BRIEF
TOPIC: [TOPIC]
PRIMARY KEYWORD: [PRIMARY KEYWORD]
SECONDARY KEYWORDS: [COMMA-SEPARATED KEYWORDS]
TARGET AUDIENCE: [e.g. beginner freelancers / MERN juniors / content creators]
SEARCH INTENT: [informational / comparison / how-to / transactional]
ANGLE (optional): [what unique point of view or constraint—e.g. “for Pakistan freelancers”, “no-code vs custom”, “beginner mistakes”]
PREFERRED CATEGORY (optional): [Content Creation | Technology | Digital Marketing | Freelancing]
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
- Use Markdown with one H1 (matching the title), then H2/H3.
- Each H2 should earn its place (a real question or decision).
- Use short paragraphs, bullets, and numbered steps when they improve clarity.
- Include a short FAQ (3–6 questions) only if it adds new value—not recycled section summaries.

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

ENDING
- Close with a concrete takeaway or next step.
- Do not rehash the whole article.

METADATA RULES
- SHORT DESCRIPTION: 140–160 characters. Plain text. Compelling enough for blog cards and accurate enough for meta description. Must reflect the article. No markdown, no quotes around the whole string, no “Read more.”
- KEYWORDS: 5–12 phrases, comma-separated. Start from the primary/secondary keywords, then add only natural related terms.
- CATEGORY: exactly one of: Content Creation | Technology | Digital Marketing | Freelancing
  (Use PREFERRED CATEGORY if provided and valid; otherwise pick the best fit.)

OUTPUT FORMAT (follow exactly — no extra commentary before or after)
TITLE: [title]
CATEGORY: [one category]
SHORT DESCRIPTION: [140–160 character plain-text description]
KEYWORDS: [keyword1, keyword2, keyword3, ...]

CONTENT:
[Full article in Markdown with H1 + body]

Do not mention AI, SEO, prompts, or these instructions anywhere in the output.
```

---

## Field mapping (Contentful / site)

| Prompt field | Use on site |
|---|---|
| `TITLE` | Post title |
| `CATEGORY` | Category entry |
| `SHORT DESCRIPTION` | Excerpt + meta description |
| `KEYWORDS` | Keywords field |
| `CONTENT` | Rich text / Markdown body |

---

## Optional add-ons

Paste one of these under the prompt when needed:

**Stronger rewrite cut:**  
`Cut at least 15% of fluff without removing useful information.`

**More actionable new post:**  
`Include a practical checklist section the reader can follow the same day.`

**Comparison posts:**  
`Use a clear comparison table (Markdown) plus a “choose X if / choose Y if” section.`
