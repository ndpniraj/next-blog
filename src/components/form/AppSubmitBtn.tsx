import { Button, ButtonProps } from "@nextui-org/react";
import { FC } from "react";

interface Props extends ButtonProps {
  title?: string;
}

const AppSubmitBtn: FC<Props> = ({ title, ...rest }) => {
  return <Button {...rest}>{title}</Button>;
};

export default AppSubmitBtn;
