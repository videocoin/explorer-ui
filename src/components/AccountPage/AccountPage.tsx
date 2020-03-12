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
import useRequest from 'api/useRequest';

const AccountPage = (): ReactElement => {
  const { hash } = useParams();
  const [transactionsMeta, setTransactionsMeta] = useState({
    cursor: null,
    index: null,
    prev: false
  });
  const [actionsMeta, setActionsMeta] = useState({
    cursor: null,
    index: null,
    prev: false
  });
  const { data: account } = useRequest<{ account: Account }>({
    url: `/account/${hash}`
  });
  const { data: transactions } = useRequest<{ transactions: Transaction[] }>({
    url: `/address/${hash}`,
    params: {
      limit: 10,
      'cursor.block': transactionsMeta.cursor,
      'cursor.index': transactionsMeta.index,
      ...(transactionsMeta.prev && { prev: true })
    }
  });
  const { data: actions } = useRequest<{ actions: AccountEvent[] }>({
    url: `/actions/${hash}`,
    params: {
      limit: 10,
      'cursor.block': actionsMeta.cursor,
      'cursor.index': actionsMeta.index,
      ...(actionsMeta.prev && { prev: true })
    }
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
    const lastTransaction = last(transactions.transactions);
    setTransactionsMeta({
      cursor: lastTransaction
        ? lastTransaction.cursor?.block
        : transactionsMeta.cursor + 1,
      index: lastTransaction
        ? lastTransaction.cursor?.index
        : transactionsMeta.index,
      prev: false
    });
  };
  const handleTransactionsPrev = (): void => {
    const firstTransaction = first(transactions.transactions);
    setTransactionsMeta({
      cursor: firstTransaction
        ? firstTransaction.cursor?.block
        : transactionsMeta.cursor,
      index: firstTransaction
        ? firstTransaction.cursor?.index
        : transactionsMeta.index,
      prev: true
    });
  };
  const handleEventsNext = (): void => {
    const lastAction = last(actions.actions);
    setActionsMeta({
      cursor: lastAction ? lastAction.cursor?.block : actionsMeta.cursor + 1,
      index: lastAction ? lastAction.cursor?.index : actionsMeta.index,
      prev: false
    });
  };
  const handleEventsPrev = (): void => {
    const firstAction = first(actions.actions);
    setActionsMeta({
      cursor: firstAction ? firstAction.cursor?.block : actionsMeta.cursor,
      index: firstAction ? firstAction.cursor?.index : actionsMeta.index,
      prev: true
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
      <div data-testid="accountHead" className={css.head}>
        <div>
          <Typography
            type="subtitle"
            theme="white"
            weight="medium"
            className={css.balance}
          >
            <span data-testid="accountBalance">{balance}</span> VID
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
      {!actions || !transactions ? (
        <Spinner />
      ) : (
        <>
          {tab === 'events' && (
            <>
              <EventsTable data={actions.actions} />
              {(!actions.actions.length || last(actions.actions)?.cursor) && (
                <div className={css.pagination}>
                  <Pagination
                    disabledNext={
                      !actionsMeta.cursor || !actions.actions.length
                    }
                    onPrev={handleEventsPrev}
                    onNext={handleEventsNext}
                  />
                </div>
              )}
            </>
          )}
          {tab === 'transactions' && (
            <>
              <TransactionsTable data={mappedTransactions} />
              {(!transactions.transactions.length ||
                last(transactions.transactions)?.cursor) && (
                <div className={css.pagination}>
                  <Pagination
                    onPrev={handleTransactionsPrev}
                    onNext={handleTransactionsNext}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </PageLayout>
  );
};

export default AccountPage;
