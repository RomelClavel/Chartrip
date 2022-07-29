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
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { COLORS } from '../../styles/Styling';
import { useForm, Controller } from 'react-hook-form';

const Step1 = () => {
	const [countries, setCountries] = useState([]);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			country: '',
			city: '',
		},
	});
	const onSubmit = (data) => console.log(data);

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const data = await fetch('http://192.168.1.215:3001/countries');
				const countries = await data.text();
				const parsedCountries = JSON.parse(countries);
				setCountries(parsedCountries);
			} catch (error) {
				console.log(error);
			}
		};
		fetchCountries();
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: COLORS.custom.backgroundWhite }}>
			<Heading my={4} alignSelf={'center'} fontWeight={'semibold'} fontSize={'xl'}>
				Add your Route details
			</Heading>
			<ScrollView px={5}>
				<VStack mx="3">
					<Text {...labelStyles}> Name</Text>
					<Controller
						name="name"
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								size="lg"
							/>
						)}
					/>

					{errors.name && <Text {...errorMsg}>This is required.</Text>}

					<HStack width={'100%'}>
						<Controller
							name="country"
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Select
									selectedValue={value}
									flex={1}
									accessibilityLabel="Choose Country"
									placeholder="Country"
									_selectedItem={{
										bg: 'teal.600',
									}}
									mt={1}
									onValueChange={onChange}
									height={10}
									fontSize={'md'}
								>
									{countries.map((country) => {
										return (
											<Select.Item
												label={country.name}
												value={country.name}
											/>
										);
									})}
								</Select>
							)}
						/>

						<Controller
							name="city"
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Select
									selectedValue={value}
									flex={1}
									accessibilityLabel="Choose Country"
									placeholder="Country"
									_selectedItem={{
										bg: 'teal.600',
									}}
									mt={1}
									onValueChange={onChange}
									height={10}
									fontSize={'md'}
								>
									{countries.map((country) => {
										return (
											<Select.Item
												label={country.name}
												value={country.name}
											/>
										);
									})}
								</Select>
							)}
						/>
					</HStack>
					{errors.country && <Text {...errorMsg}>This is required.</Text>}
					{errors.city && <Text {...errorMsg}>This is required.</Text>}

					<Button title="Submit" onPress={handleSubmit(onSubmit)} />
				</VStack>
			</ScrollView>
			<Text color={'error.300'}>as</Text>
		</View>
	);
};

const labelStyles = {
	fontWeight: 'medium',
	opacity: 80,
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
