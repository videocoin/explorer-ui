import React, { ReactElement, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Field, Table } from 'ui-kit';
import css from './styles.module.scss';
import { Block } from 'store';

const fields: Field[] = [
  {
    name: 'id',
    label: 'Block #'
  },
  {
    name: 'hash',
    label: 'Block Hash'
  },
  {
    name: 'txns',
    label: 'Txns'
  },
  {
    name: 'wattage',
    label: 'Wattage'
  },
  {
    name: 'size',
    label: 'Size'
  },
  {
    name: 'vid',
    label: 'VID'
  }
];

const BlocksPage = ({
  history,
  data
}: RouteComponentProps & { data: Block[] }): ReactElement => {
  const goToBlock = (hash: string): (() => void) => () =>
    history.push(`/blocks/${hash}`);
  const renderRow = (row: Block): ReactNode => (
    <tr key={row.number} className={css.row} onClick={goToBlock(row.hash)}>
      <td>{row.number}</td>
      <td>{row.hash}</td>
      <td>{row.numTxs}</td>
      <td>{row.size}</td>
      <td>{row.size}</td>
      <td>{row.gasUsed}</td>
    </tr>
  );
  return (
    <div>
      <Table fields={fields} data={data} renderRow={renderRow} />
    </div>
  );
};

export default withRouter(BlocksPage);
