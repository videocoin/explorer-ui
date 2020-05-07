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
