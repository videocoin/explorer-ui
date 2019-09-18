import React from 'react';
import { Logo } from 'ui-kit';
import css from './header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={css.header}>
      <Logo type="colorWhite" width={171} />
      <h1>Compiled successfully!</h1>
    </div>
  );
};

Header.defaultProps = {};

export default Header;
