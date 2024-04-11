import { Avatar } from "@nextui-org/react";
import { ChangeEventHandler, FC } from "react";
import { FaPencil } from "react-icons/fa6";

interface Props {
  src?: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const ProfileImage: FC<Props> = ({ src, name, onChange }) => {
  return (
    <div className="relative">
      <Avatar src={src} name={name} className="w-20 h-20 text-large" />

      <label
        className="absolute -top-2 -right-2 bg-white p-2 rounded-full cursor-pointer"
        htmlFor="avatar"
      >
        <input
          onChange={onChange}
          type="file"
          id="avatar"
          name="avatar"
          hidden
        />
        <FaPencil className="text-sm" />
      </label>
    </div>
  );
};

export default ProfileImage;
