import React from 'react'
// import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native'
import Form from './components/App'
// import app from '../firebaseConfig'
// import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore'
import { Store } from '../Store'
import { KEY_QUESTION_NOTES, receiveData, storeQuestionNote, updateQuestionNote } from '../actions'
import IsAuthorized from '../AuthUserWrapper/IsAuthorized'

const CNAME = 'DailyQuestionForm/App'
const DEBUG = true;

const updateDailyQuestionNoteStore = (data, dispatch) => {
  dispatch(receiveData(KEY_QUESTION_NOTES, { data }))
}

const onSubmit = (isEdit, originalNote, data, dispatch, navigation) => async (value) =>  {
  DEBUG && console.log({ CNAME, isEdit, originalNote, value })
  if (!isEdit) {
    // const newData = data || []
    // newData.push(Object.assign(value, { id: value.date.getTime() }))
    // await storeQuestionNotes(dispatch, newData)

    const id = await storeQuestionNote(Object.assign(value, { date: new Date(value.date.seconds * 1000)}))
    const newData = data || []
    newData.push(Object.assign(value, {
      id,
      // date: { seconds: value.date.getTime() / 1000 }
    }))
    DEBUG && console.log({ CNAME, id, value, data, newData })
    updateDailyQuestionNoteStore(newData, dispatch)

  } else {
    // await updateQuestionNotes(dispatch, data, originalNote, originalNote.id, value)

    await updateQuestionNote(originalNote.id, value)
    const objIndex = data.findIndex((obj => obj.id == originalNote.id));
    data[objIndex] = Object.assign(value, {
      id: originalNote.id,
      // date: { seconds: value.date.getTime() / 1000 }
    })
    DEBUG && console.log({ CNAME, id: originalNote.id, value, parsedValue: data[objIndex] })
    updateDailyQuestionNoteStore(data, dispatch)
  }
  navigation.navigate('DailyQuestionList', {})
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
  const { dailyQuestionNotes: { data }, user } =  state
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
