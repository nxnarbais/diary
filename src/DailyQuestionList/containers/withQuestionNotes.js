import React, { useEffect, Fragment } from 'react'
import { Text, ActivityIndicator } from 'react-native'

import { Store } from '../../Store'
import { fetchQuestionNotes } from '../../actions'

const CNAME = 'DailyQuestionNoteList/containers/withNotes'
const DEBUG = false

const HOC = (
  Component,
  {
    showActivityIndicator,
    showErrorIndicator,
    showComponentWhileFetching
  }
) => {
  const { state, dispatch } = React.useContext(Store)
  // DEBUG && console.debug({ CNAME, state })
  const {
    dailyQuestionNotes,
    user
  } = state

  const { data: userData } = user
  const { uid } = userData

  useEffect(() => {
    const { data, isFetching, isError } = dailyQuestionNotes
    DEBUG && console.log({ CNAME, dailyQuestionNotes })
    DEBUG && console.log({ CNAME, isFetching, isError }); // important ; to make sure the line below does not crash
    // DEBUG && console.log({ CNAME, a: !data, b: data != null }); // important ; to make sure the line below does not crash
    // (!data && data != null && !isFetching && !isError) && fetchNotes(dispatch)
    (!data && !isFetching && !isError) && fetchQuestionNotes(dispatch, uid)
  }, [uid, dailyQuestionNotes, dispatch]);

  return (props) => {
    const {
      isFetching,
      isError,
      error,
      // data,
    } = dailyQuestionNotes;
    // const loadingMessage = 'Loading question notes...';
    // const onError = () => {
    //   fetchQuestionNotes(dispatch, uid);
    // };
    return (
      <Fragment>
        {showActivityIndicator 
          && isFetching 
          && (
            <ActivityIndicator />
            // <Text>{JSON.stringify({isFetching, loadingMessage})}</Text>
          )
        }
        {showErrorIndicator 
          && isError
          && (
            // <Text>{error}</Text>
            <Text>{JSON.stringify({uid, isError, error})}</Text>
          )
        }
        {(showComponentWhileFetching 
          || (!isFetching)) 
          // || (!isFetching && data)) 
          && (
            <Component
              {...props}
              dispatch={dispatch}
              dailyQuestionNotes={dailyQuestionNotes}
            />
          )
        }
      </Fragment>
    );
  };
};

HOC.displayName = CNAME;
export default HOC;
