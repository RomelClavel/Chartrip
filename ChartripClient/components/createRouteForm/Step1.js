import {
	View,
	Box,
	ScrollView,
	Heading,
	VStack,
	FormControl,
	Input,
	Button,
	Text,
	Select,
	HStack,
	TextArea,
	Image,
	Pressable,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import TextInput from './TextInput';
import { COLORS } from '../../styles/Styling';
import { useForm, Controller } from 'react-hook-form';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import TextAreaInput from './TextAreaInput';
import CountryStateInput from './CountryStateInput';
import * as ImagePicker from 'expo-image-picker';
import ImgIcon from '../../icons/ImgIcon';

const Step1 = () => {
	const [image, setImage] = useState('');

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			country: '',
			state: '',
			description: '',
			timeMinMax: [3, 7],
			thumbnail: '',
		},
	});

	const pickImage = async (onChange) => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [1, 1],
			base64: true,
		});

		if (!result.cancelled) {
			// setImage({ image: result.uri });

			let base64Img = `data:image/jpg;base64,${result.base64}`;

			let apiUrl = 'https://api.cloudinary.com/v1_1/dyicovnlz/upload';
			let data = {
				file: base64Img,
				upload_preset: 'ep160veg',
			};

			fetch(apiUrl, {
				body: JSON.stringify(data),
				headers: {
					'content-type': 'application/json',
				},
				method: 'POST',
			})
				.then(async (r) => {
					console.log(r);
					let data = await r.text();
					const parsedData = JSON.parse(data);
					// console.log(parsedData);
					// console.log(parsedData.secure_url);
					const imageSet =
						parsedData.secure_url.slice(0, parsedData.secure_url.length - 3) + 'png';
					console.log(imageSet);
					onChange(imageSet);
					setImage(imageSet);
				})
				.catch((err) => console.log(err));
		}
	};
	const onSubmit = (data) => console.log(data);

	const [multiSliderValue, setMultiSliderValue] = useState([3, 7]);

	const multiSliderValuesChange = (values) => setMultiSliderValue(values);
	const [scroll, setScroll] = useState(true);

	const [tags, setTags] = useState([]);
	useEffect(() => {
		const fetchTypes = async () => {
			try {
				const data = await fetch('http://192.168.1.215:3001/tags');
				const tagsData = await data.json();
				// const parsedCountries = JSON.parse(countries);

				setTags(tagsData);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTypes();
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: COLORS.custom.backgroundWhite }}>
			<Heading my={4} alignSelf={'center'} fontWeight={'semibold'} fontSize={'xl'}>
				Add your Route details
			</Heading>
			<ScrollView px={5} scrollEnabled={scroll}>
				<VStack mx="3">
					<TextInput
						control={control}
						name={'name'}
						errors={errors}
						labelStyles={labelStyles}
						errorMsg={errorMsg}
					/>

					<CountryStateInput
						control={control}
						errors={errors}
						labelStyles={labelStyles}
						errorMsg={errorMsg}
					/>

					<TextAreaInput
						control={control}
						name={'description'}
						errors={errors}
						labelStyles={labelStyles}
						errorMsg={errorMsg}
					/>

					<Text {...labelStyles}> How long does it take to complete</Text>

					<Controller
						name="timeMinMax"
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<HStack alignItems={'center'} justifyContent={'space-between'}>
								<Text fontWeight={'medium'}> {multiSliderValue[0]} hr </Text>
								<MultiSlider
									values={[multiSliderValue[0], multiSliderValue[1]]}
									sliderLength={250}
									onValuesChange={multiSliderValuesChange}
									onValuesChangeStart={() => setScroll(false)}
									onValuesChangeFinish={(value) => {
										setScroll(true);
										onChange(value);
										console.log(value);
									}}
									min={1}
									max={8}
									selectedStyle={{
										backgroundColor: COLORS.custom.primary,
									}}
									trackStyle={{
										height: 4,
										backgroundColor: COLORS.custom.grey,
									}}
								/>
								<Text fontWeight={'medium'}> {multiSliderValue[1]} hr </Text>
							</HStack>
						)}
					/>
					{errors.timeMinMax && <Text {...errorMsg}>This is required.</Text>}

					<Text {...labelStyles}> Add a photo</Text>

					<Controller
						name="thumbnail"
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Box>
								{image.length > 0 ? (
									<Image
										source={{
											uri: 'https://res.cloudinary.com/dyicovnlz/image/upload/v1659117991/ulhnu4mabaszyl61byjr.jpg',
										}}
										alt="AltText"
										size={200}
										rounded={'lg'}
										alignSelf={'center'}
									/>
								) : (
									<Pressable
										alignSelf={'center'}
										justifyContent={'center'}
										alignItems={'center'}
										width={'90%'}
										bgColor={COLORS.custom.grey}
										rounded={'lg'}
										onPress={() => pickImage(onChange)}
										// onPress={() => {
										// 	setImage('j');
										// }}
									>
										<ImgIcon size={180} color={'white'} />
									</Pressable>
								)}
							</Box>
						)}
					/>

					{errors.thumbnail && <Text {...errorMsg}>This is required.</Text>}

					<Button title="Submit" onPress={handleSubmit(onSubmit)}>
						Submit
					</Button>
				</VStack>
			</ScrollView>
		</View>
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

export default Step1;
