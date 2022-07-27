import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateRoute from '../screens/CreateRoute';
import Discover from '../screens/Discover';
import { COLORS } from '../styles/Styling';
import WorldIcon from '../icons/WorldIcon';
import AddIcon from '../icons/AddIcon';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarActiveTintColor: COLORS.primary,
				//Dont know if this is teh best way to do this
				tabBarStyle: { paddingTop: 16, height: 60 },
				tabBarLabelStyle: { fontWeight: '600', fontSize: 11, paddingTop: 10 },
				tabBarIcon: ({ color }) => {
					const size = 40;
					switch (route.name) {
						case 'Discover':
							return <WorldIcon color={color} size={size} />;
						default:
							return <AddIcon color={color} size={size} />;
					}
				},
			})}
		>
			<Tab.Screen name="Discover" component={Discover} />
			<Tab.Screen name="Create" component={CreateRoute} />
		</Tab.Navigator>
	);
};

export default BottomTabs;
