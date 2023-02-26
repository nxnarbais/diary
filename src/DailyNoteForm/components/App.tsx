import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, ScrollView } from 'react-native';
import { IDailyNote } from "../../interfaces";

const CNAME = 'DailyNoteForm/components/App';
const DEBUG = false;

type IOnSubmit = (a: IDailyNote) => Promise<void>;

const App = (props: { isEdit: boolean, note?: IDailyNote, uid: string, onSubmit: IOnSubmit }) => {
  DEBUG && console.debug({ CNAME, props })

  const {isEdit, note, uid, onSubmit} = props;

  const today = new Date()
  const defaultTitle = `Note of ${today.toLocaleDateString()}`
  const [date, onChangeDate] = React.useState(isEdit ? new Date(note.date).toLocaleDateString() : today.toLocaleDateString());
  const [title, onChangeTitle] = React.useState(isEdit && note.title || defaultTitle);
  const [content, onChangeContent] = React.useState(isEdit && note.content);
  const [labels, onChangeLabels] = React.useState(isEdit && note.labels || []);
  const [mood, onChangeMood] = React.useState(isEdit && note.mood);

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
    const { date, title, content, labels, mood } = state
    // DEBUG && console.debug({ CNAME, fn: "validate", date, content, mood });
    const dateParsed = new Date(Date.parse(date))
    // DEBUG && console.debug({ CNAME, fn: "validate", dateParsed });
    const issues = [];
    if (dateParsed.toLocaleDateString() != date) {
      const msg = `Date cannot be parsed: ${date}`
      DEBUG && console.debug({ CNAME, fn: "validate", msg });
      issues.push(msg)
    }
    if (!title || title == '') {
      const msg = 'Title is empty'
      DEBUG && console.debug({ CNAME, fn: "validate", msg });
      issues.push(msg)
    }
    if (date instanceof Date) {
      const msg = 'Date is not correct'
      DEBUG && console.debug({ CNAME, fn: "validate", msg });
      issues.push(msg)
    }
    if (!content || content == '') {
      const msg = 'Content is empty'
      DEBUG && console.debug({ CNAME, fn: "validate", msg });
      issues.push(msg)
    }
    if (mood > 5 || mood < 0) {
      const msg = `Mood level should be between 0 and 5, currently at ${mood}`
      DEBUG && console.debug({ CNAME, fn: "validate", msg });
      issues.push(msg)
    }

    if (issues.length > 0) {
      onChangeValidation(issues)
      return false
    } else {
      onChangeValidation(undefined)
      return true
    }
  }

  // Submitting
  useEffect(() => {
    DEBUG && console.debug({ CNAME, fn: 'useEffect', isEdit, submitting })
    if (submitting) {
      const isStateValidated = validate(state)
      if (!isStateValidated) {
        onChangeSubmitting(false)
      } else {
        onSubmit(Object.assign(state, {
          uid,
          date: new Date(Date.parse(date)).getTime()
        }))
          .catch(console.error)
          .finally(() => onChangeSubmitting(false))
          // .finally(() => {
          //   setTimeout(() => {
          //     onChangeSubmitting(false);
          //   }, 3000);
          // })
      }
    }
  }, [submitting, uid])

  // const dateStr = date instanceof Date && !isNaN(date.valueOf())
  //   ? date.toLocaleDateString()
  //   : (new Date(date.seconds * 1000)).toLocaleDateString()

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
          <Text>-- {date} - {title} --</Text>
          <Text>{content}</Text>
          <Text>labels: {labels && labels.join(', ')}</Text>
        </>
      }
      <View
        style={{ 
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Text>Date</Text>
        <TextInput
          style={styles.input}
          // onChangeText={(text) => {
          //   const dateParsed = new Date(Date.parse(text))
          //   onChangeDate(dateParsed)
          // }}
          onChangeText={onChangeDate}
          value={date}
        />
      </View>
      
      <View
        style={{ 
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Text>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTitle}
          value={title}
        />
      </View>

      <Text>Content</Text>
      <TextInput
        multiline
        numberOfLines={5}
        onChangeText={onChangeContent}
        value={content}
        editable
        style={{padding: 10}}
      />

      <View
        style={{ 
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Text>Labels (separated by `, `)</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeLabels(text.split(", "))}
          value={labels && labels.join(", ")}
        />
      </View>

      <View
        style={{ 
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Text>Mood (0 to 5)</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeMood(parseFloat(text))}
          value={mood  ? mood.toString() : '0'}
        />
      </View>
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
