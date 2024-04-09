"use client";

import { signOutAction } from "@/actions/auth";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FC } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Props {
  userProfile: UserProfile;
}

const ProfileMenu: FC<Props> = ({ userProfile }) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src={userProfile.avatar}
          name={userProfile.name}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{userProfile.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">Create Blog</DropdownItem>
        <DropdownItem key="team_settings">Profile</DropdownItem>

        <DropdownItem key="logout" color="danger">
          <form action={signOutAction}>
            <button type="submit" className="w-full text-left">
              Log Out
            </button>
          </form>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileMenu;
