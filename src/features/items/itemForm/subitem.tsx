import { FC } from "react";
import { useSelector } from "react-redux";
import { selectWeightedTags } from "../../tags/tagsSlice";
import { TLocalSubitem } from "./types";

export type TSubitemProps = {
  item: TLocalSubitem;
  onChange: (item: TLocalSubitem) => void;
};

export const Subitem: FC<TSubitemProps> = ({ item, onChange }) => {
  const tags = useSelector(selectWeightedTags);

  return (
    <>
      <input
        type="text"
        name="text"
        value={item.text}
        onChange={(e) => onChange({ ...item, text: e.target.value })}
      />
      <br />
      <input
        type="number"
        name="price"
        value={item.price}
        onChange={(e) => onChange({ ...item, price: e.target.value })}
      />
      <br />
      <select
        name="tag"
        value={item.tag}
        onChange={(e) => onChange({ ...item, tag: e.target.value })}
      >
        {tags.map((tag) => (
          <option key={tag.id} value={tag.id.toString()}>
            {tag.name}
          </option>
        ))}
      </select>
    </>
  );
};
