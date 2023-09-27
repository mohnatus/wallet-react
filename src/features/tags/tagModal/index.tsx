import {
  FormEventHandler,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { addTag, selectAllTags } from "../tagsSlice";
import { createPortal } from "react-dom";
import { NotificationStatuses, TNewTagData } from "../../../types";
import { addNotification } from "../../notifier/notifierSlice";

export type TagModalRef = {
  open: () => void;
  close: () => void;
};

export const TagModal = forwardRef((_, ref) => {
  const dispatch = useAppDispatch();
  const tags = useSelector(selectAllTags);

  const [isOpen, setIsOpen] = useState(false);
  const [tagName, setTagName] = useState("");

  const reset = () => {
    setTagName("");
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);

    const name = fd.get("name") as string;

    if (tags.some((t) => t.name === name)) {
      dispatch(
        addNotification({
          text: `Тег с именем ${name} уже существует`,
          status: NotificationStatuses.error,
        })
      );
      return;
    }

    const tag: TNewTagData = {
      name,
    };

    dispatch(addTag(tag));

    reset();
    setIsOpen(false);
  };

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  if (!isOpen) return null;

  return createPortal(
    <dialog open>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
        />
      </form>
    </dialog>,
    document.getElementById("modals") as HTMLElement
  );
});
