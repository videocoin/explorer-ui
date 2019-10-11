import React, { ReactElement } from 'react';
import { TopBar, Typography } from 'ui-kit/src';
import Search from 'components/Search';
import StreamsTable from './StreamsTable';

const StreamsPage = (): ReactElement => {
  return (
    <div>
      <div className="topBar">
        <TopBar>
          <div>
            <Typography type="caption">VideoCoin Network</Typography>
            <Typography type="smallTitle">Latest Streams</Typography>
          </div>
          <Search />
        </TopBar>
      </div>
      <div className="content">
        <StreamsTable />
      </div>
    </div>
  );
};

export default StreamsPage;
