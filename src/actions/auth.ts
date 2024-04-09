"use server";

import { signIn } from "@/auth";
import dbConnect from "@/lib/db";
import UserModel from "@/models/user";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

const newUserSchema = z.object({
  name: z.string().trim().min(3, "Invalid name!"),
  email: z.string().email("Invalid email!"),
  password: z
    .string()
    .trim()
    .min(8, "Password is too short!")
    .max(20, "Password is too long!")
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*\W)[a-zA-Z\d\W]+$/,
      "Password must include alpha numeric with special chars!"
    ),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email!"),
  password: z.string({ invalid_type_error: "Password is missing!" }),
});

interface SignUpErrors {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  apiError?: string;
}

type AuthActionResponse = SignUpErrors | null;

export const createNewUser = async (
  state: AuthActionResponse,
  formData: FormData
): Promise<AuthActionResponse> => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const result = newUserSchema.safeParse({
    name,
    email,
    password,
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
    // throw new Error("Something went wrong!");
  }

  // create new users

  await dbConnect();
  const user = await UserModel.findOne({ email: result.data.email });
  if (user)
    return {
      errors: {},
      apiError: "This email is already in use!",
    };

  await UserModel.create({
    name,
    email,
    password,
  });

  await signIn("credentials", {
    email: result.data.email,
    password: result.data.password,
    redirectTo: "/",
  });

  return null;
};

export const signInUser = async (
  state: AuthActionResponse,
  formData: FormData
): Promise<AuthActionResponse> => {
  const email = formData.get("email");
  const password = formData.get("password");

  const result = signInSchema.safeParse({
    email,
    password,
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
    // throw new Error("Something went wrong!");
  }

  const redirectTo = "/";

  try {
    await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirectTo,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      //   it means our user is signed in
      redirect(redirectTo);
    }
    if (error instanceof CredentialsSignin || error instanceof Error) {
      return { apiError: error.message, errors: {} };
    }

    return { apiError: "Something went wrong, could not sing-in", errors: {} };
  }

  return null;
};
