import { FC, useRef } from "react";

import s from "./style.module.css";
import { Button } from "../../components/button";
import { Container } from "../container";
import { useNavigate } from "react-router-dom";
import { useStatsPage } from "../../hooks/useStatsPage";
import { routes } from "../../constants/routes";
import { BackIcon } from "../../components/icons/back";
import { useSelector } from "react-redux";
import {
  selectActiveInterval,
  selectActivePeriod,
  selectLastPeriodId,
} from "../../features/periods/periodsSlice";
import { formatInterval } from "../../utils/intervals";
import { CalendarIcon } from "../../components/icons/calendar";
import { TModalRef } from "../../hooks/useModal";
import { Panel } from "../../components/panel";
import { PeriodsList } from "../../features/periods/periodsList";
import { Modal } from "../../components/modal";
import { PeriodForm } from "../../features/periods/periodForm";
import { TagsList } from "../../features/tags/tagsList";
import { TagForm } from "../../features/tags/tagForm";
import { TagIcon } from "../../components/icons/tag";

export const Header = () => {
  const interval = useSelector(selectActiveInterval);
  const activePeriod = useSelector(selectActivePeriod);
  const lastPeriodId = useSelector(selectLastPeriodId);

  const periodModalRef = useRef<TModalRef | null>(null);
  const periodsPanelRef = useRef<TModalRef | null>(null);
  const tagModalRef = useRef<TModalRef | null>(null);
  const tagsPanelRef = useRef<TModalRef | null>(null);

  const subtitle =
    activePeriod?.id === lastPeriodId ? "Текущий период" : "Завершенный период";

  const handlePeriodClick = () => {
    periodsPanelRef.current?.toggle();
  };

  const handleStartPeriod = () => {
    periodModalRef.current?.open();
  };

  const handleAddTag = () => {
    tagModalRef.current?.open();
  };

  const handleToggleTags = () => {
    tagsPanelRef.current?.toggle();
  };

  return (
    <>
      <header className={s.Header}>
        <Container className={s.Container}>
          <div className={s.Left} onClick={handlePeriodClick}>
            <CalendarIcon />
            <div>
              <div className={s.Title}>{formatInterval(interval)}</div>
              <div className={s.Subtitle}>{subtitle}</div>
            </div>
          </div>
          <div>
            <Button ghost block onClick={handleToggleTags}>
              <TagIcon />
            </Button>
          </div>
        </Container>
      </header>
      <Panel ref={periodsPanelRef} >
        <Button
          block
          size="l"
          className={s.PanelAction}
          onClick={handleStartPeriod}
        >
          Start period
        </Button>

        <PeriodsList onSelect={() => periodsPanelRef.current?.close()} />
      </Panel>
      <Modal ref={periodModalRef}>
        <PeriodForm onSubmit={() => periodModalRef.current?.close()} />
      </Modal>

      <Panel ref={tagsPanelRef} right>
        <Button block size="l" className={s.PanelAction} onClick={handleAddTag}>
          Add tag
        </Button>

        <TagsList />
      </Panel>

      <Modal ref={tagModalRef}>
        <TagForm onSubmit={() => tagModalRef.current?.close()} />
      </Modal>
    </>
  );
};
