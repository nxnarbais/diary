import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import withNotes from './containers/withNotes'

const CNAME = 'NoteList/App';
const DEBUG = true;

const List = (props: any) => {
  console.log(props)
  return (
    <>
      <Text>List</Text>
    </>
  )
}

const App = (props: any) => {
  const {
    // navigation,
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
      showComponentWhileFetching: true,
    },
  );

  return (
    <>
      <Text>Notes</Text>
      <ListWithNotes />
    </>
  )
}

App.displayName = CNAME;
export default App;
