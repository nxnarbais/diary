import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import Form from './components/App';

const CNAME = 'NoteForm/App';
const DEBUG = true;

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

  return <Form {...params} />
}

App.displayName = CNAME;
export default App;
