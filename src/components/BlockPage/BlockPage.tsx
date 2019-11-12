import React, { useEffect, ReactElement, ReactNode } from 'react';
import { map, get } from 'lodash/fp';
import { RouteComponentProps, withRouter } from 'react-router';
import { Spinner, Typography } from 'ui-kit';
import css from './styles.module.scss';
import TransactionsList from 'components/LatestTransactions';
import { fetchBlock, fetchTransaction } from 'api/api';
import {
  Block,
  FullTransaction,
  getBlock,
  getIsLoading,
  ReduxStore,
  SetErrorAction,
  setLoading,
  SetLoadingAction,
  setSingleBlock,
  SetSingleBlockAction
} from 'store';
import { connect } from 'react-redux';
import PageLayout from 'components/Common/PageLayout';
import timeAgo from 'utils/timeAgo';

interface StateProps {
  isLoading: boolean;
  block: Block;
}

interface PathParamsType {
  hash: string;
}

interface BlockSpec {
  label: string;
  value: string | number;
}

interface DispatchProps {
  setSingleBlock: (payload: Block) => SetSingleBlockAction;
  setLoading: (payload: boolean) => SetLoadingAction;
  setError: (payload: Error | null) => SetErrorAction;
}

const BlockPage = ({
  match,
  setSingleBlock,
  setLoading,
  block,
  isLoading
}: RouteComponentProps<PathParamsType> &
  DispatchProps &
  StateProps): ReactElement => {
  const { hash } = match.params;
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await setLoading(true);
      try {
        const res = await fetchBlock(hash);
        const { block } = res.data;
        const transactionsRes = await Promise.all(
          map(fetchTransaction)(block.transactions)
        );
        const transactions = map(get('data.transaction'))(transactionsRes);
        setSingleBlock({ ...block, transactions });
      } catch (e) {
        console.log('ERROR', e.response);
        // Handle Error. There is a setError function defined in app.ts if you want to use it.
      }

      setLoading(false);
    };

    fetchData();
    return () => {
      setSingleBlock(null);
    };
  }, [hash, setLoading, setSingleBlock]);
  if (!block)
    return (
      <div className="content">
        <Spinner />
      </div>
    );
  const {
    size,
    timestamp,
    hash: blockHash,
    number,
    gasUsed,
    transactions
  } = block;

  const specs: BlockSpec[] = [
    {
      label: 'Value',
      value: `${gasUsed} VID`
    },
    {
      label: 'Wattage',
      value: '5662/50000'
    },
    {
      label: 'Size',
      value: size
    }
  ];
  const renderSpec = ({ label, value }: BlockSpec): ReactNode => (
    <li key={label}>
      <Typography type="smallBodyThin">{label}</Typography>
      <Typography type="body">{value}</Typography>
    </li>
  );

  return (
    <PageLayout title="Individual Block" backTo="/blocks">
      <div className={css.head}>
        <div>
          <Typography
            type="subtitle"
            theme="white"
            weight="medium"
            className={css.blockId}
          >
            {number}
          </Typography>
          <Typography>{timeAgo(timestamp)} Ago</Typography>
        </div>
        <Typography type="subtitle" theme="light">
          {blockHash}
        </Typography>
      </div>
      <ul className={css.spec}>{map(renderSpec)(specs)}</ul>
      {Boolean(transactions.length) && (
        <div className={css.list}>
          <TransactionsList data={transactions as FullTransaction[]} />
        </div>
      )}
    </PageLayout>
  );
};

const mapStateToProps = (state: ReduxStore): StateProps => ({
  isLoading: getIsLoading(state),
  block: getBlock(state)
});

const dispatchProps = {
  setSingleBlock,
  setLoading
};

export default connect(
  mapStateToProps,
  dispatchProps
)(withRouter(BlockPage));
