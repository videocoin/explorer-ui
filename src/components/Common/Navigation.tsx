import React, { ReactElement } from 'react';
import NavLink from './NavLink';
import css from './navigation.module.scss';
import Logo from 'components/Common/Logo';
import { Link } from 'react-router-dom';

const Navigation = (): ReactElement => (
  <>
    <Link className={css.navLogo} to="/">
      <Logo />
    </Link>
    <div className={css.nav}>
      <NavLink exact icon="dashboard" label="Dashboard" to="/" />
      <NavLink icon="block" label="Blocks" to="/blocks" />
      <NavLink icon="transactions" label="Transactions" to="/transactions" />
      {/*<NavLink icon="stream" label="Streams1" to="/streams" />*/}
    </div>
  </>
);

export default Navigation;
