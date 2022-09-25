import React from "react";
import { useRouter } from "next/router";

import { getCategories, getCategoryPost } from "../../services";
import { PostCard, Categories, Loader } from "../../components";

const CategoryPost = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto 2xl:px-40 mb-8 xl:px-10 lg:px-8 md:px-5 sm:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 ">
        <div className="col-span-1 lg:col-span-8 bg-white p-4 rounded-lg shadow-lg">
          {posts.map((post) => (
            <PostCard key={post.node.slug} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const data = await getCategoryPost(params.slug);
  return {
    props: {
      posts: data,
    },
  };
}

//getStaticPaths is used to generate the paths for the dynamic pages
export async function getStaticPaths() {
  const categories = await getCategories();

  return {
    paths: categories.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
