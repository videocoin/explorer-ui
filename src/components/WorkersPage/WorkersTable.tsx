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
    name: 'title',
    label: 'Title'
  },
  {
    name: 'vid',
    label: 'VID Staked'
  },
  {
    name: 'work',
    label: 'Probability of Work'
  }
];

const WorkersTable = ({ data }: { data: Worker[] }): ReactElement => {
  const { md } = useBreakpoint();
  const renderRow = (row: Worker): ReactNode => {
    if (md) {
      return (
        <tr key={row.id} className={css.row}>
          <td>
            <div className={css.statusMark} />
          </td>
          <td>
            <Typography type="smallBody">{row.name}</Typography>
          </td>
          <td>
            <div className={css.status}>{row.status.toLowerCase()}</div>
          </td>
        </tr>
      );
    }
    return (
      <tr key={row.id} className={css.row}>
        <td>
          <div className={css.status}>
            <div className={cn(css.statusMark, css[row.status])} />
            <div>{row.status.toLowerCase()}</div>
          </div>
        </td>
        <td>
          <Typography type="body">{row.name}</Typography>
        </td>
        <td>
          <Typography type="body">1,345</Typography>
          <Typography type="smallBodyThin">VID</Typography>
        </td>
        <td>
          <Typography type="body">57.89</Typography>
          <Typography type="smallBodyThin">%</Typography>
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
