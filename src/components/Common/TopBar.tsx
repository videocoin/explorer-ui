import React, { ReactElement, ReactNode } from 'react';
import { TopBar as TopBarBase, Typography } from 'ui-kit';
import Search from 'components/Search';
import BackLink from 'components/BackLink';
import Logo from 'components/Common/Logo';
import css from './topBar.module.scss';
import { Link } from 'react-router-dom';
import { useBreakpoint } from 'components/BreakpointProvider';

interface TopBarProps {
  title: ReactNode;
  backTo?: string;
  hideSearch?: boolean;
}

const TopBar = ({
  title,
  backTo,
  hideSearch = false,
}: TopBarProps): ReactElement => {
  const breakpoints = useBreakpoint();
  return (
    <div className={css.root}>
      <TopBarBase>
        <Link className={css.logo} to="/">
          <Logo />
        </Link>

        {Boolean(backTo) && <BackLink to={backTo} />}
        <div className={css.title}>
          <Typography type={breakpoints.sm ? 'tiny' : 'caption'}>
            VideoCoin Network
          </Typography>
          <Typography type={breakpoints.sm ? 'body' : 'smallTitle'}>
            {title}
          </Typography>
        </div>
        {!hideSearch && <Search />}
      </TopBarBase>
    </div>
  );
};

export default TopBar;
