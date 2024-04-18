"use client";
import { Button, ButtonProps } from "@nextui-org/react";
import { FC } from "react";
import { useFormStatus } from "react-dom";

interface Props extends ButtonProps {
  title?: string;
  visible?: boolean;
}

const AppSubmitBtn: FC<Props> = ({ title, visible = true, ...rest }) => {
  const { pending } = useFormStatus();

  if (!visible) return null;

  return (
    <Button isLoading={pending} {...rest}>
      {title}
    </Button>
  );
};

export default AppSubmitBtn;
