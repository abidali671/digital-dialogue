import constants from "@/constants";
import config from "@/lib/config";
import contentful_client from "@/lib/contentful/client";

const ContactUs = () => {
  return (
    <div className="grid grid-cols-10 max-w-7xl mx-auto mt-20 min-h-[calc(100vh_-_80px)]">
      <div className="col-span-10 md:col-span-7 flex flex-col gap-10 p-4">
        <h1 className="text-5xl">Contact Us</h1>
        <form
          action={config.FORM_ACTION}
          method="POST"
          className="grid gap-4 max-w-xl"
        >
          <h5>Send us a message</h5>
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="form-input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="form-input"
            required
          />
          <input
            type="subject"
            placeholder="Subject"
            name="subject"
            className="form-input"
            required
          />
          <textarea
            placeholder="Enter Your Message"
            name="message"
            className="form-input"
            rows={4}
            required
          />
          <button className="btn-primary w-fit" type="submit">
            Send
          </button>
        </form>
      </div>
      <div className="col-span-3 w-full h-full max-md:hidden"></div>
    </div>
  );
};

export default ContactUs;

export const getStaticProps = async () => {
  const response = await contentful_client.getEntries({
    content_type: "category",
  });

  return {
    props: {
      categories: response.items,
      title: `Contact Us`,
      description: constants.descriptions.CONTACT_US,
    },
  };
};
