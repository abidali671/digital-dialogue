import Link from "next/link";
import ContentContainer from "../ContentContainer";
import Title from "../Title";

/**
 * Homepage prose. Card grids alone leave the document mostly markup,
 * which is what a low text-to-HTML ratio measures.
 */
const HomeGuide = () => {
  return (
    <section className="border-b border-line bg-white">
      <ContentContainer className="py-14 md:py-16">
        <div className="article-wrapper">
          <Title as="h2">What Digital Dialogue publishes</Title>
          <p>
            Digital Dialogue is a practical publication about freelancing,
            technology, and the craft of building things that ship. The
            homepage is a front door, not the whole library. Use it to pick a
            topic, then open a guide when you need a decision, a checklist, or
            a clearer explanation than the usual listicle.
          </p>
          <p>
            The writing is aimed at people who do the work themselves:
            freelancers finding the next client, developers learning the web
            stack, marketers who have to explain a number, and designers who
            want a reason for a choice instead of a trend. Posts stay specific.
            If a piece cannot help you start, compare, or fix something, it
            does not belong on the site.
          </p>
          <p>
            Abid Ali runs the publication from Pakistan and edits it for that
            reader. You can read the background on the{" "}
            <Link href="/about">about page</Link>, see who writes on the{" "}
            <Link href="/authors">authors page</Link>, or send a note through{" "}
            <Link href="/contact-us">contact</Link>.
          </p>

          <h2>How to use the homepage</h2>
          <p>
            The featured story at the top is the piece most worth opening
            first. Editor&apos;s picks underneath are a short, numbered list of
            guides that are useful even if you are new to the archive. Category
            links group the library by the kind of work you are doing, and the
            latest articles are the newest posts in full, with a short excerpt
            so you can skip anything that is not your problem today.
          </p>
          <p>
            Further down, featured posts are a stable set of explainers that
            keep showing up because new readers ask for them. Popular tags are
            narrower than categories: Upwork, accessibility, web design, and
            similar labels that cut across a single series. The newsletter is
            one email when a new post is published, not a daily digest.
          </p>
          <p>
            If you already know the subject, skip the homepage and open the{" "}
            <Link href="/blogs">full article index</Link>. Search there when
            you have a phrase in mind. Category pages are better when you want
            everything we have written on one line of work.
          </p>

          <h2>Freelancing</h2>
          <p>
            The{" "}
            <Link href="/blogs/freelancing">freelancing guides</Link> cover
            the platforms and the day-to-day of working for clients. That
            includes how a marketplace actually works, what a beginner should
            set up before sending a proposal, and how to talk about skills
            without stuffing a profile with vague claims.
          </p>
          <p>
            A useful freelance article here names the step you are on. Starting
            out is a different problem from raising a rate, and both are
            different from choosing between two platforms. The posts try to
            keep those apart. You should finish one knowing what to do this
            week: which profile field to rewrite, which sample to show, or
            which offer to decline.
          </p>
          <p>
            Pakistan-based readers will see that context when it changes the
            advice, especially around payment, platform choice, and working
            from home. The same pieces are still written so someone elsewhere
            can follow the steps. The point is the work, not a local shortcut
            that only applies once.
          </p>

          <h2>Web development</h2>
          <p>
            <Link href="/blogs/web-development">Web development</Link> on this
            site means the skills you use to ship an interface: HTML, CSS,
            JavaScript, and the habits that keep a page understandable. Layout
            questions such as margin versus padding sit next to larger topics
            like how a React or Next.js project is structured, because both
            show up in real freelance and product work.
          </p>
          <p>
            These guides assume you want to build something, not collect
            definitions. A concept gets a plain explanation, then a concrete
            case: what changes on the page, what breaks if you skip it, and
            what to check before you call it done. Code is there when it
            teaches the idea. It is not there to look complete.
          </p>
          <p>
            If you are early in frontend work, start with the layout and
            language pieces before the framework pieces. If you already ship
            production apps, use the same section for the gaps that still slow
            a project down: unclear structure, weak defaults, and pages that
            are heavier than the content they carry.
          </p>

          <h2>Technology</h2>
          <p>
            The{" "}
            <Link href="/blogs/technology">technology section</Link> is for
            tools and systems that are easy to hype and hard to explain.
            Blockchain and similar topics show up here when there is a
            mechanism worth understanding, not when there is a slogan to
            repeat. The standard is the same as the rest of the site: say what
            the thing does, who it is for, and what it does not do.
          </p>
          <p>
            That last part matters. A lot of technical writing online stops at
            the promise. These posts keep the limit in view so you can decide
            whether to spend time on a tool or leave it. If a technology needs
            a glossary before the point, the glossary stays short and the point
            comes first.
          </p>

          <h2>Marketing and content</h2>
          <p>
            <Link href="/blogs/digital-marketing">Digital marketing</Link>{" "}
            posts are about traffic, agencies, and measurement you can act on.
            Hire-or-not decisions, what a metric is actually counting, and how
            to tell a useful channel from a busy one. The aim is a clearer
            brief, not a promise that a tactic prints money.
          </p>
          <p>
            <Link href="/blogs/content-creation">Content creation</Link> covers
            the work of publishing: YouTube and other audience tools, what a
            feature includes, and how to compare plans without turning one
            product into eight near-copies. When two guides would answer the
            same question, they should be one guide. Use these pieces to
            understand a product or a workflow, then go make the thing.
          </p>
          <p>
            Read marketing and content posts the way you would read a freelance
            brief. What is the decision, what evidence is in the article, and
            what would you do differently if that evidence changed? If the post
            cannot support that, it is not finished.
          </p>

          <h2>Design</h2>
          <p>
            <Link href="/blogs/design-and-creativity">Design and creativity</Link>{" "}
            is visual work with a job to do: hierarchy, color, branding, and
            the reason a screen is easier or harder to use. Design thinking
            shows up as a sequence you can apply to a real project, not as a
            poster of principles.
          </p>
          <p>
            Freelancers and developers land here when the interface is the
            deliverable. A spacing choice, a type scale, or a weak empty state
            is often the difference between work a client can use and work they
            have to interpret. The articles name that difference in ordinary
            language and point at what to change first.
          </p>

          <h2>What these guides leave out</h2>
          <p>
            You will not find income screenshots, recycled definitions, or a
            stack of posts that rephrase one product page. A pricing article
            should tell you what the plan includes and who it fits. A freelance
            article should tell you what to change on a profile or in a
            proposal. A development article should tell you what happens on the
            page when you change the markup or the style. If that outcome is
            missing, the draft is not ready to publish.
          </p>
          <p>
            The same rule cuts overlap. Eight articles that answer one YouTube
            question, or a row of posts that all say “earn online” without a
            concrete step, make the library harder to use. When two drafts
            cover the same decision, they get merged or one of them is dropped.
            The category page should read like a set of different jobs, not
            like the same job with the title rearranged.
          </p>
          <p>
            Comments, star ratings, and inflated author bios are not standing
            in for that standard. The byline on the site is a real person, the
            contact page reaches that person, and the privacy policy and
            disclaimer say what the publication does with a visit and how far
            the articles go. Read those when you want the boundary. Read a
            guide when you want the next step.
          </p>
          <p>
            Tags are a shortcut, not a second homepage. A tag such as Upwork,
            accessibility, or web design collects posts that share one label.
            Open a tag when you already know the word. Open a category when you
            know the kind of work and want the wider shelf. Either way, the
            excerpt is there so you can reject a post before you spend the
            time to read it.
          </p>

          <h2>A sensible order of reading</h2>
          <p>
            If you are choosing a freelance platform, start with the
            freelancing category and read one comparison before you open a
            profile. If you are stuck on a page layout, start with web
            development and settle the spacing or structure question before you
            restyle the whole screen. If you are judging a tool, a plan, or an
            agency, read the piece that states the limit of that choice, not
            only the list of features.
          </p>
          <p>
            One guide is enough for one sitting. The cards on this page are a
            map. The article is the work. Opening every related tag at once
            usually means the original question was too broad. Narrow it to the
            decision you have to make this week, then use the excerpt to see
            whether that post actually answers it.
          </p>
          <p>
            Older posts stay in the index because the underlying skill often
            has not changed. Check the date when the subject is a price, a
            product plan, or a platform rule. Those move. An explanation of
            margin and padding, or of how a proposal is structured, moves much
            less. The excerpt and the headings tell you which kind of piece
            you are in.
          </p>

          <h2>What a finished guide looks like</h2>
          <p>
            A typical article opens with the question it answers, then the
            steps or the comparison, then the limits. Headings match the
            questions a reader would ask out loud. Internal links point at the
            next piece that continues the same job, not at every related tag
            on the site.
          </p>
          <p>
            Dates on the cards are publication context, so you can tell whether
            a platform walkthrough is current enough for the decision you are
            making. Excerpts are the argument in a sentence or two. If the
            excerpt does not tell you the subject, open a different post. The
            archive is large enough that you should not have to guess.
          </p>
          <p>
            Start with one category that matches the work in front of you, read
            one guide all the way through, and use the steps before you open
            five more tabs. That is the pace this site is written for.
          </p>
        </div>
      </ContentContainer>
    </section>
  );
};

export default HomeGuide;
