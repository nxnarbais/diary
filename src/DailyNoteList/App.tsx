import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, FlatList, Pressable, ScrollView } from 'react-native';
import { IDailyNote, IStatetDailyNotes } from "../interfaces";
import withNotes from './containers/withNotes'

const CNAME = 'NoteList/App';
const DEBUG = false;

const Note = (props: { note: IDailyNote, navigateToNote: (IDailyNote) => void }) =>  {
  const { note, navigateToNote } = props
  const { id, date, title, content, labels, mood } = note
  return (
    <Pressable onPress={() => navigateToNote(note)}>
      <Text>------------------</Text>
      {/* <Text>{title} -- {(new Date(Date.parse(date))).toLocaleDateString()}</Text> */}
      <Text>{title} -- {date}</Text>
      <Text>{content}</Text>
      <Text>{labels && labels.join(", ")} - {mood && mood} - {id && id}</Text>
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

  if (!data || data.length == 0) {
    return (
      <>
        <Text>No notes</Text>
      </>
    )
  }

  return (
    <>
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
  DEBUG && console.log({CNAME, props, path, name, params})

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
    <View>
      <ListWithNotes 
        navigateToNote={navigateToNote}
      />
      <Button
        style={{
          marginTop: 8
        }}
        title="Add daily note"
        onPress={() =>
          navigation.navigate('DailyNoteForm', { isEdit: false })
        }
      />
    </View>
  )
}

App.displayName = CNAME;
export default App;
