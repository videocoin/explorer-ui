import React from 'react';
import { Icon } from 'ui-kit';
import css from './Pagination.module.scss';

interface PaginationProps {
  onPrev: () => void;
  onNext: () => void;
}

export const Pagination = ({ onPrev, onNext }: PaginationProps) => (
  <div className={css.root}>
    <button type="button" onClick={onPrev}>
      <Icon name="arrowLeft" />
    </button>
    <button type="button" onClick={onNext}>
      <Icon name="arrowRight" />
    </button>
  </div>
);
