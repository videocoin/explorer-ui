import React, { Suspense } from 'react';
import { Spinner } from 'ui-kit';
import { useParams } from 'react-router-dom';
import TopBar from 'components/Common/TopBar';
import WorkerInfo from './Worker';
import Payments from './Payments';
import useRequest from 'api/useRequest';
import { apiURL } from 'const';
import { Worker } from 'types/common';

const Body = () => {
  const { workerId } = useParams();
  const { data } = useRequest<Worker>({
    url: `${apiURL}/miners/all/${workerId}`,
  });
  if (!data) return <Spinner />;
  return (
    <div>
      <TopBar hideSearch title={data.name} backTo="/workers" />
      <div className="content">
        <WorkerInfo worker={data} />
        <Payments address={data.address} />
      </div>
    </div>
  );
};
const WorkerPage = () => (
  <Suspense fallback={<Spinner />}>
    <Body />
  </Suspense>
);
export default WorkerPage;
