import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { z } from "zod";
import dbConnect from "./lib/db";
import UserModel from "./models/user";

type UserCredentials = {
  email: string;
  password: string;
};

const signInSchema = z.object({
  email: z.string({
    invalid_type_error: "Invalid email type!",
  }),
  password: z.string({
    invalid_type_error: "Invalid password type!",
  }),
});

class CustomAuthError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
  code = "custom_auth_error";
}

const config: NextAuthConfig = {
  providers: [
    credentials({
      async authorize(credentials, request) {
        const { email, password } = credentials as UserCredentials;
        const result = signInSchema.safeParse({ email, password });
        if (!result.success) {
          const errors = result.error.flatten().fieldErrors;
          throw new CustomAuthError(
            `${errors.email?.join(", ")} ${errors.password?.join(", ")}`
          );
        }

        await dbConnect();
        const user = await UserModel.findOne({ email: result.data.email });
        if (!user) {
          throw new CustomAuthError("Email/Password mismatch!");
        }

        const isMatched = await user.comparePassword(result.data.password);
        if (!isMatched) {
          throw new CustomAuthError("Email/Password mismatch!");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          image: user.avatar?.url,
          banner: user.banner?.url,
        };
      },
    }),
  ],
};

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(config);
