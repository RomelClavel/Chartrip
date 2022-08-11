import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { COLORS } from './styles/Styling';
import { extendTheme, NativeBaseProvider, View } from 'native-base';
import AppStack from './navigation/AppStack';
import 'react-native-gesture-handler';

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
			<StatusBar barStyle={'dark-content'} backgroundColor={COLORS.custom.backgroundWhite} />
			<NativeBaseProvider theme={theme}>
				<View flex={1}>
					<AppStack />
				</View>
			</NativeBaseProvider>
		</NavigationContainer>
	);
}
