import React, { Suspense, ReactElement, useState } from 'react';
import { Spinner } from 'ui-kit';
import BlocksTable from './BlocksTable';
import { Block } from 'types/common';
import css from './styles.module.scss';
import PageLayout from 'components/Common/PageLayout';
import { Pagination } from 'components/Pagination/Pagination';
import { POLL_TIMEOUT } from 'const';
import { first, last } from 'lodash/fp';
import useRequest from 'api/useRequest';

const Body = (): ReactElement => {
  const [meta, setMeta] = useState({
    cursor: null,
    prev: false,
  });
  const [shouldPoll, setShouldPoll] = useState(true);
  const { data } = useRequest<{ blocks: Block[] }>(
    {
      url: '/blocks',
      params: {
        limit: 10,
        'cursor.block': meta.cursor,
        ...(meta.prev && { prev: true }),
      },
    },
    {
      refreshInterval: shouldPoll ? POLL_TIMEOUT : 0,
    }
  );

  const handleNext = (): void => {
    setShouldPoll(false);
    if (!data) return;
    setMeta({
      cursor: last(data.blocks)
        ? last(data.blocks).cursor?.block
        : meta.cursor + 1,
      prev: false,
    });
  };
  const handlePrev = (): void => {
    setShouldPoll(false);
    if (!data) return;
    setMeta({
      cursor: first(data.blocks)
        ? first(data.blocks).cursor?.block
        : meta.cursor,
      prev: true,
    });
  };
  return (
    <div>
      <BlocksTable data={data.blocks} />
      <div className={css.pagination}>
        <Pagination
          disabledNext={!meta.cursor || !data.blocks.length}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

const BlocksPage = () => (
  <PageLayout title="Latest Blocks">
    <Body />
  </PageLayout>
);

export default BlocksPage;
