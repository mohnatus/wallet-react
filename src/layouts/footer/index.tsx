import { useRef } from "react";
import { TModalRef } from "../../hooks/useModal";
import { ItemForm } from "../../features/items/itemForm";
import { Modal } from "../../components/modal";

import s from "./style.module.css";
import { Container } from "../../components/container";

export const Footer = () => {
  const itemModalRef = useRef<TModalRef | null>(null);

  const handleAddItem = () => {
    itemModalRef.current?.open();
  };

  return (
    <>
      <footer className={s.Footer}>
        <Container className={s.Container}>
          <button type="button" className={s.Add} onClick={handleAddItem}>
            +
          </button>
        </Container>
      </footer>

      <Modal ref={itemModalRef}>
        <ItemForm onSubmit={() => itemModalRef.current?.close()} />
      </Modal>
    </>
  );
};
