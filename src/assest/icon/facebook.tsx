import React from "react";

function Facebook(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="16"
            fill="none"
            viewBox="0 0 9 16"
            {...props}
        >
            <path
                fill="#272343"
                d="M6.665 2.657h1.46V.113A18.861 18.861 0 005.997 0C3.891 0 2.45 1.325 2.45 3.76V6H.125v2.844h2.324V16h2.849V8.845h2.23L7.882 6H5.297V4.04c0-.822.222-1.384 1.368-1.384z"
            ></path>
        </svg>
    );
}

export default Facebook;