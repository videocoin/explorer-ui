const SET_BLOCKS = 'SET_BLOCKS';
const SET_SINGLE_BLOCK = 'SET_SINGLE_BLOCK';

interface SetBlocksAction {
  type: typeof SET_BLOCKS;
  payload: {};
}

interface SetSingleBlockAction {
  type: typeof SET_SINGLE_BLOCK;
  payload: {};
}

type BlockActionTypes = SetBlocksAction | SetSingleBlockAction;

export function setBlocks(payload: {}): SetBlocksAction {
  return {
    type: SET_BLOCKS,
    payload,
  };
}

export function setSingleBlocks(payload: {}): SetSingleBlockAction {
  return {
    type: SET_SINGLE_BLOCK,
    payload,
  };
}

export function blockReducer(state = {}, action: BlockActionTypes): {} {
  switch (action.type) {
    case SET_BLOCKS:
      return {
        ...state,
      };
    case SET_SINGLE_BLOCK:
      return {
        ...state,
      };
    default:
      return state;
  }
}
