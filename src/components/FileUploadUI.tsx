"use client";
import { Chip, Tooltip } from "@nextui-org/react";
import { FC } from "react";
import { CiImageOn } from "react-icons/ci";
import AppSubmitBtn from "./form/AppSubmitBtn";
import { FaCloudUploadAlt } from "react-icons/fa";
import copy from "copy-to-clipboard";

interface Props {}

const FileUploadUI: FC<Props> = (props) => {
  const imageUrl =
    "https://images.unsplash.com/photo-1712698396006-1996dc7cb2cc?q=80&w=2701&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div>
      <form className="flex space-x-2 mb-4">
        <label htmlFor="image">
          <input type="file" name="image" id="image" hidden />

          <Chip
            radius="sm"
            className="cursor-pointer h-10"
            size="lg"
            variant="bordered"
            startContent={<CiImageOn size={20} />}
          >
            Select Image
          </Chip>
        </label>

        <AppSubmitBtn
          startContent={<FaCloudUploadAlt size={20} />}
          title="Upload Image"
          visible={false}
        />
      </form>

      <div className="line-clamp-1">
        <Tooltip showArrow content="Click to Copy">
          <p
            onClick={() => copy(`![alt text](${imageUrl})`)}
            className="truncate cursor-pointer"
          >
            {imageUrl}
          </p>
        </Tooltip>
      </div>
    </div>
  );
};

export default FileUploadUI;
