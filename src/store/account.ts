import { get } from 'lodash/fp';
const SET_ACCOUNT = 'SET_ACCOUNT';

export interface Account {
  balance: string;
}

export interface SetAccountAction {
  type: typeof SET_ACCOUNT;
  payload: Account;
}

export function setAccount(payload: Account): SetAccountAction {
  return {
    type: SET_ACCOUNT,
    payload
  };
}

type AccountActionTypes = SetAccountAction;

interface AccountState {
  account: Account | null;
}

const initialState: AccountState = {
  account: null
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
    default:
      return state;
  }
}

export const getAccount = get('account.account');
