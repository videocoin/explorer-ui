import React, { ReactElement } from 'react';
import css from './styles.module.scss';
import { Spinner } from 'ui-kit';
import { Transaction, Block } from 'types/common';
import TransactionsList from 'components/LatestTransactions';
import BlocksList from 'components/LatestBlocks';
import PageLayout from 'components/Common/PageLayout';
import { POLL_TIMEOUT } from 'const';
import useRequest from 'api/useRequest';

const HomePage: React.FC = (): ReactElement => {
  const { data: blocks } = useRequest<{ blocks: Block[] }>(
    {
      url: '/blocks',
      params: { limit: 5 }
    },
    { refreshInterval: POLL_TIMEOUT }
  );
  const { data: transactions } = useRequest<{ transactions: Transaction[] }>(
    {
      url: '/transactions',
      params: { limit: 5 }
    },
    { refreshInterval: POLL_TIMEOUT }
  );
  if (!blocks || !transactions) {
    return (
      <PageLayout title="Block Explorer">
        <Spinner />
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Block Explorer">
      <div className={css.root}>
        <div className={css.info}>
          <BlocksList data={blocks.blocks} />
          <TransactionsList data={transactions.transactions} />
        </div>
      </div>
    </PageLayout>
  );
};

export default HomePage;
