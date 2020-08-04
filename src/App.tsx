import React, { ReactElement } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navigation from 'components/Common/Navigation';
import HomePage from 'components/HomePage/HomePage';
import BlocksPage from 'components/BlocksPage/BlocksPage';
import BlockPage from 'components/BlockPage/BlockPage';
import TransactionsPage from 'components/TransactionsPage/TransactionsPage';
import TransactionPage from 'components/TransactionPage/TransactionPage';
import AccountPage from 'components/AccountPage/AccountPage';
import EmptySearchPage from 'components/EmptySearchPage';
import WorkersPage from 'components/WorkersPage';
import WorkerPage from './components/WorkerPage';

const App: React.FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <div className="root">
          <div className="nav">
            <Navigation />
          </div>
          <div className="body">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/blocks" component={BlocksPage} />
              <Route exact path="/blocks/:hash" component={BlockPage} />
              <Route exact path="/transactions" component={TransactionsPage} />
              <Route exact path="/workers" component={WorkersPage} />
              <Route exact path="/workers/:workerId" component={WorkerPage} />
              <Route
                exact
                path="/transactions/:hash"
                component={TransactionPage}
              />
              <Route exact path="/account/:hash" component={AccountPage} />
              <Route exact path="/no-results" component={EmptySearchPage} />
            </Switch>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-center" closeButton={false} />
    </BrowserRouter>
  );
};

export default hot(App);
