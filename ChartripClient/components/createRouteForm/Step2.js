import { Box, Center, Heading, HStack, ScrollView, Text, View, VStack } from 'native-base';
import React from 'react';
import ImgIcon from '../../icons/ImgIcon';
import { COLORS } from '../../styles/Styling';
import AddIcon from '../../icons/AddIcon';
import { Pressable } from 'react-native';
import GooglePlacesInput from '../GooglePlacesInput';

const Step2 = () => {
	return (
		<View
			flex={1}
			justifyContent={'center'}
			style={{ backgroundColor: COLORS.custom.backgroundWhite }}
		>
			<GooglePlacesInput />
			<VStack mx="3" justifyContent={'center'}>
				<NoLoc />
			</VStack>
		</View>
	);
};
const NoLoc = () => {
	return (
		<Box>
			<Pressable>
				<VStack alignItems={'center'} pb={6}>
					<Text color={COLORS.custom.grey} fontWeight={'semibold'} fontSize={'md'}>
						No Locations yet.
					</Text>
					<ImgIcon size={220} color={COLORS.custom.grey} />
					<HStack alignItems={'center'}>
						<Text color={'primary.500'} fontWeight={'semibold'} fontSize={'lg'} mr={1}>
							Add One
						</Text>
						<AddIcon size={40} color={COLORS.custom.primary} />
					</HStack>
				</VStack>
			</Pressable>
		</Box>
	);
};

export default Step2;
