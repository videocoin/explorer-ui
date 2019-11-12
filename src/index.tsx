import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from 'store';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import './styles/index.scss';
import { BreakpointProvider } from 'components/BreakpointProvider';
import { BreakpointType } from 'types/common';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const queries: { [key in BreakpointType]: string } = {
  sm: '(max-width: 767px)',
  md: '(max-width: 1023px)'
};

render(
  <Provider store={store}>
    <BreakpointProvider queries={queries}>
      <App />
    </BreakpointProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
