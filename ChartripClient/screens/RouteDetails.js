import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	Box,
	AspectRatio,
	Image,
	ArrowBackIcon,
	Pressable,
	VStack,
	HStack,
	Divider,
	FlatList,
	Badge,
	ScrollView,
} from 'native-base';
import { COLORS } from '../styles/Styling';
import LocationIcon from '../icons/LocationIcon';
import { convertNumToTime } from '../helpers/numToTime';
import TimeIcon from '../icons/TimeIcon';
import LocationSmall from '../components/LocationSmall';
import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

// import Geolocation from 'react-native-geolocation-service';

const RouteDetails = ({ route, navigation }) => {
	const { routeID } = route.params;
	// Geolocation.getCurrentPosition(
	// 	(position) => {
	// 		console.log(position);
	// 	},
	// 	(error) => {
	// 		// See error code charts below.
	// 		console.log(error.code, error.message);
	// 	},
	// 	{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
	// );

	const [routeData, setRouteData] = useState({
		id: '',
		name: '',
		description: '',
		thumbnail: '',
		country: '',
		city: '',
		durationMax: 0,
		durationMin: 0,
		createdAt: '',
		userPicture: null,
		locations: [],
		tags: [],
	});

	const [selectedLocation, setSelectedLocation] = useState({});

	const [userLocation, setUserLocation] = useState({
		// loading: false,
		latitude: 41.39501475518845,
		longitude: 2.197717434570719,
	});

	useEffect(() => {
		setRouteData({
			id: 'cl61359mu0000iwuflu2jenoj',
			name: 'Second Created Route',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas hendrerit ligula pellentesque euismod. Sed sodales elit eleifend, porta libero ac, faucibus ante.',
			thumbnail:
				'https://img.freepik.com/premium-vector/meadows-landscape-with-mountains-hill_104785-943.jpg?w=2000',
			country: 'Venezuela',
			city: 'Caracas',
			durationMax: 1.5,
			durationMin: 3,
			createdAt: '2022-07-26T12:08:46.247Z',
			userPicture: null,
			locations: [
				{
					id: 'cl61359mx0001iwufm01w6lxt',
					name: 'Location 1',
					latitude: 0,
					longitude: 0,
					thumbnail:
						'https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg',
					whatToDo: 'Just checking my guy dont worry',
					type: 'RestStop',
					routeId: 'cl61359mu0000iwuflu2jenoj',
					position: 1,
				},
				{
					id: 'cl61359my0002iwufcvwv42kp',
					name: 'Location 2',
					latitude: 1,
					longitude: 1,
					thumbnail:
						'https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg',
					whatToDo: 'Just checking my guy dont worry',
					type: 'Restaurant',
					routeId: 'cl61359mu0000iwuflu2jenoj',
					position: 2,
				},
			],
			tags: [
				{
					id: 'cl60z3m6ad0000f0ufk3rr90fa',
					title: 'New Tag',
				},
				{
					id: 'cl60z3m6a0s000f0ufk3rr90fa',
					title: 'New Tags 2',
				},
				{
					id: 'cl6g0z3m6a0000f0ufk3rr90fa',
					title: 'New Tags 3 Baby',
				},
				{
					id: 'cl60z3m6a0000f0ufka3rr90fa',
					title: '4 Tags Baby',
				},
			],
		});
		// (async () => {
		// 	let { status } = await Location.requestForegroundPermissionsAsync();
		// 	if (status !== 'granted') {
		// 		setErrorMsg('Permission to access location was denied');
		// 		return;
		// 	}
		// 	let location = await Location.getCurrentPositionAsync({});
		// 	console.log(location);
		// 	setUserLocation({
		// 		loading: false,
		// 		latitude: location.coords.latitude,
		// 		longitude: location.coords.longitude,
		// 	});
		// })();
	}, []);

	return (
		<ScrollView backgroundColor={COLORS.custom.backgroundWhite}>
			{/* See if I can separate this to another component*/}
			<Box>
				<AspectRatio
					width={'100%'}
					ratio={{
						base: 3 / 2,
						md: 16 / 9,
					}}
				>
					<Image
						rounded={'lg'}
						source={{
							uri: routeData.thumbnail,
						}}
						alt="Route Thumbnail"
						mx={3}
					/>
				</AspectRatio>
				<Pressable
					onPress={() => {
						navigation.goBack();
					}}
					position={'absolute'}
					top={5}
					left={8}
					bgColor={'black:alpha.30'}
					p={1.5}
					rounded={4}
				>
					<ArrowBackIcon color={'white'} size={5} />
				</Pressable>
			</Box>

			<VStack bgColor={'white'} mt={8} py={5} roundedTop={'xl'} alignItems={'center'}>
				<HStack width={'90%'} justifyContent={'space-between'} alignItems={'center'}>
					<VStack>
						<Text fontSize={'lg'} fontWeight={'bold'}>
							{routeData.name}
						</Text>
						<HStack alignItems={'center'} opacity={60} ml={2}>
							<Text> {`${routeData.country}, ${routeData.city}`} </Text>
							<LocationIcon size={22} color={'black'} />
						</HStack>
					</VStack>

					<HStack alignItems={'center'} opacity={50}>
						<TimeIcon size={28} color={'black'} />
						<Text
							fontWeight={'semibold'}
							fontSize={'14'}
							color={'black'}
							ml={'1'}
							mt={'1'}
						>{`${convertNumToTime(routeData.durationMin)}-${convertNumToTime(
							routeData.durationMax
						)}`}</Text>
					</HStack>
				</HStack>
				<Divider my="2" width={'90%'} />
				<VStack width={'90%'}>
					<Text {...textSectionStyles}>Details</Text>
					<Text opacity={80} lineHeight={0} ml={0.5}>
						{routeData.description}
					</Text>
				</VStack>
				<VStack width={'90%'}>
					<Text {...textSectionStyles}>Tags</Text>
					{/* {routeData.tags.map((tag) => {
						return (
							<Badge bgColor={'primary.500'} mx={1} mb={1} rounded={'lg'} width=>
								<Text color={'white'}>{tag.title}</Text>
							</Badge>
						);
					})} */}
					<FlatList
						numColumns={3}
						data={routeData.tags}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<Badge bgColor={'primary.500'} mx={1} mb={1} rounded={'lg'}>
								<Text color={'white'}>{item.title}</Text>
							</Badge>
						)}
					/>
				</VStack>
				<VStack width={'90%'}>
					<Text {...textSectionStyles}>Locations</Text>
					<FlatList
						data={routeData.locations}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							// setSelectedLocation={setSelectedLocation}
							<Pressable
								onPress={() => {
									console.log(item);
								}}
							>
								<LocationSmall location={item} />
							</Pressable>
						)}
					/>
				</VStack>
				<VStack width={'90%'}>
					<Text {...textSectionStyles}>Map</Text>

					<MapView
						style={{ height: 300, width: '100%', borderRadius: 8 }}
						initialRegion={{
							latitude: (userLocation.latitude * 3 + 0.02) / 3,
							longitude: (userLocation.longitude * 3 + 0.01) / 3,
							latitudeDelta: 0.0622,
							longitudeDelta: 0.0121,
						}}
					>
						<MapViewDirections
							origin={{
								latitude: userLocation.latitude,
								longitude: userLocation.longitude,
							}}
							destination={{
								latitude: userLocation.latitude + 0.01,
								longitude: userLocation.longitude,
							}}
							apikey={'AIzaSyBsWEG5VIepvFo_LU0QzBG99bYdWhdaiJA'} // insert your API Key here
							strokeWidth={4}
							strokeColor={COLORS.custom.primary}
						/>
						<MapViewDirections
							origin={{
								latitude: userLocation.latitude + 0.01,
								longitude: userLocation.longitude,
							}}
							destination={{
								latitude: userLocation.latitude + 0.01,
								longitude: userLocation.longitude + 0.01,
							}}
							apikey={'AIzaSyBsWEG5VIepvFo_LU0QzBG99bYdWhdaiJA'} // insert your API Key here
							strokeWidth={4}
							strokeColor={COLORS.custom.primary}
						/>
						<Marker
							coordinate={{
								latitude: userLocation.latitude,
								longitude: userLocation.longitude,
							}}
						/>
						<Marker
							coordinate={{
								latitude: userLocation.latitude + 0.01,
								longitude: userLocation.longitude,
							}}
						/>
						<Marker
							coordinate={{
								latitude: userLocation.latitude + 0.01,
								longitude: userLocation.longitude + 0.01,
							}}
						/>
					</MapView>
				</VStack>
			</VStack>
		</ScrollView>
	);
};

const textSectionStyles = {
	color: 'dark.200',
	fontWeight: 'semibold',
	my: '1',
};
export default RouteDetails;
