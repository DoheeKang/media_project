import React, { useContext } from 'react';
import { ContextSet } from './index';
import AuthScreen from '../components/AuthScreen';
import AppNavigator from '../navigation/AppNavigator';

const User = () => {
	const [data] = useContext(ContextSet.DataContext);
	return data ? <AppNavigator /> : <AuthScreen />;
};

export default User;
