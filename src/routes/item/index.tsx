import { useEffect, useRef } from "react";
import { Modal } from "../../components/modal";
import { TModalRef } from "../../hooks/useModal";

export const ItemPage = () => {
  const modalRef = useRef<TModalRef | null>(null);

  useEffect(() => {
    modalRef.current?.open();
  }, []);

  return <Modal ref={modalRef}>hello</Modal>;
};
