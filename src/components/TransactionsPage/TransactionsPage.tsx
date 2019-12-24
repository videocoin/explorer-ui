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

interface StateProps {
  transactions: Transaction[];
  meta: Meta;
  isLoading: boolean;
}

interface DispatchProps {
  fetchTransactions: ({
    before,
    after
  }: {
    before?: number;
    after?: number;
  }) => void;
  setLoading: (payload: boolean) => SetLoadingAction;
  setError: (payload: Error | null) => SetErrorAction;
}

type TransactionsPageProps = StateProps & DispatchProps;

const TransactionsPage = ({
  fetchTransactions,
  transactions,
  setLoading,
  isLoading
}: TransactionsPageProps): ReactElement => {
  const timer = useRef<number>();
  const startPoll = useCallback(
    (timeout: number) => {
      timer.current = (setTimeout(async () => {
        try {
          await fetchTransactions({});
        } finally {
          setLoading(false);
          startPoll(POLL_TIMEOUT);
        }
      }, timeout) as unknown) as number;
    },
    [fetchTransactions, setLoading]
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
