import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ContentScreen from '../screens/ContentScreen';
import InfoScreen from '../screens/InfoScreen';
import AuthScreen from '../components/AuthScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />
};

HomeStack.path = '';

const AuthStack = createStackNavigator({
  Auth: AuthScreen
});

AuthStack.navigationOptions = {
  tabBarLabel: 'Sign',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />
};

AuthStack.path = '';

const MapStack = createStackNavigator({
  Map: MapScreen
});

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-map" />
};

MapStack.path = '';

const ContentStack = createStackNavigator({
  Content: ContentScreen
});

ContentStack.navigationOptions = {
  tabBarLabel: 'Contents',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-locate" />
};

ContentStack.path = '';

const InfoStack = createStackNavigator({
  Info: InfoScreen
});

InfoStack.navigationOptions = {
  tabBarLabel: 'Info',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />
};

InfoStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  MapStack,
  ContentStack,
  InfoStack,
  AuthStack
});

tabNavigator.path = '';

export default tabNavigator;
