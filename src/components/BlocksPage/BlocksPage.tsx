import React, {
  ReactElement,
  useEffect,
  useRef,
  Fragment,
  useCallback
} from 'react';
import { Spinner } from 'ui-kit';
import BlocksTable from './BlocksTable';
import {
  Block,
  getBlocks,
  fetchBlocks,
  getIsLoading,
  ReduxStore,
  SetErrorAction,
  setLoading,
  SetLoadingAction,
  getBlocksMeta
} from 'store';
import { connect } from 'react-redux';
import css from './styles.module.scss';
import { Meta } from 'store/types';
import PageLayout from 'components/Common/PageLayout';
import { Pagination } from 'components/Pagination/Pagination';
import { POLL_TIMEOUT } from 'const';
import getTime from 'utils/getTime';
import { first, last } from 'lodash/fp';

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
  meta,
  isLoading
}: BlocksPageProps): ReactElement => {
  const timer = useRef<number>();
  const startPoll = useCallback(
    (timeout: number) => {
      timer.current = (setTimeout(async () => {
        try {
          await fetchBlocks({ before: meta.before, after: meta.after });
        } finally {
          setLoading(false);
          startPoll(POLL_TIMEOUT);
        }
      }, timeout) as unknown) as number;
    },
    [fetchBlocks, meta.after, meta.before, setLoading]
  );

  useEffect(() => {
    startPoll(0);
    return () => {
      clearTimeout(timer.current);
    };
  }, [startPoll]);

  const handleNext = (): void => {
    clearTimeout(timer.current);
    fetchBlocks({
      before: getTime(last(blocks).timestamp),
      after: null
    });
  };
  const handlePrev = (): void => {
    clearTimeout(timer.current);
    fetchBlocks({
      after: getTime(first(blocks).timestamp),
      before: null
    });
  };
  return (
    <PageLayout title="Latest Blocks">
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <BlocksTable data={blocks} />
          <div className={css.pagination}>
            <Pagination onPrev={handlePrev} onNext={handleNext} />
          </div>
        </Fragment>
      )}
    </PageLayout>
  );
};

const mapStateToProps = (state: ReduxStore): StateProps => ({
  isLoading: getIsLoading(state),
  blocks: getBlocks(state),
  meta: getBlocksMeta(state)
});

const dispatchProps = {
  fetchBlocks,
  setLoading
};

export default connect(mapStateToProps, dispatchProps)(BlocksPage);
