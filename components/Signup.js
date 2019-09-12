import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { firebaseApp, ContextSet } from '../firebase';

const SignupScreen = ({ setSignupPage, setData }) => {
	const [auth, users] = firebaseApp();
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleOnClickSignup = () => {
		if (userName && email && password && confirmPassword) {
			if (password === confirmPassword) {
				auth
					.createUserWithEmailAndPassword(email, password)
					.then(auth => {
						const authData = auth.user;
						const data = { email, userName };
						users.doc(authData.uid).set(data);
						setData(data);
						setSignupPage(false);
						Alert.alert('가입을 축하합니다.');
					})
					.catch(error => Alert.alert(error.message));
			} else {
				Alert.alert('비밀번호를 확인해주세요!');
			}
		} else {
			Alert.alert('정보를 입력해주세요!');
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				value={userName}
				style={styles.inputBox}
				placeholder='Username'
				autoCapitalize='none'
				placeholderTextColor='#999'
				onChangeText={e => setUserName(e)}
			/>
			<Text></Text>

			<TextInput
				value={email}
				style={styles.inputBox}
				placeholder='Email'
				autoCapitalize='none'
				placeholderTextColor='#999'
				onChangeText={e => setEmail(e)}
			/>
			<Text></Text>

			<TextInput
				value={password}
				style={styles.inputBox}
				placeholder='Password'
				secureTextEntry={true}
				autoCapitalize='none'
				placeholderTextColor='#999'
				onChangeText={e => setPassword(e)}
			/>
			{password && confirmPassword && password !== confirmPassword ? (
				<Text style={styles.error}>password are not matching</Text>
			) : (
				<Text></Text>
			)}
			<TextInput
				value={confirmPassword}
				style={styles.inputBox}
				placeholder='Confirm Password'
				secureTextEntry={true}
				autoCapitalize='none'
				placeholderTextColor='#999'
				onChangeText={e => setConfirmPassword(e)}
			/>
			<Button title='ok' onPress={handleOnClickSignup} />
			<Button title='Cancel' onPress={() => setSignupPage(false)} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	inputBox: {
		width: 300,
		padding: 10,
		backgroundColor: '#ccc',
		borderRadius: 25,
		paddingHorizontal: 16,
		fontSize: 16,
		color: '#333',
		marginVertical: 10
	},
	error: {
		color: 'red'
	}
});
export default SignupScreen;
