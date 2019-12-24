import React, { ReactElement } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Navigation from 'components/Common/Navigation';
import HomePage from 'components/HomePage/HomePage';
import BlocksPage from 'components/BlocksPage/BlocksPage';
import BlockPage from 'components/BlockPage/BlockPage';
import TransactionsPage from 'components/TransactionsPage/TransactionsPage';
import TransactionPage from 'components/TransactionPage/TransactionPage';
import StreamsPage from 'components/StreamsPage/StreamsPage';
import StreamPage from 'components/StreamPage/StreamPage';
import AccountPage from 'components/AccountPage/AccountPage';
import EmptySearchPage from 'components/EmptySearchPage';
import WorkersPage from 'components/WorkersPage';

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
              <Route
                exact
                path="/transactions/:hash"
                component={TransactionPage}
              />
              <Route exact path="/streams" component={StreamsPage} />
              <Route exact path="/streams/:hash" component={StreamPage} />
              <Route exact path="/account/:hash" component={AccountPage} />
              <Route exact path="/no-results" component={EmptySearchPage} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default hot(App);
