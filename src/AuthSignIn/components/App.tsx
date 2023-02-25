import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, ScrollView } from 'react-native';

const CNAME = 'AuthSignIn/components/App';
const DEBUG = false;

type IOnSubmit = (a: { email: string, password: string }) => Promise<void>;

const App = (props: { onSubmit: IOnSubmit }) => {
  // DEBUG && console.debug({ CNAME, props })

  const { onSubmit } = props;

  const [email, onChangeEmail] = React.useState("")
  const [password, onChangePassword] = React.useState("")
  const [error, onChangeError] = React.useState(undefined)
  
  const [validation, onChangeValidation] = React.useState(undefined)
  const [submitting, onChangeSubmitting] = React.useState(false)

  const state = {
    email,
    password
  }

  const validate = (state) => {
    DEBUG && console.debug({ CNAME, fn: "validate", state });
    const { email, password } = state
    const issues = [];
    if (!email || email == "") {
      issues.push(`Email cannot be empty`)
    }
    if (!password || password == "") {
      issues.push(`Password cannot be empty`)
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
    DEBUG && console.debug(`${CNAME} - Submitting - [submitting:${submitting}, validation:[${validation}]]`);
    if (submitting) {
      const isStateValidated = validate(state)
      DEBUG && console.debug({ CNAME, submitting, isStateValidated, validation });
      if (!isStateValidated) {
        onChangeSubmitting(false)
      } else {
        DEBUG && console.debug({ CNAME, submitting, msg: "Parent submit", state });
        onSubmit(state)
          .catch(error => onChangeError(error))
          // .catch(console.error)
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
        padding: 20,
        flex: 1
      }}>
      {DEBUG && 
        <>
          <Text>{email}</Text>
          <Text>{password}</Text>
        </>
      }
      <View
        style={{ 
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          autoComplete="email"
          keyboardType="email-address"
        />
      </View>
      
      <View
        style={{ 
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry={true}
          textContentType="password"
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
      {!validation && !!error && (
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
            {`Submission error ${error.code}: ${error.message}`}
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
