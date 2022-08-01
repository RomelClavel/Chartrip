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
	Pressable,
} from 'native-base';
import React, { useState } from 'react';
import ImgIcon from '../../icons/ImgIcon';
import { COLORS } from '../../styles/Styling';
import AddIcon from '../../icons/AddIcon';
import AddLocationModal from './AddLocationModal';
import { useForm } from 'react-hook-form';
import GooglePlacesInput from '../GooglePlacesInput';
import LocationSmall from '../LocationSmall';
import Constants from 'expo-constants';
import GoogleIcon from '../../icons/GoogleIcon';
import AlertModal from '../AlertModal';

const Step2 = ({ jumpTo, setLocationsData }) => {
	const defaultLoc = {
		name: '',
		latitude: '',
		longitude: '',
		whatToDo: '',
		address: '',
		thumbnail: '',
		position: 1,
		type: 'RestStop',
	};
	const [isOpen, setIsOpen] = useState(false);

	//Array to render the locations
	const [locations, setLocations] = useState([]);

	//Current Values of the locations being created
	const [locValues, setLocValues] = useState({
		...defaultLoc,
	});

	//RESET THE IMG INPUT
	const [resetImg, setResetImg] = useState(true);

	const [alert, setAlert] = useState(false);

	const {
		control,
		// handleSubmit,
		reset,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			...defaultLoc,
		},
	});

	const onSubmit = () => {
		if (locations.length >= 2) {
			setLocationsData([...locations]);
			jumpTo('third');
		} else {
			setAlert(true);
		}
	};

	const removeLoc = (index) => {
		setLocations(locations.filter((_, i) => index !== i));
	};

	return (
		<View
			flex={1}
			px={8}
			style={{
				backgroundColor: COLORS.custom.backgroundWhite,
				marginBottom: Constants.statusBarHeight,
			}}
		>
			<HStack alignSelf={'center'} alignItems={'center'}>
				<Heading fontSize={'lg'} fontWeight={'semibold'} my={4} mr={2}>
					Add Locations using Google Places
				</Heading>
				<GoogleIcon size={25} />
			</HStack>
			<GooglePlacesInput
				setValue={setValue}
				setLocValues={setLocValues}
				setIsOpen={setIsOpen}
				setResetImg={setResetImg}
			/>

			{locations.length > 0 ? (
				<>
					<Text {...labelStyles} mt={12}>
						Locations
					</Text>
					<ScrollView mb={4}>
						{locations.map((location, index) => {
							return (
								<Pressable key={index} onPress={() => removeLoc(index)}>
									<LocationSmall location={location} />
								</Pressable>
							);
						})}
					</ScrollView>

					<Divider mb={4} />

					<Pressable
						bgColor={'primary.500'}
						title="Submit"
						onPress={onSubmit}
						mb={8}
						alignSelf={'flex-end'}
						rounded={'lg'}
					>
						<Text px={4} py={4} color={'white'} fontSize={'md'} fontWeight={'semibold'}>
							Next Step
						</Text>
					</Pressable>
					<AlertModal
						open={alert}
						setAlert={setAlert}
						errorMsj={'A Route needs to have 2 or more Locations to be Created'}
					/>
				</>
			) : (
				<NoLoc setIsOpen={setIsOpen} />
			)}

			<AddLocationModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				locValues={locValues}
				setLocValues={setLocValues}
				defaultLoc={defaultLoc}
				control={control}
				errors={errors}
				reset={reset}
				resetImg={resetImg}
				setResetImg={setResetImg}
				handleSubmit={(values) => {
					setLocations((prev) => [...prev, values]);
				}}
			/>
		</View>
	);
};
const NoLoc = () => {
	return (
		<Pressable mt={'1/2'}>
			<VStack alignItems={'center'} mb={'1/2'}>
				<Text color={COLORS.custom.grey} fontWeight={'semibold'} fontSize={'md'}>
					No Locations yet.
				</Text>
				<ImgIcon size={220} color={COLORS.custom.grey} />
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
