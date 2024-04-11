import { auth } from "@/auth";
import cloud from "@/lib/cloud";
import dbConnect from "@/lib/db";
import { uploadFileToCloud } from "@/lib/file-handler";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";
import streamifier from "streamifier";

export const POST = async (req: Request) => {
  const session = await auth();
  if (!session?.user || !session.user.id) {
    return NextResponse.json(
      { message: "Unauthorized request!" },
      { status: 403 }
    );
  }

  await dbConnect();
  const user = await UserModel.findById(session.user.id);
  if (!user) {
    return NextResponse.json({ message: "User not found!" }, { status: 404 });
  }

  const formData = await req.formData();
  const avatar = formData.get("avatar");
  const banner = formData.get("banner");
  const name = formData.get("name");

  if (banner && banner instanceof File) {
    // if this is the case upload banner to cloud and update database
    const result = await uploadFileToCloud(banner);
    if (result) {
      if (user.banner?.id) {
        await cloud.uploader.destroy(user.banner.id);
      }

      user.banner = {
        id: result.public_id,
        url: result.secure_url,
      };
    }
  }

  if (avatar && avatar instanceof File) {
    // if this is the case upload avatar to cloud and update database
    const result = await uploadFileToCloud(avatar, {
      width: 300,
      height: 300,
      crop: "fill",
      gravity: "face",
    });
    if (result) {
      if (user.avatar?.id) {
        await cloud.uploader.destroy(user.avatar.id);
      }

      user.avatar = {
        id: result.public_id,
        url: result.secure_url,
      };
    }
  }

  if (typeof name === "string" && name.trim().length >= 3) {
    user.name = name;
  }

  await user.save();

  return NextResponse.json({
    message: "Your profile is updated!",
    profile: {
      name: user.name,
      banner: user.banner?.url,
      picture: user.avatar?.url,
    },
  });
};
