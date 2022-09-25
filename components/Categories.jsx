import React, { useEffect, useState } from "react";
import Link from "next/link";

import { getCategories } from "../services";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((result) => {
      setCategories(result);
    });
  }, []);
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories.map((categories) => (
        <Link
          href={`/category/${categories.node.slug}`}
          className="cursor-pointer block pb-3 mb-3 "
          key={categories.node.slug}
        >
          <a className="text-gray-500 font-xs mb-4 block hover:text-xl hover:font-semibold">
            {categories.node.name}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
