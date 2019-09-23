import { ReduxStore } from './index';
import { transformBlocks } from './utils/transformers';

const SET_BLOCKS = 'SET_BLOCKS';
const SET_SINGLE_BLOCK = 'SET_SINGLE_BLOCK';

export interface Block {
  number: string;
  hash: string;
  timestamp: string;
  num_txs: string;
  gas_used: string;
  gas_limit: string;
  size: number;
}

export interface Blocks {
  [key: string]: Block;
}

export interface SetBlocksAction {
  type: typeof SET_BLOCKS;
  payload: Block[];
}

export interface SetSingleBlockAction {
  type: typeof SET_SINGLE_BLOCK;
  payload: Blocks;
}

type BlockActionTypes = SetBlocksAction | SetSingleBlockAction;

export function setBlocks(payload: Block[]): SetBlocksAction {
  return {
    type: SET_BLOCKS,
    payload,
  };
}

export function setSingleBlock(payload: Blocks): SetSingleBlockAction {
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
        ...transformBlocks(action.payload),
      };
    case SET_SINGLE_BLOCK:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export const getBlocks = (state: ReduxStore): Blocks => state.blocks;
