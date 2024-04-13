import { MDXComponents } from "mdx/types";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import Thumbnail from "./Thumbanil";
import PostHeader from "./PostHeader";

export type post = MDXRemoteSerializeResult;

interface Props {
  mdxSource?: post;
  thumbnail?: string;
  title?: string;
  estimatedReadingTime?: string;
  publishedAt?: Date;
}

export const components: MDXComponents = {
  h1: ({ children }) => {
    return <h1 className="text-4xl mb-6 font-medium">{children}</h1>;
  },
  h2: ({ children }) => {
    return <h2 className="text-3xl mb-6 font-medium">{children}</h2>;
  },
  h3: ({ children }) => {
    return <h3 className="text-2xl mb-6 font-medium">{children}</h3>;
  },
  p: ({ children }) => {
    if (typeof children === "object") return <>{children}</>;
    return (
      <p className="mb-6 tracking-wider text-xl leading-loose">{children}</p>
    );
  },
  img: ({ src, alt = "" }) => {
    if (!src) return null;

    return (
      <div className="w-full aspect-video relative flex items-center justify-center mb-6">
        <Image
          src={src}
          fill
          alt={alt}
          className="rounded-md ring-1 ring-[#1b1f21]"
          priority={false}
        />
      </div>
    );
  },
  blockquote: ({ children }) => {
    return (
      <blockquote className="flex space-x-2 items-center mb-6">
        <div className="w-0.5 bg-gray-400 h-20" />
        <div className="tracking-wider text-xl leading-loose italic font-semibold">
          {children}
        </div>
      </blockquote>
    );
  },
  a: ({ children, href = "#" }) => {
    return (
      <Link
        className=" font-medium underline"
        rel="noreferrer noopener"
        target="_blank"
        href={href}
      >
        {children}
      </Link>
    );
  },
  li: ({ children }) => {
    return (
      <li className="tracking-wide text-xl leading-relaxed ml-6 list-disc">
        {children}
      </li>
    );
  },
};

const PostDetail: FC<Props> = ({
  publishedAt,
  title,
  estimatedReadingTime,
  thumbnail,
  mdxSource,
}) => {
  if (!mdxSource) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <Thumbnail url={thumbnail} alt={title} />

      <div className="my-6">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <PostHeader
          author={{ name: "Niraj Dhungana", slug: "#" }}
          estimatedReadingTime={estimatedReadingTime}
          publishedAt={publishedAt}
        />
        <MDXRemote {...mdxSource} components={components} />
      </div>
    </div>
  );
};

export default PostDetail;
