import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import BlockPage from './BlockPage';
import { BreakpointProvider } from 'components/BreakpointProvider';
import { BreakpointType } from 'types/common';
import timeAgo from 'utils/timeAgo';

const blockData = {
  hash: '0x8e65d4f5143dbb387d24f6792a4493e97d73f0f1032d7f4237a67273915bbc3f',
  parentHash:
    '0xcd1b20d917f34339e181523bc24fbb6dbd7263571a4a3927401666266c53b217',
  number: '706295',
  timestamp: '2020-02-27T11:54:07Z',
  gasUsed: '27139',
  gasLimit: '8000000',
  size: 753,
  transactions: [
    '0xd808253eaf1a7b82d26eeb18f6c474b50bd04d9d11c7f4d00b3e681488cf1b49'
  ],
  extraData:
    '0xd883010907846765746888676f312e31332e34856c696e7578000000000000000c692816fd219e78fe709424b5e8de6aad6dec6dd1be56fe2a314ba30b55df39758b7881320e244f9114df8270c0a14ebdb900d2f994ab22ff3670c28c3bf98e01'
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
      block: {
        hash:
          '0x8e65d4f5143dbb387d24f6792a4493e97d73f0f1032d7f4237a67273915bbc3f',
        parentHash:
          '0xcd1b20d917f34339e181523bc24fbb6dbd7263571a4a3927401666266c53b217',
        number: '706295',
        timestamp: '2020-02-27T11:54:07Z',
        gasUsed: '27139',
        gasLimit: '8000000',
        size: 753,
        transactions: [
          '0xd808253eaf1a7b82d26eeb18f6c474b50bd04d9d11c7f4d00b3e681488cf1b49'
        ],
        extraData:
          '0xd883010907846765746888676f312e31332e34856c696e7578000000000000000c692816fd219e78fe709424b5e8de6aad6dec6dd1be56fe2a314ba30b55df39758b7881320e244f9114df8270c0a14ebdb900d2f994ab22ff3670c28c3bf98e01'
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

export const queries: { [key in BreakpointType]: string } = {
  sm: '(max-width: 767px)',
  md: '(max-width: 1023px)'
};

describe('Block Page', () => {
  it('Should correct render Block details page', async () => {
    const { container } = render(
      <MemoryRouter>
        <BreakpointProvider queries={queries}>
          <BlockPage />
        </BreakpointProvider>
      </MemoryRouter>
    );
    const htmlText = container.innerHTML;
    expect(htmlText).toContain(blockData.number);
    expect(htmlText).toContain(timeAgo(blockData.timestamp));
    expect(htmlText).toContain(blockData.hash);
  });
});
