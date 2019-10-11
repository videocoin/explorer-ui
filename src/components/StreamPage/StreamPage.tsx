import React, { ReactElement, ReactNode } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { TopBar, Typography } from 'ui-kit/src';
import Search from 'components/Search';
import BackLink from 'components/BackLink';

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
      <Typography type="bodyAlt">{value}</Typography>
    </li>
  );
  return (
    <div>
      <div className="topBar">
        <TopBar>
          <BackLink to="/blocks" />
          <div>
            <Typography type="caption">VideoCoin Network</Typography>
            <Typography type="smallTitle" weight="bold">
              Stream
            </Typography>
          </div>
          <Search />
        </TopBar>
      </div>
      <div className="content" />
    </div>
  );
};

export default withRouter(StreamPage);
