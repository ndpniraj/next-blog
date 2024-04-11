"use client";
import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import Banner from "./Banner";
import ProfileImage from "./ProfileImage";
import { UserProfile } from "./ProfileMenu";
import { FaPencil } from "react-icons/fa6";
import AppSubmitBtn from "../form/AppSubmitBtn";
import { useSession } from "next-auth/react";

interface Props {
  profile: UserProfile;
}

const ProfileHead: FC<Props> = ({ profile }) => {
  const [files, setFiles] = useState<{ [key: string]: File }>({});
  const [name, setName] = useState(profile.name);
  const [pending, setPending] = useState(false);
  const session = useSession();

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name } = target;

    if (target.files) {
      setFiles({ ...files, [name]: target.files[0] });
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const body = new FormData();

    for (let key in files) {
      body.append(key, files[key], files[key].name);
    }

    body.append("name", name);
    setPending(true);
    const response = await fetch("/api/profile", {
      method: "POST",
      body,
    });
    setPending(false);

    if (response.ok) {
      const { profile } = await response.json();
      session.update({ ...profile });
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  const showSubmitBtn =
    profile.name !== name || files.avatar || files.banner ? true : false;

  return (
    <form onSubmit={handleSubmit}>
      <div className="h-72 relative">
        <Banner src={profile.banner} />
        <div className="flex items-center justify-center w-24 h-24 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white rounded-full">
          <ProfileImage
            onChange={handleChange}
            name={profile.name}
            src={profile.avatar}
          />
        </div>
        <div className="absolute top-0 right-6 p-2 flex space-x-2">
          <label
            className="bg-default p-2 rounded-full cursor-pointer"
            htmlFor="banner"
          >
            <input
              onChange={handleChange}
              type="file"
              id="banner"
              name="banner"
              hidden
            />
            <FaPencil className="text-sm" />
          </label>

          <AppSubmitBtn
            visible={showSubmitBtn}
            title="Update Changes"
            size="sm"
            color="default"
            type="submit"
            isLoading={pending}
          />
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center">
        <input
          value={name}
          onChange={({ target }) => setName(target.value)}
          className="text-2xl font-semibold text-center outline-none focus:border-b-2"
        />
        <p className="text-sm text-gray-600">{profile.email}</p>
      </div>
    </form>
  );
};

export default ProfileHead;
