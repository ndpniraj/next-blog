import PostList, { Post } from "@/components/PostList";
import dbConnect from "@/lib/db";
import PostModel from "@/models/post";
import Image from "next/image";

export default async function Home() {
  await dbConnect();
  const posts = await PostModel.find().limit(20);

  const postsToRender: Post[] = posts.map((post) => {
    return {
      id: post._id.toString(),
      publishedAt: post.createdAt,
      slug: post.slug,
      thumbnail: post.thumbnail?.url,
      title: post.title,
    };
  });

  return <PostList posts={postsToRender} />;
}
