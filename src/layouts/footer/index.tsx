import { FC, useRef } from "react";
import { TModalRef } from "../../hooks/useModal";
import { ItemForm } from "../../features/items/itemForm";
import { Modal } from "../../components/modal";

import s from "./style.module.css";
import { Container } from "../container";
import { Button } from "../../components/button";
import {
  useMatch,
  useMatches,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { routes } from "../../constants/routes";
import { useStatsPage } from "../../hooks/useStatsPage";
import { ListIcon } from "../../components/icons/list";
import { StatsIcon } from "../../components/icons/stats";
import { TagIcon } from "../../components/icons/tag";
import { CalendarIcon } from "../../components/icons/calendar";
import { PlusIcon } from "../../components/icons/plus";

export type TFooterProps = {
  onTagsButtonClick: () => void;
  onPeriodsButtonClick: () => void;
};

export const Footer: FC<TFooterProps> = ({
  onTagsButtonClick,
  onPeriodsButtonClick,
}) => {
  const isStatsPage = useStatsPage();
  const navigate = useNavigate();
  const itemModalRef = useRef<TModalRef | null>(null);

  const handleAddItem = () => {
    itemModalRef.current?.open();
  };

  const handleStats = () => {
    navigate(routes.stats);
  };

  const handleItems = () => {
    navigate(routes.root);
  };

  return (
    <>
      <div className={s.Offset}></div>
      <footer className={s.Footer}>
        <Container className={s.Container}>
          <div className={s.Action}>
            <Button ghost block onClick={onPeriodsButtonClick}>
              <CalendarIcon />
            </Button>
          </div>
          <div className={s.Action}>
            <Button ghost block onClick={onTagsButtonClick}>
              <TagIcon />
            </Button>
          </div>

          <button type="button" className={s.Add} onClick={handleAddItem}>
            <PlusIcon />
          </button>

          <div className={s.Action}>
            {isStatsPage ? (
              <Button ghost block onClick={handleItems}>
                <ListIcon />
              </Button>
            ) : (
              <Button ghost block onClick={handleStats}>
                <StatsIcon />
              </Button>
            )}
          </div>
          <div className={s.Action}></div>
        </Container>
      </footer>

      <Modal ref={itemModalRef}>
        <ItemForm onSubmit={() => itemModalRef.current?.close()} />
      </Modal>
    </>
  );
};
