import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import dateFormat, { masks } from "dateformat";

export type postType = {
  slug: string;
  title: string;
  publishedAt: Date | string;
  thumbnail?: string;
};

interface Props {
  post?: postType;
  className?: string;
}

const PostCard: FC<Props> = ({ post, className }) => {
  if (!post) return null;
  const thumbnail = post.thumbnail;

  return (
    <div className={className}>
      <Link href={post.slug}>
        {thumbnail ? (
          <div className="relative aspect-video mt-0 p-0 shadow-none flex items-center justify-center bg-opacity-50">
            <Image
              src={thumbnail}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100%, (max-width: 1200px) 50%, 100%"
            />
          </div>
        ) : null}
        <div>
          <h5 className="mb-2 line-clamp-2">{post.title}</h5>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-normal">
            {dateFormat(post.publishedAt, "d mmm yyyy")}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
