import React, { ReactElement, useEffect } from 'react';
import { Pagination, TopBar, Typography } from 'ui-kit/src';
import Search from 'components/Search';
import TransactionsTable from './TransactionsTable';
import {
  getTransactions,
  getTransactionsMeta,
  ReduxStore,
  fetchTransactions,
  Transaction
} from 'store';
import { connect } from 'react-redux';
import { Meta } from 'store/types';
import css from './styles.module.scss';

interface StateProps {
  transactions: Transaction[];
  meta: Meta;
}

interface DispatchProps {
  fetchTransactions: ({ page }: { page: number }) => void;
}

type TransactionsPageProps = StateProps & DispatchProps;

const TransactionsPage = ({
  fetchTransactions,
  transactions,
  meta
}: TransactionsPageProps): ReactElement => {
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await fetchTransactions({ page: 1 });
    };

    fetchData();
  }, [fetchTransactions]);
  const handlePageChange = (page: number): void => {
    fetchTransactions({ page });
  };
  return (
    <div>
      <div className="topBar">
        <TopBar>
          <div>
            <Typography type="caption">VideoCoin Network</Typography>
            <Typography type="smallTitle">Transactions</Typography>
          </div>
          <Search />
        </TopBar>
      </div>
      <div className="content">
        <TransactionsTable data={transactions} />
        <div className={css.pagination}>
          <Pagination onChange={handlePageChange} max={!meta.hasMore} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReduxStore): StateProps => ({
  transactions: getTransactions(state),
  meta: getTransactionsMeta(state)
});

const dispatchProps = {
  fetchTransactions
};

export default connect(
  mapStateToProps,
  dispatchProps
)(TransactionsPage);
