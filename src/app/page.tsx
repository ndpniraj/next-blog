import PostCard from "@/components/PostCard";
import dbConnect from "@/lib/db";
import PostModel from "@/models/post";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  await dbConnect();
  const posts = await PostModel.find().limit(20).sort("-createdAt");

  return (
    <div className="max-w-5xl mx-auto py-10 grid gap-10 md:grid-cols-4 lg:gap-10 xl:grid-cols-6">
      {posts.map((post, index) => {
        let style = "";
        if (index % 8 === 0 || index % 8 === 1) {
          style = "md:col-span-2 xl:col-span-3 col-span-2";
        } else {
          style = "col-span-2";
        }

        return (
          <PostCard
            key={post.id}
            className={style}
            post={{
              slug: post.slug,
              title: post.title,
              publishedAt: post.createdAt,
              thumbnail: post.thumbnail?.url,
            }}
          />
        );
      })}
    </div>
  );
}
