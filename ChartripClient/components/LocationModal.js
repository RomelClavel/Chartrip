import { AspectRatio, Box, Divider, Heading, Image, Modal, Text, VStack } from 'native-base';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';

const LocationModal = ({ location, isOpen, setSelectedLocation }) => {
	const { name, latitude, longitude, whatToDo, thumbnail } = location;
	const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pretium elementum magna, mattis accumsan justo euismod nec.
    Aliquam et finibus tortor, ac laoreet tellus. Nunc at purus et ipsum luctus efficitur. Pellentesque commodo, augue nec tempus blandit.`;
	return (
		<Modal
			isOpen={isOpen}
			onClose={() =>
				setSelectedLocation((prev) => {
					return { ...prev, open: false };
				})
			}
		>
			<Modal.Content width={'100%'} py={4}>
				<Modal.CloseButton
					fill={'white'}
					bgColor={'white'}
					opacity={70}
					rounded={'full'}
					mr={2}
					mt={2}
				/>
				<Modal.Body>
					<VStack alignItems={'center'}>
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

						<Heading mt={4} fontWeight={'semibold'}>
							{name}
						</Heading>
						<Text opacity={60}> Short Address </Text>
						<Divider my={4} />
						<Text
							fontWeight={'semibold'}
							fontSize={'md'}
							alignSelf={'flex-start'}
							mb={2}
						>
							What to do
						</Text>
						<Text> {lorem} </Text>
						{isOpen ? (
							<MapView
								style={{
									height: 300,
									width: '100%',
									borderRadius: 8,
									marginTop: 16,
								}}
								initialRegion={{
									latitude: latitude,
									longitude: longitude,
									latitudeDelta: 0.0622,
									longitudeDelta: 0.0121,
								}}
							>
								<Marker
									coordinate={{
										latitude: latitude,
										longitude: longitude,
									}}
								/>
							</MapView>
						) : (
							<Box
								height={'300px'}
								width={'100%'}
								rounded={2}
								bgColor={'gray.300'}
							></Box>
						)}
					</VStack>
				</Modal.Body>
			</Modal.Content>
		</Modal>
	);
};

export default LocationModal;
