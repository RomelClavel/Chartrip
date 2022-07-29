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
} from 'native-base';
import React, { useEffect, useState } from 'react';
import TextInput from './TextInput';
import { COLORS } from '../../styles/Styling';
import { useForm, Controller } from 'react-hook-form';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import TextAreaInput from './TextAreaInput';
import CountryStateInput from './CountryStateInput';

const Step1 = () => {
	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
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
		},
	});

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
					<HStack alignItems={'center'} justifyContent={'space-between'}>
						<Text fontWeight={'medium'}> {multiSliderValue[0]} hr </Text>
						<MultiSlider
							values={[multiSliderValue[0], multiSliderValue[1]]}
							sliderLength={250}
							onValuesChange={multiSliderValuesChange}
							onValuesChangeStart={() => setScroll(false)}
							onValuesChangeFinish={() => setScroll(true)}
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

					<Button title="Submit" onPress={handleSubmit(onSubmit)} />
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
