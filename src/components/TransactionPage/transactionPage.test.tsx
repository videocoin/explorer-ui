import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import TransactionPage from './TransactionPage';
import { BreakpointProvider } from 'components/BreakpointProvider';
import timeAgo from 'utils/timeAgo';
import { BreakpointType } from 'types/common';

const transactionData = {
  hash: '0x8e65d4f5143dbb387d24f6792a4493e97d73f0f1032d7f4237a67273915bbc3f',
  from: '0x419aB3069F85bB1386b74524EcD582545c31250b',
  to: '0x0000000000000000000000000000000000000100',
  timestamp: '2020-02-27T11:54:07Z',
  value: '1',
  blockNumber: '741296',
  blockHash:
    '0x0239df7a3347e7d37fa63a9efa5a7ca21f4c8c8a4393f747db115b2ea1faa86f',
  nonce: '196570',
  input:
    '5d974a6600000000000000000000000000000000000000000000000000000000005d4bb2',
  gas: '27139',
  gasPrice: '10000000000',
  status: '1'
};

const mockHistoryPush = jest.fn();
jest.mock('swr', () =>
  jest.fn(() => ({
    data: {
      data: []
    }
  }))
);
jest.mock('api/useRequest', () =>
  jest.fn(() => ({
    data: {
      transaction: {
        hash:
          '0x8e65d4f5143dbb387d24f6792a4493e97d73f0f1032d7f4237a67273915bbc3f',
        from: '0x419aB3069F85bB1386b74524EcD582545c31250b',
        to: '0x0000000000000000000000000000000000000100',
        timestamp: '2020-02-27T11:54:07Z',
        value: '1',
        blockNumber: '741296',
        blockHash:
          '0x0239df7a3347e7d37fa63a9efa5a7ca21f4c8c8a4393f747db115b2ea1faa86f',
        nonce: '196570',
        input:
          '5d974a6600000000000000000000000000000000000000000000000000000000005d4bb2',
        gas: '27139',
        gasPrice: '10000000000',
        status: '1'
      }
    }
  }))
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    replace: mockHistoryPush
  }),
  useParams: () => ({
    hash: '0x8e65d4f5143dbb387d24f6792a4493e97d73f0f1032d7f4237a67273915bbc3f'
  })
}));

const queries: { [key in BreakpointType]: string } = {
  sm: '(max-width: 767px)',
  md: '(max-width: 1023px)'
};

describe('Transaction Page', () => {
  it('Should correct render Transaction details page', async () => {
    const { container } = render(
      <MemoryRouter>
        <BreakpointProvider queries={queries}>
          <TransactionPage />
        </BreakpointProvider>
      </MemoryRouter>
    );
    const htmlText = container.innerHTML;
    expect(htmlText).toContain(timeAgo(transactionData.timestamp));
    expect(htmlText).toContain(transactionData.value);
    expect(htmlText).toContain(transactionData.from);
    expect(htmlText).toContain(transactionData.to);
    expect(htmlText).toContain(transactionData.blockHash);
    expect(htmlText).toContain(transactionData.nonce);
  });
});
