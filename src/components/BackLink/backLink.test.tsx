import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import BackLink from './index';

const mockHistoryBack = jest.fn();
const mockHistoryReplace = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    length: 10,
    goBack: mockHistoryBack,
    replace: mockHistoryReplace,
  }),
}));

describe('BackLink', () => {
  it('Should go back if history has length', () => {
    const { getByTestId } = render(<BackLink />);
    userEvent.click(getByTestId('backLink'));
    expect(mockHistoryBack).toBeCalledTimes(1);
  });
});
