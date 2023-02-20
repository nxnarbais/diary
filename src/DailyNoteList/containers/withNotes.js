import React, { useEffect, Fragment } from 'react'
import { Text } from 'react-native'

import { Store } from '../../Store'
import { fetchNotes } from '../../actions'

const CNAME = 'NoteList/containers/withNotes'
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
    dailyNotes
  } = state

  useEffect(() => {
    const { data, isFetching, isError } = dailyNotes
    DEBUG && console.log({ CNAME, dailyNotes })
    DEBUG && console.log({ CNAME, isFetching, isError }); // important ; to make sure the line below does not crash
    (!data && !isFetching && !isError) && fetchNotes(dispatch)
  }, [dailyNotes, dispatch]);

  return (props) => {
    const {
      isFetching,
      isError,
      error,
      data,
    } = dailyNotes;
    const loadingMessage = 'Loading notes...';
    const onError = () => {
      fetchNotes(dispatch);
    };
    return (
      <Fragment>
        {showActivityIndicator && (
          <Text>{JSON.stringify({isFetching, loadingMessage})}</Text>
        )}
        {showErrorIndicator && (
          <Text>{JSON.stringify({isError, error})}</Text>
        )}
        {(showComponentWhileFetching || (!isFetching && data)) && (
          <Component
            {...props}
            dispatch={dispatch}
            dailyNotes={dailyNotes}
          />
        )}
      </Fragment>
    );
  };
};

HOC.displayName = CNAME;
export default HOC;
