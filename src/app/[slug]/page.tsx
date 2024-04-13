import PostHeader from "@/components/PostHeader";
import Thumbnail from "@/components/Thumbanil";
import dbConnect from "@/lib/db";
import PostModel from "@/models/post";
import { notFound } from "next/navigation";
import { FC } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { components } from "@/components/PostDetail";
import { Metadata } from "next";

interface Props {
  params: { slug: string };
}

// export const metadata: Metadata = {
//   title: "This is new Title",
//   description: "This is new Desc.",
// };

const fetchMdxCompiledPost = async (slug: string) => {
  await dbConnect();
  const post = await PostModel.findOne({ slug }).populate<{
    createdBy: { name: string; avatar?: { id: string; url: string } };
  }>({
    path: "createdBy",
    select: "name avatar",
  });
  if (!post) notFound();

  const compiledSource = await compileMDX<{
    title: string;
    description: string;
  }>({
    source: post.body,
    components,
    options: { parseFrontmatter: true },
  });

  return {
    mdxSource: compiledSource,
    estimatedReadingTime: post.estimatedReadingTime,
    publishedAt: post.createdAt,
    thumbnail: post.thumbnail?.url,
    userProfile: {
      name: post.createdBy.name,
      avatar: post.createdBy.avatar?.url,
    },
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const postRes = await fetchMdxCompiledPost(params.slug);

  return {
    title: postRes.mdxSource.frontmatter.title,
    description: postRes.mdxSource.frontmatter.description,
  };
};

export const generateStaticParams = async () => {
  await dbConnect();
  const posts = await PostModel.find().select("slug");

  return posts.map((post) => {
    return {
      slug: post.slug,
    };
  });
};

const SinglePost: FC<Props> = async ({ params }) => {
  const {
    thumbnail,
    mdxSource,
    userProfile,
    publishedAt,
    estimatedReadingTime,
  } = await fetchMdxCompiledPost(params.slug);

  const title = mdxSource.frontmatter.title;

  return (
    <div className="max-w-3xl mx-auto">
      <Thumbnail url={thumbnail} alt={title} />

      <div className="my-6">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <PostHeader
          author={{
            name: userProfile.name,
            avatar: userProfile.avatar,
            slug: "#",
          }}
          estimatedReadingTime={estimatedReadingTime}
          publishedAt={publishedAt}
        />
      </div>

      {mdxSource.content}
    </div>
  );
};

export default SinglePost;
