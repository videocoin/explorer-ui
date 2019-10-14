import React, { ReactElement } from 'react';
import StreamsTable from './StreamsTable';
import PageLayout from 'components/Common/PageLayout';

const StreamsPage = (): ReactElement => {
  return (
    <PageLayout title="Latest Streams">
      <StreamsTable />
    </PageLayout>
  );
};

export default StreamsPage;
