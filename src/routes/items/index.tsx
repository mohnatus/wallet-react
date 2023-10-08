import { useSelector } from "react-redux";
import { ItemsList } from "../../features/items/itemsList";
import { selectActiveItems } from "../../features/items/itemsSlice";
import { Container } from "../../layouts/container";
import {
  selectActivePeriod,
  selectLastPeriodId,
} from "../../features/periods/periodsSlice";

export const ItemsPage = () => {
  const items = useSelector(selectActiveItems);
  const activePeriod = useSelector(selectActivePeriod);
  const lastPeriodId = useSelector(selectLastPeriodId);

  return (
    <div>
      <Container>
        <ItemsList items={items} disabled={activePeriod?.id !== lastPeriodId} />
      </Container>
    </div>
  );
};
