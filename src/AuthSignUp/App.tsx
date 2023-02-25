import React from 'react'
// import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native'
// import firebaseConfig from '../../firebaseConfig'
import { auth } from '../../firebaseConfig'
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Form from './components/App'
import { Store } from '../Store'
import { receiveData } from '../actions'


const CNAME = 'AuthSignUp/App'
const DEBUG = true;

// const auth = getAuth();

const onSubmit = (dispatch, navigation) => async ({ email, password }) =>  {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      DEBUG && console.log({ CNAME, fn: "onSubmit", user })
      const KEY_USER = "user"
      dispatch(receiveData(KEY_USER, { data: user }))
      navigation.navigate('Home', {}) // FIXME: Redirect with a fresh new stack
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      DEBUG && console.error({ CNAME, fn: "onSubmit", errorCode, errorMessage })
      throw error
    });
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
  DEBUG && console.log({ CNAME, props, path, name, params })

  const { state, dispatch } = React.useContext(Store)
  const { user } =  state

  if (!!user && !!user.data) {
    navigation.navigate('Profile', {})
    return null
  }
  return <Form
    {...params}
    onSubmit={onSubmit(dispatch, navigation)}
  />
}

App.displayName = CNAME;
export default App;
