import { TItem } from "../../../types";
import { FC, useRef, useState } from "react";
import { Item } from "./item";

import s from "./style.module.css";
import { TModalRef } from "../../../hooks/useModal";
import { Modal } from "../../../components/modal";
import { ItemForm } from "../itemForm";

export type TItemsListProps = {
  items: TItem[];
};

export const ItemsList: FC<TItemsListProps> = ({ items }) => {
  const modalRef = useRef<TModalRef | null>(null);
  const [activeItem, setActiveItem] = useState<TItem | null>(null);

  const handleClick = (item: TItem) => {
    if (activeItem?.id !== item.id) setActiveItem(item);
    modalRef.current?.open();
  };

  const handleSubmit = () => {
    modalRef.current?.close();
    setActiveItem(null);
  };

  return (
    <>
      <div className={s.List}>
        {items.map((item) => (
          <div key={item.id} className={s.ItemWrapper}>
            <Item item={item} onClick={handleClick} />
          </div>
        ))}
      </div>
      <Modal ref={modalRef}>
        <ItemForm item={activeItem} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};
