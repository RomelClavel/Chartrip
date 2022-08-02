import { AspectRatio, Box, Heading, HStack, Image, Text, VStack } from 'native-base';
import React from 'react';

const NextLocation = ({ location }) => {
	const { name, address, thumbnail } = location;
	return (
		<HStack
			justifyContent={'space-between'}
			alignItems={'center'}
			height={'120'}
			bgColor={'white'}
			shadow={2}
			m={2}
			rounded={'lg'}
		>
			<VStack width={'50%'} alignItems={'center'}>
				<Heading fontSize={'xl'} mb={2}>
					{' '}
					Next Stop:{' '}
				</Heading>
				<Text fontSize={'md'} fontWeight={'semibold'} isTruncated>
					{name}
				</Text>
				<Text opacity={70} isTruncated>
					{address ? address : 'Temp Adress'}
				</Text>
			</VStack>
			<AspectRatio
				height={'100%'}
				ratio={{
					base: 6 / 5,
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

export default NextLocation;
