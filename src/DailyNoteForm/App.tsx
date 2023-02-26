import React from 'react'
// import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native'
import Form from './components/App'
// import app from '../firebaseConfig'
// import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore'
import { Store } from '../Store'
import { KEY_NOTES, receiveData, storeNote, updateNote } from '../actions'
import IsAuthorized from '../AuthUserWrapper/IsAuthorized'

const CNAME = 'DailyNoteForm/App'
const DEBUG = false;

const updateDailyNoteStore = (data, dispatch) => {
  dispatch(receiveData(KEY_NOTES, { data }))
}

const onSubmit = (isEdit, originalNote, data, dispatch, navigation) => async (value) =>  {
  if (!isEdit) {
    // const newData = data || []
    // newData.push(Object.assign(value, { id: Date.now() }))
    // await storeNotes(dispatch, newData)

    const id = await storeNote(value)
    const newData = data || []
    newData.push(Object.assign(value, {
      id,
      // date: { seconds: value.date.getTime() / 1000}
    }))
    DEBUG && console.log({ CNAME, id, value, data, newData })
    updateDailyNoteStore(newData, dispatch)

  } else {
    // await updateNotes(dispatch, data, originalNote, originalNote.id, value)

    await updateNote(originalNote.id, value)
    const objIndex = data.findIndex((obj => obj.id == originalNote.id));
    data[objIndex] = Object.assign(value, {
      id: originalNote.id,
      // date: { seconds: value.date.getTime() / 1000}
    })
    DEBUG && console.log({ CNAME, id: originalNote.id, value, parsedValue: data[objIndex] })
    updateDailyNoteStore(data, dispatch)
  }
  navigation.navigate('DailyNoteList', {})
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
  // DEBUG && console.debug({CNAME, props, path, name, params})

  const { state, dispatch } = React.useContext(Store)
  const { dailyNotes: { data }, user } =  state
  const { isEdit, note } = params

  return (
    <IsAuthorized
      navigation={navigation}
      requireLoggedInUser
    >
      <Form
        {...params}
        uid={user.data.uid}
        onSubmit={onSubmit(isEdit, note, data, dispatch, navigation)}
      />
    </IsAuthorized>
  )
}

App.displayName = CNAME;
export default App;
