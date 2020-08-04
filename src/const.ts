export const BLOCKS_OFFSET = 20;
export const TRANSACTIONS_OFFSET = 20;
export const POLL_TIMEOUT = 5000;
export const IGNORE_OUTSIDE_CLASS_NAME = 'ignore-onclickoutside';

export enum WorkerStatus {
  OFFLINE = 'OFFLINE',
  NEW = 'NEW',
  IDLE = 'IDLE',
  BUSY = 'BUSY',
}

export const readableWorkerStatus: Record<WorkerStatus, string> = {
  [WorkerStatus.BUSY]: 'Active',
  [WorkerStatus.IDLE]: 'Awaiting Work',
  [WorkerStatus.NEW]: 'New',
  [WorkerStatus.OFFLINE]: 'Offline',
};

export const apiURL = process.env.REACT_APP_CLOUD_API_URL;
export const GENESIS_POOL_WORKERS = [
  '0x6EBB37C387f073Db87f53A391a343D18044d534A',
  '0xf8943d8e331e2B0efd50F084e818668cebb0E4F1', // dev
];
