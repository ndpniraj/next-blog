import { auth } from "@/auth";
import PostUpdateForm from "@/components/PostUpdateForm";
import dbConnect from "@/lib/db";
import PostModel from "@/models/post";
import { notFound, redirect } from "next/navigation";
import { FC } from "react";

interface Props {
  params: { slug: string };
}

const UpdatePost: FC<Props> = async ({ params }) => {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  await dbConnect();
  const post = await PostModel.findOne({
    slug: params.slug,
    createdBy: session.user.id,
  });
  if (!post) notFound();

  return (
    <div className="max-w-5xl mx-auto py-10">
      <PostUpdateForm
        thumbnail={post.thumbnail?.url}
        body={post.body}
        isDevMode={process.env.NODE_ENV === "development"}
        slug={post.slug}
        userId={session.user.id}
      />
    </div>
  );
};

export default UpdatePost;
