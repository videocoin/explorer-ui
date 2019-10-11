import { combineReducers } from 'redux';
import { appReducer } from './app';
import { blocksReducer } from './blocks';
import { transactionsReducer } from './transactions';
import { accountReducer } from './account';

export * from './app';
export * from './blocks';
export * from './transactions';
export * from './account';

export const rootReducer = combineReducers({
  app: appReducer,
  blocks: blocksReducer,
  transactions: transactionsReducer,
  account: accountReducer
});

export type ReduxStore = ReturnType<typeof rootReducer>;
