import { FC } from "react";
import AuthOptions from "./AuthOptions";
import ProfileMenu, { UserProfile } from "./ProfileMenu";
import { auth } from "@/auth";

interface Props {}

const ProfileOptions: FC<Props> = async (props) => {
  const session = await auth();

  const user = session?.user;
  const userProfile: UserProfile = {
    id: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.image || "",
  };
  return user ? <ProfileMenu userProfile={userProfile} /> : <AuthOptions />;
};

export default ProfileOptions;
