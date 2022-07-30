import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
				key: 'AIzaSyBsWEG5VIepvFo_LU0QzBG99bYdWhdaiJA',
				language: 'en',
				type: 'establishment',
			}}
			fetchDetails={true}
		/>
	);
};

export default GooglePlacesInput;
