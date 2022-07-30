import {
	Divider,
	Heading,
	Input,
	Modal,
	Pressable,
	Text,
	TextArea,
	View,
	VStack,
} from 'native-base';
import React, { useState } from 'react';
import ImgInput from './ImgInput';
import TextAreaInput from './TextAreaInput';

const AddLocationModal = ({ isOpen, setIsOpen, locValues, control, errors, handleSubmit }) => {
	return (
		<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
			<Modal.Content width={'100%'}>
				<Modal.CloseButton
					fill={'white'}
					bgColor={'white'}
					opacity={70}
					rounded={'full'}
					mr={2}
					mt={2}
				/>
				<Modal.Body>
					<VStack py={4}>
						<Heading fontSize={'2xl'} fontWeight={'semibold'} alignSelf={'center'}>
							New Location
						</Heading>
						<Divider mt={5} mb={2} />
						<Text {...labelStyles}>Name</Text>
						<Input value={locValues.name} isDisabled={true} size="lg" mt={2} />
						<Text {...labelStyles}>Address</Text>
						<Input value={locValues.address} isDisabled={true} size="lg" mt={2} />
						<ImgInput
							name={'thumbnail'}
							labelStyles={labelStyles}
							errorMsg={errorMsg}
							control={control}
							errors={errors}
						/>
						<TextAreaInput
							name={'whatToDo'}
							labelStyles={labelStyles}
							errorMsg={errorMsg}
							control={control}
							errors={errors}
						/>

						<Pressable
							bgColor={'primary.500'}
							title="Submit"
							onPress={() => {
								console.log(
									'-_____________________________________________________________-'
								);
								console.log(control._formValues);
								handleSubmit(control._formValues);
							}}
							alignSelf={'center'}
							rounded={'lg'}
							mt={6}
						>
							<Text
								px={4}
								py={4}
								color={'white'}
								fontSize={'md'}
								fontWeight={'semibold'}
							>
								Create
							</Text>
						</Pressable>
					</VStack>
				</Modal.Body>
			</Modal.Content>
		</Modal>
	);
};

const labelStyles = {
	fontWeight: 'medium',
	opacity: 80,
	mt: '2',
	mb: '1',
};
const errorMsg = {
	fontWeight: 'medium',
	opacity: 80,
	color: 'error.500',
	my: '1',
	ml: '3',
};

export default AddLocationModal;
