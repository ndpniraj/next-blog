"use client";
import { FC } from "react";
import PostForm from "./PostForm";
import { useFormState } from "react-dom";
import { updatePost } from "@/actions/post";

interface Props {
  body: string;
  thumbnail?: string;
  isDevMode?: boolean;
  slug: string;
  userId: string;
}

const PostUpdateForm: FC<Props> = ({
  body,
  isDevMode,
  thumbnail,
  userId,
  slug,
}) => {
  const [state, action] = useFormState(
    updatePost.bind(null, { userId, slug }),
    null
  );
  return (
    <div>
      <PostForm
        body={body}
        btnTitle="Update"
        thumbnail={thumbnail}
        isDevMode={isDevMode}
        action={action}
        error={state?.error}
      />
    </div>
  );
};

export default PostUpdateForm;
