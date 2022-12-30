import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, FlatList, Pressable } from 'react-native';
import { IDailyNote, IStatetDailyNotes } from "../interfaces";
import withNotes from './containers/withNotes'

const CNAME = 'NoteList/App';
const DEBUG = true;

const Note = (props: { note: IDailyNote, navigateToNote: (IDailyNote) => void }) =>  {
  const { note, navigateToNote } = props
  const { id, date, title, content, labels, mood } = note
  return (
    <Pressable onPress={() => navigateToNote(note)}>
      <Text>{(new Date(date.seconds * 1000)).toLocaleDateString()}</Text>
      <Text>{title}</Text>
      <Text>{content}</Text>
      <Text>{labels && labels.join(", ")}</Text>
      <Text>{mood && mood}</Text>
      <Text>{id && id}</Text>
      <Text> </Text>
    </Pressable>
  )
}

const List = (props: { dailyNotes: IStatetDailyNotes, navigateToNote: (IDailyNote) => void}) => {
  DEBUG && console.log({ CNAME, fn: 'List', props })
  const {
    dailyNotes,
    navigateToNote
  } = props
  const { data } = dailyNotes
  const renderItem = ({ item }) => (
    <Note
      note={item}
      navigateToNote={navigateToNote}
    />
  )

  return (
    <>
      <Text>List</Text>
      {/* {data.map(dailyNote => 
        <Text key={dailyNote.id}>{JSON.stringify(dailyNote)}</Text>
      )} */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* {data.map(dailyNote => 
        <Note 
          key={dailyNote.id}
          note={dailyNote}
        />
      )} */}
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

  const navigateToNote = (note: IDailyNote) => {
    navigation.navigate('DailyNoteForm', { isEdit: true, note })
  }

  return (
    <>
      <Text>Notes</Text>
      <ListWithNotes 
        navigateToNote={navigateToNote}
      />
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
