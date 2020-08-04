import React, { ReactNode, useState } from 'react';
import { first, last } from 'lodash/fp';
import { Spinner, Table, Typography } from 'ui-kit';
import { uniqueId } from 'lodash/fp';
import css from './styles.module.scss';
import { convertToVID } from 'utils/convertBalance';
import timeAgo from 'utils/timeAgo';
import useRequest from 'api/useRequest';
import { POLL_TIMEOUT } from 'const';
import { Pagination } from '../Pagination/Pagination';

export const PAYMENT_URL = process.env.REACT_APP_PAYMENTS_API_URL;

const fields = [
  {
    name: 'age',
    label: 'Age',
  },
  {
    name: 'localBlockHash',
    label: 'VideoCoin Txn',
  },
  {
    name: 'foreignHash',
    label: 'Public Mint Txn',
  },
  {
    name: 'signer',
    label: 'Payment Sender',
  },
  {
    name: 'value',
    label: 'Payment',
  },
];

const renderRow = (row: any): ReactNode => {
  const { localTimestamp, localBlockHash, foreignHash, signer, value } = row;
  return (
    <tr key={uniqueId('event')} className={css.row}>
      <td className={css.timeCell}>{timeAgo(+localTimestamp * 1000)}</td>
      <td>{localBlockHash}</td>
      <td>{foreignHash}</td>
      <td>{signer}</td>
      <td>${convertToVID(value)}</td>
    </tr>
  );
};

const Payments = ({ address }: { address: string }) => {
  const [meta, setMeta] = useState<{ cursor: string; prev?: boolean }>({
    cursor: '',
  });
  const { data } = useRequest<{ transactions: any[] }>(
    {
      url: address ? `${PAYMENT_URL}/transactions` : null,
      params: {
        receiver: address,
        limit: '10',
        ...(meta.cursor && { cursor: meta.cursor }),
        ...(meta.prev && { prev: 'true' }),
      },
    },
    {
      refreshInterval: POLL_TIMEOUT,
    }
  );
  if (!address) return null;
  console.log(meta.cursor);
  if (!data && !meta.cursor) return <Spinner />;
  const { transactions } = data;
  const handleNext = (): void => {
    const lastTransaction = last(transactions);
    setMeta({
      cursor: lastTransaction ? lastTransaction.cursor : meta.cursor + 1,
      prev: false,
    });
  };
  const handlePrev = (): void => {
    const firstTransaction = first(transactions);
    setMeta({
      cursor: firstTransaction ? firstTransaction.cursor : meta.cursor,
      prev: true,
    });
  };

  return (
    <div>
      <div className={css.head}>
        <Typography type="subtitleCaps">Network Transactions</Typography>
      </div>
      <Table fields={fields} data={transactions} renderRow={renderRow} />;
      <div className={css.pagination}>
        <Pagination
          disabledPrev={transactions.length && transactions.length < 10}
          disabled={!data}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default Payments;
