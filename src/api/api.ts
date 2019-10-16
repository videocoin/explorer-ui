import api from './index';
import { AxiosPromise } from 'axios';

export function fetchBlocks(params: {
  offset: number;
  limit: number;
}): AxiosPromise {
  return api(`/blocks`, { params });
}

export function fetchBlock(hash: string): AxiosPromise {
  return api(`/block/${hash}`);
}

export function fetchTransactions(params: {
  offset: number;
  limit: number;
}): AxiosPromise {
  return api(`/transactions`, { params });
}

export function fetchTransaction(hash: string): AxiosPromise {
  return api(`/transaction/${hash}`);
}

export function fetchAccount(hash: string): AxiosPromise {
  return api(`/account/${hash}`);
}

export function fetchAccountTransactions(
  hash: string,
  params: {
    offset: number;
    limit: number;
  }
): AxiosPromise {
  return api(`/address/${hash}`, { params });
}
export function fetchAccountActions(
  hash: string,
  params: {
    offset: number;
    limit: number;
  }
): AxiosPromise {
  return api(`/actions/${hash}`, { params });
}
