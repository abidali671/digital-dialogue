import React, { useState, KeyboardEvent } from "react";
import { decode } from "html-entities";

interface NewsletterFormProps {
  status: string;
  message: string;
  onValidated: (data: { EMAIL: string }) => boolean;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  status,
  message,
  onValidated,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleFormSubmit = () => {
    setError(null);

    if (!email) {
      setError("Please enter a valid email address");
      return null;
    }
    if (!isCheckboxChecked) {
      setError("Please accept the terms and privacy policy");
      return null;
    }
    const isFormValidated = onValidated({ EMAIL: email });

    return email && email.indexOf("@") > -1 && isFormValidated;
  };

  const handleInputKeyEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.keyCode === 13) {
      event.preventDefault();
      handleFormSubmit();
    }
  };

  const getMessage = (message: string) => {
    if (!message) {
      return null;
    }
    const result = message?.split("-") ?? null;
    if ("0" !== result?.[0]?.trim()) {
      return decode(message);
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    console.log(formattedMessage, "formattedMessage");

    return formattedMessage ? decode(formattedMessage) : null;
  };

  return (
    <>
      <div className=" col-span-2 flex flex-col gap-2">
        <h3 className="text-white text-2xl">Subscribe to Updates</h3>
        <p className="text-gray-400 text-sm">
          Get the latest blogs from Digital Dialogue about Freelancing, Digital
          Marketing, Social Media Marketing
        </p>
        <div className="flex gap-1 h-10 w-full">
          <input
            onChange={(event) => setEmail(event?.target?.value ?? "")}
            type="email"
            placeholder="Enter Your Email.."
            className="outline-none  border-none  p-1 flex-1"
            onKeyUp={(event) => handleInputKeyEvent(event)}
          />

          <button
            className="bg-red-700 text-white p-2"
            onClick={handleFormSubmit}
          >
            Submit
          </button>
        </div>

        <div className="text-white">
          {status === "sending" && <div>Sending...</div>}
          {status === "error" || error ? (
            <div
              className="text-red-500"
              dangerouslySetInnerHTML={{
                __html:
                  error ||
                  setTimeout(() => {
                    getMessage(message);
                  }, 3000),
              }}
            />
          ) : null}
          {status === "success" && !error && (
            <div
              className="text-white"
              dangerouslySetInnerHTML={{
                __html: decode(message),
              }}
            />
          )}
        </div>
        <p className="text-gray-400 text-sm">
          <input
            type="checkbox"
            name="termsCheckbox"
            id="termsCheckbox"
            className="mr-1"
            checked={isCheckboxChecked}
            onChange={(e) => setIsCheckboxChecked(e.target.checked)}
          />
          By signing you agree to the our terms and our Privacy Policy agreement
        </p>
      </div>
    </>
  );
};

export default NewsletterForm;
