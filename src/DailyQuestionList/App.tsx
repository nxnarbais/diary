import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, ScrollView } from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import withQuestionNotes from './containers/withQuestionNotes'
import { Store } from '../Store'
import { IStateDailyQuestionNotes, IDailyQuestionNote } from '../interfaces'
import questions from './questions.json'

const CNAME = 'DailyQuestionList/App'
const DEBUG = false;

function getNumberOfDays(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
}

const List = (props: { dailyQuestionNotes: IStateDailyQuestionNotes, navigateToQuestionForm: (IDailyQuestionNote) => void}) => {
  DEBUG && console.log({ CNAME, fn: 'List', props })
  const {
    dailyQuestionNotes,
    navigateToQuestionForm
  } = props
  const { data } = dailyQuestionNotes

  // const renderItem = ({ item }) => (
  //   <Note
  //     note={item}
  //     navigateToNote={navigateToNote}
  //   />
  // )

  const markedDates = {};
  data && data.forEach(note => {
    markedDates[note.date.toISOString().split("T")[0]] = { marked: true }
  })

  return (
    <>
      <Calendar 
        onDayPress={day => {
          const date = new Date(day.dateString)
          DEBUG && console.log('selected day', day, date, date.getTime());
          const foundNote = data && data.find((note: IDailyQuestionNote) => note.date.getTime() === date.getTime())
          DEBUG && console.log({ CNAME, fn: "calendar onDayPress", data, foundNote})
          const isEdit = !!foundNote
          const note: IDailyQuestionNote = isEdit ? foundNote : {
            date,
            question: questions[getNumberOfDays(`${day.year}-01-01`, day.dateString)],
            answer: ''
          }
          return navigateToQuestionForm(isEdit, note)
          // return navigateToQuestionNote({
          //   date: day,
          //   question: "abc",
          // })
        }}
        // markedDates={{
        //   '2012-05-16': {selected: true, marked: true, selectedColor: 'blue'},
        //   '2012-05-17': {marked: true},
        //   '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
        //   '2012-05-19': {disabled: true, disableTouchEvent: true}
        // }}
        markedDates={markedDates}
      />
      {/* {data.map(dailyNote => 
        <Text key={dailyNote.id}>{JSON.stringify(dailyNote)}</Text>
      )} */}
      {/* <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> */}
      {/* {data.map(dailyNote => 
        <Note 
          key={dailyNote.id}
          note={dailyNote}
        />
      )} */}
      {/* <Text>{JSON.stringify(data)}</Text> */}
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

  const { state, dispatch } = React.useContext(Store)
  const { dailyQuestionNotes: { data } } =  state

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
    <View
      style={{
        marginTop: 8
      }}
    >
      <View
        style={{
          marginTop: 8,
          marginBottom: 8
        }}
      >
        <ListWithQuestionNotes
          navigateToQuestionForm={navigateToQuestionForm}
        />
      </View>
      {/* <Text>Question of the day</Text> */}
    </View>
  )
}

App.displayName = CNAME;
export default App;
