import { FC, FormEventHandler, useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { addTag, selectAllTags } from "../tagsSlice";
import { NotificationStatuses, TNewTagData } from "../../../types";
import { addNotification } from "../../notifier/notifierSlice";

export type TTagFormProps = {
  onSubmit?: () => void;
};

export const TagForm: FC<TTagFormProps> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const tags = useSelector(selectAllTags);

  const [tagName, setTagName] = useState("");

  const reset = () => {
    setTagName("");
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (tags.some((t) => t.name === tagName)) {
      dispatch(
        addNotification({
          text: `Тег с именем ${tagName} уже существует`,
          status: NotificationStatuses.error,
        })
      );
      return;
    }

    const tag: TNewTagData = {
      name: tagName,
    };

    dispatch(addTag(tag));

    reset();
    if (onSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
      />
    </form>
  );
};
