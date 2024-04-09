import AppSubmitBtn from "@/components/form/AppSubmitBtn";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";

interface Props {}

const SignUp: FC<Props> = (props) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <form className="w-96 shadow-lg p-6 space-y-6">
        <h1 className="text-lg font-semibold">Create an Account</h1>

        <Input name="name" label="Name" type="text" variant="bordered" />
        <Input name="email" label="Email" type="text" variant="bordered" />
        <Input
          name="password"
          label="Password"
          type="password"
          variant="bordered"
        />

        <AppSubmitBtn
          type="submit"
          title="Sing Up"
          color="primary"
          className="w-full"
        />
        <div>
          <div className="flex items-center space-x-2">
            <span>Already have an account</span>
            <Link className="hover:underline text-blue-500" href="/sign-in">
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
