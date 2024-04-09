"use client";
import { Button, ButtonProps } from "@nextui-org/react";
import { FC } from "react";
import { useFormStatus } from "react-dom";

interface Props extends ButtonProps {
  title?: string;
}

const AppSubmitBtn: FC<Props> = ({ title, ...rest }) => {
  const { pending } = useFormStatus();
  return (
    <Button isLoading={pending} {...rest}>
      {title}
    </Button>
  );
};

export default AppSubmitBtn;
