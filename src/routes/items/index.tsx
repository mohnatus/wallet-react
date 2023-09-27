import { useSelector } from "react-redux";
import { ItemsList } from "../../features/items/itemsList";
import { useAppDispatch } from "../../store/store";
import { selectActiveItems } from "../../features/items/itemsSlice";
import { ItemModal, ItemModalRef } from "../../features/items/itemModal";
import { useRef } from "react";

export const ItemsPage = () => {
  const items  = useSelector(selectActiveItems)

  const itemModalRef = useRef<ItemModalRef | null>(null);

  const handleAddItem = () => {
    itemModalRef.current?.open()
  }

  return <div>
    <button onClick={handleAddItem}>Add item</button>
    <ItemsList items={items} />

    <ItemModal ref={itemModalRef} />
  </div>
};
