import Image from "next/image";
import React from "react";

const Author = ({ author }) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-60">
      <div className="absolute left-0 right-0 -top-14">
        <Image
          unoptimized
          alt={author.node.name}
          height="100px"
          width="100px"
          className="align-middle rounded-full"
          src={author.node.avatar.url}
        />
      </div>
      <h3 className="text-white mt-4 mb-4 text-xl font-bold">
        {author.node.name}
      </h3>
      <div className="text-white text-ls">
        {
          // get content from author and render it as html code (cleaning up the html )
          <div
            dangerouslySetInnerHTML={{
              __html: author.node.description,
            }}
          />
        }
      </div>
    </div>
  );
};

export default Author;
