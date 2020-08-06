import React from 'react';
import { eq } from 'lodash/fp';
import Linkify from 'linkifyjs/react';
import { Icon, Typography } from 'ui-kit';
import formatBytes from 'utils/formatBytes';
import css from './styles.module.scss';
import { Worker } from 'types/common';
import { GENESIS_POOL_WORKERS } from '../../const';
import formatVID from '../../utils/formatVID';

const WorkerInfo = ({ worker }: { worker: Worker }) => {
  const {
    delegatePolicy,
    address,
    systemInfo,
    status,
    totalStake,
    orgDesc,
    orgEmail,
    orgName,
    allowThirdpartyDelegates,
  } = worker;
  const isNew = eq('NEW', status);
  const isGenesis = GENESIS_POOL_WORKERS.includes(address);
  const linkifyOptions = {
    tagName: 'a',
    attributes: {
      rel: 'noopener noreferrer',
    },
    target: {
      url: '_blank',
    },
  };
  return (
    <div className={css.root}>
      <div className={css.address}>
        {isGenesis && (
          <div className={css.genesisBadge}>
            <Typography type="tiny" theme="white">
              Genesis Pool
            </Typography>
          </div>
        )}{' '}
        <Typography>{address}</Typography>
      </div>
      <div className={css.desc}>
        <div className={css.currentStake}>
          <div>
            <Typography type="subtitle" theme="white">
              Total Stake
            </Typography>
            <div>
              <Typography type="subtitle" theme="white">
                {formatVID(totalStake)}
              </Typography>
              <Typography type="bodyThin">VID</Typography>
            </div>
          </div>
        </div>
        <div>
          <Typography type="subtitle" theme="white">
            {orgName}
          </Typography>
          {orgEmail && (
            <a href={`mailto:${orgEmail}`} className={css.email}>
              <Icon name="email" color="#fff" />
              <Typography type="smallBodyThin">{orgEmail}</Typography>
            </a>
          )}
          <Typography className={css.orgDesc} type="smallBodyThin">
            <Linkify options={linkifyOptions}>{orgDesc}</Linkify>
          </Typography>
        </div>
      </div>
      {allowThirdpartyDelegates && delegatePolicy && (
        <>
          <div className={css.head}>
            <Typography type="subtitleCaps">Delegate Payout Policy</Typography>
          </div>
          <Typography>{delegatePolicy}</Typography>
        </>
      )}
      <div className={css.info}>
        <div className={css.head}>
          <Typography type="subtitleCaps">System information</Typography>
        </div>
        <div className={css.config}>
          <Typography type="body">System Config</Typography>
          {isNew ? (
            <Typography>(Setup Required)</Typography>
          ) : (
            <>
              <div data-testid="freq" className={css.configItem}>
                <Typography type="body">
                  {(systemInfo.cpuFreq / 1000).toFixed(1)} ghz
                </Typography>
              </div>
              <div data-testid="cpu" className={css.configItem}>
                <Typography type="body">{systemInfo.cpuCores} Cores</Typography>
              </div>
              <div data-testid="ram" className={css.configItem}>
                <Typography type="body">
                  {formatBytes(systemInfo.memTotal)}gb RAM
                </Typography>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerInfo;
