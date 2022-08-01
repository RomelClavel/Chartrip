import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateRoute from '../screens/CreateRoute';
import { COLORS } from '../styles/Styling';
import WorldIcon from '../icons/WorldIcon';
import AddIcon from '../icons/AddIcon';
import DiscoverStack from './DiscoverStack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import hideBottomBar from '../helpers/hideBottomBar';
import Constants from 'expo-constants';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarActiveTintColor: COLORS.custom.primary,
				tabBarStyle: {
					backgroundColor: 'white',
					height: 85,
				},
				tabBarLabelStyle: { fontWeight: '600', fontSize: 11 },
				tabBarIcon: ({ color }) => {
					const size = 36;
					switch (route.name) {
						case 'Discover':
							return <WorldIcon color={color} size={size} />;
						default:
							return <AddIcon color={color} size={size} />;
					}
				},
			})}
		>
			<Tab.Screen
				options={({ route }) => ({
					tabBarStyle: ((route) => {
						const routeName = getFocusedRouteNameFromRoute(route) ?? '';
						if (hideBottomBar(routeName)) {
							return { display: 'none' };
						} else {
							return { backgroundColor: 'white', height: 85 };
						}
					})(route),
				})}
				name="Discover"
				component={DiscoverStack}
			/>
			<Tab.Screen name="Create" component={CreateRoute} />
		</Tab.Navigator>
	);
};

export default BottomTabs;
