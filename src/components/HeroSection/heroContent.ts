export interface slideContentPropsT {
  title: string;
  description: string;
  tag: string;
  id: string;
  date: string;
}

export const slideContent: slideContentPropsT[] = [
  {
    tag: "Interior",
    id: "1",
    title: " How to Get Started With Interior Design",
    description:
      "Nulla et commodo turpis. Etiam hendrerit ornare pharetra. Cras eleifend purus vitae lorem venenatis bibendum. Sed commodo mi quis augue finibus, ut feugiat erat aliquam.",
    date: `${new Date().toLocaleString("default", {
      month: "long",
    })} ${new Date().getDate()},${new Date().getFullYear()}`,
  },
  {
    tag: "Interior",
    id: "2",
    title: "How to Get Started With outer Design",
    description: "This is the first slide content.",
    date: `${new Date().toLocaleString("default", {
      month: "long",
    })} ${new Date().getDate()}, ${new Date().getFullYear()}`,
  },
  {
    tag: "Interior",
    id: "3",
    title: "Get Started With Digital Dialogue Design",
    description: "This is the first slide content.",
    date: `${new Date().toLocaleString("default", {
      month: "long",
    })}/${new Date().getDate()}/${new Date().getFullYear()}`,
  },
];
