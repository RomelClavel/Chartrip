// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet } from 'react-native';
import BottomTabs from './navigation/BottomTabs';
import { COLORS } from './styles/Styling';
import { extendTheme, NativeBaseProvider, StatusBar, View } from 'native-base';
// import Constants from 'expo-constants';

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
			{/* <StatusBar style="auto" /> */}
			<SafeAreaView style={{ flex: 0, backgroundColor: COLORS.custom.backgroundWhite }} />
			<SafeAreaView
				style={{
					flex: 1,
					paddingTop: Platform.OS === 'android' ? 20 : 0,
					// backgroundColor: COLORS.custom.backgroundWhite,
				}}
			>
				<NativeBaseProvider theme={theme}>
					<View flex={1}>
						<BottomTabs />
					</View>
				</NativeBaseProvider>
			</SafeAreaView>
		</NavigationContainer>
	);
}
