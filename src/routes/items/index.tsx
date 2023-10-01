import { useSelector } from "react-redux";
import { ItemsList } from "../../features/items/itemsList";
import { selectActiveItems } from "../../features/items/itemsSlice";
import { Container } from "../../layouts/container";
import {
  selectActiveInterval,
  selectActivePeriod,
  selectLastPeriodId,
} from "../../features/periods/periodsSlice";
import { formatInterval } from "../../utils/intervals";
import { Header } from "../../components/header";

export const ItemsPage = () => {
  const items = useSelector(selectActiveItems);
  const interval = useSelector(selectActiveInterval);
  const activePeriod = useSelector(selectActivePeriod);
  const lastPeriodId = useSelector(selectLastPeriodId);

  return (
    <div>
      <Header
        title={formatInterval(interval)}
        subtitle={
          activePeriod?.id === lastPeriodId
            ? "Текущий период"
            : "Завершенный период"
        }
      />
      <Container>
        <ItemsList items={items} disabled={activePeriod?.id !== lastPeriodId} />
      </Container>
    </div>
  );
};
