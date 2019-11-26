import React, { ReactElement, useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Spinner, Typography } from 'ui-kit';
import { eq, first, last } from 'lodash/fp';
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
import { Pagination } from 'components/Pagination/Pagination';
import { convertToVID } from 'utils/convertBalance';
import css from './styles.module.scss';
import getTime from 'utils/getTime';

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
    before,
    after
  }: {
    hash: string;
    before?: number;
    after?: number;
  }) => void;
  fetchAccountActions: ({
    hash,
    after,
    before
  }: {
    hash: string;
    after?: number;
    before?: number;
  }) => void;
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
        await fetchAccountTransactions({ hash });
        await fetchAccountActions({ hash });
        const { account } = res.data;

        if (account) {
          setAccount({ ...account, balance: convertToVID(account.balance) });
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

  const switchTab = (tab: string) => () => setTab(tab);
  const isActiveTab = eq(tab);
  const { balance } = account;
  const handleTransactionsNext = (): void => {
    fetchAccountTransactions({
      hash,
      before: getTime(last(transactions).timestamp),
      after: null
    });
  };
  const handleTransactionsPrev = (): void => {
    fetchAccountActions({
      hash,
      after: getTime(first(transactions).timestamp),
      before: null
    });
  };
  const handleEventsNext = (): void => {
    fetchAccountActions({
      hash,
      before: getTime(last(transactions).timestamp),
      after: null
    });
  };
  const handleEventsPrev = (): void => {
    fetchAccountTransactions({
      hash,
      after: getTime(first(transactions).timestamp),
      before: null
    });
  };
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
          {actions.length >= 20 && (
            <div className={css.pagination}>
              <Pagination onPrev={handleEventsPrev} onNext={handleEventsNext} />
            </div>
          )}
        </>
      )}
      {tab === 'transactions' && (
        <>
          <TransactionsTable data={transactions} />
          <div className={css.pagination}>
            <Pagination
              onPrev={handleTransactionsPrev}
              onNext={handleTransactionsNext}
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

export default connect(mapStateToProps, dispatchProps)(withRouter(AccountPage));
