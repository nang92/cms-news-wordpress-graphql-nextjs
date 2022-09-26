import React, { useEffect, useState } from "react";
import Link from "next/link";

import { getTags } from "../services";

const Tags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags().then((data) => {
      setTags(data);
    });
  }, []);

  return (
    <div className="flex flex-wrap">
      <h2 className="text-xl font-bold mb-8">Tags:</h2>
      <div className="flex flex-wrap">
        {tags.map((tag) => (
          <Link key={tag.slug} href={`/tags/${tag.node.slug}`}>
            <a className="bg-gray-200 text-gray-700 text-sm px-2 py-1   rounded-full mr-4 mb-4">
              {tag.node.name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tags;
