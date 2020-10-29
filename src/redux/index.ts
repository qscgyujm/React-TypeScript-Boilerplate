/* eslint no-shadow: "off" */

import {
  takeLatest,
  put,
  all,
  call,
} from 'redux-saga/effects';
import { combineReducers } from 'redux';

import { getFetchAPI } from '@Api/index';

// State
const initialState = {
  isError: false,
  isFetching: false,
  dataList: [],
};

type InitialState = Readonly<typeof initialState>

//  Action
export enum ActionType {
  FETCH_API_REQUEST= 'FETCH_API_REQUEST',
  FETCH_API_FAILURE= 'FETCH_API_FAILURE',
  FETCH_API_SUCCESS= 'FETCH_API_SUCCESS',
}

export const action = {
  fetchAPI: () => ({ type: ActionType.FETCH_API_REQUEST }),
  fetchAPIFailure: () => ({ type: ActionType.FETCH_API_FAILURE }),
  fetchAPISuccess: (res) => ({
    type: ActionType.FETCH_API_SUCCESS,
    dataList: res,
  }),
};

// Saga

function* fetchAPISaga() {
  try {
    console.log('a');

    const { data } = yield call(getFetchAPI);
    console.log('data', data);
    const { results } = data;

    yield put(action.fetchAPISuccess(results));
  } catch (error) {
    yield put(action.fetchAPIFailure());
  }
}
export const saga = [
  takeLatest(ActionType.FETCH_API_REQUEST, fetchAPISaga),
];

// Reducer

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_API_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionType.FETCH_API_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true,
      };
    case ActionType.FETCH_API_SUCCESS:
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
