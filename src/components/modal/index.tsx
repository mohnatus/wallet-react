import { PropsWithChildren, forwardRef } from "react";

import { TModalRef, useModal } from "../../hooks/useModal";

import s from "./style.module.css";
import { createPortal } from "react-dom";
import { Button } from "../button";
import { Mask } from "../mask";
import { CloseIcon } from "../icons/close";

export const Modal = forwardRef<TModalRef, PropsWithChildren>(
  ({ children }, ref) => {
    const { isOpen, close } = useModal(ref);

    if (!isOpen) return null;

    return createPortal(
      <>
        <Mask onClick={close} />
        <div className={s.Modal}>
          <div className={s.Container}>
            <div className={s.Frame}>
              <div className={s.Header}>
                <Button rect onClick={close}>
                  <CloseIcon />
                </Button>
              </div>
              <div className={s.Content}>{children}</div>
            </div>
          </div>
        </div>
      </>,
      document.getElementById("modals") as HTMLElement
    );
  }
);
