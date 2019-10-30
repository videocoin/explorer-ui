import { get, map } from 'lodash/fp';
import { AccountEvent, Meta } from 'store/types';
import { TRANSACTIONS_OFFSET } from 'const';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import * as API from 'api/api';
import { Transaction } from 'store/transactions';
const SET_ACCOUNT = 'SET_ACCOUNT';
const SET_ACCOUNT_TRANSACTIONS = 'SET_ACCOUNT_TRANSACTIONS';
const SET_ACCOUNT_ACTIONS = 'SET_ACCOUNT_ACTIONS';

export interface Account {
  balance: string;
}

export interface SetAccountAction {
  type: typeof SET_ACCOUNT;
  payload: Account;
}

export interface SetAccountTransactionsAction {
  type: typeof SET_ACCOUNT_TRANSACTIONS;
  payload: { transactions: Transaction[]; transactionsMeta: Meta };
}
export interface SetAccountActionsAction {
  type: typeof SET_ACCOUNT_ACTIONS;
  payload: { actions: AccountEvent[]; actionsMeta: Meta };
}

export function setAccountTransactions(payload: {
  transactions: Transaction[];
  transactionsMeta: Meta;
}): SetAccountTransactionsAction {
  return {
    type: SET_ACCOUNT_TRANSACTIONS,
    payload
  };
}

export function setAccountActions(payload: {
  actions: AccountEvent[];
  actionsMeta: Meta;
}): SetAccountActionsAction {
  return {
    type: SET_ACCOUNT_ACTIONS,
    payload
  };
}

export function setAccount(payload: Account): SetAccountAction {
  return {
    type: SET_ACCOUNT,
    payload
  };
}

type AccountActionTypes =
  | SetAccountAction
  | SetAccountTransactionsAction
  | SetAccountActionsAction;

interface AccountState {
  account: Account | null;
  actions: AccountEvent[];
  transactions: Transaction[];
  actionsMeta: Meta;
  transactionsMeta: Meta;
}

const initialState: AccountState = {
  account: null,
  actions: [],
  transactions: [],
  actionsMeta: {
    page: 1,
    offset: 0,
    hasMore: false
  },
  transactionsMeta: {
    page: 1,
    offset: 0,
    hasMore: false
  }
};

export const fetchAccountTransactions = ({
  hash,
  page = 1,
  limit = TRANSACTIONS_OFFSET
}: {
  hash: string;
  limit?: number;
  page?: number;
}): ThunkAction<void, AccountState, null, Action<string>> => async dispatch => {
  const offset = (page - 1) * TRANSACTIONS_OFFSET;
  const res = await API.fetchAccountTransactions(hash, { limit, offset });
  const { transactions } = res.data;
  const hasMore = transactions.length === TRANSACTIONS_OFFSET;
  const mappedTransactions = map<Transaction, Transaction>(
    ({ value, ...rest }) => ({
      value: (+value / 1e18).toString(),
      ...rest
    })
  )(transactions);
  dispatch(
    setAccountTransactions({
      transactionsMeta: { page, offset, hasMore },
      transactions: mappedTransactions
    })
  );
  return res;
};
export const fetchAccountActions = ({
  hash,
  page = 1,
  limit = TRANSACTIONS_OFFSET
}: {
  hash: string;
  limit?: number;
  page?: number;
}): ThunkAction<void, AccountState, null, Action<string>> => async dispatch => {
  const offset = (page - 1) * TRANSACTIONS_OFFSET;
  const res = await API.fetchAccountActions(hash, { limit, offset });
  const { actions } = res.data;
  const hasMore = actions.length === TRANSACTIONS_OFFSET;
  dispatch(
    setAccountActions({
      actionsMeta: { page, offset, hasMore },
      actions
    })
  );
  return res;
};

export function accountReducer(
  state = initialState,
  action: AccountActionTypes
): AccountState {
  switch (action.type) {
    case SET_ACCOUNT:
      return {
        ...state,
        account: action.payload
      };
    case SET_ACCOUNT_TRANSACTIONS:
      return {
        ...state,
        ...action.payload
      };
    case SET_ACCOUNT_ACTIONS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export const getAccount = get('account.account');
export const getAccountTransactions = get('account.transactions');
export const getAccountTransactionsMeta = get('account.transactionsMeta');
export const getAccountActions = get('account.actions');
export const getAccountActionsMeta = get('account.actionsMeta');
