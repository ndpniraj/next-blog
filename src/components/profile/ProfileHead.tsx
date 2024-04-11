import { FC } from "react";
import Banner from "./Banner";
import ProfileImage from "./ProfileImage";
import { UserProfile } from "./ProfileMenu";
import { FaPencil } from "react-icons/fa6";
import AppSubmitBtn from "../form/AppSubmitBtn";

interface Props {
  profile: UserProfile;
}

const ProfileHead: FC<Props> = ({ profile }) => {
  return (
    <form className="">
      <div className="h-72 relative">
        <Banner />
        <div className="flex items-center justify-center w-24 h-24 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white rounded-full">
          <ProfileImage name={profile.name} src={profile.avatar} />
        </div>
        <div className="absolute top-0 right-6 p-2 flex space-x-2">
          <label
            className="bg-default p-2 rounded-full cursor-pointer"
            htmlFor="banner"
          >
            <input type="file" id="banner" name="banner" hidden />
            <FaPencil className="text-sm" />
          </label>

          <AppSubmitBtn
            visible={false}
            title="Update Changes"
            size="sm"
            color="default"
          />
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center">
        <input
          defaultValue={profile.name}
          className="text-2xl font-semibold text-center outline-none focus:border-b-2"
        />
        <p className="text-sm text-gray-600">{profile.email}</p>
      </div>
    </form>
  );
};

export default ProfileHead;
