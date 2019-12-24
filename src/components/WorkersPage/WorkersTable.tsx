import React, { ReactElement, ReactNode } from 'react';
import { Field, Table, Typography } from 'ui-kit';
import css from './styles.module.scss';
import { useBreakpoint } from 'components/BreakpointProvider';

const fields: Field[] = [
  {
    name: 'status',
    label: 'Status'
  },
  {
    name: 'reputation',
    label: 'Reputation'
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

const WorkersTable = ({ data }: { data: any[] }): ReactElement => {
  const { md } = useBreakpoint();
  const renderRow = (row: any): ReactNode => {
    if (md) {
      return (
        <tr key={row.hash} className={css.row}>
          <td>
            <div className={css.statusMark} />
          </td>
          <td>
            <Typography type="smallBody">Worker Name</Typography>
            <Typography type="caption">Excellent Reputation</Typography>
          </td>
          <td>
            <div className={css.status}>Busy</div>
          </td>
        </tr>
      );
    }
    return (
      <tr key={row.hash} className={css.row}>
        <td>
          <div className={css.status}>
            <div className={css.statusMark} />
            <div>Busy</div>
          </div>
        </td>
        <td>
          <Typography type="body">Excellent</Typography>
        </td>
        <td>
          <Typography type="body">Lonely Beowolf</Typography>
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
