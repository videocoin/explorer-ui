import React, { ReactElement, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { Field, Table } from 'ui-kit';
import css from './styles.module.scss';
import { BlockRow } from 'types/common';

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
  }
];

const BlocksTable = ({ data }: { data: BlockRow[] }): ReactElement => {
  const history = useHistory();
  const goToBlock = (hash: string): (() => void) => () => {
    history.push(`/blocks/${hash}`);
  };
  const renderRow = (row: BlockRow): ReactNode => (
    <tr key={row.number} className={css.row} onClick={goToBlock(row.hash)}>
      <td>{row.number}</td>
      <td>{row.hash}</td>
      <td>{row.numTxs}</td>
      <td>
        {row.gasUsed}/{row.gasLimit}
      </td>
      <td>{row.size}</td>
    </tr>
  );
  return (
    <div data-testid="blocksTable" className={css.table}>
      <Table fields={fields} data={data} renderRow={renderRow} />
    </div>
  );
};

export default BlocksTable;
