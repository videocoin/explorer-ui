import React, { ReactElement, useEffect } from 'react';
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
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (!transactions.length) {
        await setLoading(true);
      }
      try {
        await fetchTransactions({ page: 1 });
      } catch (e) {
        throw e;
      }
      setLoading(false);
    };

    fetchData();
  }, [fetchTransactions, setLoading, transactions.length]);
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
