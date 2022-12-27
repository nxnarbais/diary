import React, { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import app from './firebaseConfig.js';
import { getFirestore, collection, doc, getDoc, addDoc, getDocs } from "firebase/firestore";
import NoteForm from './src/NoteForm/App.js';

const db = getFirestore(app);

const getData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "test"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  } catch (e) {
    console.error("Error getting document: ", e);
  }
}

export default function App() {
  const [text, onChangeText] = React.useState("title - date");
  const [textarea, onChangeTextArea] = React.useState("today's notes");
  const [number, onChangeNumber] = React.useState(null);

  const [saving, setSaving] = React.useState(false);

  const storeKey = '@StoreKey';
  let state = {text, textarea, number};

  

  useEffect(() => {
    console.log('init')
    // declare the data fetching function
    // const getDataInit = async () => {
    //   const querySnapshot = await getDocs(collection(db, "test"));
    //   querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    //   });
    //   console.log(`state to be set at ${JSON.stringify(querySnapshot[0])}`)
    //   return querySnapshot
    // }

    const getDataInit = async () => {
      // const docSnap = await getDoc(doc(db, "test", "2mYSYxYAeWhBygrBTYn4"));
      const docSnap = await getDoc(doc(db, "test", "f9bqvilASDR6l8UkRits"));
      if (docSnap.exists()) {
        console.log("Document data:", JSON.stringify(docSnap.data()));
        const docJSON = docSnap.data();
        onChangeText(docJSON.text);
        onChangeTextArea(docJSON.textarea);
        onChangeNumber(docJSON.number);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };

    // call the function
    getDataInit()
      // make sure to catch any error
      .catch(console.error);
    // getData(storeKey)
    // console.log(state)
  }, []);

  useEffect(() => {
    console.log(`useEffect saving - [saving:${saving}]`);
    const storeData = async (value) => {
      try {
        const docRef = await addDoc(collection(db, "test"), value);
        // const docRef = {id: 123}
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    if (saving) {
      storeData(state)
        .finally(() => {
          setTimeout(() => {
            setSaving(false);
          }, 1000);
          // setSaving(false)
        })
    }
    // if (saving) {
    //   try {
    //     await storeData(value)
    //   } catch (e) {
    //     console.error("Oups")
    //   }
    //   setSaving(false)
    // }

  }, [saving])

  const onSubmit = async (content) => {
    console.log(content)
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Dodo's diary</Text>

      <NoteForm
        init={{
          date: new Date(),
          title: 'default title',
          content: 'default content',
          labels: ['something']
        }}
        onSubmit={onSubmit}
      />
      <Text>[{text} - {number}]</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => {onChangeText(text);}}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => {onChangeNumber(text);}}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <TextInput
        multiline
        numberOfLines={4}
        onChangeText={text => {onChangeTextArea(text);}}
        value={textarea}
        editable
        style={{padding: 10}}
      />
      <Button
        // onPress={() => storeData(state)}
        onPress={() => setSaving(true)}
        title="Save"
        color="#841584"
      />
      {saving && <ActivityIndicator size="large" />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
