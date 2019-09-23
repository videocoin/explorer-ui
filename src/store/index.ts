import { combineReducers } from 'redux';
import { appReducer } from './app';
import { blockReducer } from './block';

export * from './app';
export * from './block';

export const rootReducer = combineReducers({
  app: appReducer,
  blocks: blockReducer,
});

export type ReduxStore = ReturnType<typeof rootReducer>;
