import { Box, Heading, HStack, Pressable, Spinner, Text, View, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import NextLocation from '../components/NextLocation';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import Constants from 'expo-constants';
import { COLORS } from '../styles/Styling';
import getRouteCenter from '../helpers/getRouteCenter';
import FollowLocModal from '../components/FollowLocModal';
import CompletedRouteModal from '../components/CompletedRouteModal';

const FollowRoute = ({ route, navigation }) => {
	const { locations } = route.params;
	const [center, setCenter] = useState({ latitude: 0, longitude: 0 });
	const [loading, setLoading] = useState(true);

	const [nextLoc, setNextLoc] = useState(locations[0]);
	const [locationModal, setLocationModal] = useState({ open: false, location: {} });

	const [userLocation, setUserLocation] = useState({
		latitude: 41.394989175959694,
		longitude: 2.1977128176392964,
	});
	const [completed, setCompleted] = useState(false);

	const updateUserLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			setErrorMsg('Permission to access location was denied');
			return;
		}

		let { coords } = await Location.getCurrentPositionAsync({});
		console.log(coords);
		setUserLocation({ latitude: coords.latitude, longitude: coords.longitude });
		setCenter(getRouteCenter([userLocation, nextLoc]));
		setLoading(false);
	};

	useEffect(() => {
		updateUserLocation();
	}, []);

	const openModal = () => {
		setLocationModal({
			open: true,
			location: nextLoc,
		});
	};

	const goToNextLocation = () => {
		const nextIndex = locations.indexOf(nextLoc) + 1;
		if (nextIndex < locations.length) {
			setNextLoc(locations[nextIndex]);
			setLocationModal({
				...locationModal,
				open: false,
			});
			setLoading(true);
			updateUserLocation();
		} else {
			setLocationModal({
				...locationModal,
				open: false,
			});
			setCompleted(true);
		}
	};

	const goToStart = () => {
		setCompleted(false);
		navigation.goBack();
	};

	if (loading) {
		return (
			<VStack justifyContent={'center'} alignItems={'center'} height={'full'}>
				<Spinner color="primary.500" size={'lg'} />
				<Heading color={'primary.500'} fontWeight={'semibold'} mt={4}>
					Loading...
				</Heading>
			</VStack>
		);
	}
	return (
		<View>
			<MapView
				style={{
					height: '100%',
					width: '100%',
				}}
				initialRegion={{
					latitude: center.latitude,
					longitude: center.longitude,
					latitudeDelta: Math.abs(nextLoc.latitude - userLocation.latitude),
					longitudeDelta: Math.abs(nextLoc.longitude - userLocation.longitude) * 2,
				}}
			>
				{userLocation.latitude !== 0 && (
					<MapViewDirections
						origin={{ ...userLocation }}
						destination={{
							...nextLoc,
						}}
						apikey={Constants.manifest.extra.GOOGLE_MAPS_API_KEY} // insert your API Key here
						strokeWidth={4}
						strokeColor={COLORS.custom.primary}
						mode={'WALKING'}
					/>
				)}

				<Marker
					coordinate={{
						latitude: nextLoc.latitude,
						longitude: nextLoc.longitude,
					}}
				/>

				<Marker
					coordinate={{
						latitude: userLocation.latitude,
						longitude: userLocation.longitude,
					}}
				/>
			</MapView>

			<Box position={'absolute'} alignSelf={'center'} top={5}>
				<NextLocation location={nextLoc} />
			</Box>
			<HStack
				position={'absolute'}
				alignSelf={'center'}
				bottom={5}
				width={'2/3'}
				justifyContent={'space-around'}
				bgColor={'white'}
				py={2}
				rounded={'lg'}
			>
				<Pressable
					bgColor={'white'}
					title="Center"
					alignSelf={'center'}
					rounded={'lg'}
					borderColor={'primary.500'}
					borderWidth={2}
					onPress={updateUserLocation}
				>
					<Text
						px={4}
						py={4}
						color={'primary.500'}
						fontSize={'md'}
						fontWeight={'semibold'}
					>
						Update Route
					</Text>
				</Pressable>
				<Pressable
					bgColor={'primary.500'}
					title="Arrived"
					alignSelf={'center'}
					rounded={'lg'}
					onPress={openModal}
				>
					<Text px={4} py={4} color={'white'} fontSize={'md'} fontWeight={'semibold'}>
						Arrived
					</Text>
				</Pressable>
			</HStack>
			<FollowLocModal
				locationModal={locationModal}
				setLocationModal={setLocationModal}
				goToNextLocation={goToNextLocation}
			/>
			<CompletedRouteModal completed={completed} goToStart={goToStart} />
		</View>
	);
};

export default FollowRoute;
