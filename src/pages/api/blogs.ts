import { NextApiRequest, NextApiResponse } from "next";
import contentful_client from "@/lib/contentful/client";
import config from "@/lib/config";

const FetchBlogs = async (req: NextApiRequest, res: NextApiResponse) => {
  const allowedOrigins = ["http://localhost", "https://digital-dialogue.co"];
  const origin = req.headers.origin!;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  try {
    const page_no = Number(req.query.page) || 1;
    const links_to_entry = req.query.links_to_entry;

    const response = await contentful_client.getEntries({
      content_type: "post",
      limit: config.BLOGS_PER_PAGE,
      skip: (page_no - 1) * config.BLOGS_PER_PAGE,
      links_to_entry,
    });

    res.status(200).json({ items: response.items, total: response.total });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default FetchBlogs;
