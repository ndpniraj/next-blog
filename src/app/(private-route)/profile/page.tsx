import { auth } from "@/auth";
import ProfileHead from "@/components/profile/ProfileHead";
import { UserProfile } from "@/components/profile/ProfileMenu";
import { redirect } from "next/navigation";
import { FC } from "react";

interface Props {}

const Profile: FC<Props> = async (props) => {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const profile: UserProfile = {
    id: session.user.id || "",
    email: session.user.email || "",
    name: session.user.name || "",
    avatar: session.user.image || "",
    banner: session.user.banner || "",
  };

  return (
    <div className="max-w-5xl mx-auto px-6">
      <ProfileHead profile={profile} />
    </div>
  );
};

export default Profile;
