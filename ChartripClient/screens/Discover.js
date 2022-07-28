import { StyleSheet } from 'react-native';
import { Pressable, Text, Heading, View, FlatList, ScrollView } from 'native-base';
import { COLORS } from '../styles/Styling';
import { useEffect, useState } from 'react';
import RouteTabBig from '../components/RouteTabBig';

const Discover = ({ navigation }) => {
	const [routes, setRoutes] = useState([]);

	useEffect(() => {
		const mockLocations = [
			{
				id: 1,
				thumbnail:
					'https://img.freepik.com/premium-vector/meadows-landscape-with-mountains-hill_104785-943.jpg?w=2000',
				name: 'Route Name',
				country: 'Country',
				city: 'City',
				durationMin: 1.5,
				durationMax: 4,
			},
			{
				id: 2,
				thumbnail:
					'https://img.freepik.com/premium-vector/meadows-landscape-with-mountains-hill_104785-943.jpg?w=2000',
				name: 'Route Name 2',
				country: 'Country',
				city: 'City',
				durationMin: 3,
				durationMax: 4,
			},
			{
				id: 3,
				thumbnail:
					'https://img.freepik.com/premium-vector/meadows-landscape-with-mountains-hill_104785-943.jpg?w=2000',
				name: 'Route Name 2',
				country: 'Country',
				city: 'City',
				durationMin: 3,
				durationMax: 4,
			},
			{
				id: 4,
				thumbnail:
					'https://img.freepik.com/premium-vector/meadows-landscape-with-mountains-hill_104785-943.jpg?w=2000',
				name: 'Route Name 2',
				country: 'Country',
				city: 'City',
				durationMin: 3,
				durationMax: 4,
			},
		];

		const fetchRoutes = async () => {
			try {
				const data = await fetch('http://192.168.1.215:3001/discover/');
				const routes = await data.json();
				console.log(routes);
			} catch (error) {
				console.log(error);
			}
		};
		fetchRoutes();

		setRoutes(mockLocations);
	}, []);

	return (
		<View backgroundColor={COLORS.custom.backgroundWhite} height={'100%'}>
			<FlatList
				data={routes}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <RouteTabBig route={item} navigation={navigation} />}
				ListHeaderComponent={
					<Heading
						alignSelf={'center'}
						mt={4}
						my={2}
						fontWeight={'medium'}
						fontSize={'xl'}
					>
						Discover
					</Heading>
				}
			/>
		</View>
	);
};
{
	/* <Pressable
	p={4}
	bgColor={'red.400'}
	rounded={'8'}
	onPress={() => {
		navigation.navigate('RouteDetails');
	}}
>
	<Text>Press me</Text>
</Pressable> */
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.backgroundWhite,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Discover;
