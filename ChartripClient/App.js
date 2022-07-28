import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
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

	const MyTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: COLORS.backgroundWhite,
		},
	};

	// white: '#FFFFFF',
	// 	backgroundWhite: '#FAFAFA',
	// 	primary: '#05BE70',
	// 	primaryDark: '#059A5B',
	// 	primaryLight: '#03ED8A',
	// 	grey: '#C1C1C1',
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.backgroundWhite,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
