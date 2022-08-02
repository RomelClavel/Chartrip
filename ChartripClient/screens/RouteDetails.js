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
	Center,
	Fab,
	Modal,
} from 'native-base';
import { COLORS } from '../styles/Styling';
import LocationIcon from '../icons/LocationIcon';
import { convertNumToTime } from '../helpers/numToTime';
import TimeIcon from '../icons/TimeIcon';
import LocationSmall from '../components/LocationSmall';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import LocationModal from '../components/LocationModal';
import createMapDirections from '../helpers/createMapDirections';
import getRouteCenter from '../helpers/getRouteCenter';
import Constants from 'expo-constants';
import FollowRouteIcon from '../icons/FollowRouteIcon';

// import * as Location from 'expo-location';

const RouteDetails = ({ route, navigation }) => {
	const { routeData } = route.params;

	const [selectedLocation, setSelectedLocation] = useState({
		open: false,
		location: {},
	});

	const directionsArray = createMapDirections(routeData.locations);
	const routeCenter = getRouteCenter(routeData.locations);
	return (
		<>
			<ScrollView
				backgroundColor={COLORS.custom.backgroundWhite}
				width={'100%'}
				scrollIndicatorInsets={{ right: 1 }}
				style={{ marginTop: Constants.statusBarHeight }}
			>
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
				</Box>
				<VStack
					bgColor={'white'}
					mt={6}
					py={5}
					roundedTop={'xl'}
					alignItems={'center'}
					shadow={'9'}
					style={{ paddingBottom: Constants.statusBarHeight * 2 }}
				>
					<HStack width={'90%'} justifyContent={'space-between'} alignItems={'center'}>
						<VStack>
							<Text fontSize={'lg'} fontWeight={'bold'} isTruncated width={'64'}>
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
					<Divider my="4" width={'90%'} />
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
							style={{
								height: 300,
								width: '100%',
								borderRadius: 8,
							}}
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
										apikey={Constants.manifest.extra.GOOGLE_MAPS_API_KEY} // insert your API Key here
										strokeWidth={4}
										strokeColor={COLORS.custom.primary}
										key={index}
										mode={'WALKING'}
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
			<Pressable
				bgColor={'primary.500'}
				alignSelf={'center'}
				rounded={'lg'}
				position={'absolute'}
				style={{ bottom: Constants.statusBarHeight }}
				right={'5'}
				shadow={'6'}
				onPress={() => {
					navigation.navigate('FollowRoute', {
						locations: routeData.locations,
						routeId: routeData.id,
					});
				}}
			>
				<HStack px={4} py={4} alignItems={'center'}>
					<Text color={'white'} fontSize={'md'} fontWeight={'semibold'} mr={2}>
						Follow Route
					</Text>
					<FollowRouteIcon size={32} color={'white'} />
				</HStack>
			</Pressable>
			<Pressable
				onPress={() => {
					navigation.goBack();
				}}
				position={'absolute'}
				style={{ top: Constants.statusBarHeight + 16 }}
				left={6}
				bgColor={'black:alpha.40'}
				p={1.5}
				rounded={4}
			>
				<ArrowBackIcon color={'white'} size={5} />
			</Pressable>
		</>
	);
};

const textSectionStyles = {
	color: 'dark.200',
	fontWeight: 'semibold',
	my: '2',
};
export default RouteDetails;
