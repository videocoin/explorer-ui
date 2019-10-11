import { get } from 'lodash/fp';
import { TRANSACTIONS_OFFSET } from 'const';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import * as API from 'api/api';
import { Meta } from 'store/types';

const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
const SET_LATEST_TRANSACTIONS = 'SET_LATEST_TRANSACTIONS';
const SET_SINGLE_TRANSACTION = 'SET_SINGLE_TRANSACTION';

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  timestamp: string;
  value: string;
}

export interface FullTransaction extends Transaction {
  blockNumber: string;
  blockHash: string;
  nonce: string;
  input: string;
  gas: string;
  gasPrice: string;
  status: string;
}

export interface Transactions {
  [key: string]: Transaction;
}

export interface SetTransactionsAction {
  type: typeof SET_TRANSACTIONS;
  payload: { transactions: Transaction[]; meta: Meta };
}

export interface SetLatestTransactionsAction {
  type: typeof SET_LATEST_TRANSACTIONS;
  payload: Transaction[];
}

export interface SetSingleTransactionAction {
  type: typeof SET_SINGLE_TRANSACTION;
  payload: FullTransaction;
}

type TransactionsActionTypes =
  | SetTransactionsAction
  | SetLatestTransactionsAction
  | SetSingleTransactionAction;

export function setTransactions(payload: {
  transactions: Transaction[];
  meta: Meta;
}): SetTransactionsAction {
  return {
    type: SET_TRANSACTIONS,
    payload
  };
}

export function setSingleTransaction(
  payload: FullTransaction
): SetSingleTransactionAction {
  return {
    type: SET_SINGLE_TRANSACTION,
    payload
  };
}

export function setLatestTransactions(
  payload: Transaction[]
): SetLatestTransactionsAction {
  return {
    type: SET_LATEST_TRANSACTIONS,
    payload
  };
}

interface TransactionsState {
  transactions: Transaction[];
  latest: Transaction[];
  meta: Meta;
  transaction: Transaction | null;
}

export const fetchTransactions = ({
  page = 1,
  limit = TRANSACTIONS_OFFSET
}: {
  limit?: number;
  page?: number;
}): ThunkAction<
  void,
  TransactionsState,
  null,
  Action<string>
> => async dispatch => {
  const offset = (page - 1) * TRANSACTIONS_OFFSET;
  const res = await API.fetchTransactions({ limit, offset });
  const { transactions } = res.data;
  const hasMore = transactions.length === TRANSACTIONS_OFFSET;
  dispatch(setTransactions({ meta: { page, offset, hasMore }, transactions }));
  return res;
};

const initialState: TransactionsState = {
  transactions: [],
  latest: [],
  meta: {
    page: 1,
    offset: 0,
    hasMore: false
  },
  transaction: null
};

export function transactionsReducer(
  state = initialState,
  action: TransactionsActionTypes
): TransactionsState {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return {
        ...state,
        ...action.payload
      };
    case SET_LATEST_TRANSACTIONS:
      return {
        ...state,
        latest: action.payload
      };
    case SET_SINGLE_TRANSACTION:
      return {
        ...state,
        transaction: action.payload
      };
    default:
      return state;
  }
}

export const getTransactions = get('transactions.transactions');
export const getLatestTransactions = get('transactions.latest');
export const getTransactionsMeta = get('transactions.meta');
export const getTransaction = get('transactions.transaction');
