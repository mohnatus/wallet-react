import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { selectActiveItemsByTag } from "../../features/items/itemsSlice";

import styles from "./style.module.css";
import { selectTagById } from "../../features/tags/tagsSlice";

export type TProgressProps = {
  tag: number;
};

export const Progress: FC<TProgressProps> = ({ tag }) => {
  const items = useSelector((state: RootState) =>
    selectActiveItemsByTag(state, tag)
  );
  const tagData = useSelector((state: RootState) => selectTagById(state, tag));

  if (!tagData || !tagData.limit) return null;

  const total = items.reduce((sum, item) => sum + item.price, 0);
  let percentage = Math.floor((total * 100 * 100) / tagData.limit) / 100;

  const width = Math.min(percentage, 100);
  const classes = [styles.Line];

  if (width >= 100) classes.push(styles.Red);
  else if (width >= 75) classes.push(styles.Orange);
  else if (width >= 50) classes.push(styles.Yellow);

  return (
    <div className={styles.Root}>
      <div className={classes.join(" ")} style={{ width: `${width}%` }}></div>
    </div>
  );
};
