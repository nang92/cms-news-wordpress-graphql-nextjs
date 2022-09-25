import React, { useState, useEffect } from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

import { getRecentPosts } from "../services";

const PostWidget = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    getRecentPosts().then((result) => {
      setRecentPosts(result);
    });
  }, []);
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Tin mới</h3>
      {recentPosts.map((recentPost) => (
        <div
          key={recentPost.node.slug}
          className="flex items-center w-full mb-4"
        >
          <div className="w-16 flex-none">
            <Image
              alt={recentPost.title}
              height="60px"
              width="60px"
              unoptimized
              className="align-middle rounded-full"
              src={recentPost.node.featuredImage.node.sourceUrl}
            />
          </div>
          <div className="flex-grow ml-4">
            <Link
              href={`/post/${recentPost.node.slug}`}
              className="text-md"
              key={recentPost.node.slug}
            >
              {recentPost.node.title}
            </Link>
            <p className="text-gray-500 font-xs">
              {moment(recentPost.node.date).format("DD. MM. YYYY")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
