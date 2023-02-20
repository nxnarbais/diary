import React from 'react'
// import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native'
import Form from './components/App'
// import app from '../firebaseConfig'
// import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore'
import { Store } from '../Store'
import { receiveData, storeNotes, updateNote } from '../actions'

const CNAME = 'DailyNoteForm/App'
const DEBUG = true;

// const db = getFirestore(app);

// const saveToDB = async (value) => {
//   try {
//     const collectionName = 'dailyNotes'
//     const docRef = await addDoc(collection(db, collectionName), value);
//     DEBUG && console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

// const updateInDB = async (id, value)  => {
//   try {
//     const collectionName = 'dailyNotes'
//     const ref = doc(db, collectionName, id);
//     const docRef = await updateDoc(ref, value);
//     DEBUG && console.log("Document updated with ID: ", id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

// const updateStore = (data, dispatch) => {
//   const key = 'dailyNotes'
//   dispatch(receiveData(key, { data }))
// }

const onSubmit = (isEdit, originalNote, data, dispatch, navigation) => async (value) =>  {
  try {
    if (!isEdit) {
      const newData = data || []
      newData.push(Object.assign(value, { id: Date.now() }))
      await storeNotes(dispatch, newData)
      // await saveToDB(value)
      // const newData = data || []
      // newData.push(value)
      // DEBUG && console.log({CNAME, value, data, newData})
      // updateStore(newData, dispatch)
    } else {
      await updateNote(dispatch, data, originalNote, originalNote.id, value)
      // await updateInDB(originalNote.id, value)
      // const objIndex = data.findIndex((obj => obj.id == originalNote.id));
      // data[objIndex] = Object.assign(value, {id: originalNote.id })
      // updateStore(data, dispatch)
    }
    navigation.navigate('DailyNoteList', {})
  } catch (e) {
    console.error("Error: ", e);
  }
}

const App = (props: any) => {
  const {
    navigation,
    route: {
      name,
      params,
      path
    }
  } = props
  DEBUG && console.log({CNAME, props, path, name, params})

  const { state, dispatch } = React.useContext(Store)
  const { dailyNotes: { data } } =  state
  const { isEdit, note } = params

  return <Form
    {...params}
    init={isEdit && note}
    onSubmit={onSubmit(isEdit, note, data, dispatch, navigation)}
  />
}

App.displayName = CNAME;
export default App;
