import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../styles/Styling';

const Stack = createStackNavigator();

const Discover = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="DiscoverRoutes" component={DiscoverRoutes} />
			<Stack.Screen name="RouteDetails" component={RouteDetails} />
		</Stack.Navigator>
	);
};

const DiscoverRoutes = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text> DISCOVER </Text>
			<TouchableOpacity
				style={{ borderRadius: 10 }}
				onPress={() => {
					navigation.navigate('RouteDetails');
				}}
			>
				<Text style={[styles.text, { backgroundColor: 'pink', padding: 10 }]}>
					{' '}
					Navigate My Guy
				</Text>
			</TouchableOpacity>
		</View>
	);
};
const RouteDetails = () => {
	return (
		<View style={styles.container}>
			<Text> Route Details </Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.backgroundWhite,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Discover;
