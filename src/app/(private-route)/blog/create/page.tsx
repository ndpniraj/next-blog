import MarkdownEditor from "@/components/MarkdownEditor";
import { FC } from "react";

interface Props {}

const CreatePost: FC<Props> = (props) => {
  return (
    <div className="max-w-5xl mx-auto py-10">
      <MarkdownEditor />
    </div>
  );
};

export default CreatePost;
