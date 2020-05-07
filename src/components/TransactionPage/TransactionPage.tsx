import React, { ReactElement, ReactNode } from 'react';
import { map } from 'lodash/fp';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Typography } from 'ui-kit';
import css from './styles.module.scss';
import { FullTransaction } from 'types/common';
import PageLayout from 'components/Common/PageLayout';
import decodeInput from 'utils/decodeInput';
import timeAgo from 'utils/timeAgo';
import { convertToVID } from 'utils/convertBalance';
import useRequest from 'api/useRequest';

interface TransactionSpec {
  label: string;
  value: string | ReactNode;
  highlight?: boolean;
}

const Body = (): ReactElement => {
  const { hash } = useParams();
  const history = useHistory();
  const { data } = useRequest<{ transaction: FullTransaction }>({
    url: `/transaction/${hash}`,
  });

  if (!data.transaction) {
    setTimeout(() => {
      history.replace('/no-results');
    }, 100);
    return null;
  }
  const transaction = {
    ...data.transaction,
    value: convertToVID(data.transaction.value),
  };

  const {
    hash: transactionHash,
    blockHash,
    nonce,
    from,
    to,
    input,
    value,
    timestamp,
  } = transaction;

  const decodedInput = JSON.stringify(decodeInput(input), null, 4);

  const specs: TransactionSpec[] = [
    {
      label: 'Amount',
      value: `${value} VID`,
    },
    {
      label: 'From',
      value: <Link to={`/account/${from}`}>{from}</Link>,
      highlight: true,
    },
    {
      label: 'To',
      value: <Link to={`/account/${to}`}>{to}</Link>,
      highlight: true,
    },
    {
      label: '',
      value: '',
    },
    {
      label: 'Block',
      value: <Link to={`/blocks/${blockHash}`}>{blockHash}</Link>,
      highlight: true,
    },
    {
      label: 'Nonce',
      value: nonce,
    },
    {
      label: 'Wattage',
      value: '23000/50000',
    },
    {
      label: 'Input',
      value: <pre>{decodedInput}</pre>,
    },
  ];
  const renderSpec = ({
    label,
    value,
    highlight = false,
  }: TransactionSpec): ReactNode => {
    if (!label) {
      return <li key={label} className={css.empty} />;
    }
    return (
      <li key={label}>
        <Typography type="smallBodyThin">{label}</Typography>
        <Typography type="body" theme={highlight ? 'sunkissed' : 'light'}>
          {value}
        </Typography>
      </li>
    );
  };

  return (
    <>
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
          <Typography>{timeAgo(timestamp)}</Typography>
        </div>
        <Typography type="subtitle" theme="light">
          {transactionHash}
        </Typography>
      </div>
      <ul className={css.spec}>{map(renderSpec)(specs)}</ul>
    </>
  );
};

const TransactionPage = () => (
  <PageLayout title="Transaction" backTo="/transactions">
    <Body />
  </PageLayout>
);

export default TransactionPage;
