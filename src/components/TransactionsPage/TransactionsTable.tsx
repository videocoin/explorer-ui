import React, { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Field, Icon, Table } from 'ui-kit';
import css from './styles.module.scss';
import { Transaction } from 'types/common';
import timeAgo from 'utils/timeAgo';

const fields: Field[] = [
  {
    name: 'type',
    label: 'Type'
  },
  {
    name: 'age',
    label: 'Age'
  },
  {
    name: 'hash',
    label: 'Transaction Hash'
  },
  {
    name: 'from',
    label: 'From'
  },
  {
    name: 'to',
    label: 'To'
  },
  {
    name: 'vid',
    label: 'VID'
  }
];

const TransactionsTable = ({ data }: { data: Transaction[] }): ReactElement => {
  const renderRow = (row: Transaction): ReactNode => (
    <tr key={row.hash} className={css.row}>
      <td className={css.protocolCell}>Protocol</td>
      <td className={css.ageCell}>{timeAgo(row.timestamp)}</td>
      <td>
        <Link to={`/transactions/${row.hash}`} className={css.from}>
          <span>{row.hash}</span>
        </Link>
      </td>
      <td>
        <Link to={`/account/${row.from}`} className={css.from}>
          <span>{row.from}</span>{' '}
          <Icon name="transaction" width={24} height={24} />
        </Link>
      </td>
      <td>
        <Link to={`/account/${row.to}`} className={css.from}>
          <span>{row.to}</span>
        </Link>
      </td>
      <td className={css.valueCell}>{row.value}</td>
    </tr>
  );
  return (
    <div data-testid="transactionsTable" className={css.table}>
      <Table fields={fields} data={data} renderRow={renderRow} />
    </div>
  );
};

export default TransactionsTable;
