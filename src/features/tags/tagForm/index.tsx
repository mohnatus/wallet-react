import { FC, FormEventHandler, useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { addTag, selectAllTags, updateTag } from "../tagsSlice";
import { NotificationStatuses, TNewTagData, TTag } from "../../../types";
import { addNotification } from "../../notifier/notifierSlice";
import { Field } from "../../../components/field";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";

export type TTagFormProps = {
  tag?: TTag | null;
  onSubmit?: () => void;
};

export const TagForm: FC<TTagFormProps> = ({ tag, onSubmit }) => {
  const dispatch = useAppDispatch();
  const tags = useSelector(selectAllTags);

  const [tagName, setTagName] = useState("");
  const [tagLimit, setTagLimit] = useState("");
  const [error, setError] = useState("");

  const reset = useCallback(() => {
    setTagName("");
    setTagLimit("");
  }, []);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const formattedTagName = tagName.trim();

    if (!formattedTagName) {
      setError("Обязательное поле");
      return;
    }

    if (
      tags.some((t) => {
        if (tag?.id === t.id) return false;
        return t.name === tagName;
      })
    ) {
      setError("Тег с таким именем уже существует");
      return;
    }

    const tagData: TNewTagData = {
      name: tagName,
      limit: Number(tagLimit) || 0,
    };

    if (tag) {
      dispatch(updateTag({ tag, data: tagData }));
    } else {
      dispatch(addTag(tagData));
    }

    reset();

    if (onSubmit) onSubmit();
  };

  useEffect(() => {
    setError("");
  }, [tagName]);

  useEffect(() => {
    if (!tag) {
      reset();
      return;
    }

    setTagName(tag.name);
    setTagLimit(tag.limit?.toString() || "");
  }, [tag, reset]);

  return (
    <form onSubmit={handleSubmit}>
      <Field label="Имя тега" error={error}>
        <Input value={tagName} placeholder="Вкусняшки" onChange={setTagName} />
      </Field>

      <Field label="Лимит по тегу">
        <Input
          type="number"
          value={tagLimit}
          placeholder="10000"
          onChange={setTagLimit}
        />
      </Field>

      <Button size="l" block type="submit">
        Сохранить тег
      </Button>
    </form>
  );
};
