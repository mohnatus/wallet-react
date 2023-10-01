import { FC, FormEventHandler, useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { TItem, TNewItemData } from "../../../types";
import { addItem, updateItem } from "../itemsSlice";
import { selectWeightedTags } from "../../tags/tagsSlice";
import { useLocalId } from "../../../hooks/useLocalId";
import { TLocalSubitem } from "./types";
import { Subitem } from "./subitem";

export type TItemFormProps = {
  item?: TItem | null;
  onSubmit?: () => void;
};

export const ItemForm: FC<TItemFormProps> = ({ item, onSubmit }) => {
  const dispatch = useAppDispatch();
  const tags = useSelector(selectWeightedTags);

  const getLocalId = useLocalId();

  const [itemText, setItemText] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemTag, setItemTag] = useState("");
  const [itemSubitems, setItemSubitems] = useState<Array<TLocalSubitem>>([]);

  const handleAddSubitem = () => {
    setItemSubitems((prev) => [
      ...prev,
      {
        id: getLocalId(),
        text: "",
        price: "",
        tag: tags[0]?.id.toString(),
      },
    ]);
  };

  const handleChangeSubitem = (subitem: TLocalSubitem) => {
    setItemSubitems((prev) =>
      prev.map((s) => (s.id === subitem.id ? subitem : s))
    );
  };

  const handleRemoveSubitem = (removedSubitem: TLocalSubitem) => {
    setItemSubitems((prev) =>
      prev.filter((subitem) => subitem.id !== removedSubitem.id)
    );
  };

  const reset = () => {
    setItemText("");
    setItemPrice("");
    setItemTag(tags[tags.length - 1]?.id.toString() || "");
    setItemSubitems([]);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

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
  }, [item, getLocalId]);

  return (
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
      <select
        name="tag"
        value={itemTag}
        onChange={(e) => setItemTag(e.target.value)}
      >
        {tags.map((tag) => (
          <option key={tag.id} value={tag.id.toString()}>
            {tag.name}
          </option>
        ))}
      </select>

      <div>
        {itemSubitems.map((subitem) => (
          <div key={subitem.id}>
            <Subitem item={subitem} onChange={handleChangeSubitem} />
            <button type="button" onClick={(e) => handleRemoveSubitem(subitem)}>
              &times;
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddSubitem}>
          Add subitem
        </button>
      </div>
      <button type="submit">submit</button>
    </form>
  );
};
