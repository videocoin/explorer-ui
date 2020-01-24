/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import PageLayout from 'components/Common/PageLayout';
import { compose, map, filter, getOr } from 'lodash/fp';
import css from './styles.module.scss';
import { Typography } from 'ui-kit';
import WorkersMap from './WorkersMap';
import WorkersTable from './WorkersTable';
import useRequest from 'api/useRequest';
import { POLL_TIMEOUT } from 'const';
import { Worker } from 'types/common';
import { convertToVID } from 'utils/convertBalance';
const apiURL = process.env.REACT_APP_API_URL;

function hashCode(s: string): number {
  let hash = 0;
  let ch;
  if (s.length === 0) return hash;

  for (let i = 0, l = s.length; i < l; i++) {
    ch = s.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash |= 0;
  }
  return hash;
}

function randomOffset(seedString: string): number {
  let seed = hashCode(seedString);
  const x = Math.sin(seed++) * 10000;

  return (x - Math.floor(x)) / 10 - 0.05;
}

const WorkersPage = () => {
  const { data } = useRequest<{ items: Worker[] }>(
    {
      url: `${apiURL}/miners/all`
    },
    {
      refreshInterval: POLL_TIMEOUT
    }
  );
  const items = compose(
    map<Worker, Worker>(({ id, systemInfo, cryptoInfo, ...rest }) => {
      const offset = randomOffset(id);
      return {
        ...rest,
        id,
        cryptoInfo: {
          ...cryptoInfo,
          selfStake: convertToVID(cryptoInfo.selfStake).toString() || '0'
        },
        systemInfo: {
          ...systemInfo,
          latitude: systemInfo.latitude + offset,
          longitude: systemInfo.longitude + offset
        }
      };
    }),
    getOr([], 'items')
  )(data as any);
  const activeWorkers = filter<Worker>({ status: 'ONLINE' })(items);

  return (
    <PageLayout title="Worker Nodes">
      <div className={css.top}>
        <div className={css.left}>
          <div className={css.cards}>
            <div className={css.card}>
              <div>
                <Typography type="subtitle">{activeWorkers.length}</Typography>{' '}
                <Typography>Active Worker Nodes</Typography>
              </div>
            </div>
            <div className={css.card}>
              <div>
                <Typography type="subtitle">{items.length}</Typography>{' '}
                <Typography>Total Worker Nodes</Typography>
              </div>
            </div>
          </div>
        </div>
        <div className={css.right}>
          <WorkersMap data={items} />
        </div>
      </div>
      <div className={css.nodes}>
        <div className={css.title}>
          <Typography type="subtitleCaps">All worker nodes</Typography>
        </div>
        <WorkersTable data={items} />
      </div>
    </PageLayout>
  );
};

export default WorkersPage;
