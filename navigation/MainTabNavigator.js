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

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />
};

HomeStack.path = '';

const MapStack = createStackNavigator({
  Map: MapScreen
});

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-pin" />
};

MapStack.path = '';

const ContentStack = createStackNavigator({
  Content: ContentScreen
});

ContentStack.navigationOptions = {
  tabBarLabel: 'Contents',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-paper" />
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
  InfoStack
});

tabNavigator.path = '';

export default tabNavigator;
