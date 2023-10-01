import { FC } from "react";

import s from "./style.module.css";
import { Button } from "../button";
import { Container } from "../../layouts/container";
import { useNavigate } from "react-router-dom";
import { useStatsPage } from "../../hooks/useStatsPage";
import { routes } from "../../constants/routes";
import { BackIcon } from "../icons/back";

export type THeaderProps = {
  title?: string;
  subtitle?: string;
};

export const Header: FC<THeaderProps> = ({ title, subtitle }) => {
  const isStatsPage = useStatsPage();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(routes.root);
  };
  return (
    <header className={s.Header}>
      <Container className={s.Container}>
        <div className={s.Left}>
          {isStatsPage && (
            <Button rect ghost onClick={handleBack}>
              <BackIcon />
            </Button>
          )}
          <div>
            {title && <div className={s.Title}>{title}</div>}
            {subtitle && <div className={s.Subtitle}>{subtitle}</div>}
          </div>
        </div>
      </Container>
    </header>
  );
};
