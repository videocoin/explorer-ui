import React, { ReactElement, useState } from 'react';
import { first, last, map } from 'lodash/fp';
import TransactionsTable from './TransactionsTable';
import { Transaction } from 'types/common';
import css from './styles.module.scss';
import PageLayout from 'components/Common/PageLayout';
import { POLL_TIMEOUT } from 'const';
import { Pagination } from 'components/Pagination/Pagination';
import useRequest from 'api/useRequest';

const Body = (): ReactElement => {
  const [meta, setMeta] = useState({
    cursor: null,
    index: null,
    prev: false,
  });
  const [shouldPoll, setShouldPoll] = useState(true);
  const { data } = useRequest<{ transactions: Transaction[] }>(
    {
      url: '/transactions',
      params: {
        limit: 10,
        'cursor.block': meta.cursor,
        'cursor.index': meta.index,
        ...(meta.prev && { prev: true }),
      },
    },
    {
      refreshInterval: shouldPoll ? POLL_TIMEOUT : 0,
    }
  );

  const handleNext = (): void => {
    setShouldPoll(false);
    if (!data) return;
    const lastTransaction = last(data.transactions);
    setMeta({
      cursor: lastTransaction ? lastTransaction.cursor?.block : meta.cursor + 1,
      index: lastTransaction ? lastTransaction.cursor?.index : meta.index,
      prev: false,
    });
  };
  const handlePrev = (): void => {
    setShouldPoll(false);
    if (!data) return;
    const firstTransaction = first(data.transactions);
    setMeta({
      cursor: firstTransaction ? firstTransaction.cursor?.block : meta.cursor,
      index: firstTransaction ? firstTransaction.cursor?.index : meta.index,
      prev: true,
    });
  };
  const mappedTransactions = map<Transaction, Transaction>(
    ({ value, ...rest }) => ({
      value: (+value / 1e18).toString(),
      ...rest,
    })
  )(data && data.transactions);

  return (
    <>
      <TransactionsTable data={mappedTransactions} />
      <div className={css.pagination}>
        <Pagination
          disabledNext={!meta.cursor || !data.transactions.length}
          disabled={!data}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </>
  );
};

const TransactionsPage = () => (
  <PageLayout title="Transactions">
    <Body />
  </PageLayout>
);

export default TransactionsPage;
