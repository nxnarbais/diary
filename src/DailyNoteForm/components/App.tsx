import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { IDailyNote } from "../../interfaces";

const CNAME = 'DailyNoteForm/components/App';
const DEBUG = true;

type IOnSubmit = (a: IDailyNote) => Promise<void>;

const App = (props: { isEdit: boolean, init?: IDailyNote, onSubmit: IOnSubmit }) => {
  DEBUG && console.debug({ CNAME, props })

  const {isEdit, init, onSubmit} = props;

  const today = new Date()
  const defaultTitle = `Note of ${today.toLocaleDateString()}`
  const [date, onChangeDate] = React.useState(!!init && init.date || (new Date()).toLocaleDateString());
  const [title, onChangeTitle] = React.useState(!!init && init.title || defaultTitle);
  const [content, onChangeContent] = React.useState(!!init && init.content);
  const [labels, onChangeLabels] = React.useState(!!init && init.labels || []);
  const [mood, onChangeMood] = React.useState(!!init && init.mood);

  const [validation, onChangeValidation] = React.useState(undefined);

  const [submitting, onChangeSubmitting] = React.useState(false);

  const state = {
    date,
    title,
    content,
    labels,
    mood
  }

  const validate = (state) => {
    DEBUG && console.debug({ CNAME, fn: "validate", state });
    const { date, content, mood } = state
    DEBUG && console.debug({ CNAME, fn: "validate", date, content, mood });
    const dateParsed = new Date(Date.parse(date))
    // DEBUG && console.debug({ CNAME, fn: "validate", dateParsed });
    const issues = [];
    if (dateParsed.toLocaleDateString() != date) {
      DEBUG && console.debug({ CNAME, fn: "validate", msg: "Date cannot be parsed" });
      issues.push(`Date cannot be parsed ${dateParsed.toLocaleDateString()} to ${date}`)
    }
    if (!content || content == "") {
      DEBUG && console.debug({ CNAME, fn: "validate", msg: "Content is empty" });
      issues.push(`Content is empty: ${content}`)
    }
    if (mood > 5 || mood < 0) {
      DEBUG && console.debug({ CNAME, fn: "validate", msg: "Mood level should be between 0 and 5" });
      issues.push(`Mood level should be between 0 and 5: ${mood}`)
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
    // if (submitting) {
    //   validate(state)
    //   if (!!validation) {
    //     onSubmit(state)
    //       .catch(console.error)
    //       // .finally(() => onChangeSubmitting(false))
    //       .finally(() => {
    //         setTimeout(() => {
    //           onChangeSubmitting(false);
    //         }, 3000);
    //       })
    //   } else {
    //     onChangeSubmitting(false)
    //   }
    // }
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

  // const dateStr = date instanceof Date && !isNaN(date.valueOf())
  //   ? date.toLocaleDateString()
  //   : (new Date(date.seconds * 1000)).toLocaleDateString()

  return (
    <>
      {DEBUG && 
        <>
          <Text>-- {date} - {title} --</Text>
          <Text>{content}</Text>
          <Text>labels: {labels && labels.join(', ')}</Text>
        </>
      }
      <Text>Date</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeDate(text)}
        value={date}
      />
      <Text>Title</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        value={title}
      />
      <Text>Content</Text>
      <TextInput
        multiline
        numberOfLines={8}
        onChangeText={onChangeContent}
        value={content}
        editable
        style={{padding: 10}}
      />
      <Text>Labels (separated by `, `)</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeLabels(text.split(", "))}
        value={labels && labels.join(", ")}
      />
      <Text>Mood (0 to 5)</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeMood(parseFloat(text))}
        value={mood  ? mood.toString() : '0'}
      />
      {validation && (<Text>{validation.join(", ")}</Text>)}
      <Button
        onPress={() => onChangeSubmitting(true)}
        title={submitting ? "Saving..." : "Save"}
        color="#841584"
        disabled={submitting}
      />
      {submitting && <ActivityIndicator size="small" />}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

App.displayName = CNAME;
export default App;
