import React, { useEffect, Fragment } from 'react'
import { Text } from 'react-native'

import { Store } from '../../Store'
import { fetchQuestionNotes } from '../../actions'

const CNAME = 'DailyQuestionList/containers/withQuestionNotes'
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
    dailyQuestionNotes
  } = state

  useEffect(() => {
    const { data, isFetching, isError } = dailyQuestionNotes
    DEBUG && console.log({ CNAME, dailyQuestionNotes })
    DEBUG && console.log({ CNAME, isFetching, isError }); // important ; to make sure the line below does not crash
    (!data && data != null && !isFetching && !isError) && fetchQuestionNotes(dispatch)
  }, [dailyQuestionNotes, dispatch]);

  return (props) => {
    const {
      isFetching,
      isError,
      error,
      data,
    } = dailyQuestionNotes;
    const loadingMessage = 'Loading question notes...';
    const onError = () => {
      fetchQuestionNotes(dispatch);
    };
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
            <Text>{error}</Text>
            // <Text>{JSON.stringify({isError, error})}</Text>
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
