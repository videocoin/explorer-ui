import React, { ReactElement, ReactNode } from 'react';
import cn from 'classnames';
import { Field, Table, Typography } from 'ui-kit';
import { Worker } from 'types/common';
import css from './styles.module.scss';
import { useBreakpoint } from 'components/BreakpointProvider';
import { readableWorkerStatus } from 'const';

const fields: Field[] = [
  {
    name: 'status',
    label: 'Status'
  },
  {
    name: 'name',
    label: 'Name'
  }
];

const WorkersTable = ({ data }: { data: Worker[] }): ReactElement => {
  const { md } = useBreakpoint();
  const renderRow = (row: Worker): ReactNode => {
    const { id, name, status } = row;
    if (md) {
      return (
        <tr key={row.id} className={css.row}>
          <td>
            <div className={css.status}>
              <div className={cn(css.statusMark, css[status])} />
            </div>
          </td>
          <td>
            <Typography type="smallBody">{name}</Typography>
          </td>
          <td>
            <div className={css.status}>{readableWorkerStatus[status]}</div>
          </td>
        </tr>
      );
    }
    return (
      <tr key={id} className={css.row}>
        <td>
          <div className={css.status}>
            <div className={cn(css.statusMark, css[status])} />
            <Typography type="tiny">{status.toLowerCase()}</Typography>
          </div>
        </td>
        <td>
          <Typography type="body">{name}</Typography>
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
