import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, ScrollView } from 'react-native'
import DailyNoteList from './src/DailyNoteList/App'
import DailyNoteForm from './src/DailyNoteForm/App'
import DailyQuestionList from './src/DailyQuestionList/App'
import DailyQuestionForm from './src/DailyQuestionForm/App'
import { StoreProvider } from './src/Store'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView
      style={{
        flexDirection: 'column'
      }}
    >
      <Text>One note more than another</Text>
      <View
        style={{
          // flexDirection: 'row',
          flexDirection: 'column',
          marginTop: 8,
          marginBottom: 8
        }}
      >
        {/* <View style={{ flex: 0.5 }}> */}
        <Button
          title="Go to my profile"
          onPress={() =>
            navigation.navigate('Profile', {name: 'nxnarbais'})
          }
        />
        {/* </View> */}
        {/* <View style={{ flex: 0.5 }}> */}
        <Button
          title="My daily notes"
          onPress={() =>
            navigation.navigate('DailyNoteList', {})
          }
        />
        <Button
          title="Daily Questions"
          onPress={() =>
            navigation.navigate('DailyQuestionList', {})
          }
        />
        {/* </View> */}
      </View>
      
      
    </ScrollView>
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
            options={{ title: 'Once upon a time' }}
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
          <Stack.Screen
            name="DailyQuestionList"
            component={DailyQuestionList}
          />
          <Stack.Screen
            name="DailyQuestionForm"
            component={DailyQuestionForm}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </StoreProvider>
    </NavigationContainer>
  )
}

export default MyStack
