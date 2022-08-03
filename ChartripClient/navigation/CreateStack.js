import React from 'react';
import CreateRoute from '../screens/CreateRoute';
import CreateStart from '../screens/CreateStart';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const CreateStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				// animationTypeForReplace: 'pop',
			}}
		>
			<Stack.Screen name="CreateStart" component={CreateStart} />
			<Stack.Screen name="CreateForm" component={CreateRoute} />
		</Stack.Navigator>
	);
};

export default CreateStack;
