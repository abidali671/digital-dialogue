import config from "./config";

const directLink = () => {
  const adLink = document.createElement("a");
  adLink.href = config.AD_DIRECT_LINK;
  adLink.target = "_blank";
  adLink.click();
};

export default directLink;
