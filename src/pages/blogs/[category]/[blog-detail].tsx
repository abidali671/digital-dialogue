import { ContentContainer } from "@/components";
import {
  Facebook,
  Twitter,
  Pinterest,
  LinkIcon,
  Like,
  Comment,
} from "@/assest/icon";
import Link from "next/link";
import React from "react";

const BlogDetail = () => {
  return (
    <React.Fragment>
      <div className="h-[40vh] sm:h-[70vh] w-full bg-neutral-300 relative"></div>
      <ContentContainer>
        {/* Card start*/}
        <div className="p-5 gap-3 flex w-full sm:w-11/12 md:w-8/12 flex-col text-left items-start border border-gray-200 shadow-gray-200 shadow-sm border-t-0 bg-white relative bottom-32  mx-auto ">
          <span className="flex items-center gap-1">
            <hr className="w-10 h-[2px] border-0 rounded bg-orange-700" />
            <p>Travel</p>
          </span>
          <h1 className="md:text-[52px] text-[42px] font-bold tracking-tight text-gray-900 leading-[48px] font-PT">
            20 essential skills for successful web designers
          </h1>
          <div className="flex justify-between w-full flex-wrap gap-y-3">
            <div className="flex items-center gap-5 pt-3">
              <div className="flex gap-2 items-center">
                <span className="h-7 w-7 bg-gray-200 rounded-xl" />
                <p className="font-medium">Kadin Dias</p>
              </div>
              <span className="flex h-[5px] w-[5px] bg-gray-500 rounded-lg"></span>
              <p className="text-gray-500 flex items-center gap-2 text-[12px] lg:text-[16px]">
                March 25, 2021
              </p>
              <span className="h-[5px] w-[5px] bg-gray-500 rounded-lg"></span>
              <p className="text-gray-500  flex items-center gap-2 text-[12px] lg:text-[16px]">
                4 min read
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex h-10 w-10 rounded-full justify-center items-center bg-gray-100">
                <Facebook className="fill-black" />
              </div>
              <div className="flex h-10 w-10 rounded-full justify-center items-center bg-gray-100">
                <Twitter />
              </div>
              <div className="flex h-10 w-10 rounded-full justify-center items-center bg-gray-100">
                <Pinterest />
              </div>
              <div className="flex h-10 w-10 rounded-full justify-center items-center bg-gray-100">
                <LinkIcon />
              </div>
            </div>
          </div>
        </div>
        {/* Card end*/}
        <main
          // className="grid h-[100%] mx-auto lg:grid-cols-[200px_1fr] gap-y-6  grid-cols-[1fr] w-11/12  md:w-8/12"
          className="mx-auto  w-11/12  md:w-8/12"
        >
          {/* Aside column start*/}
          {/* <aside className="h-20 gap-8 grid py-2">
            <div className="flex gap-3">
              <Like stroke="#FB743E" />
              <p className="font-medium">24 Likes</p>
            </div>
            <div className="flex gap-3">
              <Comment />

              <p className="font-medium">195 Comments</p>
            </div>
          </aside> */}
          {/* Aside column end*/}
          <article className=" ">
            <div className="flex flex-col gap-3">
              <h1 className=" text-[40px] font-bold  text-gray-800 leading-[48px] font-PT">
                20 web designer skills to have
              </h1>
              <p className="blog-post-p ">
                Here's a medley of 20 skills to help you become a design expert,
                no matter where you're at in your career.
              </p>
              <p className="text-xl pl-4 py-2 border-l-4   border-[#FB743E]">
                <span className="blog-post-p">
                  Being a web designer involves harmoniously combining visuals
                  and content. But non-technical skills, like collaboration and
                  communication, are also important.
                </span>
              </p>
            </div>
            <div className="py-5 flex flex-col gap-3">
              <h2 className="blog-post-h2">1. Know the principles of design</h2>
              <div className="bg-neutral-300 w-full h-30 sm:h-80"></div>
              <p className="blog-post-p">
                You don’t need to know music theory to write a song, and if
                you’ve never taken an art class, you can still draw. Some of us
                might have an innate artistic ability, but knowing the basic
                fundamentals can make the difference between recreating what you
                see and being able to build a design that’s calculated and
                unique.
              </p>
              <p className="blog-post-p">
                <span className="blog-post-link ">
                  <Link href="">“Essential visual design principles”</Link>{" "}
                </span>{" "}
                does a deeper dive into the principles of visual design rooted
                in Gestalt psychology. These fundamentals are the foundation of
                web and graphic design and important to know. Whether you’re
                designing a portfolio or a print ad, these concepts can help
                guide your work. Let’s do a quick recap.
              </p>
              {/* sub heading  */}
              <div className="flex flex-col gap-2 py-2">
                <h5 className="blog-post-h5">Emergence</h5>
                <p className=" blog-post-p">
                  Rather than focusing on individual parts, we tend to process
                  visual stimuli as a whole. Emergence is seeing an arrangement
                  of visuals and immediately understanding what they represent.
                  When something breaks a pattern, we become aware of the pieces
                  that make it up.
                </p>
              </div>
              {/* sub heading end*/}
              {/* sub heading  */}
              <div className="flex flex-col gap-2 py-2">
                <h5 className="blog-post-h5">Reification</h5>
                <p className=" blog-post-p">
                  Reification is using only the essential parts of an object to
                  make it identifiable. It lets you exercise restraint in a
                  design, while still conveying meaning.{" "}
                </p>
              </div>
              {/* sub heading end*/}
              {/* sub heading  */}
              <div className="flex flex-col gap-2 py-2">
                <h5 className="blog-post-h5">Invariance</h5>
                <p className=" blog-post-p">
                  Invariance is being able to use tasteful discordance in your
                  designs, making something stand out from a group of similar
                  objects. The use of invariance allows you to highlight parts
                  of a design.
                </p>
              </div>
              {/* sub heading end*/}
            </div>

            <div className="py-5 flex flex-col gap-3">
              <h2 className="blog-post-h2">2. Typography</h2>
              <div className="bg-neutral-300 w-full h-80"></div>
              <p className="blog-post-p">
                Typography shapes our perception of ideas. A type’s weight and
                geometry communicates meaning, and as a designer, it’s important
                to know the best way to deliver messaging with the appropriate
                typographical choices.
              </p>
              <p className="blog-post-p">
                All the font options can make it hard for new designers to know
                what to choose. Practical fonts like Georgia, Verdana, and
                Roboto work well for body copy, while more decorative typefaces
                should be used sparingly as ornamentation. Good designers know
                the difference between type styles and where to use them.
              </p>
              <p className="blog-post-p">
                There are plenty of resources on the web to help broaden your
                typographic knowledge.{" "}
                <span className="blog-post-link underline">FONTS IN USE</span>{" "}
                shows different typefaces applied to a variety of media. Tools
                like{" "}
                <span className="blog-post-link underline">
                  Font combinations for web designers
                </span>{" "}
                can give you ideas for possible pairings.
              </p>
            </div>

            <div className="py-10">
              <hr />
              <div className="flex gap-3 flex-wrap  items-center sm:justify-normal justify-center py-10">
                <button className="bg-orange-500 w-56 p-2 font-medium text-white flex gap-3 items-center justify-center">
                  <Like />
                  Like
                </button>
                <div className="flex  items-center gap-3">
                  <p>Share the post:</p>
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 rounded-full justify-center items-center bg-gray-100">
                      <Facebook className="fill-black" />
                    </div>
                    <div className="flex h-10 w-10 rounded-full justify-center items-center bg-gray-100">
                      <Twitter />
                    </div>
                    <div className="flex h-10 w-10 rounded-full justify-center items-center bg-gray-100">
                      <Pinterest />
                    </div>
                    <div className="flex h-10 w-10 rounded-full justify-center items-center bg-gray-100">
                      <LinkIcon />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </article>
        </main>
      </ContentContainer>
    </React.Fragment>
  );
};

export default BlogDetail;
