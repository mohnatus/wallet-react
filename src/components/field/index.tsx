import { FC, PropsWithChildren } from "react";

import s from "./style.module.css";

export type TFieldProps = PropsWithChildren & {
  label?: string;
  error?: string;
};

export const Field: FC<TFieldProps> = ({ label, error, children }) => {
  return (
    <div className={s.Field}>
      {label && <div className={s.Label}>{label}</div>}
      <div>{children}</div>
      {error && <div className={s.Error}>{error}</div>}
    </div>
  );
};
