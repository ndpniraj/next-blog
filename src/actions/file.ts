"use server";
import { put } from "@vercel/blob";

type UploadImageResult = { error?: string; imageUrl?: string } | null;

export const uploadImageFile = async (
  state: UploadImageResult,
  formData: FormData
): Promise<UploadImageResult> => {
  const image = formData.get("image");
  if (image && image instanceof File) {
    if (image.type.startsWith("image")) {
      const { url } = await put(image.name, image, {
        access: "public",
      });

      return {
        imageUrl: url,
      };
    }
  } else {
    return { error: "Invalid file type" };
  }

  return null;
};
