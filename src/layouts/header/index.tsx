import { FC } from "react";

import s from "./style.module.css";
import { Button } from "../../components/button";
import { Container } from "../../components/container";

export type THeaderProps = {
  onTagsButtonClick: () => void;
  onPeriodsButtonClick: () => void;
};

export const Header: FC<THeaderProps> = ({
  onTagsButtonClick,
  onPeriodsButtonClick,
}) => {
  return (
    <header className={s.Header}>
      <Container className={s.Container}>
        <Button ghost onClick={onPeriodsButtonClick}>Periods</Button>
        <Button ghost onClick={onTagsButtonClick}>Tags</Button>
      </Container>
    </header>
  );
};
