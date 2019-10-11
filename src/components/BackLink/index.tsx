import React, { ReactElement } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Icon } from 'ui-kit';
import css from './index.module.scss';

const BackLink = ({
  to = '/',
  history
}: { to?: string } & RouteComponentProps): ReactElement => {
  const onClick = (): void => {
    if (history.length) {
      history.goBack();
    } else {
      history.replace(to);
    }
  };
  return (
    <button type="button" onClick={onClick} className={css.btn}>
      <Icon color="#EEE3FF" name="back" width={24} height={24} />
    </button>
  );
};

export default withRouter(BackLink);
