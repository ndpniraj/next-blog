import Image from "next/image";
import { FC } from "react";

interface Props {
  url?: string;
  alt?: string;
}

const Thumbnail: FC<Props> = ({ url, alt }) => {
  if (!url) return null;

  return (
    <div className="flex items-center justify-center bg-blue-gray-300 rounded-md overflow-hidden w-full aspect-video relative bg-opacity-50">
      <Image
        src={url}
        fill
        sizes="(max-width: 768px) 100%, (max-width: 1200px) 50%, 100%"
        alt={alt || "thumbnail"}
        priority={false}
      />
    </div>
  );
};

export default Thumbnail;
