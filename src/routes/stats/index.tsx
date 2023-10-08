import { useSelector } from "react-redux";
import { PeriodStats } from "../../features/stats/periodStats";
import {
  selectActivePeriod,
  selectPeriodInterval,
} from "../../features/periods/periodsSlice";
import { Header } from "../../layouts/header";
import { Container } from "../../layouts/container";
import { RootState } from "../../store/store";
import { formatInterval } from "../../utils/intervals";

export const StatsPage = () => {
  const activePeriod = useSelector(selectActivePeriod);

  return (
    <div>
      <Container>
        <PeriodStats period={activePeriod} />
      </Container>
    </div>
  );
};
