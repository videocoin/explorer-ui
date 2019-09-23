import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import css from './navigation.module.scss';

const Navigation = (): ReactElement => {
  return (
    <nav className={css.mainNav}>
      <Link to="/">Home</Link>
    </nav>
  );
};

export default Navigation;
