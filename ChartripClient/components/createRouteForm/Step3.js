import {
	AspectRatio,
	Badge,
	Box,
	Divider,
	Heading,
	HStack,
	Image,
	Pressable,
	ScrollView,
	Text,
	VStack,
} from 'native-base';
import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import createMapDirections from '../../helpers/createMapDirections';
import getRouteCenter from '../../helpers/getRouteCenter';
import { convertNumToTime } from '../../helpers/numToTime';
import LocationIcon from '../../icons/LocationIcon';
import TimeIcon from '../../icons/TimeIcon';
import { COLORS } from '../../styles/Styling';
import LocationModal from '../LocationModal';
import LocationSmall from '../LocationSmall';
import Constants from 'expo-constants';
import formatRouteData from '../../helpers/formatRouteData';

const Step3 = ({ routeData, locationsData }) => {
	if (locationsData.length === 0) {
		return <></>;
	}

	const createRoute = () => {
		const data = formatRouteData(routeData, locationsData);
		console.log(data);
		fetch('http://192.168.1.215:3001/new/route', {
			body: JSON.stringify(data),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((json) => {
				console.log({
					json,
				});
			})
			.catch((err) => {
				console.log({
					err,
				});
			});
	};

	const [selectedLocation, setSelectedLocation] = useState({
		open: false,
		location: {},
	});

	const directionsArray = createMapDirections(locationsData);
	const routeCenter = getRouteCenter(locationsData);
	return (
		<ScrollView backgroundColor={COLORS.custom.backgroundWhite}>
			{/* See if I can separate this to another component*/}
			<Heading mt={6} alignSelf={'center'} fontSize={'xl'} fontWeight={'semibold'}>
				{' '}
				Here is your New Route{' '}
			</Heading>
			<Divider mb={6} mt={4} width={'90%'} alignSelf={'center'} />

			<VStack roundedTop={'xl'} alignItems={'center'} px={4}>
				<HStack mb={6} width={'90%'} justifyContent={'space-between'} alignItems={'center'}>
					<VStack>
						<Text fontSize={'lg'} fontWeight={'bold'}>
							{routeData.name}
						</Text>
						<HStack alignItems={'center'} opacity={60}>
							<Text> {`${routeData.country}, ${routeData.state}`} </Text>
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
						>{`${convertNumToTime(routeData.timeMinMax[0])}-${convertNumToTime(
							routeData.timeMinMax[1]
						)}`}</Text>
					</HStack>
				</HStack>
				{/* <Divider my="2" width={'90%'} /> */}
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
				<VStack width={'90%'} mt={4}>
					<Text {...textSectionStyles}>Details</Text>
					<Text opacity={80} lineHeight={0} ml={0.5}>
						{routeData.description}
					</Text>
				</VStack>

				<VStack width={'90%'} mt={4}>
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
				<VStack width={'90%'} mt={4}>
					<Text {...textSectionStyles}>Locations</Text>
					{locationsData.map((location, index) => {
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
								<LocationSmall location={location} />
							</Pressable>
						);
					})}
				</VStack>
				<VStack width={'90%'} mt={4}>
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
									apikey={Constants.manifest.extra.GOOGLE_MAPS_API_KEY} // insert your API Key here
									strokeWidth={4}
									strokeColor={COLORS.custom.primary}
									key={index}
									mode={'WALKING'}
								/>
							);
						})}

						{locationsData.map((loc, index) => {
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
				<Pressable
					bgColor={'primary.500'}
					mb={10}
					alignSelf={'center'}
					rounded={'lg'}
					onPress={createRoute}
				>
					<Text px={4} py={4} color={'white'} fontSize={'md'} fontWeight={'semibold'}>
						Create
					</Text>
				</Pressable>
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

export default Step3;
