import React, { ReactElement } from 'react';
import { NavLink as BaseNavLink, NavLinkProps } from 'react-router-dom';
import { Icon, IconName } from 'ui-kit';
import css from './navigation.module.scss';

export interface NavItemProps extends NavLinkProps {
  children?: never;
  icon: IconName;
  to: string;
  label?: string;
}
const NavLink = ({ icon, label, ...props }: NavItemProps): ReactElement => (
  <BaseNavLink activeClassName={css.active} className={css.link} {...props}>
    <Icon name={icon} width={28} height={28} />
    <div className={css.linkLabel}>{label}</div>
  </BaseNavLink>
);

export default NavLink;
