import { FC } from "react";

import s from "./style.module.css";

export type TMaskProps = {
  onClick?: () => void;
};

export const Mask: FC<TMaskProps> = ({ onClick }) => {
  return <div className={s.Mask} onClick={onClick}></div>;
};
