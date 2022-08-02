import React, { useEffect } from 'react';
import RegisterForm from '../screens/RegisterForm';
import BottomTabs from './BottomTabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getData } from '../helpers/storageFunctions';
import { useState } from 'react';
import { Spinner } from 'native-base';

const Stack = createStackNavigator();

const AppStack = () => {
	const [isLogged, setIsLogged] = useState(false);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const getTokenData = async () => {
			const token = await getData('token');
			if (token) {
				setIsLogged(true);
			}
			setLoading(false);
		};
		getTokenData();
	}, []);

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: false,
			}}
		>
			{!loading ? (
				<>
					{!isLogged && <Stack.Screen name="LoginSignup" component={RegisterForm} />}

					<Stack.Screen name="App" component={BottomTabs} />
				</>
			) : (
				<Stack.Screen name="loader" component={Loader} />
			)}
		</Stack.Navigator>
	);
};

const Loader = () => {
	return <Spinner size={'lg'} alignSelf={'center'} mt={10} />;
};

export default AppStack;
