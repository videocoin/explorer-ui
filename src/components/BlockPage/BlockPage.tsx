import React, { ReactElement } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

interface PathParamsType {
  hash: string;
}

const BlockPage: React.FC<RouteComponentProps<PathParamsType>> = ({
  match,
}): ReactElement => {
  const hash = match.params.hash;
  return (
    <div>
      <h2>Block Hash:</h2>
      <p>{hash}</p>
    </div>
  );
};

export default withRouter(BlockPage);
