import contentful from "contentful";

const contentful_client = contentful.createClient({
  space: "bvnm7sul7e1u",
  environment: "master",
  accessToken: "kfML2B8yIYFftyzgIAXKEy54dshX6iMHbQESP5hi1zQ",
});

export default contentful_client;
