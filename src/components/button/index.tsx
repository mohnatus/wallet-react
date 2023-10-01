import { FC, MouseEvent, PropsWithChildren } from "react";

import s from "./style.module.css";

export type TButtonProps = PropsWithChildren & {
  type?: "button" | "submit";
  className?: string;
  invert?: boolean;
  ghost?: boolean;
  size?: "s" | "m" | "l";
  rect?: boolean;
  block?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const sizeClass = {
  s: s.Small,
  m: s.Medium,
  l: s.Large,
};

export const Button: FC<TButtonProps> = ({
  className = "",
  type = "button",
  invert,
  ghost,
  rect,
  size = "m",
  block,
  children,
  onClick,
}) => {
  const classes = [
    s.Button,
    invert && s.Invert,
    ghost && s.Ghost,
    block && s.Block,
    rect && s.Rect,
    sizeClass[size],
    className,
  ].filter(Boolean);

  return (
    <button type={type} className={classes.join(" ")} onClick={onClick}>
      {children}
    </button>
  );
};
