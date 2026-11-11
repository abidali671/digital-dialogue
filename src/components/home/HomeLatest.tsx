import Link from "next/link";
import { IPostData } from "@/types";
import { HomePostCard } from "@/components/home/HomePostCard";

interface Props {
  posts: IPostData[];
}

const HomeLatest = ({ posts }: Props) => {
  if (!posts.length) return null;

  return (
    <section aria-labelledby="latest-h" className="border-t border-line bg-mist">
      <div className="home-inner py-14 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="home-eyebrow">New this week</p>
            <h2 id="latest-h" className="home-h2">
              Latest articles
            </h2>
          </div>
          <Link href="/blogs" className="home-btn-secondary">
            View all guides
          </Link>
        </div>
        <ul className="mt-8 m-0 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.fields.slug} className="m-0 h-full list-none">
              <HomePostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomeLatest;
