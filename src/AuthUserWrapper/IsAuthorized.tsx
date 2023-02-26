import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Store } from '../Store';
import { ActivityIndicator } from 'react-native';

const CNAME = "AuthUserWrapper/IsAuthorized";
const DEBUG = false

function IsAuthorized(props: { navigation: any, requireLoggedInUser: boolean, children: any}) {
  const { state } = React.useContext(Store);
  const { user: { data, isFetching } } = state;
  const { navigation, requireLoggedInUser } = props;

  const isLoggedIn = !isFetching && data !== undefined && data !== null;
  const isAuthorized = 
    (requireLoggedInUser && isLoggedIn) 
    || (!requireLoggedInUser && !isLoggedIn);

  DEBUG && console.log({ CNAME, isLoggedIn , isFetching, requireLoggedInUser, isAuthorized, data });

  useEffect(() => {
    if (!isFetching && !isAuthorized) {
      if (requireLoggedInUser) {
        navigation.navigate('AuthSignIn', {})
      } else {
        navigation.navigate('Home', {})
      }
    }
  }, [isFetching, isAuthorized, navigation, requireLoggedInUser]);

  if (!isFetching && !isAuthorized) {
    return <ActivityIndicator />;
  }

  return props.children;
}

IsAuthorized.propTypes = ({
  // id: PropTypes.string,
  children: PropTypes.element.isRequired,
  requireLoggedInUser: PropTypes.bool.isRequired,
});

// IsAuthorized.defaultProps = {
//   id: undefined,
// };

export default IsAuthorized;
