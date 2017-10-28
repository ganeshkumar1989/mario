// ./react-redux-client/src/reducers/index.js
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './appReducer';
import gameReducer from './gameReducer';
import inputReducer from './inputReducer';

export default combineReducers({
  appState:appReducer,
  gameState:gameReducer,
  inputState:inputReducer,
  routing
})