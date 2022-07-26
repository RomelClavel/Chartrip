import React, { useRef } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import { COLORS } from '../styles/Styling';
import { Input, View } from 'native-base';

const GooglePlacesInput = ({ setValue, setLocValues, setIsOpen, setResetImg }) => {
	const GooglePlacesRef = useRef(null);
	return (
		<View position={'absolute'} width={'100%'} alignSelf={'center'} zIndex={2} mt={12}>
			<GooglePlacesAutocomplete
				textInputProps={{
					// leftIcon: { type: 'font-awesome', name: 'chevron-left' },
					errorStyle: { color: 'red' },
				}}
				ref={GooglePlacesRef}
				placeholder="Add a Location..."
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					const locData = {
						name: details.name,
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						address: details.formatted_address,
					};

					setLocValues((loc) => {
						return { ...loc, ...locData };
					});
					setValue('name', locData.name, { shouldValidate: true });
					setValue('latitude', locData.latitude, { shouldValidate: true });
					setValue('longitude', locData.longitude, { shouldValidate: true });
					setValue('address', locData.address, { shouldValidate: true });
					GooglePlacesRef.current.setAddressText('');
					setResetImg(true);
					setIsOpen(true);
				}}
				onFail={(error) => console.error(error)}
				query={{
					key: Constants.manifest.extra.GOOGLE_MAPS_API_KEY,
					language: 'en',
					type: 'establishment',
				}}
				fetchDetails={true}
				styles={{
					textInputContainer: {
						// width: '90%',
					},
					textInput: {
						height: 38,
						color: '#5d5d5d',
						fontSize: 16,
						backgroundColor: COLORS.custom.backgroundWhite,
						borderColor: '#d6d3d1',
						borderWidth: 1,
					},
					// listView: {
					// 	zIndex: 2,
					// },
					// row: {
					// 	zIndex: 2,
					// 	backgroundColor: 'black',
					// },
				}}
			/>
		</View>
	);
};

//CHANGE THIS SO THAT I CAN EMPTY IT
const googleInput = () => {
	return <Input width={100} />;
};

export default GooglePlacesInput;
