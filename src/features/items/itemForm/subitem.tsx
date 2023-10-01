import { FC } from "react";
import { useSelector } from "react-redux";
import { selectWeightedTags } from "../../tags/tagsSlice";
import { TLocalSubitem } from "./types";

import s from "./style.module.css";
import { Field } from "../../../components/field";
import { Input } from "../../../components/input";
import { Select } from "../../../components/select";

export type TSubitemProps = {
  item: TLocalSubitem;
  showErrors: boolean;
  onChange: (item: TLocalSubitem) => void;
};

export const Subitem: FC<TSubitemProps> = ({ item, showErrors, onChange }) => {
  const tags = useSelector(selectWeightedTags);
  const priceError =
    showErrors && !item.price.trim() ? "Обязательное поле" : "";

  return (
    <div>
      <Field label="Краткое описание">
        <Input
          value={item.text}
          onChange={(v) => onChange({ ...item, text: v })}
        />
      </Field>

      <div className={s.Wrapper}>
        <Field label="Цена" className={s.Price} error={priceError}>
          <Input
            type="number"
            value={item.price}
            onChange={(v) => onChange({ ...item, price: v })}
          />
        </Field>

        <Field label="Тег" className={s.Tag}>
          <Select
            value={item.tag}
            options={tags.map((tag) => ({
              id: tag.id.toString(),
              text: tag.name,
            }))}
            onChange={(v) => onChange({ ...item, tag: v })}
          />
        </Field>
      </div>
    </div>
  );
};
