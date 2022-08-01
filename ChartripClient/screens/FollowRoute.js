import { Box, Heading, HStack, Pressable, Spinner, Text, View, VStack } from 'native-base';
import React, { useEffect, useState, useRef } from 'react';
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

	const [nextLoc, setNextLoc] = useState(locations[0]);
	const [locationModal, setLocationModal] = useState({ open: false, location: {} });

	const [userLocation, setUserLocation] = useState({
		latitude: 41.394989175959694,
		longitude: 2.1977128176392964,
	});
	const [completed, setCompleted] = useState(false);

	const updateUserLocation = async (newNextLoc = null) => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			setErrorMsg('Permission to access location was denied');
			return;
		}

		let { coords } = await Location.getCurrentPositionAsync({
			accuracy: Location.Accuracy.Balanced,
		});
		// console.log(coords);
		setUserLocation({ latitude: coords.latitude, longitude: coords.longitude });
		const centerMap = getRouteCenter([
			{ latitude: coords.latitude, longitude: coords.longitude },
			nextLoc,
		]);
		setCenter(centerMap);
		if (newNextLoc !== null) {
			moveTo(
				centerMap,
				{ latitude: coords.latitude, longitude: coords.longitude },
				{ latitude: newNextLoc.latitude, longitude: newNextLoc.longitude }
			);
		} else {
			moveTo(centerMap, { latitude: coords.latitude, longitude: coords.longitude }, nextLoc);
		}
	};

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
			updateUserLocation(locations[nextIndex]);
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

	const edgePaddingValue = 100;
	const edgePadding = {
		top: edgePaddingValue,
		right: edgePaddingValue,
		bottom: edgePaddingValue,
		left: edgePaddingValue,
	};
	const moveTo = async (position, userLoc, newNextLoc) => {
		const camera = await mapRef.current?.getCamera();
		if (camera) {
			// camera.center = position;
			// mapRef.current?.animateCamera(camera, { duration: 300 });
			mapRef.current?.fitToCoordinates(
				[userLoc, { latitude: newNextLoc.latitude, longitude: newNextLoc.longitude }],
				{ edgePadding }
			);
		}
	};

	const mapRef = useRef(null);
	useEffect(() => {
		updateUserLocation();
	}, []);

	return (
		<View>
			<MapView
				ref={mapRef}
				style={{
					height: '100%',
					width: '100%',
				}}
				initialRegion={{
					latitude: center.latitude,
					longitude: center.longitude,
					latitudeDelta: Math.abs(nextLoc.latitude - userLocation.latitude) * 2,
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
					onPress={() => updateUserLocation(nextLoc)}
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
