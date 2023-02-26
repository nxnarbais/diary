import { IStoreAction } from './interfaces';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, updateDoc, getDocs, query, where } from 'firebase/firestore'
import { auth, firestoreDB } from '../firebaseConfig';

const CNAME = 'actions'
const DEBUG = true

export const initUser = (dispatch: any) => {
  dispatch(requestData('user'));
  // if (process.env.REACT_APP_NO_AUTH === "true") {
  //   const dummyUserData = {
  //     "access_token": "access_token_dummy",
  //     id_token: "",
  //     refresh_token: "",
  //     user_id: "CIxzlN0sZIZUlCpXvE8xBez7PAr1",
  //     project_id: "634903793363"
  //   }
  //   dispatch(receiveData('user', { data: dummyUserData }));
  // }
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      DEBUG && console.log({ CNAME, fn: 'initUser', msg: `User is signed in with uid: ${user.uid}`, user })
      dispatch(receiveData('user', { data: user }));
    } else {
      // User is signed out
      DEBUG && console.log({ CNAME, fn: 'initUser', msg: 'User is signed out' })
      dispatch(receiveData('user', { data: null }));
    }
  })
  // DEBUG && console.error({ CNAME, fn:'iniUser', error });
  // dispatch(receiveDataInError('user', error ));
}

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

export const KEY_NOTES = 'dailyNotes'
const COLLECTION_NAME_NOTES = 'dailyNotes'
export const fetchNotes = async (dispatch: any, uid: string) => {
  dispatch(requestData(KEY_NOTES))
  try {
    const querySnapshot = await getDocs(query(collection(firestoreDB, COLLECTION_NAME_NOTES), where("uid", "==", uid)))
    const docs = []
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`)
      docs.push(Object.assign({id: doc.id}, doc.data()))
    })
    // DEBUG && console.log({ CNAME, fn: 'fetchNotes', docs })
    dispatch(receiveData(KEY_NOTES, {data: docs}))
  } catch (error) {
    console.error("Error getting document: ", error)
    console.error({ CNAME, fn: 'fetchNotes', KEY_NOTES, error })
    dispatch(receiveDataInError(KEY_NOTES, error))
  }
}

export const storeNote = async (value) => {
  const docRef = await addDoc(collection(firestoreDB, COLLECTION_NAME_NOTES), value);
  DEBUG && console.debug("Document written with ID: ", docRef.id);
  return docRef.id
}

export const updateNote = async (id, value)  => {
  const ref = doc(firestoreDB, COLLECTION_NAME_NOTES, id);
  const docRef = await updateDoc(ref, value);
  DEBUG && console.debug("Document updated with ID: ", id);
}

// export const storeLocalNotes = async (dispatch: any, data: IDailyNote[]) => {
//   // try {
//     const dataStr = JSON.stringify(data)
//     await AsyncStorage.setItem(KEY_NOTES, dataStr)
//     DEBUG && console.log({ CNAME, fn: 'storeNotes', data })
//     dispatch(receiveData(KEY_NOTES, { data }))
//   // } catch (error) {
//   //   console.error("Error storing notes: ", error)
//   // }
// }

// export const updateLocalNotes = async (dispatch: any, data: IDailyNote[], originalNote: IDailyNote, id: string, item: IDailyNote) => {
//   const objIndex = data.findIndex((obj => obj.id == originalNote.id));
//   data[objIndex] = Object.assign(item, { id: originalNote.id })
//   storeLocalNotes(dispatch, data)
// }

// export const fetchLocalNotes = async (dispatch: any) => {
//   dispatch(requestData(KEY_NOTES))
//   try {
//     const dataStr = await AsyncStorage.getItem(KEY_NOTES)
//     // DEBUG && console.log({ CNAME, fn: "fetchNotes", dataStr })
//     const data: IDailyNote[] = dataStr != null ? JSON.parse(dataStr) : null;
//     dispatch(receiveData(KEY_NOTES, { data }))
//   } catch (error) {
//     console.error("Error fetching notes: ", error)
//     console.error({ CNAME, fn: 'fetchNotes', KEY_NOTES, error })
//     dispatch(receiveDataInError(KEY_NOTES, error))
//   }
// }

export const KEY_QUESTION_NOTES = 'dailyQuestionNotes'
const COLLECTION_NAME_QUESTION_NOTES = 'questionNotes'
export const fetchQuestionNotes = async (dispatch: any, uid: string) => {
  dispatch(requestData(KEY_QUESTION_NOTES))
  try {
    const querySnapshot = await getDocs(query(collection(firestoreDB, COLLECTION_NAME_QUESTION_NOTES), where("uid", "==", uid)))
    const docs = []
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`)
      docs.push(Object.assign({id: doc.id}, doc.data()))
    })
    // DEBUG && console.log({ CNAME, fn: 'fetchQuestionNotes', docs })
    dispatch(receiveData(KEY_QUESTION_NOTES, {data: docs}))
  } catch (error) {
    console.error("Error getting document: ", error)
    console.error({ CNAME, fn: 'fetchNotes', KEY_QUESTION_NOTES, error })
    dispatch(receiveDataInError(KEY_QUESTION_NOTES, error))
  }
}

export const storeQuestionNote = async (value) => {
  const docRef = await addDoc(collection(firestoreDB, COLLECTION_NAME_QUESTION_NOTES), value);
  DEBUG && console.debug("Document written with ID: ", docRef.id);
  return docRef.id
}

export const updateQuestionNote = async (id, value)  => {
  const ref = doc(firestoreDB, COLLECTION_NAME_QUESTION_NOTES, id);
  const docRef = await updateDoc(ref, value);
  DEBUG && console.debug("Document updated with ID: ", id);
}

// export const storeLocalQuestionNotes = async (dispatch: any, data: IDailyQuestionNote[]) => {
//   // try {
//     const dataStr = JSON.stringify(data)
//     await AsyncStorage.setItem(KEY_QUESTION_NOTES, dataStr)
//     DEBUG && console.log({ CNAME, fn: 'storeQuestionNotes', data })
//     dispatch(receiveData(KEY_QUESTION_NOTES, { data }))
//   // } catch (error) {
//   //   console.error("Error storing question notes: ", error)
//   // }
// }

// export const updateLocalQuestionNotes = async (dispatch: any, data: IDailyQuestionNote[], originalNote: IDailyQuestionNote, id: string, item: IDailyQuestionNote) => {
//   const objIndex = data.findIndex((obj => obj.id == originalNote.id));
//   data[objIndex] = Object.assign(item, { id: originalNote.id })
//   storeLocalQuestionNotes(dispatch, data)
// }

// export const fetchLocalQuestionNotes = async (dispatch: any) => {
//   dispatch(requestData(KEY_QUESTION_NOTES))
//   try {
//     const dataStr = await AsyncStorage.getItem(KEY_QUESTION_NOTES)
//     // DEBUG && console.log({ CNAME, fn: "fetchNotes", dataStr })
//     const data: IDailyNote[] = dataStr != null ? JSON.parse(dataStr) : null;
//     dispatch(receiveData(KEY_QUESTION_NOTES, { data }))
//   } catch (error) {
//     console.error("Error fetching question notes: ", error)
//     console.error({ CNAME, fn: 'fetchQuestionNotes', KEY_QUESTION_NOTES, error })
//     dispatch(receiveDataInError(KEY_QUESTION_NOTES, error))
//   }
// }
