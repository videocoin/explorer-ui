import React, { ReactElement } from 'react';
import List from 'components/List';
import Row from './TransactionRow';
import { FullTransaction, Transaction } from 'types/common';

const LatestTransactions = ({
  data,
}: {
  data: Transaction[] | FullTransaction[];
}): ReactElement => {
  return (
    <List
      icon="transactions"
      viewAll="/transactions"
      title="Transactions"
      data={data}
      rowComponent={Row}
    />
  );
};

export default LatestTransactions;
