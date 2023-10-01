import { FC, FormEventHandler, useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { TNewPeriodData } from "../../../types";
import { addPeriod, selectAllPeriods } from "../periodsSlice";
import { formatDate } from "../../../utils/date";

import s from "./style.module.css";
import { Field } from "../../../components/field";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";

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
      {lastPeriod && <div className={s.Text}>Текущий период будет закрыт.</div>}

      <Field label="Название нового периода">
        <Input value={periodName} placeholder="Январь 2025" onChange={setPeriodName} />
      </Field>

      <Button size="l" block type="submit">Начать новый период</Button>
    </form>
  );
};
