import React, { ReactElement, Fragment, useState } from 'react';
import { Spinner } from 'ui-kit';
import BlocksTable from './BlocksTable';
import { Block } from 'types/common';
import css from './styles.module.scss';
import PageLayout from 'components/Common/PageLayout';
import { Pagination } from 'components/Pagination/Pagination';
import { POLL_TIMEOUT } from 'const';
import getTime from 'utils/getTime';
import { first, last } from 'lodash/fp';
import useRequest from 'api/useRequest';

interface StateProps {
  isLoading: boolean;
  blocks: Block[];
  meta: Meta;
}

interface DispatchProps {
  fetchBlocks: ({ before, after }: { before?: number; after?: number }) => void;
  setLoading: (payload: boolean) => SetLoadingAction;
  setError: (payload: Error | null) => SetErrorAction;
}

type BlocksPageProps = StateProps & DispatchProps;

const BlocksPage = ({
  setLoading,
  blocks,
  fetchBlocks,
  isLoading
}: BlocksPageProps): ReactElement => {
  const timer = useRef<number>();
  const startPoll = useCallback(
    (timeout: number) => {
      timer.current = (setTimeout(async () => {
        try {
          await fetchBlocks({});
        } finally {
          setLoading(false);
          startPoll(POLL_TIMEOUT);
        }
      }, timeout) as unknown) as number;
    },
    [fetchBlocks, setLoading]
  );

  const handleNext = (): void => {
    setShouldPoll(false);
    if (!data) return;
    setMeta({
      before: getTime(last(data.blocks).timestamp),
      after: null
    });
  };
  const handlePrev = (): void => {
    setShouldPoll(false);
    if (!data) return;
    setMeta({
      after: getTime(first(data.blocks).timestamp),
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
