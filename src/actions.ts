import { IStoreAction } from './interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IDailyNote, IDailyQuestionNote } from './interfaces';
// import CONST from './const.json';

const CNAME = 'actions';
const DEBUG = true

// export const BASE_URL = (process.env.NODE_ENV === "production" || process.env.REACT_APP_DATA_SOURCE === "prod") ? CONST.API_BASE_URL_PROD : CONST.API_BASE_URL;

export const REQUEST_DATA = "REQUEST_DATA";
export function requestData(key: string): IStoreAction {
  DEBUG && console.log({ CNAME, REQUEST_DATA, key })
  return {
    type: REQUEST_DATA,
    payload: {
      key,
    },
  };
}

export const RECEIVE_DATA = "RECEIVE_DATA";
export function receiveData(key: string, json: any): IStoreAction {
  DEBUG && console.log({ CNAME, RECEIVE_DATA, key, json })
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
  DEBUG && console.log({ CNAME, RECEIVE_DATA_IN_ERROR, key, error })
  return {
    type: RECEIVE_DATA_IN_ERROR,
    payload: {
      key,
      error,
      receivedAt: Date.now(),
    },
  };
}

// const fetchData = async (dispatch: any, key: string, axiosParams: AxiosRequestConfig) => {
//   dispatch(requestData(key));
//   try {
//     // const tokenId = await firebase.getCurrentUserIdToken();
//     // const axiosParamsWithToken = Object.assign(axiosParams, {
//     //   headers: {
//     //     authorization: `Bearer ${tokenId}`,
//     //   },
//     // });
//     // console.log({ CNAME, fn: 'fetchData', url: axiosParams.url, axiosParamsWithToken });
//     // const response = await axios(axiosParamsWithToken);
//     // throwExceptionIfError(response);
//     // console.log({ CNAME, fn: 'fetchData', url: axiosParams.url, axiosParamsWithToken, response, data: response.data });
//     // dispatch(receiveData(key, response.data));
//   } catch (error) {
//     console.error({ CNAME, fn: 'fetchData', key, error });
//     dispatch(receiveDataInError(key, error));
//   }
// };

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

const KEY_NOTES = 'dailyNotes'
export const storeNotes = async (dispatch: any, data: IDailyNote[]) => {
  // try {
    const dataStr = JSON.stringify(data)
    await AsyncStorage.setItem(KEY_NOTES, dataStr)
    DEBUG && console.log({ CNAME, fn: 'storeNotes', data })
    dispatch(receiveData(KEY_NOTES, { data }))
  // } catch (error) {
  //   console.error("Error storing notes: ", error)
  // }
}

export const updateNotes = async (dispatch: any, data: IDailyNote[], originalNote: IDailyNote, id: string, item: IDailyNote) => {
  const objIndex = data.findIndex((obj => obj.id == originalNote.id));
  data[objIndex] = Object.assign(item, { id: originalNote.id })
  storeNotes(dispatch, data)
}

export const fetchNotes = async (dispatch: any) => {
  dispatch(requestData(KEY_NOTES))
  try {
    const dataStr = await AsyncStorage.getItem(KEY_NOTES)
    // DEBUG && console.log({ CNAME, fn: "fetchNotes", dataStr })
    const data: IDailyNote[] = dataStr != null ? JSON.parse(dataStr) : null;
    dispatch(receiveData(KEY_NOTES, { data }))
  } catch (error) {
    console.error("Error fetching notes: ", error)
    console.error({ CNAME, fn: 'fetchNotes', KEY_NOTES, error })
    dispatch(receiveDataInError(KEY_NOTES, error))
  }
}

const KEY_QUESTION_NOTES = 'dailyQuestionNotes'
export const storeQuestionNotes = async (dispatch: any, data: IDailyQuestionNote[]) => {
  // try {
    const dataStr = JSON.stringify(data)
    await AsyncStorage.setItem(KEY_QUESTION_NOTES, dataStr)
    DEBUG && console.log({ CNAME, fn: 'storeQuestionNotes', data })
    dispatch(receiveData(KEY_QUESTION_NOTES, { data }))
  // } catch (error) {
  //   console.error("Error storing question notes: ", error)
  // }
}

export const updateQuestionNotes = async (dispatch: any, data: IDailyQuestionNote[], originalNote: IDailyQuestionNote, id: string, item: IDailyQuestionNote) => {
  const objIndex = data.findIndex((obj => obj.id == originalNote.id));
  data[objIndex] = Object.assign(item, { id: originalNote.id })
  storeQuestionNotes(dispatch, data)
}

export const fetchQuestionNotes = async (dispatch: any) => {
  dispatch(requestData(KEY_QUESTION_NOTES))
  try {
    const dataStr = await AsyncStorage.getItem(KEY_QUESTION_NOTES)
    // DEBUG && console.log({ CNAME, fn: "fetchNotes", dataStr })
    const data: IDailyNote[] = dataStr != null ? JSON.parse(dataStr) : null;
    dispatch(receiveData(KEY_QUESTION_NOTES, { data }))
  } catch (error) {
    console.error("Error fetching question notes: ", error)
    console.error({ CNAME, fn: 'fetchQuestionNotes', KEY_QUESTION_NOTES, error })
    dispatch(receiveDataInError(KEY_QUESTION_NOTES, error))
  }
}