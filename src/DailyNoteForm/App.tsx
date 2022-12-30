import React from 'react'
// import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native'
import Form from './components/App'
import app from '../firebaseConfig'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { Store } from '../Store'
import { receiveData } from '../actions'

const CNAME = 'DailyNoteForm/App'
const DEBUG = true;

const db = getFirestore(app);

const saveToDB = async (value) => {
  try {
    const collectionName = 'dailyNotes'
    const docRef = await addDoc(collection(db, collectionName), value);
    DEBUG && console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const updateStore = (data, dispatch) => {
  const key = 'dailyNotes'
  dispatch(receiveData(key, { data }))
}

const onSubmit = (data, dispatch, navigation) => async (value) =>  {
  try {
    await saveToDB(value)
    const newData = data || []
    newData.push(value)
    DEBUG && console.log({CNAME, value, data, newData})
    updateStore(newData, dispatch)
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

  return <Form
    {...params}
    onSubmit={onSubmit(data, dispatch, navigation)}
  />
}

App.displayName = CNAME;
export default App;
