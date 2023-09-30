import { FC, FormEventHandler, useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { TNewPeriodData } from "../../../types";
import { addPeriod, selectAllPeriods } from "../periodsSlice";
import { formatDate } from "../../../utils/date";

export type TPeriodFormProps = {
  onSubmit?: () => void;
};

export const PeriodForm: FC<TPeriodFormProps> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();

  const periods = useSelector(selectAllPeriods);
  const lastPeriod = periods[periods.length - 1];

  const [periodName, setPeriodName] = useState("");

  const reset = () => {
    setPeriodName("");
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const period: TNewPeriodData = {
      name: periodName,
    };

    dispatch(addPeriod(period));

    reset();

    if (onSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      {lastPeriod && (
        <div>
          Закрыть текущий период. Начат с {formatDate(lastPeriod.createdAt)}
        </div>
      )}
      <input
        type="text"
        name="name"
        value={periodName}
        onChange={(e) => setPeriodName(e.target.value)}
      />
      <br />
      <button type="submit">submit</button>
    </form>
  );
};
