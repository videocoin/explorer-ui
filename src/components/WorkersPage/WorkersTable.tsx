import React, { ReactElement, ReactNode } from 'react';
import cn from 'classnames';
import { Field, Table, Typography } from 'ui-kit';
import { Worker } from 'types/common';
import css from './styles.module.scss';
import { useBreakpoint } from 'components/BreakpointProvider';

const fields: Field[] = [
  {
    name: 'status',
    label: 'Status'
  },
  {
    name: 'name',
    label: 'Name'
  },
  {
    name: 'selfStaked',
    label: 'Stake'
  }
];

const WorkersTable = ({ data }: { data: Worker[] }): ReactElement => {
  const { md } = useBreakpoint();
  const renderRow = (row: Worker): ReactNode => {
    const { id, name, status, cryptoInfo } = row;
    if (md) {
      return (
        <tr key={row.id} className={css.row}>
          <td>
            <div className={css.statusMark} />
          </td>
          <td>
            <Typography type="smallBody">{name}</Typography>
          </td>
          <td>
            <div className={css.status}>{status.toLowerCase()}</div>
          </td>
        </tr>
      );
    }
    return (
      <tr key={id} className={css.row}>
        <td>
          <div className={css.status}>
            <div className={cn(css.statusMark, css[status])} />
            <div>{status.toLowerCase()}</div>
          </div>
        </td>
        <td>
          <Typography type="body">{name}</Typography>
        </td>
        <td>
          <Typography type="body">{cryptoInfo.selfStake}</Typography>
          <Typography type="smallBodyThin">VID</Typography>
        </td>
      </tr>
    );
  };
  return (
    <div className={css.table}>
      <Table fields={fields} data={data} renderRow={renderRow} />
    </div>
  );
};

export default WorkersTable;
