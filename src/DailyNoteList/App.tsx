import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { IDailyNote } from "../interfaces";
import withNotes from './containers/withNotes'

const CNAME = 'NoteList/App';
const DEBUG = true;

const Note = (props: { note: IDailyNote }) =>  {
  const { note: { date, title, content, labels, mood } } = props
  return (
    <>
      <Text>{(new Date(date.seconds * 1000)).toLocaleDateString()}</Text>
      <Text>{title}</Text>
      <Text>{content}</Text>
      <Text>{labels && labels.join(", ")}</Text>
      <Text>{mood && mood}</Text>
      <Text> </Text>
    </>
  )
}

const List = (props: any) => {
  DEBUG && console.log({ CNAME, fn: 'List', props })
  const {
    dailyNotes
  } = props
  const { data } = dailyNotes
  return (
    <>
      <Text>List</Text>
      {/* {data.map(dailyNote => 
        <Text key={dailyNote.id}>{JSON.stringify(dailyNote)}</Text>
      )} */}
      {data.map(dailyNote => 
        <Note 
          key={dailyNote.id}
          note={dailyNote}
        />
      )}
    </>
  )
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
  // console.log({CNAME, props, path, name, params})

  const ListWithNotes = withNotes(
    List,
    {
      showActivityIndicator: true,
      showErrorIndicator: true,
      showComponentWhileFetching: false,
    },
  );

  return (
    <>
      <Text>Notes</Text>
      <ListWithNotes />
      <Button
        title="Add daily note"
        onPress={() =>
          navigation.navigate('DailyNoteForm', { isEdit: false })
        }
      />
    </>
  )
}

App.displayName = CNAME;
export default App;
