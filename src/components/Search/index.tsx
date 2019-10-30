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
  const handleSearch = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!value) return;
    const wrongValue = !isAddress(value) && !isTransaction(value);
    if (wrongValue) {
      history.push('/no-results');
      return;
    }
    setLoading(true);
    try {
      if (isAddress(value)) {
        const res = await fetchAccount(value);
        const { account } = res.data;
        if (account) {
          await setAccount(account);
          history.push(`/account/${value}`);
        } else {
          history.push('/no-results');
        }
      }
      if (isTransaction(value)) {
        const res = await fetchTransaction(value);
        const { transaction } = res.data;
        if (transaction) {
          await setSingleTransaction(transaction);
          history.push(`/transactions/${value}`);
        } else {
          const res = await fetchBlock(value);
          const { block } = res.data;
          if (block) {
            await setSingleBlock(block);
            history.push(`/blocks/${value}`);
          } else {
            history.push('/no-results');
          }
        }
      }
    } catch (e) {
      history.push('/no-results');
    }
  };
  return (
    <form className={css.root} onSubmit={handleSearch}>
      <div className={css.input}>
        <Input
          label="Search by Blocks, Tx Hash, Stream Id, or Account"
          value={value}
          onChange={onChange}
        />
      </div>
      <button className={css.btn} type="submit" disabled={!Boolean(value)}>
        {loading ? <Spinner size="sm" type="inline" /> : <Icon name="search" />}
      </button>
    </form>
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
