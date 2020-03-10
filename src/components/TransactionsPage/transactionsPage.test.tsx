import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import TransactionsTable from './TransactionsTable';
import { Transaction } from 'types/common';
import timeAgo from 'utils/timeAgo';
import { MemoryRouter } from 'react-router-dom';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('Blocks page', () => {
  let wrapper: RenderResult;
  const data: Transaction[] = [
    {
      hash:
        '0xd66da31869a019406f6830a67ba8c19d15c5eece92148954f46f9a239c328c3e',
      from: '0x419aB3069F85bB1386b74524EcD582545c31250b',
      to: '0x0000000000000000000000000000000000000100',
      timestamp: '2020-02-27T10:34:33Z',
      value: '0',
      cursor: {
        block: '741310',
        index: '0'
      }
    },
    {
      hash:
        '0xd66da31869a019406f6830a67ba8c19d15c5eece92148954f46f9a239c328c3c',
      from: '0x419aB3069F85bB1386b74524EcD582545c31250b',
      to: '0x0000000000000000000000000000000000000100',
      timestamp: '2020-02-27T10:34:33Z',
      value: '1',
      cursor: {
        block: '741311',
        index: '0'
      }
    }
  ];
  beforeEach(() => {
    wrapper = render(
      <MemoryRouter>
        <TransactionsTable data={data} />
      </MemoryRouter>
    );
  });
  it('Should correct render latest blocks table', () => {
    const { getByTestId } = wrapper;
    const table = getByTestId('transactionsTable');
    expect(table.querySelectorAll('tr').length).toBe(3);
    const row = table.querySelector('tbody').querySelector('tr');
    const { hash, from, to, timestamp, value } = data[0];
    expect(row.querySelector('td:nth-child(2)').innerHTML).toEqual(
      timeAgo(timestamp)
    );
    expect(
      row
        .querySelector('td:nth-child(3)')
        .querySelector('a')
        .getAttribute('href')
    ).toBe(`/transactions/${hash}`);
    expect(
      row
        .querySelector('td:nth-child(4)')
        .querySelector('a')
        .getAttribute('href')
    ).toBe(`/account/${from}`);
    expect(
      row
        .querySelector('td:nth-child(5)')
        .querySelector('a')
        .getAttribute('href')
    ).toBe(`/account/${to}`);
    expect(row.querySelector('td:nth-child(6)').innerHTML).toEqual(value);
  });
});
