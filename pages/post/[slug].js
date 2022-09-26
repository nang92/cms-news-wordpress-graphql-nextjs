import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import {
  Author,
  Categories,
  Comments,
  CommentsForm,
  Loader,
  PostDetail,
  PostWidget,
  Tags,
} from "../../components";
import { getPostDetails, getPosts } from "../../services";

const PostDetails = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>{post.title} - Tài chính an toàn</title>
        <meta name="description" content="Tài chính an toàn" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto 2xl:px-40 mb-8 xl:px-10 lg:px-8 md:px-5 sm:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />

            <Author author={post.author} />

            <PostWidget />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetails;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  return {
    props: {
      post: data,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
