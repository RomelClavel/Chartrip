import { Heading, HStack, Modal, Pressable, Text } from 'native-base';
import React from 'react';
// import ExitIcon from '../icons/ExitIcon';

const ConfirmExitModal = ({ exit, setExit, navigation }) => {
	return (
		<Modal isOpen={exit}>
			<Modal.Content>
				<Modal.Body alignItems={'center'}>
					<Heading
						opacity={75}
						textAlign={'center'}
						fontWeight={'semibold'}
						width={'5/6'}
						mb={5}
					>
						You want to exit the Map?
					</Heading>

					<HStack>
						<Pressable
							bgColor={'white'}
							title="Center"
							alignSelf={'center'}
							rounded={'lg'}
							borderColor={'primary.500'}
							borderWidth={2}
							onPress={() => setExit(false)}
							m={3}
						>
							<Text
								py={3}
								width={'24'}
								color={'primary.500'}
								fontSize={'md'}
								fontWeight={'semibold'}
								textAlign={'center'}
							>
								Cancel
							</Text>
						</Pressable>
						<Pressable
							borderColor={'#FF4141'}
							borderWidth={2}
							bgColor={'#FF4141'}
							title="Arrived"
							alignSelf={'center'}
							rounded={'lg'}
							m={3}
							onPress={() => {
								setExit(false);
								setTimeout(() => {
									navigation.goBack();
								}, 100);
							}}
						>
							<Text
								width={'24'}
								p={3}
								color={'white'}
								fontSize={'md'}
								fontWeight={'semibold'}
								textAlign={'center'}
							>
								Exit
							</Text>
						</Pressable>
					</HStack>
				</Modal.Body>
			</Modal.Content>
		</Modal>
	);
};

export default ConfirmExitModal;
