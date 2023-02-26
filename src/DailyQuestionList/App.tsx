import React, { useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, FlatList, Pressable, ScrollView } from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import IsAuthorized from '../AuthUserWrapper/IsAuthorized';
import { IDailyQuestionNote, IStateDailyQuestionNotes, IStateUser } from "../interfaces";
import { Store } from "../Store";
import withQuestionNotes from './containers/withQuestionNotes'
import questions from './questions.json'

const CNAME = 'DailyNoteList/App';
const DEBUG = false;

function getNumberOfDays(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);
  const oneDay = 1000 * 60 * 60 * 24; // One day in milliseconds
  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();
  const diffInDays = Math.round(diffInTime / oneDay); // Calculating the no. of days between two dates
  return diffInDays;
}

const List = (props: { dailyQuestionNotes: IStateDailyQuestionNotes, navigateToQuestionForm: (boolean, IDailyQuestionNote) => void}) => {
  DEBUG && console.log({ CNAME, fn: 'List', props })
  const {
    dailyQuestionNotes,
    navigateToQuestionForm
  } = props
  const { data } = dailyQuestionNotes

  const markedDates = {};
  data && data.forEach(note => {
    const date = new Date(note.date.seconds * 1000)
    markedDates[date.toISOString().split("T")[0]] = { marked: true }
  })

  return (
    <>
      <Calendar 
        onDayPress={day => {
          const date = new Date(day.dateString)
          DEBUG && console.debug({ CNAME, fn: 'Calendar.onDayPress', day, date });
          const foundNote = data && data.find((note: IDailyQuestionNote) => note.date.seconds * 1000 === date.getTime())
          DEBUG && console.debug({ CNAME, fn: 'Calendar.onDayPress', day, foundNote });
          const isEdit = !!foundNote
          const note: IDailyQuestionNote = isEdit ? foundNote : {
            date: { seconds: date.getTime() / 1000 },
            question: questions[getNumberOfDays(`${day.year}-01-01`, day.dateString)],
            answer: ''
          }
          return navigateToQuestionForm(isEdit, note)
        }}
        markedDates={markedDates}
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

  const ListWithQuestionNotes = withQuestionNotes(
    List,
    {
      showActivityIndicator: true,
      showErrorIndicator: true,
      showComponentWhileFetching: false,
    },
  );

  const navigateToQuestionForm = (isEdit: boolean, note: IDailyQuestionNote) => {
    navigation.navigate('DailyQuestionForm', { isEdit, note })
  }

  return (
    <IsAuthorized
      navigation={navigation}
      requireLoggedInUser
    >
      <View>
        <ListWithQuestionNotes
          // user={user}
          navigateToQuestionForm={navigateToQuestionForm}
        />
      </View>
    </IsAuthorized>
  )
}

App.displayName = CNAME;
export default App;
