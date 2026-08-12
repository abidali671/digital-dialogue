import { createClient } from "contentful";

const contentful_client = createClient({
  accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN as string,
  space: process.env.CONTENTFUL_SPACE_ID as string,
  environment: process.env.CONTENTFUL_ENVIRONMENT as string,
});

export default contentful_client;
