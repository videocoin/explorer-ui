import React, { ReactElement, ReactNode } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Typography } from 'ui-kit';
import PageLayout from 'components/Common/PageLayout';

interface PathParamsType {
  hash: string;
}

interface BlockSpec {
  label: string;
  value: string;
}

const StreamPage: React.FC<RouteComponentProps<PathParamsType>> = ({
  match
}): ReactElement => {
  const { hash } = match.params;
  const specs: BlockSpec[] = [
    {
      label: 'Value',
      value: '45.64 VID'
    },
    {
      label: 'Wattage',
      value: '5662/50000'
    },
    {
      label: 'Size',
      value: '5234'
    }
  ];
  const renderSpec = ({ label, value }: BlockSpec): ReactNode => (
    <li key={label}>
      <Typography>{label}</Typography>
      <Typography type="body">{value}</Typography>
    </li>
  );
  return (
    <PageLayout title="Stream" backTo="/streams">
      Stream
    </PageLayout>
  );
};

export default withRouter(StreamPage);
