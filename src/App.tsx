import React from 'react';
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';

import Header from './components/Common/Header';
import HomePage from './components/HomePage/HomePage';
import BlockPage from './components/BlockPage/BlockPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/block">Block</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/block" component={BlockPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
