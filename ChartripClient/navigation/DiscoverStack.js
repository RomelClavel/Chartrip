import React from 'react';
import Discover from '../screens/Discover';
import RouteDetails from '../screens/RouteDetails';
import { createStackNavigator } from '@react-navigation/stack';
import FollowRoute from '../screens/FollowRoute';

const Stack = createStackNavigator();

const DiscoverStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				// animationTypeForReplace: 'pop',
			}}
		>
			<Stack.Screen name="DiscoverRoutes" component={Discover} />
			<Stack.Screen name="RouteDetails" component={RouteDetails} />
			<Stack.Screen name="FollowRoute" component={FollowRoute} />
		</Stack.Navigator>
	);
};

export default DiscoverStack;
