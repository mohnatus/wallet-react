import { FC, PropsWithChildren } from "react";

import s from "./style.module.css";

export type TContainerProps = PropsWithChildren & {
  className?: string;
};

export const Container: FC<TContainerProps> = ({
  className = "",
  children,
}) => {
  const classes = [s.Container, className].join(" ");
  return <div className={classes}>{children}</div>;
};
