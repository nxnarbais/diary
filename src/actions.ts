import { IStoreAction } from './interfaces';
// import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import firebase from './auth/firebase';

// import CONST from './const.json';

const CNAME = 'actions';
// export const BASE_URL = (process.env.NODE_ENV === "production" || process.env.REACT_APP_DATA_SOURCE === "prod") ? CONST.API_BASE_URL_PROD : CONST.API_BASE_URL;

// const throwExceptionIfError = (response: AxiosResponse<{ isError: boolean }>) => {
//   // console.log({ CNAME, fn: "throwExceptionIfError", "error": { response }});
//   if(response.data.isError) {
//     console.error({ CNAME, fn: "throwExceptionIfError", "error": { response }});
//     throw new Error("Error fetching data");
//   }
// };

export const REQUEST_DATA = "REQUEST_DATA";
export function requestData(key: string): IStoreAction {
  return {
    type: REQUEST_DATA,
    payload: {
      key,
    },
  };
}

export const RECEIVE_DATA = "RECEIVE_DATA";
export function receiveData(key: string, json: any): IStoreAction {
  return {
    type: RECEIVE_DATA,
    payload: {
      key,
      data: json["data"],
      receivedAt: Date.now(),
    },
  };
}

export const RECEIVE_DATA_IN_ERROR = "RECEIVE_DATA_IN_ERROR";
export function receiveDataInError(key: string, error: any): IStoreAction {
  return {
    type: RECEIVE_DATA_IN_ERROR,
    payload: {
      key,
      error,
      receivedAt: Date.now(),
    },
  };
}

const fetchData = async (dispatch: any, key: string, axiosParams: AxiosRequestConfig) => {
  dispatch(requestData(key));
  try {
    // const tokenId = await firebase.getCurrentUserIdToken();
    // const axiosParamsWithToken = Object.assign(axiosParams, {
    //   headers: {
    //     authorization: `Bearer ${tokenId}`,
    //   },
    // });
    // console.log({ CNAME, fn: 'fetchData', url: axiosParams.url, axiosParamsWithToken });
    // const response = await axios(axiosParamsWithToken);
    // throwExceptionIfError(response);
    // console.log({ CNAME, fn: 'fetchData', url: axiosParams.url, axiosParamsWithToken, response, data: response.data });
    // dispatch(receiveData(key, response.data));
  } catch (error) {
    console.error({ CNAME, fn: 'fetchData', key, error });
    dispatch(receiveDataInError(key, error));
  }
};

// export const fetchFarmers = (dispatch: any) => {
//   const key = 'farmers';
//   const axiosParams: AxiosRequestConfig = {
//     method: 'get',
//     baseURL: BASE_URL,
//     url: CONST.API_ENDPOINTS.farmers,
//     // headers: {
//     //   Authorization: `Bearer ${idToken}`,
//     // },
//   };
//   return fetchData(dispatch, key, axiosParams);
// };
