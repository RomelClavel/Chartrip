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
import { KeyboardAvoidingView } from 'react-native';
import ImgInput from './ImgInput';
import TextAreaInput from './TextAreaInput';
import TextInput from './TextInput';

const AddLocationModal = ({
	isOpen,
	setIsOpen,
	locValues,
	setLocValues,
	control,
	errors,
	handleSubmit,
	defaultLoc,
	reset,
	resetImg,
	setResetImg,
}) => {
	const addLocation = () => {
		console.log(control._formValues);
		handleSubmit(control._formValues);

		setLocValues({ ...defaultLoc });

		reset();
		setResetImg(false);
		setIsOpen(false);
	};
	// const [resetImg, setResetImg] = useState(true);
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
					<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
						<VStack py={4}>
							<Heading fontSize={'2xl'} fontWeight={'semibold'} alignSelf={'center'}>
								New Location
							</Heading>

							<Divider mt={5} mb={2} />

							<Text {...labelStyles}>Name</Text>
							<Input value={locValues.name} isDisabled={true} size="lg" />
							{/* <TextInput
								name={'whatToDo'}
								labelStyles={labelStyles}
								errorMsg={errorMsg}
								control={control}
								errors={errors}
							/> */}

							<Text {...labelStyles}>Address</Text>
							<Input value={locValues.address} isDisabled={true} size="lg" />
							{resetImg && (
								<ImgInput
									//Does not reset the img state if the component
									name={'thumbnail'}
									labelStyles={labelStyles}
									errorMsg={errorMsg}
									control={control}
									errors={errors}
								/>
							)}

							<TextAreaInput
								name={'whatToDo'}
								labelStyles={labelStyles}
								errorMsg={errorMsg}
								control={control}
								errors={errors}
								placeholder={'Some activities you recommend doing in this place...'}
							/>

							<Pressable
								bgColor={'primary.500'}
								title="Submit"
								onPress={addLocation}
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
					</KeyboardAvoidingView>
				</Modal.Body>
			</Modal.Content>
		</Modal>
	);
};

const labelStyles = {
	fontWeight: 'medium',
	opacity: 80,
	my: '3',
};
const errorMsg = {
	fontWeight: 'medium',
	opacity: 80,
	color: 'error.500',
	my: '1',
	ml: '3',
};

export default AddLocationModal;
