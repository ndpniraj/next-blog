"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import { uploadFileToCloud } from "@/lib/file-handler";
import PostModel from "@/models/post";
import matter from "gray-matter";
import { redirect } from "next/navigation";
import readingTime from "reading-time";
import slugify from "slugify";

type CreatePostRes = { error: string } | null;

export const createPost = async (
  state: CreatePostRes,
  formData: FormData
): Promise<CreatePostRes> => {
  const session = await auth();
  if (!session?.user) {
    return {
      error: "unauthorized request!",
    };
  }

  const thumbnail = formData.get("thumbnail");
  const body = formData.get("body");

  if (typeof body !== "string" || !body.trim()) {
    return {
      error: "Invalid post!",
    };
  }

  const parsedMarkdown = matter(body);
  const postTitle = parsedMarkdown.data.title;

  if (!postTitle.trim()) {
    return {
      error: "Post title is missing!",
    };
  }

  const slug = slugify(postTitle, {
    lower: true,
    replacement: "-",
  });

  await dbConnect();
  const oldPost = await PostModel.findOne({ slug });
  if (oldPost) {
    return {
      error: "Duplicate slug, please change your title!",
    };
  }

  let postThumbnail = { id: "", url: "" };
  if (thumbnail instanceof File) {
    const cloudRes = await uploadFileToCloud(thumbnail);
    if (cloudRes) {
      postThumbnail = { id: cloudRes.public_id, url: cloudRes.secure_url };
    }
  }

  const post = await PostModel.create({
    title: postTitle,
    slug,
    body,
    estimatedReadingTime: readingTime(body).text,
    createdBy: session.user.id,
    thumbnail: postThumbnail,
  });

  const path = `/blog/update/${post.slug}`;
  redirect(path);
};
