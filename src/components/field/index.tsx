import { FC, PropsWithChildren } from "react";

import s from "./style.module.css";

export type TFieldProps = PropsWithChildren & {
  className?: string;
  label?: string;
  error?: string;
};

export const Field: FC<TFieldProps> = ({
  className,
  label,
  error,
  children,
}) => {
  return (
    <div className={[s.Field, className].join(" ")}>
      {label && <div className={s.Label}>{label}</div>}
      <div>{children}</div>
      {error && <div className={s.Error}>{error}</div>}
    </div>
  );
};
