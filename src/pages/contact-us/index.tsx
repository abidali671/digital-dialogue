import constants from "@/constants";
import config from "@/lib/config";
import contentful_client from "@/lib/contentful/client";
import { ChangeEvent, useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // You can perform further actions like sending the data to a server her
  };
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
            onChange={handleChange}
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            className="form-input"
            required
          />
          <input
            type="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email"
            name="email"
            className="form-input"
            required
          />
          <input
            type="subject"
            onChange={handleChange}
            placeholder="Subject"
            name="subject"
            className="form-input"
            value={formData.subject}
            required
          />
          <textarea
            onChange={handleChange}
            placeholder="Enter Your Message"
            name="message"
            className="form-input"
            rows={4}
            required
            value={formData.message}
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
      description: constants.descriptions.AUTHORS,
    },
  };
};
