// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet } from 'react-native';
import BottomTabs from './navigation/BottomTabs';
import { COLORS } from './styles/Styling';
import { extendTheme, NativeBaseProvider } from 'native-base';

export default function App() {
	//FIX LATER
	const theme = extendTheme({
		colors: {
			// Add new color
			primary: {
				400: '#03ED8A',
				500: '#05BE70',
				600: '#059A5B',
			},
		},
	});
	return (
		<NavigationContainer>
			<SafeAreaView style={{ flex: 0, backgroundColor: COLORS.custom.backgroundWhite }} />
			<SafeAreaView style={{ flex: 1 /*backgroundColor: COLORS.backgroundWhite*/ }}>
				<NativeBaseProvider theme={theme}>
					<BottomTabs />
				</NativeBaseProvider>
			</SafeAreaView>
		</NavigationContainer>
	);
}
