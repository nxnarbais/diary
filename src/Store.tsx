import React from 'react';
import {
  REQUEST_DATA,
  RECEIVE_DATA,
  RECEIVE_DATA_IN_ERROR
} from './actions';
import { IStateStore, IStoreAction } from './interfaces';

// const CNAME = 'Store';

const initialState: IStateStore = {
  dailyNotes: {
    isFetching: false,
    isError: false,
    data: undefined,
  },
  dailyQuestionNotes: {
    isFetching: false,
    isError: false,
    data: undefined,
  }
};

export const Store = React.createContext<IStateStore>(initialState);

interface IStateByKey {
  isFetching: boolean;
  isError: boolean;
  data?: any;
  error?: any;
  lastUpdated?: Date;
}

const defaultEmptyKeyState = {
  isFetching: false,
  isError: false,
  data: undefined,
}

function dataByKey(
  state: IStateByKey = defaultEmptyKeyState,
  action: IStoreAction,
): IStateByKey {
  switch (action.type) {
    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload.data,
        lastUpdated: action.payload.receivedAt,
      });
    case RECEIVE_DATA_IN_ERROR:
      const rawError = action.payload.error;
      const xhrRequest = rawError && rawError.request;
      const xhrResponse = xhrRequest && xhrRequest.response;
      let xhrResponseParsed = xhrResponse;
      try {
        xhrResponseParsed = JSON.parse(xhrResponse);
      } catch (e) {
      }
      const xhrError = xhrResponseParsed && xhrResponseParsed.error;
      const error = xhrError ? xhrError : rawError;
      return Object.assign({}, state, {
        isFetching: false,
        isError: true,
        // error: action.payload.error,
        error,
        lastUpdated: action.payload.receivedAt,
      });
    default:
      return state;
  }
}

function reducer(state: IStateStore, action: IStoreAction) {
  // console.log({ CNAME, state, action });
  switch (action.type) {
    case REQUEST_DATA:
    case RECEIVE_DATA:
    case RECEIVE_DATA_IN_ERROR:
      return Object.assign({}, state, {
        [action.payload.key]: dataByKey(undefined, action),
      });
    default:
      return state;
  }
}

export function StoreProvider(props: any) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value: any = { state, dispatch };
  const { children } = props;
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
