import { NextApiRequest, NextApiResponse } from "next";
import contentful_client from "@/lib/contentful/client";
import config from "@/lib/config";

const FetchBlogs = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const page_no = Number(req.query.page) || 1;

    const response = await contentful_client.getEntries({
      content_type: "post",
      limit: config.BLOGS_PER_PAGE,
      skip: (page_no - 1) * config.BLOGS_PER_PAGE,
    });

    res.status(200).json({ data: response.items });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};

export default FetchBlogs;
