import React, { ReactElement, Fragment, useState, useEffect } from 'react';
import { Spinner } from 'ui-kit';
import BlocksTable from './BlocksTable';
import { Block } from 'types/common';
import css from './styles.module.scss';
import PageLayout from 'components/Common/PageLayout';
import { Pagination } from 'components/Pagination/Pagination';
import { POLL_TIMEOUT } from 'const';
import getTime from 'utils/getTime';
import { last } from 'lodash/fp';
import useRequest from 'api/useRequest';

const BlocksPage = (): ReactElement => {
  const [meta, setMeta] = useState({
    before: null,
    after: null
  });
  const [lastItem, setLastItem] = useState();
  const [shouldPoll, setShouldPoll] = useState(true);
  const { data } = useRequest<{ blocks: Block[] }>(
    {
      url: '/blocks',
      params: {
        before: meta.before,
        after: meta.after
      }
    },
    {
      refreshInterval: shouldPoll ? POLL_TIMEOUT : 0
    }
  );
  useEffect(() => {
    if (!shouldPoll) {
      setLastItem(last(data?.blocks));
    }
  }, [data, shouldPoll]);
  const handleNext = (): void => {
    setShouldPoll(false);
    if (!data) return;
    setMeta({
      before: getTime(last(data.blocks).timestamp),
      after: null
    });
  };
  const handlePrev = (): void => {
    if (!lastItem) return;
    setShouldPoll(false);
    if (!data) return;
    setMeta({
      after: getTime(lastItem.timestamp),
      before: null
    });
  };

  return (
    <PageLayout title="Latest Blocks">
      {!data ? (
        <Spinner />
      ) : (
        <Fragment>
          <BlocksTable data={data.blocks} />
          <div className={css.pagination}>
            <Pagination onPrev={handlePrev} onNext={handleNext} />
          </div>
        </Fragment>
      )}
    </PageLayout>
  );
};

export default BlocksPage;
