import React, { useState, useEffect } from "react";
import firebaseApp from "./firebase";

const useAuth = () => {
	const [auth] = firebaseApp();
	const [state, setState] = useState(() => {
		const user = auth.currentUser;
		return { initializing: !user, user };
	});

	function onChange(user) {
		setState({ initializing: false, user });
	}

	useEffect(() => {
		// listen for auth state changes
		const unsubscribe = auth.onAuthStateChanged(onChange);
		// unsubscribe to the listener when unmounting
		return () => unsubscribe();
	}, []);

	return state;
};

export default useAuth;
