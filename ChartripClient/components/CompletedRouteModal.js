import {
	Box,
	Center,
	Heading,
	Modal,
	PresenceTransition,
	Pressable,
	ScrollView,
	Text,
	View,
} from 'native-base';
import React from 'react';
import FollowRouteIcon from '../icons/FollowRouteIcon';

const CompletedRouteModal = ({ goToStart, completed }) => {
	return (
		<Modal isOpen={completed} size={'full'}>
			<Modal.Content width={'90%'}>
				<Modal.Body>
					<View alignItems={'center'}>
						<Heading width={'3/4'} textAlign={'center'}>
							Thank you for traversing our Route!
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
							<Box
								bgColor={'primary.500'}
								p={10}
								rounded={'full'}
								shadow={'3'}
								my={6}
							>
								<FollowRouteIcon size={100} color={'white'} />
							</Box>
						</PresenceTransition>
						<Pressable
							bgColor={'primary.500'}
							title="Arrived"
							rounded={'lg'}
							mb={2}
							onPress={goToStart}
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

export default CompletedRouteModal;
