import React, { ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Typography } from 'ui-kit';
import { eq, first, last, map } from 'lodash/fp';
import { Account, Transaction, AccountEvent } from 'types/common';
import PageLayout from 'components/Common/PageLayout';
import TransactionsTable from 'components/TransactionsPage/TransactionsTable';
import EventsTable from 'components/EventsTable';
import { Pagination } from 'components/Pagination/Pagination';
import { convertToVID } from 'utils/convertBalance';
import css from './styles.module.scss';
import getTime from 'utils/getTime';
import useRequest from 'api/useRequest';

const AccountPage = (): ReactElement => {
  const { hash } = useParams();
  const [transactionsMeta, setTransactionsMeta] = useState({
    before: null,
    after: null
  });
  const [actionsMeta, setActionsMeta] = useState({
    before: null,
    after: null
  });
  const { data: account } = useRequest<{ account: Account }>({
    url: `/account/${hash}`,
    params: {
      before: transactionsMeta.before,
      after: transactionsMeta.after
    }
  });
  const { data: transactions } = useRequest<{ transactions: Transaction[] }>({
    url: `/address/${hash}`
  });
  const { data: actions } = useRequest<{ actions: AccountEvent[] }>({
    url: `/actions/${hash}`
  });
  const [tab, setTab] = useState('transactions');

  if (!account)
    return (
      <div className="content">
        <Spinner />
      </div>
    );
  const mappedAccount = {
    ...account,
    balance: convertToVID(account.account.balance)
  };

  const switchTab = (tab: string) => () => setTab(tab);
  const isActiveTab = eq(tab);
  const { balance } = mappedAccount;
  const handleTransactionsNext = (): void => {
    setTransactionsMeta({
      before: getTime(last(transactions.transactions).timestamp),
      after: null
    });
  };
  const handleTransactionsPrev = (): void => {
    setTransactionsMeta({
      after: getTime(first(transactions.transactions).timestamp),
      before: null
    });
  };
  const handleEventsNext = (): void => {
    setActionsMeta({
      before: getTime(last(actions.actions).timestamp),
      after: null
    });
  };
  const handleEventsPrev = (): void => {
    setActionsMeta({
      after: getTime(first(actions.actions).timestamp),
      before: null
    });
  };
  const mappedTransactions = map<Transaction, Transaction>(
    ({ value, ...rest }) => ({
      value: (+value / 1e18).toString(),
      ...rest
    })
  )(transactions && transactions.transactions);
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
          <EventsTable data={actions.actions} />
          {actions.actions.length >= 20 && (
            <div className={css.pagination}>
              <Pagination onPrev={handleEventsPrev} onNext={handleEventsNext} />
            </div>
          )}
        </>
      )}
      {tab === 'transactions' && (
        <>
          <TransactionsTable data={mappedTransactions} />
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

export default AccountPage;
