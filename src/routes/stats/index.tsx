import { useSelector } from "react-redux";
import { PeriodStats } from "../../features/stats/periodStats";
import { selectActivePeriod } from "../../features/periods/periodsSlice";

import { Container } from "../../layouts/container";

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
