import React, { ReactElement, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Field, Icon, Table } from 'ui-kit';
import css from './styles.module.scss';

const fields: Field[] = [
  {
    name: 'status',
    label: 'Status'
  },
  {
    name: 'id',
    label: 'Stream ID'
  },
  {
    name: 'txns',
    label: 'Txns'
  },
  {
    name: 'duration',
    label: 'Stream Duration'
  }
];

interface StreamRow {
  status: string;
  id: string;
  txns: number;
  duration: string;
}

const demoData: StreamRow[] = [
  {
    status: 'streaming',
    id: '0x819e8adbdedcd931588c7359d0fddbbdca02212352bc080cabb5b49de0dc4f9b',
    txns: 12,
    duration: '12:23 min'
  }
];

const StreamsTable = ({ history }: RouteComponentProps): ReactElement => {
  const goToBlock = (id: string): (() => void) => () =>
    history.push(`/streams/${id}`);
  const renderRow = (row: StreamRow): ReactNode => (
    <tr className={css.row} onClick={goToBlock(row.id)}>
      <td className={css.status}>
        <div className={css.statusIcon}>
          <Icon color="#37cb8d" name="streaming" />
        </div>
        <div>{row.status}</div>
      </td>
      <td>{row.id}</td>
      <td className={css.txns}>{row.txns}</td>
      <td className={css.duration}>{row.duration}</td>
    </tr>
  );
  return (
    <div>
      <Table fields={fields} data={demoData} renderRow={renderRow} />
    </div>
  );
};

export default withRouter(StreamsTable);
