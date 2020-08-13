/* eslint no-shadow: "off" */
import {
  takeLatest,
  put,
  all,
  call,
} from 'redux-saga/effects';
import { combineReducers } from 'redux';

import axios from 'axios';

const apiRoot = axios.create({
  baseURL: 'https://api.jikan.moe/v3',
});
export const getTestApi = () => apiRoot.get('/search/anime?q=naruto');


// State
const initialState = {
  isError: false,
  isFetching: false,
  dataList: null
};

//  Action
const ActionType = {
  FETCH_VERIFY_TOKEN_REQUEST: 'FETCH_VERIFY_TOKEN_REQUEST',
  FETCH_VERIFY_TOKEN_FAILURE: 'FETCH_VERIFY_TOKEN_FAILURE',
  FETCH_VERIFY_TOKEN_SUCCESS: 'FETCH_VERIFY_TOKEN_SUCCESS',
};

export const action = {
  fetchVerifyToken: () => ({ type: ActionType.FETCH_VERIFY_TOKEN_REQUEST }),
  fetchVerifyTokenFailure: () => ({ type: ActionType.FETCH_VERIFY_TOKEN_FAILURE }),
  fetchVerifyTokenSuccess: (res) => ({ type: ActionType.FETCH_VERIFY_TOKEN_SUCCESS, dataList:res }),
};

// Saga

function* fetchVerifySaga() {
  try {
    console.log('a')

    const { data } = yield call(getTestApi);
    console.log('data', data)
    const { results } = data

    yield put(action.fetchVerifyTokenSuccess(results));
  } catch (error) {
    yield put(action.fetchVerifyTokenFailure());
  }
}

export const saga = [
  takeLatest(ActionType.FETCH_VERIFY_TOKEN_REQUEST, fetchVerifySaga),
];

// Reducer

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_VERIFY_TOKEN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionType.FETCH_VERIFY_TOKEN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true,
      };
    case ActionType.FETCH_VERIFY_TOKEN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataList: action.dataList,
      };
    default:
      return state;
  }
};

export function* rootSaga() {
  yield all([
    ...saga,
  ]);
}

export const rootReducer = combineReducers({
  state: reducer,
});
