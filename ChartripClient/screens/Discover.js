import { Heading, View, FlatList } from 'native-base';
import { COLORS } from '../styles/Styling';
import { useEffect, useState } from 'react';
import RouteTabBig from '../components/RouteTabBig';
import Constants from 'expo-constants';

const Discover = ({ navigation }) => {
	const [routes, setRoutes] = useState([]);

	useEffect(() => {
		//This can be improved with React Query
		const unsubscribe = navigation.addListener('focus', () => {
			const fetchRoutes = async () => {
				try {
					const data = await fetch('http://192.168.1.215:3001/discover/');
					const { routes } = await data.json();
					setRoutes(routes);
				} catch (error) {
					console.log(error);
				}
			};
			fetchRoutes();
		});

		// Return the function to unsubscribe from the event so it gets removed on unmount
		return unsubscribe;
	}, [navigation]);

	return (
		<View backgroundColor={COLORS.custom.backgroundWhite} height={'100%'}>
			<Heading
				alignSelf={'center'}
				my={3}
				fontWeight={'medium'}
				fontSize={'xl'}
				style={{ marginTop: Constants.statusBarHeight + 4 }}
			>
				Discover
			</Heading>
			<FlatList
				pt={4}
				data={routes}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <RouteTabBig route={item} navigation={navigation} />}
			/>
		</View>
	);
};

export default Discover;
