import React, { useEffect, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { map } from 'lodash';

import { fetchBlocks } from '../../api/api';
import {
  Blocks,
  Block,
  setBlocks,
  setLoading,
  SetBlocksAction,
  SetLoadingAction,
  getIsLoading,
  getBlocks,
  ReduxStore,
  SetErrorAction,
} from '../../store';
import Loading from '../Common/Loading';

interface StateProps {
  isLoading: boolean;
  blocks: Blocks;
}

interface DispatchProps {
  setBlocks: (payload: Block[]) => SetBlocksAction;
  setLoading: (payload: boolean) => SetLoadingAction;
  setError: (payload: Error | null) => SetErrorAction;
}

type HomePageProps = StateProps & DispatchProps;

const HomePage: React.FC<HomePageProps> = ({
  isLoading,
  blocks,
  setBlocks,
  setLoading,
}): ReactElement => {
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await setLoading(true);
      try {
        const res = await fetchBlocks();
        const blocks = res.data.blocks;

        if (blocks) {
          setBlocks(blocks);
        } else {
          throw new Error('Error');
        }
      } catch (e) {
        console.log('ERROR', e.response);
        // Handle Error. There is a setError function defined in app.ts if you want to use it.
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const renderLatestBlocks = (): ReactElement[] => {
    return map(blocks, block => (
      <li key={block.hash}>
        <Link to={`/block/${block.hash}`}>{block.hash}</Link>
      </li>
    ));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <ul>{renderLatestBlocks()}</ul>
    </div>
  );
};

HomePage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  blocks: PropTypes.shape({}).isRequired,
  setBlocks: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state: ReduxStore): StateProps => ({
  isLoading: getIsLoading(state),
  blocks: getBlocks(state),
});

const dispatchProps = {
  setBlocks,
  setLoading,
};

export default connect(
  mapStateToProps,
  dispatchProps
)(HomePage);
