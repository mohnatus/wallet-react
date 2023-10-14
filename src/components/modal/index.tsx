import { PropsWithChildren, forwardRef } from "react";

import { TModalRef, useModal } from "../../hooks/useModal";

import s from "./style.module.css";
import { createPortal } from "react-dom";
import { Button } from "../button";
import { Mask } from "../mask";
import { CloseIcon } from "../icons/close";

export type TModalProps = PropsWithChildren & {
  size?: "m" | "l";
};

export const Modal = forwardRef<TModalRef, TModalProps>(
  ({ size, children }, ref) => {
    const { isOpen, close } = useModal(ref);

    if (!isOpen) return null;

    const classes = [s.Modal, size === "l" && s.Large].filter(Boolean);

    return createPortal(
      <div className={classes.join(" ")}>
        <Mask onClick={close} />
        <div className={s.FrameWrapper}>
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
      </div>,
      document.getElementById("modals") as HTMLElement
    );
  }
);
