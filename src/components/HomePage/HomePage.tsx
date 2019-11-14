import React, { useEffect, ReactElement, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import css from './styles.module.scss';

import { fetchBlocks, fetchTransactions } from 'api/api';
import {
  setLatestBlocks,
  setLoading,
  SetLoadingAction,
  getIsLoading,
  getLatestBlocks,
  ReduxStore,
  SetErrorAction,
  getLatestTransactions,
  Transaction,
  setLatestTransactions,
  SetLatestTransactionsAction,
  Block,
  SetLatestBlocksAction
} from 'store';
import InfoBlocks from 'components/HomePage/InfoBlocks';
import TransactionsList from 'components/LatestTransactions';
import BlocksList from 'components/LatestBlocks';
import PageLayout from 'components/Common/PageLayout';
import { POLL_TIMEOUT } from 'const';

interface StateProps {
  isLoading: boolean;
  blocks: Block[];
  transactions: Transaction[];
}

interface DispatchProps {
  setLatestBlocks: (payload: Block[]) => SetLatestBlocksAction;
  setLatestTransactions: (
    payload: Transaction[]
  ) => SetLatestTransactionsAction;
  setLoading: (payload: boolean) => SetLoadingAction;
  setError: (payload: Error | null) => SetErrorAction;
}

type HomePageProps = StateProps & DispatchProps;

const HomePage: React.FC<HomePageProps> = ({
  blocks,
  setLoading,
  transactions,
  setLatestTransactions,
  setLatestBlocks
}): ReactElement => {
  const timer = useRef<number>();
  const startPoll = useCallback(
    (timeout: number) => {
      timer.current = (setTimeout(async () => {
        try {
          const [blocksRes, transactionsRes] = await Promise.all([
            fetchBlocks({ limit: 5, offset: 0 }),
            fetchTransactions({ limit: 5, offset: 0 })
          ]);
          const { blocks } = blocksRes.data;
          const { transactions } = transactionsRes.data;
          if (transactions) {
            setLatestTransactions(transactions);
          }
          if (blocks) {
            setLatestBlocks(blocks);
          } else {
            throw new Error('Error');
          }
        } catch (e) {
          console.log('ERROR', e.response);
          // Handle Error. There is a setError function defined in app.ts if you want to use it.
        } finally {
          startPoll(POLL_TIMEOUT);
        }
      }, timeout) as unknown) as number;
    },
    [setLatestBlocks, setLatestTransactions]
  );
  useEffect(() => {
    startPoll(0);
    return () => {
      clearTimeout(timer.current);
    };
  }, [setLatestBlocks, setLatestTransactions, startPoll]);

  return (
    <PageLayout title="Block Explorer">
      <div className={css.root}>
        <InfoBlocks />
        <div className={css.info}>
          <BlocksList data={blocks} />
          <TransactionsList data={transactions} />
        </div>
      </div>
    </PageLayout>
  );
};

const mapStateToProps = (state: ReduxStore): StateProps => ({
  isLoading: getIsLoading(state),
  blocks: getLatestBlocks(state),
  transactions: getLatestTransactions(state)
});

const dispatchProps = {
  setLatestBlocks,
  setLoading,
  setLatestTransactions
};

export default connect(mapStateToProps, dispatchProps)(HomePage);
