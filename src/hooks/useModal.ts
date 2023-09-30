import {
  ForwardedRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";

export type TModalRef = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export function useModal(ref: ForwardedRef<TModalRef>) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useImperativeHandle(ref, () => ({
    open,
    close,
    toggle,
  }));

  return { isOpen, open, close, toggle };
}
