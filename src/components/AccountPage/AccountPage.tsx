import React, { ReactElement, useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Pagination, Spinner, Typography } from 'ui-kit';
import { eq } from 'lodash/fp';
import { fetchAccount } from 'api/api';
import {
  Account,
  setAccount,
  getAccount,
  ReduxStore,
  SetAccountAction,
  setAccountTransactions,
  setAccountActions,
  fetchAccountActions,
  fetchAccountTransactions,
  getAccountActions,
  getAccountActionsMeta,
  getAccountTransactions,
  getAccountTransactionsMeta,
  Transaction
} from 'store';
import { connect } from 'react-redux';
import PageLayout from 'components/Common/PageLayout';
import { AccountEvent, Meta } from 'store/types';
import TransactionsTable from 'components/TransactionsPage/TransactionsTable';
import EventsTable from 'components/EventsTable';
import css from './styles.module.scss';

interface PathParamsType {
  hash: string;
}

interface StateProps {
  account: Account;
  transactions: Transaction[];
  actions: AccountEvent[];
  transactionsMeta: Meta;
  actionsMeta: Meta;
}

interface DispatchProps {
  setAccount: (payload: Account) => SetAccountAction;
  fetchAccountTransactions: ({
    hash,
    page
  }: {
    hash: string;
    page: number;
  }) => void;
  fetchAccountActions: ({ hash, page }: { hash: string; page: number }) => void;
}

type AccountPageProps = StateProps & DispatchProps;

const AccountPage = ({
  match,
  setAccount,
  account,
  transactions,
  transactionsMeta,
  fetchAccountTransactions,
  fetchAccountActions,
  actionsMeta,
  actions
}: RouteComponentProps<PathParamsType> & AccountPageProps): ReactElement => {
  const { hash } = match.params;
  const [tab, setTab] = useState('transactions');
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res = await fetchAccount(hash);
        await fetchAccountTransactions({ hash, page: 1 });
        await fetchAccountActions({ hash, page: 1 });
        const { account } = res.data;

        if (account) {
          setAccount(account);
        } else {
          throw new Error('Error');
        }
      } catch (e) {
        console.log('ERROR', e.response);
      }
    };
    fetchData();
    return () => {
      setAccount(null);
    };
  }, [fetchAccountActions, fetchAccountTransactions, hash, setAccount]);

  if (!account)
    return (
      <div className="content">
        <Spinner />
      </div>
    );

  const handleTransactionPageChange = (page: number): void => {
    fetchAccountTransactions({ hash, page });
  };
  const handleActionsPageChange = (page: number): void => {
    fetchAccountActions({ hash, page });
  };
  const switchTab = (tab: string) => () => setTab(tab);
  const isActiveTab = eq(tab);
  const { balance } = account;

  return (
    <PageLayout title="Account" backTo="/blocks">
      <div className={css.head}>
        <div>
          <Typography
            type="subtitle"
            theme="white"
            weight="medium"
            className={css.balance}
          >
            <span>{balance}</span> VID
          </Typography>
        </div>
        <Typography type="subtitle" theme="light">
          {hash}
        </Typography>
      </div>
      <div className={css.tabNav}>
        <button
          type="button"
          className={isActiveTab('transactions') ? css.tabActive : ''}
          onClick={switchTab('transactions')}
        >
          Transactions
        </button>
        <button
          type="button"
          className={isActiveTab('events') ? css.tabActive : ''}
          onClick={switchTab('events')}
        >
          Events
        </button>
      </div>
      {tab === 'events' && (
        <>
          <EventsTable data={actions} />
          <div className={css.pagination}>
            <Pagination
              onChange={handleActionsPageChange}
              max={!actionsMeta.hasMore}
            />
          </div>
        </>
      )}
      {tab === 'transactions' && (
        <>
          <TransactionsTable data={transactions} />
          <div className={css.pagination}>
            <Pagination
              onChange={handleTransactionPageChange}
              max={!transactionsMeta.hasMore}
            />
          </div>
        </>
      )}
    </PageLayout>
  );
};

const mapStateToProps = (state: ReduxStore): StateProps => ({
  account: getAccount(state),
  transactions: getAccountTransactions(state),
  transactionsMeta: getAccountTransactionsMeta(state),
  actions: getAccountActions(state),
  actionsMeta: getAccountActionsMeta(state)
});

const dispatchProps = {
  setAccount,
  setAccountTransactions,
  setAccountActions,
  fetchAccountActions,
  fetchAccountTransactions
};

export default connect(
  mapStateToProps,
  dispatchProps
)(withRouter(AccountPage));
