export const isValidEmail = (email) =>
	// eslint-disable-next-line no-useless-escape
	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	);
removeValue = async () => {
	try {
		await AsyncStorage.removeItem('@MyApp_key');
	} catch (e) {
		// remove error
	}

	console.log('Done.');
};
