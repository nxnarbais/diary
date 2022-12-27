import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';

const CNAME = 'NoteForm/App';
const DEBUG = true;

const App = (props) => {
  const {init, onSubmit} = props;

  const [date, onChangeDate] = React.useState(!!init && init.date || new Date());
  const [title, onChangeTitle] = React.useState(!!init && init.title);
  const [content, onChangeContent] = React.useState(!!init && init.content);
  const [labels, onChangeLabels] = React.useState(!!init && init.labels);

  const [submitting, onChangeSubmitting] = React.useState(false);

  const state = {
    date,
    title,
    content,
    labels
  }

  // Initialization
  useEffect(() => {
    DEBUG && console.debug(`${CNAME} - Initizialization`);
    if (!!init) {
      DEBUG && console.debug(`${CNAME} - Initizialization - init isset`);
    }
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

  return (
    <>
      {DEBUG && 
        <>
          <Text>-- {date.toLocaleDateString()} - {title} --</Text>
          <Text>{content}</Text>
          <Text>labels: {labels && labels.join(', ')}</Text>
        </>
      }
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeDate(new Date(text))}
        value={date.toLocaleDateString()}
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
        value={labels.join(", ")}
      />
      <Button
        onPress={() => onChangeSubmitting(state)}
        title={submitting ? "Saving..." : "Save"}
        color="#841584"
        disabled={submitting}
      />
      {submitting && <ActivityIndicator size="small" />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'left',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

App.displayName = CNAME;
export default App;
