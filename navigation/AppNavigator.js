import React, { useContext } from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import { ActivityIndicator, View } from 'react-native';
import MainTabNavigator from './MainTabNavigator';
import AuthScreen from '../components/AuthScreen';
import { ContextSet } from '../firebase';

const AuthLoadingScreen = props => {
  const [data, setData] = useContext(ContextSet.DataContext);

  props.navigation.navigate(data ? 'Main' : 'Auth');

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
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
