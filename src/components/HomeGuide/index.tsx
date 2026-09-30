import Link from "next/link";
import ContentContainer from "../ContentContainer";
import Title from "../Title";

/**
 * Homepage prose. Card grids alone leave the document mostly markup,
 * which is what a low text-to-HTML ratio measures.
 */
const HomeGuide = () => {
  return (
    <section className="border-b border-line bg-mist">
      <ContentContainer className="py-14 md:py-16">
        <div className="article-wrapper">
          <Title as="h2">What Digital Dialogue publishes</Title>
          <p>
            Digital Dialogue is a practical publication about freelancing:
            platforms, profiles, proposals, fees, and the day-to-day of landing
            and delivering client work. The homepage is a front door, not the
            whole library. Use it to pick a guide when you need a decision, a
            checklist, or a clearer explanation than the usual listicle.
          </p>
          <p>
            The writing is aimed at people who do the work themselves—
            freelancers finding the next client, beginners setting up an Upwork
            account, and web developers who sell services online. Posts stay
            specific. If a piece cannot help you start, compare, or fix
            something, it does not belong on the site.
          </p>
          <p>
            Abid Ali runs the publication from Pakistan and edits it for that
            reader. You can read the background on the{" "}
            <Link href="/about">about page</Link>, or send a note through{" "}
            <Link href="/contact-us">contact</Link>.
          </p>

          <h2>How to use the homepage</h2>
          <p>
            The featured story at the top is the piece most worth opening
            first. Editor&apos;s picks underneath are a short, numbered list of
            guides that are useful even if you are new to the archive. The
            latest articles are the newest posts in full, with a short excerpt
            so you can skip anything that is not your problem today.
          </p>
          <p>
            Further down, featured posts are a stable set of explainers that
            keep showing up because new readers ask for them. Popular tags are
            narrower than the category: Upwork, Fiverr, proposals, Connects,
            and similar labels. The newsletter is one email when a new post is
            published, not a daily digest.
          </p>
          <p>
            If you already know the subject, skip the homepage and open the{" "}
            <Link href="/blogs">full article index</Link> or the{" "}
            <Link href="/blogs/freelancing">freelancing category</Link>. Search
            when you have a phrase in mind.
          </p>

          <h2>What the freelancing guides cover</h2>
          <p>
            The{" "}
            <Link href="/blogs/freelancing">freelancing guides</Link> cover how
            a marketplace actually works, what a beginner should set up before
            sending a proposal, how to write a profile clients open, and how to
            price and close work without wasting Connects.
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
            advice, especially around payment and platform choice. The same
            pieces are still written so someone elsewhere can follow the steps.
            The point is the work, not a local shortcut that only applies once.
          </p>

          <h2>Upwork, Fiverr, and other platforms</h2>
          <p>
            Platform guides explain the mechanics: accounts, Connects or bids,
            proposals or gigs, contracts, milestones, and payouts. They are not
            “get rich” posts. They are maps of how the marketplace works so you
            can decide whether it fits the service you sell.
          </p>
          <p>
            Comparison pieces help you pick one primary channel before you
            spray the same vague pitch across three sites. One clear offer on
            one platform beats five half-finished profiles.
          </p>

          <h2>Profiles, proposals, and first jobs</h2>
          <p>
            Profile and proposal guides focus on what clients actually read:
            title, overview, portfolio proof, rate, and a pitch that answers the
            brief. First-job guides cover targeting, interviews, contracts, and
            delivery—the path from Connects spent to a signed contract.
          </p>
          <p>
            Fee and Connects articles put money in plain numbers: what you keep
            after platform fees, and when a listing is worth applying to. Use
            those when you are pricing a website gig or deciding whether to
            spend Connects on a vague post.
          </p>

          <h2>What these guides leave out</h2>
          <p>
            You will not find income screenshots, recycled definitions, or a
            stack of posts that all say “earn online” without a concrete step.
            A freelance article should tell you what to change on a profile or
            in a proposal. If that outcome is missing, the draft is not ready
            to publish.
          </p>
          <p>
            The same rule cuts overlap. When two drafts cover the same
            decision, they get merged or one of them is dropped. The category
            should read like a set of different jobs, not the same job with the
            title rearranged.
          </p>
          <p>
            The byline on the site is a real person, the contact page reaches
            that person, and the privacy policy and disclaimer say what the
            publication does with a visit and how far the articles go. Read
            those when you want the boundary. Read a guide when you want the
            next step.
          </p>

          <h2>A sensible order of reading</h2>
          <p>
            If you are choosing a freelance platform, start with one comparison
            before you open a profile. If you already chose Upwork, read the
            beginner setup guide, then the profile guide, then the proposal
            guide. One guide is enough for one sitting.
          </p>
          <p>
            Older posts stay in the index because the underlying skill often
            has not changed. Check the date when the subject is a fee, a
            Connects price, or a platform rule. Those move. An explanation of
            how a proposal is structured moves much less.
          </p>
          <p>
            Start with one guide that matches the decision in front of you,
            read it all the way through, and use the steps before you open five
            more tabs. That is the pace this site is written for.
          </p>
        </div>
      </ContentContainer>
    </section>
  );
};

export default HomeGuide;
