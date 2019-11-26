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
}
