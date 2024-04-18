"use server";

import { auth } from "@/auth";
import cloud from "@/lib/cloud";
import dbConnect from "@/lib/db";
import { uploadFileToCloud } from "@/lib/file-handler";
import PostModel from "@/models/post";
import matter from "gray-matter";
import { revalidatePath } from "next/cache";
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
  revalidatePath("/");
  redirect(path);
};

type postInfo = { userId: string; slug: string };
type UpdateRes = { error: string } | null;

export const updatePost = async (
  postInfo: postInfo,
  state: UpdateRes,
  formData: FormData
): Promise<UpdateRes> => {
  const session = await auth();
  if (!session?.user)
    return {
      error: "unauthorized access!",
    };

  const body = formData.get("body");
  const thumbnail = formData.get("thumbnail");

  if (typeof body !== "string" || !body.trim()) {
    return {
      error: "Post body is missing!",
    };
  }

  const parsedMarkdown = matter(body);
  const postTitle = parsedMarkdown.data.title;
  if (!postTitle) {
    return {
      error: "Post title is missing!",
    };
  }

  await dbConnect();
  const post = await PostModel.findOne({ slug: postInfo.slug });
  if (!post) {
    return {
      error: "Post not found!",
    };
  }

  post.body = body;
  post.title = postTitle;

  if (thumbnail instanceof File) {
    const cloudRes = await uploadFileToCloud(thumbnail);
    if (cloudRes) {
      if (post.thumbnail?.id) {
        await cloud.uploader.destroy(post.thumbnail.id);
      }

      post.thumbnail = {
        url: cloudRes.secure_url,
        id: cloudRes.public_id,
      };
    }
  }

  await post.save();

  return null;
};
