import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator } from 'react-native'

import { Store } from '../Store';
import { initUser } from '../actions';
import { IStateStore } from '../interfaces';

const CNAME = 'auth/Wrappers/UserWrapper';
const DEBUG = true

const App = ({ children }: { children: any }) => {
  const { state, dispatch }: any = React.useContext(Store);
  const { user }: IStateStore = state;
  const { isFetching, isError, data, error } = user

  useEffect(() => {
    DEBUG && console.debug({ CNAME, fn:'useEffect', isFetching, data })
    if (!isFetching && data === undefined) {
      initUser(dispatch)
    }
  }, [dispatch, data, isFetching]);

  if (isFetching) {
    // TODO: Build proper splash screen
    return (
      <View>
        <ActivityIndicator />
        {isError && <Text>{error.message}</Text>}
      </View>
    )
  }

  return children
};

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default App;
