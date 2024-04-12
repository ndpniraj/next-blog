import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GuestRouteLayout: FC<Props> = async ({ children }) => {
  const session = await auth();
  if (session?.user) redirect("/profile");

  return <>{children}</>;
};

export default GuestRouteLayout;
