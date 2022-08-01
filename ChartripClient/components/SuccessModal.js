import {
	AspectRatio,
	Box,
	Center,
	Heading,
	Image,
	Modal,
	PresenceTransition,
	Pressable,
	ScrollView,
	Text,
	View,
} from 'native-base';
import React from 'react';
import FollowRouteIcon from '../icons/FollowRouteIcon';

const SuccessModal = ({ closeModal, open, img, text }) => {
	return (
		<Modal isOpen={open} size={'full'}>
			<Modal.Content width={'90%'}>
				<Modal.Body>
					<View alignItems={'center'}>
						<Heading width={'3/4'} textAlign={'center'} color={'primary.500'}>
							{text}
						</Heading>
						<PresenceTransition
							visible={true}
							initial={{
								opacity: 0,
								scale: 0,
							}}
							animate={{
								opacity: 1,
								scale: 1,
								transition: {
									duration: 250,
								},
							}}
						>
							<AspectRatio
								ratio={{
									base: 1 / 1,
									md: 9 / 10,
								}}
								width={'5/6'}
								my={8}
							>
								<Image size={'full'} source={img} alt="Alternate Text" />
							</AspectRatio>
						</PresenceTransition>
						<Pressable
							bgColor={'primary.500'}
							title="Arrived"
							rounded={'lg'}
							mb={2}
							onPress={closeModal}
						>
							<Text
								px={4}
								py={4}
								color={'white'}
								fontSize={'md'}
								fontWeight={'semibold'}
							>
								Take me Back
							</Text>
						</Pressable>
					</View>
				</Modal.Body>
			</Modal.Content>
		</Modal>
	);
};

export default SuccessModal;
