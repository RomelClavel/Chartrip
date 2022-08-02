import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearStorage = async () => {
	AsyncStorage.clear();
};

export const storeData = async (key, value) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (e) {
		console.log(e);
	}
};

export const getData = async (key) => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			console.log(value);
			return value;
		}
	} catch (e) {
		// error reading value
		console.log(e);
	}
};

// export const getTokenData = async () => {
// 	const token = getData('token');
// 	//Get id from roken
// 	// return id

// 	//Constants.manifest.extra.SECRET_JWT_SEED
// 	/*
// 	try {
// 		const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);

// 		req.uid = payload.uid;
// 	} catch {
// 		return res.status(401).json({
// 			ok: false,
// 			msj: 'Token is not valid',
// 		});
// 	}
// 	 */
// };
