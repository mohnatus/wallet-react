import { PropsWithChildren, forwardRef } from "react";

import s from "./style.module.css";
import { TModalRef, useModal } from "../../hooks/useModal";
import { Button } from "../button";
import { Mask } from "../mask";
import { CloseIcon } from "../icons/close";
import { createPortal } from "react-dom";

export type TPanelProps = PropsWithChildren & {
  right?: boolean;
};

export const Panel = forwardRef<TModalRef, TPanelProps>(
  ({ right, children }, ref) => {
    const { isOpen, close } = useModal(ref);

    const classes = [
      s.Panel,
      right ? s.Right : s.Left,
      isOpen ? s.Active : "",
    ].join(" ");

    return createPortal(
      <>
        {isOpen && <Mask onClick={close} />}

        <aside className={classes}>
          <div className={s.Wrapper}>
            <div className={s.Header}>
              <Button ghost rect onClick={close}>
                <CloseIcon />
              </Button>
            </div>

            <div className={s.Container}>{children}</div>
          </div>
        </aside>
      </>,
      document.getElementById("panels") as HTMLElement
    );
  }
);
