import React, { ReactElement } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Header from './components/Common/Header';
import Navigation from './components/Common/Navigation';
import HomePage from './components/HomePage/HomePage';
import BlockPage from './components/BlockPage/BlockPage';

const App: React.FC = (): ReactElement => {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/block/:hash" component={BlockPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
