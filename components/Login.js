import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { firebaseApp, ContextSet } from "../firebase";

const LoginScreen = () => {
	const [auth] = firebaseApp();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [data, setData] = useContext(ContextSet.DataContext);
	const [_e, setLoginEmail] = useContext(ContextSet.EmailContext);
	const [_p, setLoginPassword] = useContext(ContextSet.PasswordContext);

	const handleOnClickLogin = () => {
		setLoginEmail(email);
		setLoginPassword(password);
	};
	const handleOnClickLogout = () => {
		auth
			.signOut()
			.then(() => {
				setData(null);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<View style={{ paddingTop: 50, alignItems: "center" }}>
			{data ? (
				<View>
					<Button title='Logout' onPress={handleOnClickLogout}></Button>
					<Text>{JSON.stringify(data)}</Text>
				</View>
			) : (
				<View>
					<TextInput
						style={{ width: 200, height: 40, borderWidth: 1 }}
						value={email}
						onChangeText={e => setEmail(e)}
						placeholder='Email'
						keyboardType='email-address'
						autoCapitalize='none'
						autoCorrect={false}
					/>
					<View style={{ paddingTop: 10 }} />

					<TextInput
						style={{ width: 200, height: 40, borderWidth: 1 }}
						value={password}
						onChangeText={e => setPassword(e)}
						placeholder='Password'
						secureTextEntry={true}
						autoCapitalize='none'
						autoCorrect={false}
					/>
					<Button title='Login' onPress={handleOnClickLogin} />
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({});

export default LoginScreen;
