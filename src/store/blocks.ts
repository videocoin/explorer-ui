import { get } from 'lodash/fp';
import { BLOCKS_OFFSET } from 'const';
import * as API from 'api/api';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { Meta } from 'store/types';
import { Transaction } from 'store/transactions';

const SET_BLOCKS = 'SET_BLOCKS';
const SET_LATEST_BLOCKS = 'SET_LATEST_BLOCKS';
const SET_SINGLE_BLOCK = 'SET_SINGLE_BLOCK';

export interface Block {
  number: string;
  hash: string;
  timestamp: string;
  numTxs: string;
  gasUsed: string;
  gasLimit: string;
  size: number;
  transactions: string[] | Transaction[];
  parentHash: string;
  extraData: string;
}

export interface SetBlocksAction {
  type: typeof SET_BLOCKS;
  payload: { blocks: Block[]; meta: Meta };
}

export interface SetLatestBlocksAction {
  type: typeof SET_LATEST_BLOCKS;
  payload: Block[];
}

export interface SetSingleBlockAction {
  type: typeof SET_SINGLE_BLOCK;
  payload: Block;
}

type BlockActionTypes =
  | SetBlocksAction
  | SetSingleBlockAction
  | SetLatestBlocksAction;

export function setBlocks(payload: {
  blocks: Block[];
  meta: Meta;
}): SetBlocksAction {
  return {
    type: SET_BLOCKS,
    payload
  };
}

export function setSingleBlock(payload: Block): SetSingleBlockAction {
  return {
    type: SET_SINGLE_BLOCK,
    payload
  };
}
export function setLatestBlocks(payload: Block[]): SetLatestBlocksAction {
  return {
    type: SET_LATEST_BLOCKS,
    payload
  };
}

interface BlocksState {
  blocks: Block[];
  block: Block | null;
  latest: Block[];
  meta: Meta;
}

const initialState: BlocksState = {
  blocks: [],
  latest: [],
  block: null,
  meta: {
    hasMore: false
  }
};

export function blocksReducer(
  state = initialState,
  action: BlockActionTypes
): BlocksState {
  switch (action.type) {
    case SET_BLOCKS:
      return {
        ...state,
        ...action.payload
      };
    case SET_SINGLE_BLOCK:
      return {
        ...state,
        block: action.payload
      };
    case SET_LATEST_BLOCKS:
      return {
        ...state,
        latest: action.payload
      };
    default:
      return state;
  }
}

export const fetchBlocks = ({
  before,
  after,
  limit = BLOCKS_OFFSET
}: {
  limit?: number;
  before?: number;
  after?: number;
}): ThunkAction<void, BlocksState, null, Action<string>> => async dispatch => {
  const res = await API.fetchBlocks({ limit, before, after });
  const { blocks } = res.data;
  const hasMore = blocks.length === BLOCKS_OFFSET;
  dispatch(setBlocks({ meta: { before, after, hasMore }, blocks }));
  return res;
};

export const getBlocks = get('blocks.blocks');
export const getBlock = get('blocks.block');
export const getLatestBlocks = get('blocks.latest');
export const getBlocksMeta = get('blocks.meta');
