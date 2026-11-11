import Link from "next/link";
import { IPostData } from "@/types";

interface Props {
  posts: IPostData[];
}

const HomeStartHere = ({ posts }: Props) => {
  if (!posts.length) return null;

  return (
    <section
      aria-labelledby="sh-h"
      className="border-t border-line bg-white"
    >
      <div className="home-inner py-12 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-14">
          <div>
            <p className="home-eyebrow">Read first</p>
            <h2 id="sh-h" className="home-h2">
              Start here
            </h2>
            <p className="home-body mt-2 max-w-[62ch] text-[16px] leading-relaxed">
              Three guides that cover the basics of getting started on Upwork.
            </p>
          </div>
          <ol className="m-0 list-none divide-y divide-line border-y border-line self-start">
            {posts.map((post, index) => (
              <li key={post.fields.slug} className="m-0 list-none">
                <Link
                  href={`/blogs/${post.fields.category.fields.slug}/${post.fields.slug}`}
                  className="group flex min-h-14 items-center gap-4 py-3 pr-1 text-[16px] font-semibold text-ink hover:text-[#115e59]"
                >
                  <span
                    aria-hidden="true"
                    className="w-7 flex-none text-[14px] font-bold tabular-nums text-[#0f766e]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 underline-offset-4 group-hover:underline">
                    {post.fields.title}
                  </span>
                  <span aria-hidden="true" className="flex-none text-[#0f766e]">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default HomeStartHere;
