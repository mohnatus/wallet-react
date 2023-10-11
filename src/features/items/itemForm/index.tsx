import {
  FC,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { TItem, TNewItemData } from "../../../types";
import { addItem, updateItem } from "../itemsSlice";
import { selectWeightedTags } from "../../tags/tagsSlice";
import { useLocalId } from "../../../hooks/useLocalId";
import { TLocalSubitem } from "./types";
import { Subitem } from "./subitem";

import s from "./style.module.css";
import { Button } from "../../../components/button";
import { CloseIcon } from "../../../components/icons/close";
import { Field } from "../../../components/field";
import { Input } from "../../../components/input";
import { Select } from "../../../components/select";
import { PlusIcon } from "../../../components/icons/plus";
import { TModalRef } from "../../../hooks/useModal";
import { Modal } from "../../../components/modal";
import { TagForm } from "../../tags/tagForm";

export type TItemFormProps = {
  item?: TItem | null;
  onSubmit?: () => void;
};

export const ItemForm: FC<TItemFormProps> = ({ item, onSubmit }) => {
  const dispatch = useAppDispatch();
  const tags = useSelector(selectWeightedTags);

  const getLocalId = useLocalId();
  const tagModalRef = useRef<TModalRef | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [itemText, setItemText] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemTag, setItemTag] = useState(tags[0]?.id.toString() || "");
  const [itemSubitems, setItemSubitems] = useState<Array<TLocalSubitem>>([]);

  const priceError =
    isSubmitted && !itemPrice.trim() ? "Обязательное поле" : "";
  const tagError = isSubmitted && !itemTag ? "Обязательное поле" : "";

  const handleAddTag = () => {
    tagModalRef.current?.open();
  };

  const handleAddSubitem = () => {
    setIsSubmitted(false);
    setItemSubitems((prev) => [
      ...prev,
      {
        id: getLocalId(),
        text: "",
        price: "",
        tag: tags[0]?.id.toString() || "",
      },
    ]);
  };

  const handleChangeSubitem = (subitem: TLocalSubitem) => {
    setIsSubmitted(false);
    setItemSubitems((prev) =>
      prev.map((s) => (s.id === subitem.id ? subitem : s))
    );
  };

  const handleRemoveSubitem = (removedSubitem: TLocalSubitem) => {
    setIsSubmitted(false);
    setItemSubitems((prev) =>
      prev.filter((subitem) => subitem.id !== removedSubitem.id)
    );
  };

  const reset = useCallback(() => {
    setItemText("");
    setItemPrice("");
    setItemTag(tags[0]?.id.toString() || "");
    setItemSubitems([]);
    // eslint-disable-next-line
  }, []);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    setIsSubmitted(true);

    if (!itemPrice.trim()) return;
    if (!itemTag) return;

    if (itemSubitems.some((subitem) => !subitem.price.trim())) return;
    if (itemSubitems.some((subitem) => !subitem.tag)) return;

    const itemData: TNewItemData = {
      text: itemText,
      price: Number(itemPrice),
      tag: Number(itemTag),
      subitems: itemSubitems.map((subitem) => {
        return {
          text: subitem.text,
          price: Number(subitem.price),
          tag: Number(subitem.tag),
        };
      }),
    };

    if (item) {
      dispatch(updateItem({ item, data: itemData }));
    } else {
      dispatch(addItem(itemData));
    }

    reset();

    if (onSubmit) onSubmit();
  };

  useEffect(() => {
    if (!item) {
      reset();
      return;
    }

    setItemText(item.text);
    setItemPrice(item.price.toString());
    setItemTag(item.tag.toString());

    const subitems = (item.subitems || []).map((s) => {
      return {
        id: getLocalId(),
        text: s.text,
        price: s.price.toString(),
        tag: s.tag.toString(),
      };
    });

    setItemSubitems(subitems);
  }, [item, getLocalId, reset]);

  useEffect(() => {
    setIsSubmitted(false);
  }, [itemText, itemPrice, itemTag]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Field label="Краткое описание">
          <Input value={itemText} onChange={setItemText} />
        </Field>

        <div className={s.Wrapper}>
          <Field label="Цена" className={s.Price} error={priceError}>
            <Input type="number" value={itemPrice} onChange={setItemPrice} />
          </Field>

          <Field label="Тег" className={s.Tag} error={tagError}>
            <Select
              value={itemTag}
              options={tags.map((tag) => ({
                id: tag.id.toString(),
                text: tag.name,
              }))}
              emptyOption
              onChange={setItemTag}
            />
          </Field>

          <Button rect className={s.AddTag} onClick={handleAddTag}>
            <PlusIcon />
          </Button>
        </div>

        <div className={s.Subitems}>
          {itemSubitems.length > 0 && <h3 className={s.Title}>Подтраты</h3>}

          {itemSubitems.map((subitem) => (
            <div key={subitem.id} className={s.Subitem}>
              <div className={s.SubitemContent}>
                <Subitem
                  item={subitem}
                  showErrors={isSubmitted}
                  onChange={handleChangeSubitem}
                />
              </div>
              <div className={s.Remove}>
                <Button
                  invert
                  rect
                  onClick={() => handleRemoveSubitem(subitem)}
                >
                  <CloseIcon />
                </Button>
              </div>
            </div>
          ))}

          <Button invert onClick={handleAddSubitem}>
            <PlusIcon width={16} height={16} />
            Добавить подтрату
          </Button>
        </div>

        <Button size="l" type="submit" block>
          Сохранить
        </Button>
      </form>

      <Modal ref={tagModalRef}>
        <TagForm onSubmit={() => tagModalRef.current?.close()} />
      </Modal>
    </>
  );
};
