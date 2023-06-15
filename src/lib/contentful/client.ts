const contentful = require("contentful");

const contentful_client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
});

export default contentful_client;
