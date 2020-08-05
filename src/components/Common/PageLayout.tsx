import React, { ReactElement, ReactNode, Suspense } from 'react';
import TopBar from 'components/Common/TopBar';
import { Spinner, Typography } from 'ui-kit';
import ErrorBoundary from '../ErrorHandler';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  backTo?: string;
}

const PageLayout = ({
  children,
  title,
  backTo,
}: PageLayoutProps): ReactElement => {
  return (
    <div>
      <TopBar title={title} backTo={backTo} />
      <div className="content">
        <Suspense fallback={<Spinner />}>
          <ErrorBoundary
            fallback={<Typography>:( Ooops. Something went wrong</Typography>}
          >
            {children}
          </ErrorBoundary>
        </Suspense>
      </div>
    </div>
  );
};

export default PageLayout;
