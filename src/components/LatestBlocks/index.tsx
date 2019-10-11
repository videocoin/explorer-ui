import React, { ReactElement } from 'react';
import List from 'components/List';
import Row from './BlockRow';
import { Block } from 'store';

const LatestBlocks = ({ data }: { data: Block[] }): ReactElement => {
  return (
    <List
      icon="block"
      viewAll="/blocks"
      title="Latest blocks"
      data={data}
      rowComponent={Row}
    />
  );
};

export default LatestBlocks;
