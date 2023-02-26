import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, FlatList, Pressable, ScrollView } from 'react-native';
import IsAuthorized from '../AuthUserWrapper/IsAuthorized';
import { IDailyNote, IStatetDailyNotes, IStateUser } from "../interfaces";
import { Store } from "../Store";
import withNotes from './containers/withNotes'

const CNAME = 'DailyNoteList/App';
const DEBUG = false;

const Note = (props: { note: IDailyNote, navigateToNote: (IDailyNote) => void }) =>  {
  const { note, navigateToNote } = props
  const { id, date: dateObj, title, content, labels, mood } = note
  // return (<Text>{JSON.stringify(note)}</Text>)
  const date = new Date(dateObj.seconds * 1000)
  return (
    <Pressable onPress={() => navigateToNote(note)}>
      {/* <Text>------------------</Text> */}
      {/* <Text>{title} -- {(new Date(Date.parse(date))).toLocaleDateString()}</Text> */}
      <Text>-- {title} -- {date.toLocaleDateString()} --</Text>
      <Text>{content}</Text>
      <Text>{labels && labels.join(", ")} - {mood && mood} - {id && id}</Text>
    </Pressable>
  )
}

const List = (props: { 
  dailyNotes: IStatetDailyNotes, 
  navigateToNote: (IDailyNote) => void,
  user: IStateUser
}) => {
  // DEBUG && console.debug({ CNAME, fn: 'List', props })
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
  // DEBUG && console.debug({CNAME, props, path, name, params})

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
    <IsAuthorized
      navigation={navigation}
      requireLoggedInUser
    >
      <View>
        <ListWithNotes
          // user={user}
          navigateToNote={navigateToNote}
        />
        <Button
          title="Add daily note"
          onPress={() =>
            navigation.navigate('DailyNoteForm', { isEdit: false })
          }
        />
      </View>
    </IsAuthorized>
  )
}

App.displayName = CNAME;
export default App;
