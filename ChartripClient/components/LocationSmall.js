import { AspectRatio, Box, HStack, Image, Pressable, Text, VStack } from 'native-base';
import React from 'react';

const LocationSmall = ({ location }) => {
	const { name, thumbnail, whatToDo, address } = location;

	return (
		<HStack
			justifyContent={'space-between'}
			alignItems={'center'}
			height={'145px'}
			bgColor={'white'}
			shadow={2}
			m={2}
			rounded={'lg'}
		>
			<VStack pl={6} width={'50%'} alignItems={''}>
				<VStack height={'40%'}>
					<Text fontSize={'md'} fontWeight={'semibold'} isTruncated={true}>
						{name}
					</Text>
					<Text isTruncated={true} opacity={70}>
						{address ? address : 'Short Address'}
					</Text>
				</VStack>
				<Text opacity={70} fontSize="xs" numberOfLines={2} width={'95%'} isTruncated={true}>
					{whatToDo}
				</Text>
			</VStack>
			<AspectRatio
				height={'100%'}
				ratio={{
					base: 1 / 1,
					md: 16 / 9,
				}}
			>
				<Image
					rounded={'lg'}
					source={{
						uri: thumbnail,
					}}
					alt="Thumbnail"
				/>
			</AspectRatio>
		</HStack>
	);
};

export default LocationSmall;
