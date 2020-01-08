/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosTransformer } from 'axios';
import humps from 'humps';

const baseURL = process.env.REACT_APP_TXLOG_URL;

const defaultTransformers = (transformRequest: any): AxiosTransformer[] => {
  if (!transformRequest) {
    return [];
  }
  if (transformRequest instanceof Array) {
    return transformRequest;
  }

  return [transformRequest];
};

const api = axios.create({
  baseURL,
  transformRequest: [
    (data: any) => humps.decamelizeKeys(data),
    ...defaultTransformers(axios.defaults.transformRequest)
  ],
  transformResponse: [
    ...defaultTransformers(axios.defaults.transformResponse),
    (data: any) => humps.camelizeKeys(data)
  ]
});

export default api;
