import { FC } from "react";

import s from "./style.module.css";
import { Button } from "../button";
import { Container } from "../container";
import { Link, useNavigate } from "react-router-dom";
import { useStatsPage } from "../../hooks/useStatsPage";
import { routes } from '../../constants/routes';

export type THeaderProps = {
  title?: string;
};

export const Header: FC<THeaderProps> = ({ title }) => {
  const isStatsPage = useStatsPage()
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(routes.root);
  };
  return (
    <header className={s.Header}>
      <Container className={s.Container}>
        <div className={s.Left}>
          {isStatsPage && (
            <Button ghost onClick={handleBack}>
              &lt;
            </Button>
          )}
          {title && <div className={s.Title}>{title}</div>}
        </div>
      </Container>
    </header>
  );
};
