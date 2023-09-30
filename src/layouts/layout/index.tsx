import { FC, PropsWithChildren, useRef } from "react";
import { useSelector } from "react-redux";
import { selectNotifications } from "../../features/notifier/notifierSlice";
import { TagsList } from "../../features/tags/tagsList";
import { PeriodsList } from "../../features/periods/periodsList";
import { TModalRef } from "../../hooks/useModal";

import { PeriodForm } from "../../features/periods/periodForm";
import { Header } from "../header";
import { Panel } from "../../components/panel";

import { Modal } from "../../components/modal";
import { Button } from "../../components/button";

import s from "./style.module.css";
import { Footer } from "../footer";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const notifications = useSelector(selectNotifications);

  const tagModalRef = useRef<TModalRef | null>(null);
  const periodModalRef = useRef<TModalRef | null>(null);
  const tagsPanelRef = useRef<TModalRef | null>(null);
  const periodsPanelRef = useRef<TModalRef | null>(null);

  const handleAddTag = () => {
    tagModalRef.current?.open();
  };

  const handleStartPeriod = () => {
    periodModalRef.current?.open();
  };

  const handleToggleTags = () => {
    tagsPanelRef.current?.toggle();
  };

  const handleTogglePeriods = () => {
    periodsPanelRef.current?.toggle();
  };

  return (
    <div>
      <div className={s.Page}>
        <Header
          onPeriodsButtonClick={handleTogglePeriods}
          onTagsButtonClick={handleToggleTags}
        />

        <main className={s.Content}>{children}</main>

        <div className={s.Footer}>
          <Footer />
        </div>
      </div>

      <div>
        {notifications.map((notification) => (
          <div key={notification.id}>{notification.text}</div>
        ))}
      </div>

      <Panel ref={periodsPanelRef}>
        <Button
          block
          size="l"
          className={s.PanelAction}
          onClick={handleStartPeriod}
        >
          Start period
        </Button>

        <PeriodsList />
      </Panel>

      <Panel ref={tagsPanelRef} right>
        <Button block size="l" className={s.PanelAction} onClick={handleAddTag}>
          Add tag
        </Button>

        <TagsList />
      </Panel>

      <Modal ref={periodModalRef}>
        <PeriodForm onSubmit={() => periodModalRef.current?.close()} />
      </Modal>

      <Modal ref={tagModalRef}>
        <PeriodForm onSubmit={() => tagModalRef.current?.close()} />
      </Modal>
    </div>
  );
};
