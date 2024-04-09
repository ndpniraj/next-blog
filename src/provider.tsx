"use client";
import { NextUIProvider } from "@nextui-org/react";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Provider: FC<Props> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Provider;
