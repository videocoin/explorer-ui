import React, { FormEvent, ReactElement, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Icon, Input, Spinner } from 'ui-kit';
import css from './styles.module.scss';
import isTransaction from 'utils/isTransaction';
import {
  setSingleTransaction,
  setSingleBlock,
  FullTransaction,
  SetSingleTransactionAction,
  Block,
  SetSingleBlockAction,
  setAccount,
  SetAccountAction,
  Account
} from 'store';
import { connect } from 'react-redux';
import { fetchAccount, fetchBlock, fetchTransaction } from 'api/api';
import isAddress from 'utils/isAddress';

interface DispatchProps {
  setSingleTransaction: (
    payload: FullTransaction
  ) => SetSingleTransactionAction;
  setSingleBlock: (payload: Block) => SetSingleBlockAction;
  setAccount: (payload: Account) => SetAccountAction;
}

const Search = ({
  history,
  setSingleTransaction,
  setSingleBlock,
  setAccount
}: RouteComponentProps & DispatchProps): ReactElement => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const onChange = (e: FormEvent<HTMLInputElement>): void =>
    setValue(e.currentTarget.value);
  const handleSearch = async (): Promise<void> => {
    setLoading(true);
    if (isAddress(value)) {
      const res = await fetchAccount(value);
      const { account } = res.data;
      if (account) {
        await setAccount(account);
        history.push(`/account/${value}`);
        return;
      }
    }
    if (isTransaction(value)) {
      const res = await fetchTransaction(value);
      const { transaction } = res.data;
      if (transaction) {
        await setSingleTransaction(transaction);
        history.push(`/transactions/${value}`);
        return;
      }
    }
    const res = await fetchBlock(value);
    const { block } = res.data;
    if (block) {
      await setSingleBlock(block);
      history.push(`/blocks/${value}`);
    }
  };
  return (
    <div className={css.root}>
      <Input
        label="Search by Blocks, Tx Hash, Stream Id, or Account"
        value={value}
        onChange={onChange}
      />
      <button className={css.btn} onClick={handleSearch}>
        {loading ? <Spinner size="sm" type="inline" /> : <Icon name="search" />}
      </button>
    </div>
  );
};

const dispatchProps = {
  setSingleTransaction,
  setSingleBlock,
  setAccount
};

export default connect(
  null,
  dispatchProps
)(withRouter(Search));
