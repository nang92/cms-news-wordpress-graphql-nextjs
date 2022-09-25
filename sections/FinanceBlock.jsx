import React, { useState, useEffect } from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

import { gql, request } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getFinanceBlock = async () => {
  const query = gql`
    query getFinanceBlock {
      posts(where: { categoryName: "chuyen-dong-tai-chinh" }, last: 8) {
        edges {
          node {
            title
            date
            content
            excerpt
            featuredImage {
              node {
                sourceUrl
              }
            }
            slug
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts.edges;
};

const FinanceBlock = () => {
  const [financeBlockPosts, setFinanceBlockPosts] = useState([]);

  useEffect(() => {
    getFinanceBlock().then((result) => {
      setFinanceBlockPosts(result);
    });
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        <a href="./category/chuyen-dong-tai-chinh">Chuyển động tài chính</a>
      </h3>

      {financeBlockPosts.map((post) => (
        <div key={post.node.slug} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <Image
              alt={post.title}
              height="100px"
              width="100px"
              unoptimized
              className="align-middle "
              src={post.node.featuredImage.node.sourceUrl}
            />
          </div>
          <div className="flex-grow ml-4">
            <Link
              href={`/post/${post.node.slug}`}
              className="text-md"
              key={post.node.slug}
            >
              {post.node.title}
            </Link>
            <p className="text-gray-500 font-xs">
              {moment(post.node.date).format("DD. MM. YYYY")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinanceBlock;
