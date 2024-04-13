"use client";
import { Chip, Tooltip, input } from "@nextui-org/react";
import { FC, useEffect, useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import AppSubmitBtn from "./form/AppSubmitBtn";
import { FaCloudUploadAlt } from "react-icons/fa";
import copy from "copy-to-clipboard";
import { useFormState } from "react-dom";
import { uploadImageFile } from "@/actions/file";
import ErrorUI from "./ErrorUI";

interface Props {}

const FileUploadUI: FC<Props> = (props) => {
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const [state, action] = useFormState(uploadImageFile, null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.imageUrl) {
      setShowSubmitBtn(false);
      if (inputRef.current) inputRef.current.value = null as any;
    }
  }, [state]);

  return (
    <div>
      <ErrorUI message={state?.error} />
      <form action={action} className="flex space-x-2 mb-4">
        <label htmlFor="image">
          <input
            ref={inputRef}
            onChange={() => {
              setShowSubmitBtn(true);
            }}
            type="file"
            name="image"
            id="image"
            hidden
          />

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
          visible={showSubmitBtn}
          type="submit"
        />
      </form>

      {state?.imageUrl ? (
        <div className="line-clamp-1">
          <Tooltip showArrow content="Click to Copy">
            <p
              onClick={() => copy(`![alt text](${state.imageUrl})`)}
              className="truncate cursor-pointer"
            >
              {state.imageUrl}
            </p>
          </Tooltip>
        </div>
      ) : null}
    </div>
  );
};

export default FileUploadUI;
