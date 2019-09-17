import React, { useState, useEffect, useContext } from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import { ActivityIndicator, View } from 'react-native';
import MainTabNavigator from './MainTabNavigator';
import AuthScreen from '../components/AuthScreen';
import LoadingScreen from '../screens/LoadingScreen';
import { ContextSet } from '../firebase';

const AuthLoadingScreen = props => {
  const [data, setData] = useContext(ContextSet.DataContext);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (isLoad) props.navigation.navigate(data ? 'Main' : 'Auth');
  }, [isLoad]);

  if (isLoad) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  } else {
    return <LoadingScreen />;
  }
};

const AuthStack = createStackNavigator({ SignIn: AuthScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      Main: MainTabNavigator,
      Auth: AuthStack,
      AuthLoading: AuthLoadingScreen
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
