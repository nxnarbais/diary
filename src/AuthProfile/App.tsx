import React, { useEffect } from 'react'
import { auth } from '../../firebaseConfig'
import { signOut } from 'firebase/auth'
import { Store } from '../Store'
import { ActivityIndicator, ScrollView, Text, Button } from 'react-native'
import { receiveData } from '../actions'

const CNAME = 'AuthProfile/App'
const DEBUG = false;

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
    !isLoggedIn && navigation.navigate('Home', {})
  }, [isLoggedIn])

  if (isFetching) {
    return <ActivityIndicator />
  }

  if (!isLoggedIn) {
    return <ActivityIndicator />
  }

  return (
    <ScrollView>
      {/* <Text>{JSON.stringify(user)}</Text> */}
      <Text>{`email: ${data.email}`}</Text>
      <Text>{`uid: ${data.uid}`}</Text>
      <Button
        title="Sign out"
        onPress={() => {
          signOut(auth)
          const KEY_USER = "user"
          dispatch(receiveData(KEY_USER, { data: null }))
        }}
      />
    </ScrollView>
  )
}

App.displayName = CNAME;
export default App;
