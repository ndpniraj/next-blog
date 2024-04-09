import { FC } from "react";

interface Props {
  message?: string;
}

const ErrorUI: FC<Props> = ({ message }) => {
  if (!message) return null;

  return (
    <p className="rounded border-2 border-red-400 p-2 text-sm text-red-400 mb-4">
      {message}
    </p>
  );
};

export default ErrorUI;
