import { useSelector } from "react-redux";
import {
  removePeriod,
  selectActivePeriod,
  selectAllPeriods,
  setActivePeriod,
} from "../periodsSlice";
import { useAppDispatch } from "../../../store/store";
import { TPeriod } from "../../../types";
import { Period } from "./period";

import s from "./style.module.css";

export const PeriodsList = () => {
  const dispatch = useAppDispatch();
  const periods = useSelector(selectAllPeriods);
  const activePeriod = useSelector(selectActivePeriod);

  const handleRemove = (period: TPeriod) => {
    dispatch(removePeriod(period));
  };

  const handleSelect = (period: TPeriod) => {
    dispatch(setActivePeriod(period));
  };

  return (
    <div>
      {periods.map((period, i) => (
        <Period
          key={period.id}
          period={period}
          active={activePeriod?.id === period.id}
          onSelect={() => handleSelect(period)}
          onRemove={() => handleRemove(period)}
        />
      ))}
    </div>
  );
};
