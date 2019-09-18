import { combineReducers } from 'redux';
import { appReducer } from './app';
import { blockReducer } from './block';

export const rootReducer = combineReducers({
  app: appReducer,
  blocks: blockReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
