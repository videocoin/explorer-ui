import React, { ReactElement, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Field, Icon, Table } from 'ui-kit';
import css from './styles.module.scss';
import { Transaction } from 'store';
import ReactTimeAgo from 'react-time-ago';

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

interface TransactionRow {
  type: string;
  age: string;
  hash: string;
  from: string;
  to: string;
  vid: number;
}

const TransactionsTable = ({
  history,
  data
}: RouteComponentProps & { data: Transaction[] }): ReactElement => {
  const goToTransaction = (hash: string): (() => void) => () =>
    history.push(`/transactions/${hash}`);
  const renderRow = (row: Transaction): ReactNode => (
    <tr key={row.hash} className={css.row} onClick={goToTransaction(row.hash)}>
      <td>Protocol</td>
      <td>
        <ReactTimeAgo timeStyle="twitter" date={new Date(row.timestamp)} />
      </td>
      <td>{row.hash}</td>
      <td>
        <div className={css.from}>
          <span>{row.from}</span>{' '}
          <Icon name="transaction" width={24} height={24} />
        </div>
      </td>
      <td>{row.to}</td>
      <td>{row.value}</td>
    </tr>
  );
  return (
    <div className={css.table}>
      <Table fields={fields} data={data} renderRow={renderRow} />
    </div>
  );
};

export default withRouter(TransactionsTable);
