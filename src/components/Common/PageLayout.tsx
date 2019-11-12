import React, { ReactElement, ReactNode } from 'react';
import TopBar from 'components/Common/TopBar';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  backTo?: string;
}

const PageLayout = ({
  children,
  title,
  backTo
}: PageLayoutProps): ReactElement => {
  return (
    <div>
      <TopBar title={title} backTo={backTo} />
      <div className="content">{children}</div>
    </div>
  );
};

export default PageLayout;
