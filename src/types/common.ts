import { WorkerStatus } from 'const';

export type BreakpointType = 'sm' | 'md';
export interface Breakpoints {
  sm?: boolean;
  md?: boolean;
}

export interface Account {
  balance: string;
}

export interface Meta {
  before?: number;
  after?: number;
  hasMore: boolean;
}

export interface AccountEvent {
  createdAt: string;
  from: string;
  hash: string;
  source: string;
  to: string;
  type: string;
  value: string;
  timestamp: string;
  cursor: {
    block: string;
    index: string;
  };
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  timestamp: string;
  value: string;
  cursor: {
    block: string;
    index: string;
  };
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

export interface BlockRow {
  number: string;
  hash: string;
  timestamp: string;
  numTxs: string;
  gasUsed: string;
  gasLimit: string;
  size: number;
}
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
  cursor: {
    block: string;
  };
}

export interface Worker {
  id: string;
  address: string;
  name: string;
  status: WorkerStatus;
  isInternal: boolean;
  systemInfo: {
    cpuCores: number;
    cpuFreq: number;
    cpuUsage: number;
    memUsage: number;
    memTotal: number;
    latitude: number;
    longitude: number;
  };
  selfStake: number;
  delegatedStake: number;
  reward: number;
  totalStake: number;
}
