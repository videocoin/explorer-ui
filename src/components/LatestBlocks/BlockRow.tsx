import React, { ReactElement } from 'react';
import css from './styles.module.scss';
import { Icon, Typography } from 'ui-kit/src';
import { Link } from 'react-router-dom';
import { Block } from 'store';
import ReactTimeAgo from 'react-time-ago';

const BlockRow = ({ item }: { item: Block }): ReactElement => {
  const { size, hash, gasUsed, timestamp } = item;
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
        <div className={css.vid}>{gasUsed} VID</div>
        <Typography type="caption" weight="medium">
          <ReactTimeAgo timeStyle="twitter" date={new Date(timestamp)} /> Ago
        </Typography>
      </div>
    </div>
  );
};

export default BlockRow;
