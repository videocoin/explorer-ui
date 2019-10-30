import React, {
  ReactElement,
  useEffect,
  useRef,
  Fragment,
  useCallback
} from 'react';
import { Pagination, Spinner } from 'ui-kit';
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
import { POLL_TIMEOUT } from 'const';

interface StateProps {
  isLoading: boolean;
  blocks: Block[];
  meta: Meta;
}

interface DispatchProps {
  fetchBlocks: ({ page }: { page: number }) => void;
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
          try {
            await fetchBlocks({ page: meta.page });
          } catch (e) {
            console.log('ERROR', e.response);
            // Handle Error. There is a setError function defined in app.ts if you want to use it.
          }
        } finally {
          startPoll(POLL_TIMEOUT);
        }
      }, timeout) as unknown) as number;
    },
    [fetchBlocks, meta.page]
  );

  useEffect(() => {
    startPoll(0);
    return () => {
      clearTimeout(timer.current);
    };
  }, [blocks.length, startPoll]);

  const handlePageChange = (page: number): void => {
    fetchBlocks({ page });
  };
  return (
    <PageLayout title="Latest Blocks">
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <BlocksTable data={blocks} />
          <div className={css.pagination}>
            <Pagination onChange={handlePageChange} max={!meta.hasMore} />
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

export default connect(
  mapStateToProps,
  dispatchProps
)(BlocksPage);
