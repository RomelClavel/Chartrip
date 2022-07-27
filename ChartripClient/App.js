import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import BottomTabs from './navigation/BottomTabs';
import { COLORS } from './styles/Styling';

export default function App() {
	return (
		<NavigationContainer>
			<SafeAreaView style={{ flex: 1 /*backgroundColor: COLORS.backgroundWhite*/ }}>
				<BottomTabs />
			</SafeAreaView>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.backgroundWhite,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
