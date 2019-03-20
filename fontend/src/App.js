import React, { Component } from 'react';
import './App.css';
import Bear from "./Bear"
import CRUDBear from './crudBear'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import axios from "axios"
import thunk from 'redux-thunk'
import logo from './panda.svg'

export const add = () => {
  return { type: 'ADD' }
}

export const add2 = (num) => {
  return { type: 'ADD2', num: num }
}

export const minus = () => {
  return { type: 'MINUS' }
}

const numberReducer = (state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return state + 1
    case 'ADD2':
      return state + action.num
    case 'MINUS':
      return state - 1
    default:
      return state
  }
}

// ==========  END Number reducer


//Get
export const getBearsSuccess = bears => ({
  type: 'GET_BEARS_SUCCESS',
  bears
});
export const getBearsFailed = () => ({ type: 'GET_BEARS_FAILED' });

export const getBears = () => async (dispatch) => {
  try {
    console.log('Get Bear New')
    const response = await axios.get(`http://localhost/api/bears`)
    const responseBody = await response.data;
    console.log('response: ', responseBody)
    dispatch(getBearsSuccess(responseBody));
  } catch (error) {
    console.error(error);
    dispatch(getBearsFailed());
  }
}

//ADD
export const addbear = (bearname, weight) => async (dispatch) => {
  try {
    console.log('Add Bear New')
    if (bearname != undefined && weight != undefined) {
      await axios.post(`http://localhost/api/bears`, { name: bearname, weight: weight })
      const response = await axios.get(`http://localhost/api/bears`)
      const responseBody = await response.data;
      console.log('response: ', responseBody)
      dispatch(getBearsSuccess(responseBody))
    }
  } catch (error) {
    console.error(error);
    dispatch(getBearsFailed());
  }
}


export const bearReducer = (state = 0, action) => {
  switch (action.type) {
    case 'GET_BEARS_SUCCESS':
      console.log('action: ', action.bears)
      return action.bears
    case 'GET_BEARS_FAILED':
      console.log('action: Failed')
      return action.bears
    default:
      return state
  }
}

//Map Reducer
const rootReducer = combineReducers({
  number: numberReducer,
  bears: bearReducer
})
export const store = createStore(rootReducer, applyMiddleware(logger, thunk))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
        </head>
        <img src={logo}></img>
        <CRUDBear />
        <Bear />
      </Provider>
    );
  }
}

export default App;