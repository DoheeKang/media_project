import React, { useEffect, useContext } from 'react';
import { ContextSet } from '../firebase';

import LogoutScreen from '../components/Logout';

export default function InfoScreen(props) {
  const [data, setData] = useContext(ContextSet.DataContext);

  useEffect(() => {
    if (!data) {
      props.navigation.navigate('Auth');
    }
  }, [data]);

  return <LogoutScreen />;
}

InfoScreen.navigationOptions = {
  header: null
};
