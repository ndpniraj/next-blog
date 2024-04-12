"use client";
import { signInUser } from "@/actions/auth";
import ErrorUI from "@/components/ErrorUI";
import AppSubmitBtn from "@/components/form/AppSubmitBtn";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";
import { useFormState } from "react-dom";

interface Props {}

const SignIn: FC<Props> = (props) => {
  const [state, signInAction] = useFormState(signInUser, null);

  return (
    <div className="h-screen flex items-center justify-center">
      <form action={signInAction} className="w-96 shadow-lg p-6 space-y-6">
        <h1 className="text-lg font-semibold">Welcome Back</h1>

        <ErrorUI message={state?.apiError} />
        <Input
          isInvalid={state?.errors.email ? true : false}
          errorMessage={state?.errors.email}
          name="email"
          label="Email"
          type="text"
          variant="bordered"
        />
        <Input
          isInvalid={state?.errors.password ? true : false}
          errorMessage={state?.errors.password}
          name="password"
          label="Password"
          type="password"
          variant="bordered"
        />

        <AppSubmitBtn
          type="submit"
          title="Sing In"
          color="primary"
          className="w-full"
        />
        <div>
          <div className="flex items-center space-x-2">
            <span>Need an account</span>
            <Link className="hover:underline text-blue-500" href="/sign-up">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
