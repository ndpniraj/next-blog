import { FC } from "react";
import PostCard from "./PostCard";

export interface Post {
  id: string;
  slug: string;
  title: string;
  publishedAt: Date;
  thumbnail?: string;
}

interface Props {
  posts: Post[];
}

const PostList: FC<Props> = ({ posts }) => {
  return (
    <div className="max-w-5xl mx-auto py-10 grid gap-10 md:grid-cols-4 lg:gap-10 xl:grid-cols-6">
      {posts.map((post, index) => {
        return (
          <PostCard
            key={post.id}
            className="md:col-span-2 xl:col-span-3 col-span-2"
            post={{
              slug: post.slug,
              title: post.title,
              publishedAt: post.publishedAt,
              thumbnail: post.thumbnail,
            }}
          />
        );
      })}
    </div>
  );
};

export default PostList;
