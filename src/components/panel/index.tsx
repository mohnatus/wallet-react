import { PropsWithChildren, forwardRef } from "react";

import s from "./style.module.css";
import { TModalRef, useModal } from "../../hooks/useModal";
import { Button } from "../button";
import { Mask } from "../mask";

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

    return (
      <>
        {isOpen && <Mask onClick={close} />}

        <aside className={classes}>
          <div className={s.Header}>
            <Button rect onClick={close}>
              &times;
            </Button>
          </div>

          <div className={s.Container}>{children}</div>
        </aside>
      </>
    );
  }
);
