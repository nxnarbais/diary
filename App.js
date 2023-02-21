import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native'
import DailyNoteList from './src/DailyNoteList/App'
import DailyNoteForm from './src/DailyNoteForm/App'
import { StoreProvider } from './src/Store'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <Text>One note more than another</Text>
      <Button
        title="Go to my profile"
        onPress={() =>
          navigation.navigate('Profile', {name: 'nxnarbais'})
        }
      />
      <Button
        title="My daily notes"
        onPress={() =>
          navigation.navigate('DailyNoteList', {})
        }
      />
    </>
  );
};

const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
}

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
          />
          <Stack.Screen
            name="DailyNoteList"
            component={DailyNoteList}
          />
          <Stack.Screen
            name="DailyNoteForm"
            component={DailyNoteForm}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </StoreProvider>
    </NavigationContainer>
  )
}

export default MyStack
