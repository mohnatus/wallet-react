import { FC, useRef } from "react";
import { TModalRef } from "../../hooks/useModal";
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


export const Footer = () => {
  const isStatsPage = useStatsPage();
  const navigate = useNavigate();

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
            {isStatsPage ? (
              <Button ghost block onClick={handleItems}>
                <ListIcon /> Траты
              </Button>
            ) : (
              <Button ghost block onClick={handleStats}>
                <StatsIcon /> Статистика
              </Button>
            )}
          </div>
          <div className={s.Action}></div>
        </Container>
      </footer>
    </>
  );
};
