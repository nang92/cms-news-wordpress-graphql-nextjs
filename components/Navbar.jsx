import Link from "next/link";
import React, { useEffect, useState } from "react";
import { gql, request } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories(first: 8) {
        edges {
          node {
            name
            slug
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.categories.edges;
};

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((result) => {
      setCategories(result);
    });
  }, []);

  return (
    <div className="container mx-auto items-center 2xl:px-40 mb-8 xl:px-10 lg:px-8 md:px-5 sm:px-0">
      <nav className="container mx-auto  flex items-center justify-between flex-wrap  p-2 mb-6 bg-green-900">
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white"></button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-m  lg:flex-grow font-bold text-white">
            {categories.map((categories) => (
              <Link
                href={`/category/${categories.node.slug}`}
                key={categories.node.slug}
              >
                <span className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                  {categories.node.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
