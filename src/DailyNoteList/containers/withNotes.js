import React, { useEffect, Fragment } from 'react'
import { Text, ActivityIndicator } from 'react-native'

import { Store } from '../../Store'
import { fetchNotes } from '../../actions'

const CNAME = 'DailyNoteList/containers/withNotes'
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
    dailyNotes,
    user
  } = state

  const { data: userData } = user
  const { uid } = userData

  useEffect(() => {
    const { data, isFetching, isError } = dailyNotes
    DEBUG && console.log({ CNAME, dailyNotes })
    DEBUG && console.log({ CNAME, isFetching, isError }); // important ; to make sure the line below does not crash
    // DEBUG && console.log({ CNAME, a: !data, b: data != null }); // important ; to make sure the line below does not crash
    // (!data && data != null && !isFetching && !isError) && fetchNotes(dispatch)
    (!data && !isFetching && !isError) && fetchNotes(dispatch, uid)
  }, [uid, dailyNotes, dispatch]);

  return (props) => {
    const {
      isFetching,
      isError,
      error,
      // data,
    } = dailyNotes;
    // const loadingMessage = 'Loading notes...';
    // const onError = () => {
    //   fetchNotes(dispatch, uid);
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
              dailyNotes={dailyNotes}
            />
          )
        }
      </Fragment>
    );
  };
};

HOC.displayName = CNAME;
export default HOC;
