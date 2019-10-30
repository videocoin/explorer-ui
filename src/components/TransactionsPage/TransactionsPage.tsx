import React, { ReactElement, useCallback, useEffect, useRef } from 'react';
import { Pagination, Spinner } from 'ui-kit';
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

interface StateProps {
  transactions: Transaction[];
  meta: Meta;
  isLoading: boolean;
}

interface DispatchProps {
  fetchTransactions: ({ page }: { page: number }) => void;
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
          try {
            await fetchTransactions({ page: meta.page });
          } catch (e) {
            console.log('ERROR', e.response);
            // Handle Error. There is a setError function defined in app.ts if you want to use it.
          }
        } finally {
          startPoll(POLL_TIMEOUT);
        }
      }, timeout) as unknown) as number;
    },
    [fetchTransactions, meta.page]
  );

  useEffect(() => {
    startPoll(0);
    return () => {
      clearTimeout(timer.current);
    };
  }, [transactions.length, startPoll]);

  const handlePageChange = (page: number): void => {
    fetchTransactions({ page });
  };
  return (
    <PageLayout title="Transactions">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <TransactionsTable data={transactions} />
          <div className={css.pagination}>
            <Pagination onChange={handlePageChange} max={!meta.hasMore} />
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

export default connect(
  mapStateToProps,
  dispatchProps
)(TransactionsPage);
