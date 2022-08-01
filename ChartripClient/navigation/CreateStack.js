import React from 'react';
import Discover from '../screens/Discover';
import CreateRoute from '../screens/CreateRoute';
import CreateStart from '../screens/CreateStart';
import { createStackNavigator } from '@react-navigation/stack';
import FollowRoute from '../screens/FollowRoute';

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
			{/* <Stack.Screen name="RouteDetails" component={RouteDetails} /> */}
		</Stack.Navigator>
	);
};

export default CreateStack;
