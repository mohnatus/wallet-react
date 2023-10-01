import { FC } from "react";
import { TPeriod } from "../../../types";

import { formatInterval } from "../../../utils/intervals";
import { useSelector } from "react-redux";
import { selectPeriodInterval } from "../periodsSlice";

import s from "./style.module.css";
import { Button } from "../../../components/button";
import { CloseIcon } from "../../../components/icons/close";

export type TPeriodProps = {
  period: TPeriod;
  active?: boolean;
  onSelect: (period: TPeriod) => void;
  onRemove: (period: TPeriod) => void;
};

export const Period: FC<TPeriodProps> = ({
  period,
  active,
  onSelect,
  onRemove,
}) => {
  const interval = useSelector((state) => selectPeriodInterval(state, period));
  const classes = [s.Period, active ? s.Active : ""].join(" ");

  return (
    <div className={classes} onClick={() => onSelect(period)}>
      <div className={s.Container}>
        <div className={s.Content}>
          <div className={s.Name}>{period.name}</div>
          <div className={s.Interval}>{formatInterval(interval)}</div>
        </div>
        <div className={s.Close}>
          <Button rect ghost onClick={() => onRemove(period)}>
            <CloseIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
