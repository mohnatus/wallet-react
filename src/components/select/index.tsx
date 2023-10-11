import { FC } from "react";

import s from "./style.module.css";

export type TSelectOptionProps = {
  id: string;
  text: string;
};

export type TSelectProps = {
  options: TSelectOptionProps[];
  value: string;
  emptyOption?: boolean;
  onChange: (value: string) => void;
};

export const Select: FC<TSelectProps> = ({
  options,
  value,
  emptyOption,
  onChange,
}) => {
  return (
    <select
      className={s.Select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {emptyOption && <option></option>}
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.text}
        </option>
      ))}
    </select>
  );
};
