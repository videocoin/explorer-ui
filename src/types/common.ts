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
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  timestamp: string;
  value: string;
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
