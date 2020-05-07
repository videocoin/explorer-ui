import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlocksTable from './BlocksTable';
import { BlockRow } from 'types/common';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Blocks page', () => {
  let wrapper: RenderResult;
  const data: BlockRow[] = [
    {
      hash:
        '0xd66da31869a019406f6830a67ba8c19d15c5eece92148954f46f9a239c328c3e',
      number: '706139',
      timestamp: '2020-02-27T10:34:33Z',
      numTxs: '1',
      gasUsed: '27139',
      gasLimit: '8000000',
      size: 753,
    },
    {
      hash:
        '0x385f5171fcf8ed9327e365fe457d58eb03d9addbd485dde8d683bcbd2045e550',
      number: '706138',
      timestamp: '2020-02-27T10:34:01Z',
      numTxs: '1',
      gasUsed: '27139',
      gasLimit: '8000000',
      size: 753,
    },
  ];
  beforeEach(() => {
    wrapper = render(<BlocksTable data={data} />);
  });
  it('Should correct render latest blocks table', () => {
    const { getByTestId } = wrapper;
    const table = getByTestId('blocksTable');
    expect(table.querySelectorAll('tr').length).toBe(3);
    const row = table.querySelector('tbody').querySelector('tr');
    const { number, hash, numTxs, gasLimit, gasUsed, size } = data[0];
    expect(row.querySelector('td').innerHTML).toBe(number);
    expect(row.querySelector('td:nth-child(2)').innerHTML).toBe(hash);
    expect(row.querySelector('td:nth-child(3)').innerHTML).toBe(numTxs);
    expect(row.querySelector('td:nth-child(4)').innerHTML).toBe(
      `${gasUsed}/${gasLimit}`
    );
    expect(row.querySelector('td:nth-child(5)').innerHTML).toBe(
      size.toString()
    );
  });
  it('should go to block details page', () => {
    const { getByTestId } = wrapper;
    const table = getByTestId('blocksTable');
    const row = table.querySelector('tbody').querySelector('tr');
    userEvent.click(row);
    expect(mockHistoryPush).toBeCalledWith(`/blocks/${data[0].hash}`);
  });
});
