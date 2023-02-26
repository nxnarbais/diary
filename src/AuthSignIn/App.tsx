import React, { useEffect } from 'react'
import { auth } from '../../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Form from './components/App'
import { Store } from '../Store'
import { receiveData } from '../actions'
import { IStoreContext } from '../interfaces'
import { ActivityIndicator } from 'react-native'

const CNAME = 'AuthSignIn/App'
const DEBUG = false;

const onSubmit = (dispatch, navigation) => async ({ email, password }) =>  {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      DEBUG && console.debug({ CNAME, fn: "onSubmit", user })
      const KEY_USER = "user"
      dispatch(receiveData(KEY_USER, { data: user }))
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error({ CNAME, fn: "onSubmit", errorCode, errorMessage })
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
  // DEBUG && console.debug({ CNAME, props, path, name, params })

  const { state, dispatch } = React.useContext(Store)
  const { user } =  state

  const { isFetching, data } = user
  const isLoggedIn = !isFetching && data !== undefined && data !== null
  DEBUG && console.debug({ CNAME, user:{ isFetching, data }, isLoggedIn })

  useEffect(() => {
    isLoggedIn && navigation.navigate('Home', {})
  }, [isLoggedIn])

  if (isLoggedIn) {
    return <ActivityIndicator />
  }

  return <Form
    {...params}
    onSubmit={onSubmit(dispatch, navigation)}
  />
}

App.displayName = CNAME;
export default App;
