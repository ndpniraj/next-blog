import Image from "next/image";
import { FC } from "react";
import { CiImageOn } from "react-icons/ci";

interface Props {
  src?: string;
}

const Banner: FC<Props> = ({ src }) => {
  return (
    <div className="h-full bg-default relative">
      {src ? (
        <Image src={src} alt="banner art" fill className="object-cover" />
      ) : (
        <div className="h-full flex items-center justify-center">
          <CiImageOn size={50} />
        </div>
      )}
    </div>
  );
};

export default Banner;
