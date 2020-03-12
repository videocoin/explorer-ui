import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from 'ui-kit';
import css from './index.module.scss';

const BackLink = ({ to = '/' }: { to?: string }): ReactElement => {
  const history = useHistory();
  const onClick = (): void => {
    if (history.length < 3) {
      history.replace(to);
    } else {
      history.goBack();
    }
  };
  return (
    <button
      data-testid="backLink"
      type="button"
      onClick={onClick}
      className={css.btn}
    >
      <Icon color="#EEE3FF" name="back" width={24} height={24} />
    </button>
  );
};

export default BackLink;
