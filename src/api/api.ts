import axios, { AxiosPromise, AxiosError } from 'axios';

const BASE_URL = 'https://txlog.videocoin.network/api/v1';

export function fetchBlocks(limit = 20): AxiosPromise {
  return axios.get(`${BASE_URL}/blocks?limit=${limit}`);
}

export function fetchBlock(hash: string): AxiosPromise {
  return axios.get(`${BASE_URL}/blocks/${hash}`);
}
