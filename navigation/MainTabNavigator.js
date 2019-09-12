import React from 'react';
import { Platform } from 'react-native';
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

const config = Platform.select({
	web: { headerMode: 'screen' },
	default: {}
});

const HomeStack = createStackNavigator(
	{
		Home: HomeScreen
	},
	config
);

HomeStack.navigationOptions = {
	tabBarLabel: 'Home',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-home'
			}
		/>
	)
};

HomeStack.path = '';

const AuthStack = createStackNavigator(
	{
		Auth: AuthScreen
	},
	config
);

AuthStack.navigationOptions = {
	tabBarLabel: 'Sign',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}` : 'md-Login'
			}
		/>
	)
};

AuthStack.path = '';

const MapStack = createStackNavigator(
	{
		Map: MapScreen
	},
	config
);

MapStack.navigationOptions = {
	tabBarLabel: 'Map',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-map'
      }
		/>
	)
};

MapStack.path = '';

const ContentStack = createStackNavigator(
	{
		Content: ContentScreen
	},
	config
);

ContentStack.navigationOptions = {
	tabBarLabel: 'Contents',
	tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-locate'}
    />
	)
};

ContentStack.path = '';

const InfoStack = createStackNavigator(
	{
		Info: InfoScreen
	},
	config
);

InfoStack.navigationOptions = {
	tabBarLabel: 'Info',
	tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-person'}
    />
	)
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
