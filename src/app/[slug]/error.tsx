"use client";

import { FC } from "react";

interface Props {
  error: Error;
}

const error: FC<Props> = ({ error }) => {
  return <div>{error.message}</div>;
};

export default error;
