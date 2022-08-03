import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../styles/Styling';
import WorldIcon from '../icons/WorldIcon';
import AddIcon from '../icons/AddIcon';
import DiscoverStack from './DiscoverStack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import hideBottomBar from '../helpers/hideBottomBar';
import CreateStack from './CreateStack';
import Profile from '../screens/Profile';
import ProfileIcon from '../icons/ProfileIcon';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
	const hideBottomTab = ({ route }) => ({
		tabBarStyle: ((route) => {
			const routeName = getFocusedRouteNameFromRoute(route) ?? '';
			if (hideBottomBar(routeName)) {
				return { display: 'none' };
			} else {
				return { backgroundColor: 'white', height: 85 };
			}
		})(route),
	});

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
						case 'Profile':
							return <ProfileIcon color={color} size={size} />;
						default:
							return <AddIcon color={color} size={size} />;
					}
				},
			})}
		>
			{/*  Made options the hideBottomTab function */}
			{/*  If it breaks its this */}
			<Tab.Screen options={hideBottomTab} name="Discover" component={DiscoverStack} />
			<Tab.Screen options={hideBottomTab} name="Create" component={CreateStack} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
};

export default BottomTabs;
