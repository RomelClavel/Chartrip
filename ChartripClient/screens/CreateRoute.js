import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../styles/Styling';

const CreateRoute = () => {
	return (
		<View style={styles.container}>
			<Text> CREATE ROUTE </Text>
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

export default CreateRoute;
