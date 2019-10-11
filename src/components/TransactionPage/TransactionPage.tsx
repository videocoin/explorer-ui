import React, { ReactElement, ReactNode, useEffect } from 'react';
import { map } from 'lodash/fp';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { TopBar, Typography } from 'ui-kit/src';
import Search from 'components/Search';
import BackLink from 'components/BackLink';
import css from './styles.module.scss';
import { fetchTransaction } from 'api/api';
import {
  FullTransaction,
  getTransaction,
  ReduxStore,
  SetErrorAction,
  SetLoadingAction,
  setSingleTransaction,
  SetSingleTransactionAction
} from 'store';
import { connect } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';

interface PathParamsType {
  hash: string;
}

interface TransactionSpec {
  label: string;
  value: string | ReactNode;
  highlight?: boolean;
}

interface StateProps {
  transaction: FullTransaction;
}

interface DispatchProps {
  setSingleTransaction: (
    payload: FullTransaction
  ) => SetSingleTransactionAction;
  setLoading: (payload: boolean) => SetLoadingAction;
  setError: (payload: Error | null) => SetErrorAction;
}

type TransactionPageProps = StateProps & DispatchProps;

const TransactionPage = ({
  match,
  setSingleTransaction,
  transaction
}: RouteComponentProps<PathParamsType> &
  TransactionPageProps): ReactElement => {
  const { hash } = match.params;
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res = await fetchTransaction(hash);
        const { transaction } = res.data;

        if (transaction) {
          setSingleTransaction(transaction);
        } else {
          throw new Error('Error');
        }
      } catch (e) {
        console.log('ERROR', e.response);
      }
    };
    fetchData();
    return () => {
      setSingleTransaction(null);
    };
  }, [hash, setSingleTransaction]);

  if (!transaction) return null;

  const {
    hash: transactionHash,
    blockHash,
    nonce,
    from,
    to,
    input,
    value,
    timestamp
  } = transaction;

  const specs: TransactionSpec[] = [
    {
      label: 'Amount',
      value: `${value} VID`
    },
    {
      label: 'From',
      value: <Link to={`/account/${from}`}>{from}</Link>,
      highlight: true
    },
    {
      label: 'To',
      value: <Link to={`/account/${to}`}>{to}</Link>,
      highlight: true
    },
    {
      label: '',
      value: ''
    },
    {
      label: 'Block',
      value: <Link to={`/blocks/${blockHash}`}>{blockHash}</Link>,
      highlight: true
    },
    {
      label: 'Stream',
      value:
        '0x819e8adbdedcd931588c7359d0fddbbdca02212352bc080cabb5b49de0dc4f9b',
      highlight: true
    },
    {
      label: 'Nonce',
      value: nonce
    },
    {
      label: 'Wattage',
      value: '23000/50000'
    },
    {
      label: 'Input',
      value: input
    }
  ];
  const renderSpec = ({
    label,
    value,
    highlight = false
  }: TransactionSpec): ReactNode => {
    if (!label) {
      return <li key={label} className={css.empty} />;
    }
    return (
      <li key={label}>
        <Typography>{label}</Typography>
        <Typography type="bodyAlt" theme={highlight ? 'primary' : 'light'}>
          {value}
        </Typography>
      </li>
    );
  };
  return (
    <div>
      <div className="topBar">
        <TopBar>
          <BackLink to="/blocks" />
          <div>
            <Typography type="caption">VideoCoin Network</Typography>
            <Typography type="smallTitle">Transaction</Typography>
          </div>
          <Search />
        </TopBar>
      </div>
      <div className="content">
        <div className={css.head}>
          <div>
            <Typography
              type="subtitleAlt"
              theme="white"
              weight="medium"
              className={css.blockId}
            >
              Protocol
            </Typography>
            <Typography>
              <ReactTimeAgo timeStyle="twitter" date={new Date(timestamp)} />{' '}
              Ago
            </Typography>
          </div>
          <Typography type="subtitleAlt" theme="white" weight="medium">
            {transactionHash}
          </Typography>
        </div>
        <ul className={css.spec}>{map(renderSpec)(specs)}</ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReduxStore): StateProps => ({
  transaction: getTransaction(state)
});

const dispatchProps = {
  setSingleTransaction
};

export default connect(
  mapStateToProps,
  dispatchProps
)(withRouter(TransactionPage));
