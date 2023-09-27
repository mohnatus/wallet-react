import { useSelector } from "react-redux";
import { removeTag, selectAllTags } from "../tagsSlice";
import { useAppDispatch } from "../../../store/store";
import { TTag } from "../../../types";

export const TagsList = () => {
  const dispatch = useAppDispatch();
  const tags = useSelector(selectAllTags);

  const handleRemove = (tag: TTag) => {
    dispatch(removeTag(tag));
  };

  return (
    <div>
      {tags.map((tag) => (
        <div key={tag.id}>
          <span>{tag.name}</span>
          <button type="button" onClick={() => handleRemove(tag)}>
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};
