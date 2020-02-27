/* eslint-disable @typescript-eslint/camelcase */
import React, { useMemo } from 'react';
import PageLayout from 'components/Common/PageLayout';
import {
  reject,
  compose,
  map,
  flatten,
  random,
  getOr,
  groupBy
} from 'lodash/fp';
import css from './styles.module.scss';
import { Typography } from 'ui-kit';
import WorkersMap from './WorkersMap';
import WorkersTable from './WorkersTable';
import useRequest from 'api/useRequest';
import { POLL_TIMEOUT, WorkerStatus } from 'const';
import { Worker } from 'types/common';
import { convertToVID } from 'utils/convertBalance';
const apiURL = process.env.REACT_APP_CLOUD_API_URL;

function randomOffset(radius: number): [number, number] {
  const lat = random(-radius, radius);
  const lng = random(-radius, radius);
  return [lat, lng];
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
  const items = useMemo(() => {
    if (!data) return [];
    const groupedByStatus = compose(
      groupBy('status'),
      map<Worker, Worker>(({ id, systemInfo, cryptoInfo, ...rest }) => {
        const [latOffset, lngOffset] = randomOffset(data.items.length / 200);
        return {
          ...rest,
          id,
          cryptoInfo: {
            ...cryptoInfo,
            selfStake: convertToVID(cryptoInfo.selfStake).toString() || '0'
          },
          systemInfo: {
            ...systemInfo,
            latitude: systemInfo.latitude + latOffset,
            longitude: systemInfo.longitude + lngOffset
          }
        };
      }),
      getOr([], 'items')
    )(data as any);

    return flatten([
      groupedByStatus[WorkerStatus.BUSY] || [],
      groupedByStatus[WorkerStatus.IDLE] || [],
      groupedByStatus[WorkerStatus.NEW],
      groupedByStatus[WorkerStatus.OFFLINE]
    ]);
  }, [data]);

  const mapItems = reject<Worker>(({ systemInfo }) => {
    return (
      Math.floor(systemInfo.latitude) < 1 &&
      Math.floor(systemInfo.longitude) < 1
    );
  })(items);
  return (
    <PageLayout title="Worker Nodes">
      <div className={css.top}>
        <div className={css.left}>
          <div className={css.cards}>
            <div className={css.card}>
              <div>
                <Typography type="subtitle">{items.length}</Typography>{' '}
                <Typography>Total Worker Nodes</Typography>
              </div>
            </div>
          </div>
        </div>
        <div className={css.right}>
          <WorkersMap data={mapItems} />
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
