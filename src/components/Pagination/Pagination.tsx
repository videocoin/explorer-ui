import React from 'react';
import { Icon } from 'ui-kit';
import css from './Pagination.module.scss';

interface PaginationProps {
  onPrev: () => void;
  onNext: () => void;
  disabled?: boolean;
  disabledNext?: boolean;
  disabledPrev?: boolean;
}

export const Pagination = ({
  disabled = false,
  onPrev,
  onNext,
  disabledNext = false,
  disabledPrev = false
}: PaginationProps) => (
  <div className={css.root}>
    <button type="button" onClick={onPrev} disabled={disabled || disabledNext}>
      <Icon name="arrowLeft" />
    </button>
    <button type="button" onClick={onNext} disabled={disabled || disabledPrev}>
      <Icon name="arrowRight" />
    </button>
  </div>
);
