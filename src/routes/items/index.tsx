import { useSelector } from "react-redux";
import { ItemsList } from "../../features/items/itemsList";
import { selectActiveItems } from "../../features/items/itemsSlice";
import { Container } from "../../components/container";
import { selectActiveInterval } from "../../features/periods/periodsSlice";
import { formatInterval } from "../../utils/intervals";

export const ItemsPage = () => {
  const items = useSelector(selectActiveItems);
  const interval = useSelector(selectActiveInterval);

  return (
    <div>
      <Container>
        <h1>
          Траты текущего периода
          <br />
          {formatInterval(interval)}
        </h1>
        <ItemsList items={items} />
      </Container>
    </div>
  );
};
