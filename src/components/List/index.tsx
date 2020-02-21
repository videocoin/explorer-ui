import React, { FC, ReactElement } from 'react';
import { map } from 'lodash/fp';
import css from './styles.module.scss';
import { Button, IconName, Typography } from 'ui-kit';
import { Link } from 'react-router-dom';

interface List<T> {
  data: T[];
  viewAll: string;
  icon: IconName;
  title: string;
  rowComponent: FC<{ item: T }>;
}

const List = <T extends { hash: string }>({
  data,
  viewAll,
  icon,
  title,
  rowComponent: RowComponent
}: List<T>): ReactElement => {
  const renderRow = (item: T): ReactElement => (
    <RowComponent key={item.hash} item={item} />
  );
  return (
    <div className={css.list}>
      <div className={css.header}>
        <Typography type="subtitleCaps" className={css.title}>
          {title}
        </Typography>
        <Link to={viewAll}>
          <Button icon={icon} theme="minimal">
            view all
          </Button>
        </Link>
      </div>
      {map(renderRow)(data)}
    </div>
  );
};

export default List;
