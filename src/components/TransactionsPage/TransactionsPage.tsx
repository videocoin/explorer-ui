import React, { ReactElement, useCallback, useEffect, useRef } from 'react';
import { Spinner } from 'ui-kit';
import { first, last } from 'lodash/fp';
import TransactionsTable from './TransactionsTable';
import {
  getTransactions,
  getTransactionsMeta,
  ReduxStore,
  fetchTransactions,
  Transaction,
  SetLoadingAction,
  SetErrorAction,
  getIsLoading,
  setLoading
} from 'store';
import { connect } from 'react-redux';
import { Meta } from 'store/types';
import css from './styles.module.scss';
import PageLayout from 'components/Common/PageLayout';
import { POLL_TIMEOUT } from 'const';
import { Pagination } from 'components/Pagination/Pagination';
import getTime from 'utils/getTime';

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
  meta,
  setLoading,
  isLoading
}: TransactionsPageProps): ReactElement => {
  const timer = useRef<number>();
  const startPoll = useCallback(
    (timeout: number) => {
      timer.current = (setTimeout(async () => {
        try {
          await fetchTransactions({ before: meta.before, after: meta.after });
        } finally {
          setLoading(false);
          startPoll(POLL_TIMEOUT);
        }
      }, timeout) as unknown) as number;
    },
    [fetchTransactions, meta.after, meta.before, setLoading]
  );

  useEffect(() => {
    startPoll(0);
    return () => {
      clearTimeout(timer.current);
    };
  }, [startPoll]);

  const handleNext = (): void => {
    clearTimeout(timer.current);
    fetchTransactions({
      before: getTime(last(transactions).timestamp),
      after: null
    });
  };
  const handlePrev = (): void => {
    clearTimeout(timer.current);
    fetchTransactions({
      after: getTime(first(transactions).timestamp),
      before: null
    });
  };
  return (
    <PageLayout title="Transactions">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <TransactionsTable data={transactions} />
          <div className={css.pagination}>
            <Pagination onPrev={handlePrev} onNext={handleNext} />
          </div>
        </>
      )}
    </PageLayout>
  );
};

const mapStateToProps = (state: ReduxStore): StateProps => ({
  transactions: getTransactions(state),
  meta: getTransactionsMeta(state),
  isLoading: getIsLoading(state)
});

const dispatchProps = {
  fetchTransactions,
  setLoading
};

export default connect(mapStateToProps, dispatchProps)(TransactionsPage);
