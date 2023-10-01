import { useSelector } from "react-redux";
import { removeTag, selectAllTags } from "../tagsSlice";
import { useAppDispatch } from "../../../store/store";
import { TTag } from "../../../types";

import s from "./style.module.css";
import { Button } from "../../../components/button";
import { CloseIcon } from "../../../components/icons/close";

export const TagsList = () => {
  const dispatch = useAppDispatch();
  const tags = useSelector(selectAllTags);

  const handleRemove = (tag: TTag) => {
    dispatch(removeTag(tag));
  };

  return (
    <div className={s.List}>
      {tags.map((tag) => (
        <div key={tag.id} className={s.Tag}>
          <div className={s.Name}>{tag.name}</div>
          <Button invert ghost onClick={() => handleRemove(tag)}>
            <CloseIcon />
          </Button>
        </div>
      ))}
    </div>
  );
};
