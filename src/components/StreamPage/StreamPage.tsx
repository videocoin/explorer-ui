import React, { ReactElement } from 'react';
import PageLayout from 'components/Common/PageLayout';

const StreamPage = (): ReactElement => {
  return (
    <PageLayout title="Stream" backTo="/streams">
      Stream
    </PageLayout>
  );
};

export default StreamPage;
