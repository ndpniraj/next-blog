import Link from "next/link";
import { FC } from "react";
import { GiRead } from "react-icons/gi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import dateFormat from "dateformat";
import { Avatar } from "@nextui-org/react";

interface Props {
  author: {
    avatar?: string;
    name: string;
    slug: string;
  };
  estimatedReadingTime?: string;
  publishedAt?: Date;
}

const PostHeader: FC<Props> = ({
  author,
  publishedAt,
  estimatedReadingTime,
}) => {
  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center space-x-4">
        <Link
          className="flex items-center space-x-1 text-sm"
          href={`/${author.slug}`}
        >
          <Avatar name={author.name} src={author.avatar} />
          <p>{`By ${author.name}`}</p>
        </Link>
        <p className="text-xs flex items-center space-x-1">
          <GiRead size={17} color="#1b1f21" />
          <span>{estimatedReadingTime}</span>
        </p>
        <p className="text-xs flex items-center space-x-1">
          <MdOutlineCalendarMonth color="#1b1f21" size={17} />
          <span>
            {"Published on: " + dateFormat(publishedAt, "d mmm yyyy")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PostHeader;
