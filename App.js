import React, { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
// import app from './firebaseConfig.js';
// import { getFirestore, collection, doc, getDoc, addDoc, getDocs } from "firebase/firestore";
import NoteForm from './src/NoteForm/App';
import NoteList from './src/NoteList/App';
import { StoreProvider } from "./src/Store";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'




const HomeScreen = ({ navigation }) => {
  return (
    <>
      <Text>One note more than another</Text>
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigation.navigate('Profile', {name: 'Jane'})
        }
      />
      <Button
        title="Go to notes"
        onPress={() =>
          navigation.navigate('Note Form', {
            init: {
              date: new Date(),
              title: 'default title',
              content: 'default content',
              labels: ['something']
            },
            onSubmit: console.log
          })
        }
      />
      <Button
        title="My notes"
        onPress={() =>
          navigation.navigate('Notes', {})
        }
      />
    </>
  );
};

const ProfileScreen = ({navigation, route}) => {
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
            name="Note Form"
            component={NoteForm}
          />
          <Stack.Screen
            name="Notes"
            component={NoteList}
          />
        </Stack.Navigator>
      </StoreProvider>
    </NavigationContainer>
  )
}

export default MyStack
