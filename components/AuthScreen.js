import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ContextSet } from '../firebase';
import Signup from './Signup';
import Logout from './Logout';
import Login from './Login';

const AuthScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [signupPage, setSignupPage] = useState(false);
	const [data, setData] = useContext(ContextSet.DataContext);

	return signupPage ? (
		<Signup setSignupPage={setSignupPage} setData={setData} />
	) : data ? (
		<Logout setEmail={setEmail} setPassword={setPassword} />
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

const styles = StyleSheet.create({});

export default AuthScreen;
