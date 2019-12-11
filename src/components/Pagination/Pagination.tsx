import React from 'react';
import { Icon } from 'ui-kit';
import css from './Pagination.module.scss';

interface PaginationProps {
  onPrev: () => void;
  onNext: () => void;
  disabled?: boolean;
}

export const Pagination = ({
  disabled = false,
  onPrev,
  onNext
}: PaginationProps) => (
  <div className={css.root}>
    <button type="button" onClick={onPrev} disabled={disabled}>
      <Icon name="arrowLeft" />
    </button>
    <button type="button" onClick={onNext} disabled={disabled}>
      <Icon name="arrowRight" />
    </button>
  </div>
);
