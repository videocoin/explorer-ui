import React, { ReactElement } from 'react';
import List from 'components/List';
import StreamRow from './StreamRow';

const StreamsList = ({ data }: { data: any }): ReactElement => {
  return (
    <List
      icon="stream"
      viewAll="viewAll"
      title="Streams"
      data={data}
      rowComponent={StreamRow}
    />
  );
};

export default StreamsList;
