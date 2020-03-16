import React, { ReactElement, ReactNode, Suspense } from 'react';
import TopBar from 'components/Common/TopBar';
import { Spinner } from 'ui-kit';

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
      <div className="content">
        <Suspense fallback={<Spinner />}>{children}</Suspense>
      </div>
    </div>
  );
};

export default PageLayout;
