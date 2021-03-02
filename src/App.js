import React, { Component } from 'react';
import GithubUserSearch from './components/search/Search';
import GithubUserDetail from './components/detail/Detail';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends Component {

    render() {
      return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={GithubUserSearch}/>
            <Route path='/detail/:user' exact={true} component={GithubUserDetail}/>
          </Switch>
        </Router>
      )
    }
}