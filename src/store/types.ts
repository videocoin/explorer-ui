export interface Meta {
  page: number;
  offset: number;
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
}
