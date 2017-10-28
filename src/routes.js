// ./react-redux-client/src/routes.js
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Input from './containers/Input';
import Game from './containers/Game';

function isInputsAvailable(){
    var config = JSON.parse(sessionStorage.getItem('marioConfig'));
    return config && config.rows && config.columns;
}

function requireInputs(nextState, replace) {
  if (!isInputsAvailable()) {
    replace({
      pathname: '/input'
    })
  }
}

export default (
  <Route path="/" component={App}>
     <IndexRoute component={Input} />
     <Route path="game" component={Game} onEnter={requireInputs}/>     
  </Route>  
)