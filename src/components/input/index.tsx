import { FC } from "react";

import s from "./style.module.css";

export type TInputProps = {
  value: string;
  type?: "text" | "number";
  placeholder?: string;
  onChange: (value: string) => void;
};

export const Input: FC<TInputProps> = ({
  value,
  type = "text",
  placeholder,
  onChange,
}) => {
  return (
    <input
      className={s.Input}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
