import { FC, FormEventHandler, useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { addTag, selectAllTags } from "../tagsSlice";
import { NotificationStatuses, TNewTagData } from "../../../types";
import { addNotification } from "../../notifier/notifierSlice";
import { Field } from "../../../components/field";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";

export type TTagFormProps = {
  onSubmit?: () => void;
};

export const TagForm: FC<TTagFormProps> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const tags = useSelector(selectAllTags);

  const [tagName, setTagName] = useState("");
  const [error, setError] = useState("");

  const reset = () => {
    setTagName("");
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const formattedTagName = tagName.trim();

    if (!formattedTagName) {
      setError("Обязательное поле");
      return;
    }

    if (tags.some((t) => t.name === tagName)) {
      setError("Тег с таким именем уже существует");
      return;
    }

    const tag: TNewTagData = {
      name: tagName,
    };

    dispatch(addTag(tag));

    reset();
    if (onSubmit) onSubmit();
  };

  useEffect(() => {
    setError("");
  }, [tagName]);

  return (
    <form onSubmit={handleSubmit}>
      <Field label="Имя тега" error={error}>
        <Input value={tagName} placeholder="Вкусняшки" onChange={setTagName} />
      </Field>

      <Button size="l" block type="submit">
        Сохранить тег
      </Button>
    </form>
  );
};
