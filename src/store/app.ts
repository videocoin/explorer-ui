/* eslint-disable */

export interface AppState {
    isLoading: boolean;
}

export const UPDATE_LOADING = 'UPDATE_LOADING';

interface UpdateSessionAction {
    type: typeof UPDATE_LOADING;
    payload: AppState;
}

export type AppActionTypes = UpdateSessionAction

const initialState: AppState = {
    isLoading: false
};

export function appReducer(
    state = initialState,
    action: AppActionTypes
): AppState {
    switch (action.type) {
        case UPDATE_LOADING: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}
