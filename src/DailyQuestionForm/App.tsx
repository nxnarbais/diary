import React from 'react'
// import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native'
import Form from './components/App'
// import app from '../firebaseConfig'
// import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore'
import { Store } from '../Store'
import { storeQuestionNotes, updateQuestionNotes } from '../actions'

const CNAME = 'DailyQuestionForm/App'
const DEBUG = false;

const onSubmit = (isEdit, originalNote, data, dispatch, navigation) => async (value) =>  {
  DEBUG && console.log({ CNAME, fn: "onSubmit", isEdit, originalNote, data, value })
  try {
    if (!isEdit) {
      const newData = data || []
      newData.push(Object.assign(value, { id: value.date.getTime() }))
      await storeQuestionNotes(dispatch, newData)
    } else {
      await updateQuestionNotes(dispatch, data, originalNote, originalNote.id, value)
    }
    navigation.navigate('DailyQuestionList', {})
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
  const { dailyQuestionNotes: { data } } =  state
  const { isEdit, note } = params
  // const { note } = params

  return <Form
    {...params}
    // init={isEdit && note}
    init={note}
    onSubmit={onSubmit(isEdit, note, data, dispatch, navigation)}
    // onSubmit={onSubmit(note, data, dispatch, navigation)}
    // onSubmit={console.log}
  />
}

App.displayName = CNAME;
export default App;
