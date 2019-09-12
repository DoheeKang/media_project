import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { firebaseApp, ContextSet } from '../firebase';

const LoginScreen = ({ email, setEmail, password, setPassword, setSignupPage }) => {
	const [_e, setLoginEmail] = useContext(ContextSet.EmailContext);
	const [_p, setLoginPassword] = useContext(ContextSet.PasswordContext);

	const handleOnClickLogin = () => {
		if (email && password) {
			setLoginEmail(email);
			setLoginPassword(password);
		} else {
			Alert.alert('아이디와 비밀번호를 입력해주세요.');
		}
	};

	return (
		<View style={{ paddingTop: 50, alignItems: 'center' }}>
			<TextInput
				style={styles.input}
				value={email}
				onChangeText={e => setEmail(e)}
				placeholder='Email'
				keyboardType='email-address'
				autoCapitalize='none'
				autoCorrect={false}
			/>
			<View style={{ paddingTop: 10 }} />

			<TextInput
				style={styles.input}
				value={password}
				onChangeText={e => setPassword(e)}
				placeholder='Password'
				secureTextEntry={true}
				autoCapitalize='none'
				autoCorrect={false}
			/>
			<Button title='Login' onPress={handleOnClickLogin} />
			<Button title='Signup' onPress={() => setSignupPage(true)} />
		</View>
	);
};

const styles = StyleSheet.create({
	input: { width: 200, height: 40, paddingLeft: 5, borderWidth: 1 }
});

export default LoginScreen;
