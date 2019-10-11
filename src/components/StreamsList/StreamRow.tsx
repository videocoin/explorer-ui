import React, { ReactElement } from 'react';
import { eq } from 'lodash/fp';
import css from './styles.module.scss';
import { Icon, Typography } from 'ui-kit/src';
import { Link } from 'react-router-dom';

export interface StreamRowProps {
  hash: string;
  duration: string;
  status: 'offline' | 'live';
  startedAt: string;
}

const StreamRow = ({ item }: { item: StreamRowProps }): ReactElement => {
  const { hash, duration, status, startedAt } = item;
  const isLive = eq('live', status);
  return (
    <div className={css.row}>
      <div className={css.rowIcon}>
        <Icon width={24} height={24} name="stream" />
      </div>
      <div className={css.rowLeft}>
        <Link to={`/streams/${hash}`}>
          <Typography className={css.hash} type="smallBody" weight="bold">
            {hash}
          </Typography>
        </Link>
        <Typography type="caption">{duration} Minutes</Typography>
      </div>
      <div className={css.rowRight}>
        {isLive ? (
          <div className={css.live}>Live</div>
        ) : (
          <div className={css.offline}>Offline</div>
        )}
        <Typography type="caption" weight="medium">
          {startedAt} Ago
        </Typography>
      </div>
    </div>
  );
};

export default StreamRow;
