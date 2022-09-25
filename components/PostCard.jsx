import Link from "next/link";
import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="flex flex-row sm:block hover-img relative overflow-hidden  pb-30 mb-4 ">
      <Link href={`/post/${post.slug}`}>
        <picture>
          <img
            className="max-w-full w-full mx-auto h-56 object-cover cursor-pointer ronnded-t-lg "
            src={post.featuredImage.node.sourceUrl}
            alt={post.title}
          />
        </picture>
      </Link>
      <div className="py-0 sm:py-3 pl-3 sm:pl-0">
        <h2 className="text-sm font-bold leading-tight mb-2">
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="hidden md:block text-gray-600 leading-tight mb-1 text-sm">
          {post.excerpt.replace(/(<([^>]+)>)/gi, "").substring(0, 150) + "..."}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
