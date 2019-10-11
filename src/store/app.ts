import { ReduxStore } from './index';

export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: Error;
}

export type AppActionTypes = SetLoadingAction | SetErrorAction;

export function setLoading(payload: boolean): SetLoadingAction {
  return {
    type: SET_LOADING,
    payload
  };
}

export function setError(payload: Error | null): SetErrorAction {
  return {
    type: SET_ERROR,
    payload
  };
}

export interface AppState {
  isLoading: boolean;
  error: Error | null;
}

const initialState: AppState = {
  isLoading: false,
  error: null
};

export function appReducer(
  state = initialState,
  action: AppActionTypes
): AppState {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

const getAppState = (state: ReduxStore): AppState => state.app;

export const getIsLoading = (state: ReduxStore): boolean =>
  getAppState(state).isLoading;
