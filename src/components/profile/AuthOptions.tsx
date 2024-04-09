import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";

interface Props {}

const AuthOptions: FC<Props> = (props) => {
  return (
    <>
      <Button as={Link} href="/sign-in" color="primary" variant="light">
        Login
      </Button>
      <Button as={Link} href="/sign-up" color="primary" variant="bordered">
        Sign Up
      </Button>
    </>
  );
};

export default AuthOptions;
