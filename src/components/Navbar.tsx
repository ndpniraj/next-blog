import {
  Input,
  NavbarBrand,
  NavbarContent,
  Navbar as NextUINav,
} from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";
import ProfileOptions from "./profile/ProfileOptions";

interface Props {}

const Navbar: FC<Props> = (props) => {
  return (
    <NextUINav>
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            Next Blog
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          //   startContent={<SearchIcon size={18} />}
          type="search"
        />
        <ProfileOptions />
      </NavbarContent>
    </NextUINav>
  );
};

export default Navbar;
