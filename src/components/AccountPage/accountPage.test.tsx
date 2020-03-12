import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AccountPage from './AccountPage';
import { MemoryRouter } from 'react-router-dom';
import { BreakpointProvider } from 'components/BreakpointProvider';
import { BreakpointType } from 'types/common';
import { convertToVID } from 'utils/convertBalance';

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
      account: {
        balance:
          '904625697166532776746648320380374280103671755200316906505327930336821325312'
      },
      transactions: [
        {
          hash:
            '0x04187d6581da052e7a8a7e15520edb84d85bdfdc8030b3a4363631d5ad669d98',
          from: '0x419aB3069F85bB1386b74524EcD582545c31250b',
          to: '0x0000000000000000000000000000000000000100',
          timestamp: '2020-03-11T11:28:02Z',
          value: '0'
        }
      ],
      actions: []
    }
  }))
);
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    hash: '0x8e65d4f5143dbb387d24f6792a4493e97d73f0f1032d7f4237a67273915bbc3f'
  })
}));

const queries: { [key in BreakpointType]: string } = {
  sm: '(max-width: 767px)',
  md: '(max-width: 1023px)'
};

describe('Account page', () => {
  it('Should correct render', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BreakpointProvider queries={queries}>
          <AccountPage />
        </BreakpointProvider>
      </MemoryRouter>
    );
    expect(getByTestId('accountBalance').innerHTML).toBe(
      convertToVID(
        '904625697166532776746648320380374280103671755200316906505327930336821325312'
      ).toString()
    );
    expect(getByTestId('accountHead').innerHTML).toContain(
      '0x8e65d4f5143dbb387d24f6792a4493e97d73f0f1032d7f4237a67273915bbc3f'
    );
  });
});
