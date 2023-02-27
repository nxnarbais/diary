import React, { useEffect } from 'react'
import {
  // StyleSheet,
  // Text,
  // TextInput,
  View,
  // Button,
  // ActivityIndicator,
  // FlatList,
  // Pressable,
  // ScrollView
} from 'react-native'
import {
  Calendar,
  // CalendarList,
  // Agenda
} from 'react-native-calendars'
import IsAuthorized from '../AuthUserWrapper/IsAuthorized';
import { IDailyQuestionNote, IStateDailyQuestionNotes } from "../interfaces";
import withQuestionNotes from './containers/withQuestionNotes'
import questions from './questions.json'
import { getNumberOfDays, getMarkedDates, findNoteWithDate } from './utils'

const CNAME = 'DailyQuestionList/App';
const DEBUG = false;

const List = (props: {
  dailyQuestionNotes: IStateDailyQuestionNotes,
  navigateToQuestionForm: (boolean, IDailyQuestionNote) => void
}) => {
  const {
    dailyQuestionNotes,
    navigateToQuestionForm
  } = props
  const { data: notes } = dailyQuestionNotes

  const onDayPress = (day) => {
    const date = new Date(day.dateString)
    DEBUG && console.debug({ CNAME, fn: 'Calendar.onDayPress', day, date });
    const foundNote = findNoteWithDate(notes, date)
    const note: IDailyQuestionNote = foundNote || {
      date: date.getTime(),
      question: questions[getNumberOfDays(`${day.year}-01-01`, day.dateString)],
      answer: ''
    }
    const isEdit = !!foundNote
    return navigateToQuestionForm(isEdit, note)
  }

  // Initialization
  useEffect(() => {
    DEBUG && console.debug({ CNAME, fn: 'List.useEffect', props })
  }, [])

  return (
    <Calendar 
      onDayPress={onDayPress}
      markedDates={getMarkedDates(notes)}
    />
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
