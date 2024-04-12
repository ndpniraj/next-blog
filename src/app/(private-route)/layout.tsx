import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PrivateRouteLayout: FC<Props> = async ({ children }) => {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  return <>{children}</>;
};

export default PrivateRouteLayout;
