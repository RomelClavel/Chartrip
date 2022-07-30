import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';

const GooglePlacesInput = () => {
	return (
		<GooglePlacesAutocomplete
			placeholder="Search"
			onPress={(data, details = null) => {
				// 'details' is provided when fetchDetails = true
				console.log(
					'================================================================================================================================================'
				);
				console.log(data);
				console.log(
					'================================================================================================================================================'
				);
				console.log(details.geometry.location);
			}}
			onFail={(error) => console.error(error)}
			query={{
				key: Constants.manifest.extra.GOOGLE_MAPS_API_KEY,
				language: 'en',
				type: 'establishment',
			}}
			fetchDetails={true}
		/>
	);
};

export default GooglePlacesInput;
