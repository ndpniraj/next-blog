"use client";
import { FC, FormHTMLAttributes, useEffect, useState } from "react";
import AppSubmitBtn from "./form/AppSubmitBtn";
import FileUploadUI from "./FileUploadUI";
import { Button, Divider } from "@nextui-org/react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import PostDetail, { post } from "./PostDetail";
import { FaEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import readingTime from "reading-time";
import { useFormState } from "react-dom";
import { createPost } from "@/actions/post";
import ErrorUI from "./ErrorUI";
import Image from "next/image";

interface Props {
  body: string;
  btnTitle: string;
  thumbnail?: string;
  error?: string;
  isDevMode?: boolean;
  action: FormHTMLAttributes<HTMLFormElement>["action"];
}

const PostForm: FC<Props> = ({
  isDevMode,
  body,
  btnTitle,
  error,
  thumbnail,
  action,
}) => {
  const [post, setPost] = useState(body);
  const [viewPost, setViewPost] = useState(false);
  const [mdxSource, setMdxSource] = useState<post>();

  useEffect(() => {
    if (!post.trim()) return;

    serialize(post, {
      parseFrontmatter: true,
      mdxOptions: {
        development: isDevMode,
      },
    }).then((result) => {
      setMdxSource(result);
    });
  }, [post]);

  return (
    <>
      {viewPost ? (
        <PostDetail
          mdxSource={mdxSource}
          estimatedReadingTime={readingTime(post).text}
        />
      ) : (
        <div>
          <ErrorUI message={error} />
          <FileUploadUI />

          <Divider className="my-5" />

          <form action={action}>
            <textarea
              name="body"
              className="min-h-[400px] outline-none p-4 rounded shadow resize-none w-full text-xl"
              placeholder="Start writing here..."
              value={post}
              onChange={({ target }) => setPost(target.value)}
            />
            <div className="mt-6 space-y-3">
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  width={200}
                  height={150}
                  alt="thumbnail"
                  className="my-4"
                />
              ) : null}
              <div>
                <label htmlFor="thumbnail" className="cursor-pointer">
                  <span className="mr-2 font-semibold">Select Thumbnail:</span>
                  <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    className="cursor-pointer"
                  />
                </label>
              </div>

              <div>
                <AppSubmitBtn title={btnTitle} type="submit" />
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="fixed bottom-10 right-10">
        <Button onClick={() => setViewPost(!viewPost)} isIconOnly>
          {viewPost ? <FaEdit size={20} /> : <FaRegEye size={20} />}
        </Button>
      </div>
    </>
  );
};

export default PostForm;
