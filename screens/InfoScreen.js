import React, { useContext } from 'react';
import { ContextSet } from '../firebase';

import AuthScreen from '../components/AuthScreen';
import LogoutScreen from '../components/Logout';

export default function InfoScreen() {
  const [data, setData] = useContext(ContextSet.DataContext);

  return data ? <LogoutScreen /> : <AuthScreen />;
}

InfoScreen.navigationOptions = {
  header: null
};
