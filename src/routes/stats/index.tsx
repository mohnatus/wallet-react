import { useSelector } from "react-redux";
import { PeriodStats } from "../../features/stats/periodStats";
import { selectActivePeriod } from "../../features/periods/periodsSlice";
import { Header } from "../../components/header";
import { Container } from "../../components/container";

export const StatsPage = () => {
  const activePeriod = useSelector(selectActivePeriod);

  return (
    <div>
      <Header title="Статистика" />
      <Container>
        <PeriodStats period={activePeriod} />
      </Container>
    </div>
  );
};
