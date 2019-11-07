import React, { ReactElement, ReactNode, useEffect } from 'react';
import { map } from 'lodash/fp';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Spinner, Typography } from 'ui-kit';
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
import PageLayout from 'components/Common/PageLayout';
import decodeInput from 'utils/decodeInput';
import timeAgo from 'utils/timeAgo';

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
  history,
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
          setSingleTransaction({
            ...transaction,
            value: transaction.value / 1e18
          });
        } else {
          history.replace('/no-results');
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
  }, [hash, history, setSingleTransaction]);

  if (!transaction)
    return (
      <div className="content">
        <Spinner />
      </div>
    );

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

  const decodedInput = JSON.stringify(decodeInput(input), null, 4);

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
      label: 'Nonce',
      value: nonce
    },
    {
      label: 'Wattage',
      value: '23000/50000'
    },
    {
      label: 'Input',
      value: <pre>{decodedInput}</pre>
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
        <Typography type="body" theme={highlight ? 'primary' : 'light'}>
          {value}
        </Typography>
      </li>
    );
  };

  return (
    <PageLayout title="Transaction" backTo="/transactions">
      <div className={css.head}>
        <div>
          <Typography
            type="subtitle"
            theme="white"
            weight="medium"
            className={css.blockId}
          >
            Protocol
          </Typography>
          <Typography>{timeAgo(timestamp)} Ago</Typography>
        </div>
        <Typography type="subtitle" theme="white" weight="medium">
          {transactionHash}
        </Typography>
      </div>
      <ul className={css.spec}>{map(renderSpec)(specs)}</ul>
    </PageLayout>
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
