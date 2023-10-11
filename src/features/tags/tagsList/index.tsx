import { useSelector } from "react-redux";
import { removeTag, selectAllTags } from "../tagsSlice";
import { useAppDispatch } from "../../../store/store";
import { TTag } from "../../../types";

import s from "./style.module.css";
import { Button } from "../../../components/button";
import { CloseIcon } from "../../../components/icons/close";
import { useRef, useState } from "react";
import { TModalRef } from "../../../hooks/useModal";
import { Modal } from "../../../components/modal";
import { TagForm } from "../tagForm";
import { selectFlatItems } from "../../items/itemsSlice";
import { notifyError } from "../../../utils/notifier";

export const TagsList = () => {
  const dispatch = useAppDispatch();
  const tags = useSelector(selectAllTags);
  const items = useSelector(selectFlatItems);

  const [activeTag, setActiveTag] = useState<TTag | null>(null);
  const tagModalRef = useRef<TModalRef | null>(null);

  const handleRemove = (tag: TTag) => {
    if (items.some((item) => item.tag === tag.id)) {
      notifyError("Тег нельзя удалить");
      return;
    }
    dispatch(removeTag(tag));
  };

  const handleEdit = (tag: TTag) => {
    if (activeTag?.id !== tag.id) setActiveTag(tag);
    tagModalRef.current?.open();
  };

  const handleSubmit = () => {
    tagModalRef.current?.close();
    setActiveTag(null);
  };

  return (
    <>
      <table className={s.List}>
        <thead>
          <tr>
            <td>Тег</td>
            <td align="right">Лимит</td>
            <td align="right" width="30"></td>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td onClick={() => handleEdit(tag)}>
                <span>{tag.name}</span>
              </td>
              <td align="right" onClick={() => handleEdit(tag)}>
                <span>{tag.limit}</span>
              </td>
              <td align="right" width="30">
                <Button invert ghost size="m" onClick={() => handleRemove(tag)}>
                  <CloseIcon width={12} height={12} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal ref={tagModalRef}>
        <TagForm tag={activeTag} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};
