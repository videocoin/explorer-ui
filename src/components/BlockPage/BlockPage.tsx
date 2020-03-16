import React, { ReactElement, ReactNode, useCallback } from 'react';
import { compose, map, get } from 'lodash/fp';
import useSWR from 'swr';
import { useParams, useHistory } from 'react-router-dom';
import { Typography } from 'ui-kit';
import css from './styles.module.scss';
import TransactionsList from 'components/LatestTransactions';
import { fetchTransaction } from 'api/api';
import { Block, FullTransaction } from 'types/common';
import PageLayout from 'components/Common/PageLayout';
import timeAgo from 'utils/timeAgo';
import { convertToVID } from 'utils/convertBalance';
import { Link } from 'react-router-dom';
import useRequest from 'api/useRequest';

interface BlockSpec {
  label: string;
  value: string | number | ReactNode;
}

const Body = (): ReactElement => {
  const history = useHistory();
  const { hash } = useParams();

  const { data: block } = useRequest<{ block: Block }>({
    url: `/block/${hash}`
  });
  const fetchTransactions = useCallback(async () => {
    if (!block) {
      return;
    }
    try {
      const transactionsRes = await Promise.all(
        map(fetchTransaction)(block.block.transactions as [])
      );
      return {
        data: compose(
          map(({ value, ...rest }) => ({
            ...rest,
            value: convertToVID(value)
          })),
          map(get('data.transaction'))
        )(transactionsRes)
      };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return { data: undefined, error };
    }
  }, [block]);
  const { data } = useSWR([block], fetchTransactions);

  if (!block.block) {
    setTimeout(() => {
      history.replace('/no-results');
    }, 100);
    return null;
  }

  const transactions = data?.data || [];

  const {
    size,
    timestamp,
    hash: blockHash,
    number,
    gasUsed,
    gasLimit,
    parentHash,
    extraData
  } = block.block;

  const specs: BlockSpec[] = [
    {
      label: 'Parent hash',
      value: <Link to={`/blocks/${parentHash}`}>{parentHash}</Link>
    },
    {
      label: 'Wattage',
      value: `${gasUsed}/${gasLimit}`
    },
    {
      label: 'Size',
      value: size
    },
    {
      label: 'Extra data',
      value: extraData
    }
  ];

  const renderSpec = ({ label, value }: BlockSpec): ReactNode => (
    <li key={label}>
      <Typography type="smallBodyThin">{label}</Typography>
      <Typography type="body">{value}</Typography>
    </li>
  );

  return (
    <>
      <div className={css.head}>
        <div>
          <Typography
            type="subtitle"
            theme="white"
            weight="medium"
            className={css.blockId}
          >
            {number}
          </Typography>
          <Typography>{timeAgo(timestamp)}</Typography>
        </div>
        <Typography type="subtitle" theme="light">
          {blockHash}
        </Typography>
      </div>
      <ul className={css.spec}>{map(renderSpec)(specs)}</ul>
      {Boolean(transactions.length) && (
        <div className={css.list}>
          <TransactionsList data={transactions as FullTransaction[]} />
        </div>
      )}
    </>
  );
};

const BlockPage = () => (
  <PageLayout title="Individual Block" backTo="/blocks">
    <Body />
  </PageLayout>
);

export default BlockPage;
