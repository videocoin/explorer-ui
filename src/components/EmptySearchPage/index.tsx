import React, { ReactElement } from 'react';
import bg from './assets/bg.svg';
import { Typography } from 'ui-kit';
import css from './styles.module.scss';
import PageLayout from 'components/Common/PageLayout';

const EmptySearchResult = (): ReactElement => {
  return (
    <PageLayout title="Block Explorer">
      <div className={css.root}>
        <img src={bg} alt="" />
        <Typography className={css.title} type="display3">
          No Search Results
        </Typography>
        <Typography type="body">
          Double check the id that you're searching
        </Typography>
      </div>
    </PageLayout>
  );
};

export default EmptySearchResult;
