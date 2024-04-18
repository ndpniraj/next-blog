import PostList, { Post } from "@/components/PostList";
import dbConnect from "@/lib/db";
import PostModel from "@/models/post";
import Image from "next/image";

// export const revalidate = 60 // then it will refetch data on every min

export default async function Home() {
  await dbConnect();
  const posts = await PostModel.find().sort("-createdAt").limit(20);

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
