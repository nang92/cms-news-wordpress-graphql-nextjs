import Link from "next/link";
import React from "react";

const FeaturedPostCard = ({ post }) => (
  <div className="relative h-72">
    <div
      className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72"
      style={{
        backgroundImage: `url('${post.node.featuredImage.node.sourceUrl}')`,
      }}
    />
    <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
    <div className="flex flex-col rounded-lg p-2 items-center justify-center absolute w-full h-full">
      <p className="text-white mb-2 text-shadow font-semibold text-m text-center">
        {post.node.title}
      </p>
    </div>
    <Link href={`/post/${post.node.slug}`}>
      <span className="cursor-pointer absolute w-full h-full" />
    </Link>
  </div>
);

export default FeaturedPostCard;
