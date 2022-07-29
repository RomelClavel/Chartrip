import { HStack, Select, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

const CountryStateInput = ({ control, errors, labelStyles, errorMsg }) => {
	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
	const fetchStates = async (country) => {
		try {
			const data = await fetch(`http://192.168.1.215:3001/states/${country}`);
			const statesData = await data.text();
			const parsedStates = JSON.parse(statesData);
			setStates(parsedStates);
		} catch (error) {
			console.log(error);
		}
	};

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
		<>
			<HStack width={'100%'}>
				<VStack flex={1}>
					<Text {...labelStyles}> Country</Text>

					<Controller
						name="country"
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								selectedValue={value}
								accessibilityLabel="Choose Country"
								placeholder="Country"
								_selectedItem={{
									bg: 'primary.400',
								}}
								mt={1}
								onValueChange={(newValue) => {
									fetchStates(newValue);
									onChange(newValue);
								}}
								height={10}
								fontSize={'md'}
							>
								{countries.map((country, index) => {
									return (
										<Select.Item
											key={index}
											label={country.name}
											value={country.name}
										/>
									);
								})}
							</Select>
						)}
					/>
				</VStack>

				<VStack flex={1}>
					<Text {...labelStyles}> State</Text>

					<Controller
						name="state"
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								selectedValue={value}
								accessibilityLabel="Choose State"
								placeholder="State"
								_selectedItem={{
									bg: 'primary.400',
								}}
								mt={1}
								onValueChange={onChange}
								height={10}
								fontSize={'md'}
							>
								{states.map((state, index) => {
									return <Select.Item label={state} value={state} key={index} />;
								})}
							</Select>
						)}
					/>
				</VStack>
			</HStack>
			{errors.country && <Text {...errorMsg}>This is required.</Text>}
			{errors.state && <Text {...errorMsg}>This is required.</Text>}
		</>
	);
};

export default CountryStateInput;
