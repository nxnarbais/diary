import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, ScrollView } from 'react-native'

import DailyNoteList from './src/DailyNoteList/App'
import DailyNoteForm from './src/DailyNoteForm/App'
import DailyQuestionList from './src/DailyQuestionList/App'
import DailyQuestionForm from './src/DailyQuestionForm/App'

import UserWrapper from './src/AuthUserWrapper/App'
import AuthSignUp from './src/AuthSignUp/App'
import AuthSignIn from './src/AuthSignIn/App'
import AuthProfile from './src/AuthProfile/App'

import { StoreProvider } from './src/Store'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import firebaseConfig from './firebaseConfig'
import { auth } from './firebaseConfig'
import { signOut } from 'firebase/auth'
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Store } from './src/Store'
import { IStateUser } from './src/interfaces'

// const auth = getAuth();

const HomeScreen = ({ navigation }) => {

  const { state, dispatch } = React.useContext(Store)
  const { user }: IStateUser =  state

  const { isFetching, data } = user
  const isLoggedIn = !isFetching && data !== undefined && data !== null

  // useEffect(() => {
  //   console.log("INIT")
  // }, [])

  return (
    <ScrollView
      style={{
        flexDirection: 'column'
      }}
    >
      <Text>One note more than another</Text>
      {/* <Text>{user.data && JSON.stringify(user.data)}</Text> */}
      <Text>{`email: ${data && data.email}`}</Text>
      <Text>{`uid: ${data && data.uid}`}</Text>
      <View
        style={{
          // flexDirection: 'row',
          flexDirection: 'column',
          marginTop: 8,
          marginBottom: 8
        }}
      >

        {isLoggedIn && (
          <View
            style={{
              flexDirection: 'row',
              // flexDirection: 'column',
              marginTop: 8,
              marginBottom: 8
            }}
          >
            <View style={{ flex: 0.5 }}>
              <Button
                title="Go to my profile"
                onPress={() =>
                  navigation.navigate('AuthProfile', { param1: 'some_value' })
                }
              />
            </View>
            <View style={{ flex: 0.5 }}>
              <Button
                title="Sign out"
                onPress={() => {
                  navigation.navigate('AuthProfile')
                }}
              />
            </View>
          </View>
        )}

        {!isLoggedIn && (
          <View
            style={{
              flexDirection: 'row',
              // flexDirection: 'column',
              marginTop: 8,
              marginBottom: 8
            }}
          >
            <View style={{ flex: 0.5 }}>
              <Button
                title="Sign up"
                onPress={() => 
                  navigation.navigate('AuthSignUp', {})
                }
              />
            </View>
            <View style={{ flex: 0.5 }}>
              <Button
                title="Sign in"
                onPress={() => 
                  navigation.navigate('AuthSignIn', {})
                }
              />
            </View>
          </View>
        )}
        
        <View
          style={{
            flexDirection: 'row',
            // flexDirection: 'column',
            marginTop: 8,
            marginBottom: 8
          }}
        >
          <View style={{ flex: 0.5 }}>
            <Button
              title="My daily notes"
              onPress={() =>
                navigation.navigate('DailyNoteList', {})
              }
            />
          </View>
          <View style={{ flex: 0.5 }}>
            <Button
              title="Daily Questions"
              onPress={() =>
                navigation.navigate('DailyQuestionList', {})
              }
            />
          </View>
        </View>
      </View>
      
      
    </ScrollView>
  );
};

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <UserWrapper>

          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Once upon a time' }}
            />
            <Stack.Screen
              name="DailyNoteList"
              component={DailyNoteList}
              options={{ title: 'Daily notes' }}
            />
            <Stack.Screen
              name="DailyNoteForm"
              component={DailyNoteForm}
              options={{ title: 'Daily note form' }}
            />
            <Stack.Screen
              name="DailyQuestionList"
              component={DailyQuestionList}
              options={{ title: 'Daily question' }}
            />
            <Stack.Screen
              name="DailyQuestionForm"
              component={DailyQuestionForm}
              options={{ title: 'Daily question form' }}
            />
            <Stack.Screen
              name="AuthSignUp"
              component={AuthSignUp}
              options={{ title: 'Sign up' }}
            />
            <Stack.Screen
              name="AuthSignIn"
              component={AuthSignIn}
              options={{ title: 'Sign in' }}
            />
            <Stack.Screen
              name="AuthProfile"
              component={AuthProfile}
              options={{ title: 'Profile' }}
            />
          </Stack.Navigator>

        </UserWrapper>
        <StatusBar style="auto" />
      </StoreProvider>
    </NavigationContainer>
  )
}

export default MyStack
