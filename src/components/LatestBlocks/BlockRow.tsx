import React, { ReactElement } from 'react';
import css from './styles.module.scss';
import { Icon, Typography } from 'ui-kit';
import { Link } from 'react-router-dom';
import { Block } from 'store';
import timeAgo from 'utils/timeAgo';

const BlockRow = ({ item }: { item: Block }): ReactElement => {
  const { hash, gasUsed, timestamp } = item;
  const link = '/blocks/' + hash;
  return (
    <div className={css.row}>
      <div className={css.rowIcon}>
        <Icon name="block" />
      </div>
      <div className={css.rowLeft}>
        <Link to={link}>
          <Typography className={css.hash} type="smallBody" weight="bold">
            {hash}
          </Typography>
        </Link>
        <Typography type="caption">{609} Transactions</Typography>
      </div>
      <div className={css.rowRight}>
        <div className={css.vid}>
          <span>{gasUsed}</span> VID
        </div>
        <Typography type="caption" weight="medium">
          {timeAgo(timestamp)} Ago
        </Typography>
      </div>
    </div>
  );
};

export default BlockRow;
