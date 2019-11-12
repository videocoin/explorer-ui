import React, { ReactElement } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import PageLayout from 'components/Common/PageLayout';

interface PathParamsType {
  hash: string;
}

const StreamPage: React.FC<
  RouteComponentProps<PathParamsType>
> = (): ReactElement => {
  return (
    <PageLayout title="Stream" backTo="/streams">
      Stream
    </PageLayout>
  );
};

export default withRouter(StreamPage);
