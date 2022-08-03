import {
	AspectRatio,
	Box,
	Divider,
	Heading,
	Image,
	Pressable,
	Text,
	View,
	VStack,
} from 'native-base';
import { KeyboardAvoidingView } from 'react-native';

import React from 'react';
import Constants from 'expo-constants';
import { useForm } from 'react-hook-form';
import TextInput from '../components/createRouteForm/TextInput';
import { COLORS } from '../styles/Styling';
import { getData, storeData } from '../helpers/storageFunctions';
import * as Crypto from 'expo-crypto';
import ImgInput from '../components/createRouteForm/ImgInput';

const RegisterForm = ({ navigation }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			profilePic: '',
		},
	});

	const onSubmit = async (data) => {
		const encryptedPassword = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA256,
			data.password
		);

		const newUser = {
			...data,
			password: encryptedPassword,
		};

		fetch('http://192.168.1.215:3001/adduser', {
			body: JSON.stringify(newUser),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((res) => {
				console.log({
					res,
				});
				storeData('token', res.token);
				storeData('userData', res.userData);
				navigation.navigate('App');
			})
			.catch((err) => {
				console.log({
					err,
				});
			});
	};

	return (
		<View
			flex={1}
			bgColor={'primary.500'}
			style={{ paddingTop: Constants.statusBarHeight }}
			alignItems={'center'}
			justifyContent={'center'}
		>
			<AspectRatio
				ratio={{
					base: 5 / 2,
					md: 9 / 10,
				}}
				width={'2/3'}
				mb={4}
			>
				<Image
					source={require('../icons/Logo.png')}
					alt="Alternate Text"
					size={'full'}
					rounded={'full'}
				/>
			</AspectRatio>
			<KeyboardAvoidingView
				behavior="position"
				keyboardVerticalOffset={-90}
				style={{
					backgroundColor: COLORS.custom.backgroundWhite,
					width: 370,
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: 8,
				}}
			>
				<VStack
					style={{ backgroundColor: COLORS.custom.backgroundWhite, width: 370 }}
					px={5}
					py={8}
					rounded={'lg'}
				>
					<Heading alignSelf={'center'}> Sign In </Heading>

					<VStack>
						<ImgInput
							name={'profilePic'}
							control={control}
							errors={errors}
							labelStyles={labelStyles}
							errorMsg={errorMsg}
							user={true}
						/>
						<TextInput
							name={'fullName'}
							control={control}
							errors={errors}
							labelStyles={labelStyles}
							errorMsg={errorMsg}
							placeholder={'Full Name'}
						/>
						<TextInput
							name={'email'}
							control={control}
							errors={errors}
							labelStyles={labelStyles}
							errorMsg={errorMsg}
							placeholder={'E-mail'}
						/>
						<TextInput
							name={'password'}
							control={control}
							errors={errors}
							labelStyles={labelStyles}
							errorMsg={errorMsg}
							placeholder={'Password'}
							password={true}
						/>
					</VStack>
					<Divider my={6} />
					<Pressable
						title="Submit"
						onPress={handleSubmit(onSubmit)}
						// my={10}
						alignSelf={'center'}
						rounded={'lg'}
						bgColor={'primary.500'}
					>
						<Text px={4} py={4} color={'white'} fontSize={'md'} fontWeight={'semibold'}>
							Create Account
						</Text>
					</Pressable>
				</VStack>
			</KeyboardAvoidingView>
		</View>
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

export default RegisterForm;
