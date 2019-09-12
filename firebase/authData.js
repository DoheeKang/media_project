import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import firebaseApp from "./firebase";
import ContextSet from "./ContextSet";
import useAuth from "./useAuth";

const AuthData = ({ children }) => {
	const [auth, users] = firebaseApp();
	const [data, setData] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { initializing, user } = useAuth();

	useEffect(() => {
		if (user) {
			const success = snapshot => {
				const snapshotData = snapshot.data();
				setData(snapshotData);
			};
			const failed = ({ code, message }) => {
				console.log("code: ", code);
				console.log("message: ", message);
			};

			users
				.doc(user.uid)
				.get()
				.then(success)
				.catch(failed);
		}
		return () => {};
	}, [user, setData]);

	if (email && password) {
		const success = user => {
			Alert.alert("Good");
		};
		const failed = error => {
			Alert.alert(error.code, error.message);
		};

		auth
			.signInWithEmailAndPassword(email, password)
			.then(success)
			.catch(failed);

		setEmail("");
		setPassword("");
	}

	return (
		<ContextSet.DataContext.Provider value={[data, setData]}>
			<ContextSet.EmailContext.Provider value={[email, setEmail]}>
				<ContextSet.PasswordContext.Provider value={[password, setPassword]}>
					{children}
				</ContextSet.PasswordContext.Provider>
			</ContextSet.EmailContext.Provider>
		</ContextSet.DataContext.Provider>
	);
};

export default AuthData;
