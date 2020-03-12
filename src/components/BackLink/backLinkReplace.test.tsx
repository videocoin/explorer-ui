import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BackLink from './index';

const mockHistoryBack = jest.fn();
const mockHistoryReplace = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    length: 1,
    goBack: mockHistoryBack,
    replace: mockHistoryReplace
  })
}));

describe('BackLink', () => {
  it('Should replace path if history without length', () => {
    const { getByTestId } = render(<BackLink to="/test" />);
    userEvent.click(getByTestId('backLink'));
    expect(mockHistoryReplace).toBeCalledWith('/test');
  });
});
