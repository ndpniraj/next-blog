import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import dateFormat from "dateformat";
import { CiImageOff } from "react-icons/ci";

export type postType = {
  slug: string;
  title: string;
  publishedAt: Date;
  thumbnail?: string;
};

interface Props {
  post?: postType;
  className?: string;
}

const PostCard: FC<Props> = ({ post, className }) => {
  if (!post) return null;
  const thumbnail = "";

  return (
    <div className={className}>
      <Link href={post.slug}>
        <div className="relative aspect-video mt-0 p-0 shadow-none flex items-center justify-center bg-opacity-50 rounded overflow-hidden">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100%, (max-width: 1200px) 50%, 100%"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <CiImageOff size={30} />
            </div>
          )}
        </div>
        <div className="p-2">
          <h1 className="mb-2 text-xl line-clamp-2 font-semibold">
            {post.title}
          </h1>
          <div className="flex items-center justify-between">
            <p className="font-normal">
              {dateFormat(post.publishedAt, "d mmm yyyy")}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
