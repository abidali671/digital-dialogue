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
            Digital Dialogue is a practical site about freelancing. It covers
            platforms, profiles, proposals, fees, and the daily work of finding
            and delivering client jobs. The homepage is a front door, not the
            full library. Use it when you need a choice, a checklist, or a clear
            answer.
          </p>
          <p>
            The writing is for people who do the work themselves: freelancers
            looking for the next client, beginners setting up an Upwork account,
            and web developers who sell services online. Posts stay specific. If
            a piece does not help you start, compare, or fix something, it does
            not belong on the site.
          </p>
          <p>
            Abid Ali runs the site from Pakistan and edits it for that reader.
            You can read the
            <Link href="/about">about page</Link> for the background, or send a
            note through <Link href="/contact-us">contact</Link>.
          </p>

          <h2>How to use the homepage</h2>
          <p>
            The featured story at the top is the piece to open first. Editor's
            picks below it are a short, numbered set of guides that still help
            even if you are new to the archive. The latest articles are the
            newest full posts, with a short excerpt so you can skip anything
            that is not your problem today.
          </p>
          <p>
            Further down, featured posts are a stable set of explainers that
            keep appearing because new readers ask for them. Popular tags are
            narrower than the category: Upwork, Fiverr, proposals, Connects, and
            similar labels. The newsletter sends one email when a new post is
            published. It is not a daily digest.
          </p>
          <p>
            If you already know the subject, skip the homepage and open the{" "}
            <Link href="/blogs">full article index</Link> or the{" "}
            <Link href="/blogs/freelancing">freelancing category</Link>. Search
            when you have a phrase in mind.
          </p>

          <h2>What the freelancing guides cover</h2>
          <p>
            The <Link href="/blogs/freelancing">freelancing guides</Link>{" "}
            explain how a marketplace actually works, what a beginner should set
            up before sending a proposal, how to write a profile clients open,
            and how to price and close work without wasting Connects.
          </p>
          <p>
            A useful freelance article names the step you are on. Starting out
            is a different problem from raising a rate. Both are different from
            choosing between two platforms. The posts try to keep those apart.
            You should finish one guide knowing what to do this week: which
            profile field to rewrite, which sample to show, or which offer to
            decline.
          </p>
          <p>
            Pakistan-based readers will see that context when it changes the
            advice, especially around payment and platform choice. Someone
            elsewhere can still follow the steps by writing the same pieces. The
            point is the work, not a local shortcut that only works once.
          </p>

          <h2>Upwork, Fiverr, and other platforms</h2>
          <p>
            Profile and proposal guides highlight key elements clients read:
            title, overview, portfolio, rate, and a pitch. First-job guides
            cover targeting, interviews, contracts, and delivery — the path from
            Connects spent to a signed contract.
          </p>
          <p>
            Comparison pieces help you pick one main channel before you spray
            the same vague pitch across three sites. One clear offer on one
            platform beats five half-finished profiles.
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
            stack of posts that all say “earn online” without a concrete step. A
            freelance article should tell you what to change on a profile or in
            a proposal. If that outcome is missing, the draft is not ready to
            publish.
          </p>
          <p>
            The same rule cuts overlap. When two drafts cover the same choice,
            they get merged or one of them is dropped. The category should read
            like a set of different jobs, not the same job with the title
            changed.
          </p>
          <p>
            The byline on the site is a real person. The contact page reaches
            that person. The privacy policy and disclaimer explain what the site
            does with a visit and how far the articles go. Read those when you
            want the limit. Read a guide when you want the next step.
          </p>

          <h2>A sensible order of reading</h2>
          <p>
            If you are choosing a freelance platform, start with one comparison
            before you open a profile. If you already chose Upwork, read the
            beginner setup guide, then the profile guide, then the proposal
            guide. One guide is enough for one sitting.
          </p>
          <p>
            Older posts stay in the index because the main skill often has not
            changed. Check the date when the topic is a fee, a Connects price,
            or a platform rule. Those change. An explanation of how a proposal
            is built changes much less.
          </p>
          <p>
            Start with one guide that matches the decision in front of you. Read
            it all the way through. Use the steps before you open five more
            tabs. This site is written for that pace.
          </p>
        </div>
      </ContentContainer>
    </section>
  );
};

export default HomeGuide;
