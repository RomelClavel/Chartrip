import {
	AspectRatio,
	Divider,
	Heading,
	Image,
	Modal,
	Pressable,
	ScrollView,
	Text,
	VStack,
} from 'native-base';
import React from 'react';

const FollowLocModal = ({ locationModal, setLocationModal, goToNextLocation }) => {
	const { open, location } = locationModal;
	const closeModal = () => {
		setLocationModal((prev) => {
			return { ...prev, open: false };
		});
	};
	return (
		<Modal isOpen={open} onClose={closeModal} size={'full'}>
			<Modal.Content width={'90%'}>
				<Modal.CloseButton
					fill={'white'}
					bgColor={'white'}
					opacity={70}
					rounded={'full'}
					mr={2}
					mt={2}
				/>

				<Modal.Body>
					<ScrollView>
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
										uri: location.thumbnail,
									}}
									alt="Route Thumbnail"
								/>
							</AspectRatio>

							<Heading mt={4} fontWeight={'semibold'}>
								{location.name}
							</Heading>
							<Text opacity={60}>
								{' '}
								{location.address ? location.address : 'Short Address'}{' '}
							</Text>
							<Divider my={4} />
							<Text
								fontWeight={'semibold'}
								fontSize={'md'}
								alignSelf={'flex-start'}
								mb={2}
							>
								What to do
							</Text>
							<Text> {location.whatToDo} </Text>
							<Pressable
								bgColor={'primary.500'}
								title="Arrived"
								alignSelf={'center'}
								rounded={'lg'}
								mt={6}
								mb={2}
								onPress={goToNextLocation}
							>
								<Text
									px={4}
									py={4}
									color={'white'}
									fontSize={'md'}
									fontWeight={'semibold'}
								>
									Next Location
								</Text>
							</Pressable>
						</VStack>
					</ScrollView>
				</Modal.Body>
			</Modal.Content>
		</Modal>
	);
};

export default FollowLocModal;
