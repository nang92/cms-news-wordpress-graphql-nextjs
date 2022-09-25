import Head from "next/head";
import { PostCard, PostWidget } from "../components";
import { FinanceBlock } from "../sections";
import FeaturedPosts from "../sections/FeaturedPosts";
import { getPosts } from "../services";

export default function Home({ posts }) {
  return (
    <div className="container mx-auto 2xl:px-40 mb-8 xl:px-10 lg:px-8 md:px-5 sm:px-0">
      <Head>
        <title>Tài chính an toàn</title>
        <meta name="description" content="Tài chính an toàn" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FeaturedPosts posts={posts} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          <FinanceBlock />
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white rounded-lg shadow-lg p-4 ">
        {posts.map((post) => (
          <PostCard key={post.node.slug} post={post.node} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: {
      posts,
    },
  };
}
