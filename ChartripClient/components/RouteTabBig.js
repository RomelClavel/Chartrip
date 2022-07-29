import React from 'react';
import { Box, HStack, Image, VStack, AspectRatio, Text } from 'native-base';
import { convertNumToTime } from '../helpers/numToTime';
import LocationIcon from '../icons/LocationIcon';
import TimeIcon from '../icons/TimeIcon';
import { Pressable } from 'react-native';

const RouteTabBig = ({ route, navigation }) => {
	const { thumbnail, name, country, city, durationMin, durationMax } = route;
	return (
		<Pressable
			onPress={() => {
				navigation.navigate('RouteDetails', {
					routeData: route,
				});
			}}
		>
			<Box bgColor={'white'} shadow={1} rounded={'lg'} mx={8} mb={6}>
				<VStack>
					<AspectRatio
						width={'100%'}
						ratio={{
							base: 3 / 2,
							md: 16 / 9,
						}}
					>
						<Image
							resizeMethod="scale"
							rounded={'lg'}
							source={{
								uri: thumbnail,
							}}
							alt="Route Thumbnail"
						/>
					</AspectRatio>
					<HStack py={3} alignItems={'center'} justifyContent={'space-around'}>
						<VStack>
							<Text fontSize={'md'} fontWeight={'semibold'}>
								{name}
							</Text>
							<HStack alignItems={'center'} opacity={60}>
								<LocationIcon size={22} color={'black'} />
								<Text> {`${country}, ${city}`} </Text>
							</HStack>
						</VStack>
						<HStack
							alignItems={'center'}
							bgColor={'black'}
							opacity={50}
							px={2}
							py={1.5}
							rounded={'3xl'}
						>
							<TimeIcon size={24} color={'white'} />
							<Text
								fontWeight={'semibold'}
								fontSize={'12px'}
								color={'white'}
								ml={'1'}
							>{`${convertNumToTime(durationMin)}-${convertNumToTime(
								durationMax
							)}`}</Text>
						</HStack>
					</HStack>
				</VStack>
			</Box>
		</Pressable>
	);
};

export default RouteTabBig;
