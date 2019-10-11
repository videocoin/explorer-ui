import React, { ReactElement, useEffect } from 'react';
import { Pagination, TopBar, Typography } from 'ui-kit/src';
import Search from 'components/Search';
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
  meta
}: BlocksPageProps): ReactElement => {
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await setLoading(true);
      try {
        await fetchBlocks({ page: 1 });
      } catch (e) {
        console.log('ERROR', e.response);
        // Handle Error. There is a setError function defined in app.ts if you want to use it.
      }

      setLoading(false);
    };

    fetchData();
  }, [fetchBlocks, setLoading]);
  const handlePageChange = (page: number): void => {
    fetchBlocks({ page });
  };
  return (
    <div>
      <div className="topBar">
        <TopBar>
          <div>
            <Typography type="caption">VideoCoin Network</Typography>
            <Typography type="smallTitle">Latest Blocks</Typography>
          </div>
          <Search />
        </TopBar>
      </div>
      <div className="content">
        <BlocksTable data={blocks} />
        <div className={css.pagination}>
          <Pagination onChange={handlePageChange} max={!meta.hasMore} />
        </div>
      </div>
    </div>
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
