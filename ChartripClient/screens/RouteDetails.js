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
import LocationModal from '../components/LocationModal';
import createMapDirections from '../helpers/createMapDirections';
import getRouteCenter from '../helpers/getRouteCenter';

// import Geolocation from 'react-native-geolocation-service';

const RouteDetails = ({ route, navigation }) => {
	const { routeData } = route.params;

	const [selectedLocation, setSelectedLocation] = useState({
		open: false,
		location: {},
	});

	const directionsArray = createMapDirections(routeData.locations);
	const routeCenter = getRouteCenter(routeData.locations);
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
					<HStack flexWrap={'wrap'}>
						{routeData.tags.map((tag, index) => {
							return (
								<Badge
									bgColor={'primary.500'}
									mx={1}
									mb={1}
									rounded={'lg'}
									key={index}
								>
									<Text color={'white'}>{tag.title}</Text>
								</Badge>
							);
						})}
					</HStack>
				</VStack>
				<VStack width={'90%'}>
					<Text {...textSectionStyles}>Locations</Text>
					{routeData.locations.map((location, index) => {
						return (
							<Pressable
								key={index}
								onPress={() => {
									setSelectedLocation({
										open: true,
										location: location,
									});
								}}
							>
								<LocationSmall location={location} key={location.id} />
							</Pressable>
						);
					})}
				</VStack>
				<VStack width={'90%'}>
					<Text {...textSectionStyles}>Map</Text>

					<MapView
						style={{ height: 300, width: '100%', borderRadius: 8 }}
						initialRegion={{
							latitude: routeCenter.latitude,
							longitude: routeCenter.longitude,
							latitudeDelta: 0.0622,
							longitudeDelta: 0.0121,
						}}
					>
						{directionsArray.map(({ origin, destination }, index) => {
							return (
								<MapViewDirections
									origin={{ ...origin }}
									destination={{
										...destination,
									}}
									apikey={'AIzaSyBsWEG5VIepvFo_LU0QzBG99bYdWhdaiJA'} // insert your API Key here
									strokeWidth={4}
									strokeColor={COLORS.custom.primary}
									key={index}
								/>
							);
						})}

						{routeData.locations.map((loc, index) => {
							return (
								<Marker
									coordinate={{
										latitude: loc.latitude,
										longitude: loc.longitude,
									}}
									key={index}
								/>
							);
						})}
					</MapView>
				</VStack>
			</VStack>
			<LocationModal
				isOpen={selectedLocation.open}
				location={selectedLocation.location}
				setSelectedLocation={setSelectedLocation}
			/>
		</ScrollView>
	);
};

const textSectionStyles = {
	color: 'dark.200',
	fontWeight: 'semibold',
	my: '1',
};
export default RouteDetails;

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
