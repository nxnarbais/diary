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
  const [date, onChangeDate] = React.useState(!!init && init.date || new Date());
  const [title, onChangeTitle] = React.useState(!!init && init.title || defaultTitle);
  const [content, onChangeContent] = React.useState(!!init && init.content);
  const [labels, onChangeLabels] = React.useState(!!init && init.labels || []);
  const [mood, onChangeMood] = React.useState(!!init && init.mood);

  const [submitting, onChangeSubmitting] = React.useState(false);

  const state = {
    date,
    title,
    content,
    labels,
    mood
  }

  // Initialization
  useEffect(() => {
    DEBUG && console.debug(`${CNAME} - Initizialization - [isEdit:${isEdit}, init:${init}]`);
  }, []);

  // Submitting
  useEffect(() => {
    DEBUG && console.debug(`${CNAME} - Submitting - [submitting:${submitting}]`);
    if (submitting) {
      onSubmit(state)
        .catch(console.error)
        // .finally(() => onChangeSubmitting(false))
        .finally(() => {
          setTimeout(() => {
            onChangeSubmitting(false);
          }, 3000);
        })
    }
  }, [submitting])

  const dateStr = date instanceof Date && !isNaN(date.valueOf())
    ? date.toLocaleDateString()
    : (new Date(date.seconds * 1000)).toLocaleDateString()

  return (
    <>
      {DEBUG && 
        <>
          <Text>-- {dateStr} - {title} --</Text>
          <Text>{content}</Text>
          <Text>labels: {labels && labels.join(', ')}</Text>
        </>
      }
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeDate(new Date(text))}
        value={dateStr}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        value={title}
      />
      <TextInput
        multiline
        numberOfLines={8}
        onChangeText={onChangeContent}
        value={content}
        editable
        style={{padding: 10}}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeLabels(text.split(", "))}
        value={labels && labels.join(", ")}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeMood(parseFloat(text))}
        value={mood  ? mood.toString() : '0'}
      />
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
