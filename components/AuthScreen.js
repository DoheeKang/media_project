import React, { useState, useEffect, useContext } from 'react';
import { ContextSet } from '../firebase';
import Signup from './Signup';
import Login from './Login';

const AuthScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupPage, setSignupPage] = useState(false);
  const [data, setData] = useContext(ContextSet.DataContext);

  useEffect(() => {
    if (data) {
      props.navigation.navigate('Main');
    }
  }, [data]);
  return signupPage ? (
    <Signup setSignupPage={setSignupPage} setData={setData} />
  ) : (
    <Login
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      setSignupPage={setSignupPage}
    />
  );
};

AuthScreen.navigationOptions = {
  header: null
};

export default AuthScreen;
