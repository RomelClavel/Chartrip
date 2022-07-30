import {
	Box,
	Center,
	Divider,
	Heading,
	HStack,
	Modal,
	ScrollView,
	Text,
	View,
	VStack,
} from 'native-base';
import React, { useState } from 'react';
import ImgIcon from '../../icons/ImgIcon';
import { COLORS } from '../../styles/Styling';
import AddIcon from '../../icons/AddIcon';
import { Pressable } from 'react-native';
import AddLocationModal from './AddLocationModal';
import { useForm } from 'react-hook-form';
import GooglePlacesInput from '../GooglePlacesInput';
import LocationSmall from '../LocationSmall';

const Step2 = () => {
	// control._defaultValues.address = 5;
	// console.log(control._defaultValues.address);
	const [isOpen, setIsOpen] = useState(false);

	const [locations, setLocations] = useState([]);

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			name: '',
			latitude: '',
			longitude: '',
			whatToDo: '',
			address: '',
			thumbnail: '',
			position: 1,
			type: 'RestStop',
		},
	});
	const [locValues, setLocValues] = useState({
		name: '',
		latitude: '',
		longitude: '',
		whatToDo: '',
		address: '',
		thumbnail: '',
		position: 1,
		type: 'RestStop',
	});

	const onSubmit = (data) => {
		console.log(data);
		jumpTo('second');
	};

	const removeLoc = (index) => {
		setLocations(locations.filter((_, i) => index !== i));
	};

	return (
		<View flex={1} px={8} style={{ backgroundColor: COLORS.custom.backgroundWhite }}>
			<Heading fontSize={'lg'} fontWeight={'semibold'} alignSelf={'center'} my={4}>
				Add Locations using Google Places
			</Heading>
			<GooglePlacesInput
				setValue={setValue}
				setLocValues={setLocValues}
				setIsOpen={setIsOpen}
			/>

			{locations.length > 0 ? (
				<>
					<Text {...labelStyles}>Locations</Text>
					<ScrollView height={'1/2'}>
						{locations.map((location, index) => {
							return (
								<Pressable key={index} onPress={() => removeLoc(index)}>
									<LocationSmall location={location} key={location.id} />
								</Pressable>
							);
						})}
					</ScrollView>
				</>
			) : (
				<NoLoc setIsOpen={setIsOpen} />
			)}

			<AddLocationModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				locValues={locValues}
				control={control}
				errors={errors}
				handleSubmit={(values) => {
					console.log('a');
					setLocations((prev) => [...prev, values]);
					// handleSubmit(onSubmit);
				}}
			/>
		</View>
	);
};
const NoLoc = ({ setIsOpen }) => {
	return (
		<Pressable>
			{/* onPress={() => setIsOpen(true)} */}
			<VStack alignItems={'center'} mb={'1/2'}>
				<Text color={COLORS.custom.grey} fontWeight={'semibold'} fontSize={'md'}>
					No Locations yet.
				</Text>
				<ImgIcon size={220} color={COLORS.custom.grey} />
				{/* <HStack alignItems={'center'}>
					<Text color={'primary.500'} fontWeight={'semibold'} fontSize={'lg'} mr={1}>
						Add One
					</Text>
					<AddIcon size={40} color={COLORS.custom.primary} />
				</HStack> */}
			</VStack>
		</Pressable>
	);
};

const labelStyles = {
	fontWeight: 'medium',
	opacity: 80,
	mt: '2',
	mb: '1',
};

export default Step2;
