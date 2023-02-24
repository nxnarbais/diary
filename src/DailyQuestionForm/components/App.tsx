import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, ScrollView } from 'react-native';
import { IDailyQuestionNote } from "../../interfaces";

const CNAME = 'DailyQuestionNoteForm/components/App';
const DEBUG = false;

type IOnSubmit = (a: IDailyQuestionNote) => Promise<void>;

const App = (props: { isEdit: boolean, init?: IDailyQuestionNote, onSubmit: IOnSubmit }) => {
  DEBUG && console.debug({ CNAME, props })

  const {isEdit, init, onSubmit} = props;

  // const today = new Date()
  const [date, onChangeDate] = React.useState(init.date);
  const [question, onChangeQuestion] = React.useState(init.question);
  const [answer, onChangeAnswer] = React.useState(!!init && init.answer);
  
  const [validation, onChangeValidation] = React.useState(undefined);
  const [submitting, onChangeSubmitting] = React.useState(false);

  const state = {
    date,
    question,
    answer
  }

  const validate = (state) => {
    DEBUG && console.debug({ CNAME, fn: "validate", state });
    const { date, question, answer } = state
    // const dateParsed = new Date(Date.parse(date))
    // const dateParsed = date
    const issues = [];
    // if (dateParsed.toLocaleDateString() != date) {
    //   DEBUG && console.debug({ CNAME, fn: "validate", msg: "Date cannot be parsed" });
    //   issues.push(`Date cannot be parsed ${dateParsed.toLocaleDateString()} to ${date}`)
    // }
    if (!question || question == "") {
      DEBUG && console.debug({ CNAME, fn: "validate", msg: "Question cannot be empty" });
      issues.push(`Content cannot be empty: ${question}`)
    }
    if (!answer || answer == "") {
      DEBUG && console.debug({ CNAME, fn: "validate", msg: "Answer cannot be empty" });
      issues.push(`Answer cannot be empty: ${question}`)
    }
    if (issues.length > 0) {
      onChangeValidation(issues)
      return false
    } else {
      onChangeValidation(undefined)
      return true
    }
  }

  // Initialization
  useEffect(() => {
    DEBUG && console.debug(`${CNAME} - Initizialization - [isEdit:${isEdit}, init:${init}]`);
  }, []);

  // Submitting
  useEffect(() => {
    DEBUG && console.debug(`${CNAME} - Submitting - [submitting:${submitting}]`);
    if (submitting) {
      const isStateValidated = validate(state)
      if (!isStateValidated) {
        onChangeSubmitting(false)
      } else {
        onSubmit(state)
          .catch(console.error)
          // .finally(() => onChangeSubmitting(false))
          .finally(() => {
            setTimeout(() => {
              onChangeSubmitting(false);
            }, 3000);
          })
      }
    }
  }, [submitting])

  return (
    <ScrollView
      style={{
        flexDirection: 'column',
        // height: 100,
        padding: 20,
        flex: 1
      }}>
      {DEBUG && 
        <>
          <Text>-- {date.toLocaleDateString()} - {question} --</Text>
          <Text>{answer}</Text>
        </>
      }
      {/* <View
        style={{ 
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Text>Date</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            const date = new Date(Date.parse(text))
            onChangeDate(date)
          }}
          value={date.toLocaleDateString()}
        />
      </View> */}
      <Text>{date.toLocaleDateString()}</Text>
      
      {/* <Text>Question</Text>
      <TextInput
        // style={styles.input}
        multiline
        numberOfLines={3}
        onChangeText={onChangeQuestion}
        value={question}
      /> */}
      <Text>{question}</Text>

      <Text>Content</Text>
      <TextInput
        multiline
        numberOfLines={5}
        onChangeText={onChangeAnswer}
        value={answer}
        editable
        style={{padding: 10}}
      />

      {validation && (
        <View
          style={{ 
            flexDirection: 'row',
            // alignItems: 'center'
          }}
        >
          <Text style={{
            height: 40,
            marginTop: 8,
            marginBottom: 8,
            // borderWidth: 1,
            // padding: 10,
            flex: 1
          }}>
            {validation.join(", ")}
          </Text>
        </View>
      )}
      <Button
        onPress={() => onChangeSubmitting(true)}
        title={submitting ? "Saving..." : "Save"}
        color="#841584"
        disabled={submitting}
      />
      {submitting && <ActivityIndicator size="small" />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 8,
    borderWidth: 1,
    padding: 10,
    flex: 1
  },
});

App.displayName = CNAME;
export default App;
