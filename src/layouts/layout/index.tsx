import { FC, PropsWithChildren, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { addTag, selectAllTags } from "../../features/tags/tagsSlice";
import { selectNotifications } from "../../features/notifier/notifierSlice";
import { useAppDispatch } from "../../store/store";
import { TagModal, TagModalRef } from "../../features/tags/tagModal";
import { TagsList } from "../../features/tags/tagsList";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const notifications = useSelector(selectNotifications);

  const tagModalRef = useRef<TagModalRef | null>(null);

  const [isTagsPanelShow, setIsTagsPanelShow] = useState(false)

  const handleAddTag = () => {
    tagModalRef.current?.open();
  };

  return (
    <div>
      <header>
        <button onClick={handleAddTag}>Add tag</button>
      </header>

      <aside className={isTagsPanelShow ? 'active' : ''}>
        <TagsList />
      </aside>

      <main>{children}</main>

      <div>
        {notifications.map((notification) => (
          <div key={notification.id}>{notification.text}</div>
        ))}
      </div>

      <TagModal ref={tagModalRef} />
    </div>
  );
};
