import {
  FormEventHandler,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { NotificationStatuses, TNewItemData } from "../../../types";
import { addNotification } from "../../notifier/notifierSlice";
import { addItem, selectActiveItems } from "../itemsSlice";
import { selectWeightedTags } from "../../tags/tagsSlice";

export type ItemModalRef = {
  open: () => void;
  close: () => void;
};

export const ItemModal = forwardRef((_, ref) => {
  const dispatch = useAppDispatch();

  const tags = useSelector(selectWeightedTags);

  const [isOpen, setIsOpen] = useState(false);
  const [itemText, setItemText] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemTag, setItemTag] = useState("");

  const reset = () => {
    setItemText("");
    setItemPrice("");
    setItemTag("");
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);

    const item: TNewItemData = {
      text: fd.get("text") as string,
      price: Number(fd.get("price")),
      tag: Number(fd.get("tag")),
    };

    dispatch(addItem(item));

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
          name="text"
          value={itemText}
          onChange={(e) => setItemText(e.target.value)}
        />
        <br />
        <input
          type="number"
          name="price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
        <br />
        <select name="tag" value={itemTag} onChange={(e) => setItemTag(e.target.value)}>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id.toString()}>
              {tag.name}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">submit</button>
      </form>
    </dialog>,
    document.getElementById("modals") as HTMLElement
  );
});
