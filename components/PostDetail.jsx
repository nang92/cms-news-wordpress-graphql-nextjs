import moment from "moment";
import React from "react";

const PostDetail = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden  mb-6">
        <picture>
          <img
            src={post.featuredImage.node.sourceUrl}
            alt={post.title}
            className="w-full h-full object-top rounded-t-lg"
          />
        </picture>
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex  mb-8 w-full">
          <div className="flex items-center">
            <picture>
              <img
                src={post.author.node.avatar.url}
                alt={post.author.node.name}
                className="rounded-full mr-4 cursor-pointer"
                width="30"
                height="30"
              />
            </picture>
            <p className="inline text-sm">
              {post.author.node.name} -{" "}
              {moment(post.date).format("DD. MM. YYYY")}
            </p>
          </div>
        </div>
        <h1 className="mb-8 text-xl font-semibold">{post.title}</h1>
        {
          // get content from post and render it as html code (cleaning up the html )

          <div
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        }
      </div>
    </div>
  );
};

export default PostDetail;
