import { FC, PropsWithChildren, useRef } from "react";
import { useSelector } from "react-redux";
import { selectNotifications } from "../../features/notifier/notifierSlice";
import { TagsList } from "../../features/tags/tagsList";
import { PeriodsList } from "../../features/periods/periodsList";
import { TModalRef } from "../../hooks/useModal";

import { PeriodForm } from "../../features/periods/periodForm";
import { Header } from "../header";
import { Panel } from "../../components/panel";
import { PlusIcon } from "../../components/icons/plus";
import { ItemForm } from "../../features/items/itemForm";

import { Modal } from "../../components/modal";
import { Button } from "../../components/button";

import s from "./style.module.css";
import { Footer } from "../footer";
import { TagForm } from "../../features/tags/tagForm";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  const notifications = useSelector(selectNotifications);

  const itemModalRef = useRef<TModalRef | null>(null);

  const handleAddItem = () => {
    itemModalRef.current?.open();
  };

  const handleItemSubmit = () => {
    itemModalRef.current?.close();
    navigate(routes.root);
  };

  return (
    <div>
      <div className={s.Page}>
        <Header />

        <main className={s.Content}>{children}</main>

        <button type="button" className={s.Add} onClick={handleAddItem}>
          <PlusIcon />
        </button>

        <Footer />
      </div>

      <div>
        {notifications.map((notification) => (
          <div key={notification.id}>{notification.text}</div>
        ))}
      </div>

      <Modal ref={itemModalRef}>
        <ItemForm onSubmit={handleItemSubmit} />
      </Modal>
    </div>
  );
};
