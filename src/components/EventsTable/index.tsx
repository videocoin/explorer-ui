import React, { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Field, Icon, Table } from 'ui-kit';
import css from './styles.module.scss';
import { AccountEvent } from 'store/types';

const fields: Field[] = [
  {
    name: 'createdAt',
    label: 'Timestamp'
  },
  {
    name: 'hash',
    label: 'Hash'
  },
  {
    name: 'type',
    label: 'Type'
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
    name: 'value',
    label: 'Value'
  },
  {
    name: 'source',
    label: 'Source'
  }
];

interface EventRow {
  createdAt: string;
  hash: string;
  from: string;
  to: string;
  type: string;
  value: string;
  source: string;
}

const EventsTable = ({ data }: { data: AccountEvent[] }): ReactElement => {
  const renderRow = (row: AccountEvent): ReactNode => (
    <tr key={row.hash} className={css.row}>
      <td className={css.timeCell}>{row.createdAt}</td>
      <td>{row.hash}</td>
      <td>{row.type}</td>
      <td>
        <Link to={`/transactions/${row.from}`} className={css.from}>
          <span>{row.from}</span>{' '}
          <Icon name="transaction" width={24} height={24} />
        </Link>
      </td>
      <td>
        <Link to={`/transactions/${row.to}`} className={css.from}>
          <span>{row.to}</span>
        </Link>
      </td>
      <td className={css.valueCell}>{row.value}</td>
      <td className={css.sourceCell}>{row.source}</td>
    </tr>
  );
  return (
    <div className={css.table}>
      <Table fields={fields} data={data} renderRow={renderRow} />
    </div>
  );
};

export default EventsTable;
