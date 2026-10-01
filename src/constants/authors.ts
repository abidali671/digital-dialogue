export type AuthorTestimonial = {
  quote: string;
  clientName: string;
  source: "Upwork" | "Fiverr";
  project?: string;
  rating?: number;
};

export type StaticAuthor = {
  slug: string;
  name: string;
  role: string;
  about: string;
  picture: string;
  pictureAlt: string;
  testimonials: AuthorTestimonial[];
};

export const AUTHORS: StaticAuthor[] = [
  {
    slug: "abid-ali",
    name: "Abid Ali",
    role: "Founder of Digital Dialogue",
    about:
      "Abid Ali is a full-stack web developer and freelancer based in Pakistan. He builds client projects with React, Next.js, and Node, and writes practical freelancing guides on platforms, profiles, proposals, pricing, and landing work without fluff.",
    picture: "/authors/abid-ali.jpg",
    pictureAlt: "Abid Ali",
    testimonials: [
      {
        quote:
          "Abid is a smart programmer who works well independently. He writes clean code, well organized and well documented code. Thanks!",
        clientName: "Valadimir",
        source: "Upwork",
        rating: 5,
      },
      {
        quote:
          "10/10 would recommend Abid for any company looking for a talented and professional freelancer. He understood all my needs and worked really well, with minimum - no guidance required. Amazing experience and end result!",
        clientName: "Adnan",
        source: "Upwork",
        rating: 5,
      },
      {
        quote: "excellent work and speed thank you so much",
        clientName: "James Smith",
        source: "Fiverr",
        rating: 5,
      },
      {
        quote:
          "He is a clever and hard worker. Very smart and find solutions for problems very fast. I faced problem with react and hired many freelancers, but he was the only one solve it. I really recommend him.",
        clientName: "Sam Tayyem",
        source: "Upwork",
        rating: 5,
      },
      {
        quote:
          "This was our first project together and it was relatively minor however this seller identified the issue and helped me to resolve it within the timeline we agreed. They also made some suggestions to improve function and prevent issues in the future. I recommend this seller.",
        clientName: "andrewstrealtor",
        source: "Fiverr",
        rating: 5,
      },
      {
        quote:
          "Abid Ali exceeded expectations with his attention to detail and delivered a bug-free application. His proactive communication and high level of cooperation made working with him a seamless experience. He migrated our entire application faster than expected and handled revisions effectively—10/10 would use his services again!",
        clientName: "oskarfranttigl",
        source: "Fiverr",
        rating: 5,
      },
      {
        quote:
          "Abid Ali truly impressed me with his exceptional attention to detail, code expertise, and overall professionalism. He was not only polite but also incredibly timely, going above and beyond to ensure everything was perfect. Highly recommended for any software development needs!",
        clientName: "joshsmith",
        source: "Fiverr",
        rating: 5,
      },
    ],
  },
];

export const AUTHORS_BY_SLUG: Record<string, StaticAuthor> = Object.fromEntries(
  AUTHORS.map((author) => [author.slug, author]),
);

export function getAuthorBySlug(slug: string): StaticAuthor | undefined {
  return AUTHORS_BY_SLUG[slug];
}

/** Default site author used on posts (Contentful no longer stores authors). */
export function getSiteAuthor(): StaticAuthor {
  return AUTHORS[0];
}
