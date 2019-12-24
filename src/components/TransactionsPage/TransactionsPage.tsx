import React, { ReactElement, useState } from 'react';
import { Spinner } from 'ui-kit';
import { first, last, map } from 'lodash/fp';
import TransactionsTable from './TransactionsTable';
import { Transaction } from 'types/common';
import css from './styles.module.scss';
import PageLayout from 'components/Common/PageLayout';
import { POLL_TIMEOUT } from 'const';
import { Pagination } from 'components/Pagination/Pagination';
import getTime from 'utils/getTime';
import useRequest from 'api/useRequest';

const TransactionsPage = (): ReactElement => {
  const [meta, setMeta] = useState({
    before: null,
    after: null
  });
  const [shouldPoll, setShouldPoll] = useState(true);
  const { data } = useRequest<{ transactions: Transaction[] }>(
    {
      url: '/transactions',
      params: {
        before: meta.before,
        after: meta.after
      }
    },
    {
      refreshInterval: shouldPoll ? POLL_TIMEOUT : 0
    }
  );

  const handleNext = (): void => {
    setShouldPoll(false);
    if (!data) return;
    setMeta({
      before: getTime(last(data.transactions).timestamp),
      after: null
    });
  };
  const handlePrev = (): void => {
    setShouldPoll(false);
    if (!data) return;
    setMeta({
      after: getTime(first(data.transactions).timestamp),
      before: null
    });
  };
  const mappedTransactions = map<Transaction, Transaction>(
    ({ value, ...rest }) => ({
      value: (+value / 1e18).toString(),
      ...rest
    })
  )(data && data.transactions);

  return (
    <PageLayout title="Transactions">
      {!data ? (
        <Spinner />
      ) : (
        <>
          <TransactionsTable data={mappedTransactions} />
          <div className={css.pagination}>
            <Pagination
              disabled={!data}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default TransactionsPage;
