import React, { ReactElement } from 'react';
import css from './styles.module.scss';
import { Icon, Typography } from 'ui-kit';
import { Link } from 'react-router-dom';
import { FullTransaction, Transaction } from 'types/common';
import timeAgo from 'utils/timeAgo';
import { convertToVID } from 'utils/convertBalance';

const TransactionRow = ({
  item
}: {
  item: Transaction | FullTransaction;
}): ReactElement => {
  const { hash, from, to, value, timestamp } = item;
  const link = `/transactions/${hash}`;
  return (
    <div className={css.row}>
      <div className={css.rowIcon}>
        <Icon name="transactions" />
      </div>
      <div className={css.rowLeft}>
        <Link to={link}>
          <Typography className={css.hash} type="smallBody" weight="bold">
            {hash}
          </Typography>
        </Link>
        <div className={css.hashFromTo}>
          <Typography className={css.hash} type="caption" theme="sunkissed">
            {from}
          </Typography>
          <Icon name="transaction" width={12} height={12} />
          <Typography className={css.hash} type="caption" theme="sunkissed">
            {to}
          </Typography>
        </div>
      </div>
      <div className={css.rowRight}>
        <div className={css.vid}>
          <span>{convertToVID(value)}</span> VID
        </div>
        <Typography type="caption" weight="medium">
          {timeAgo(timestamp)}
        </Typography>
      </div>
    </div>
  );
};

export default TransactionRow;
