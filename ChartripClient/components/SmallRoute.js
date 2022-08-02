import { View, Text, Box, VStack, AspectRatio, Image } from 'native-base';
import React from 'react';

const SmallRoute = ({ route }) => {
	const { name, country, city, thumbnail } = route;
	return (
		<VStack
			style={{ height: 220, width: 160 }}
			bgColor={'white'}
			mx={2}
			my={2}
			rounded={'lg'}
			shadow={2}
			alignItems={'center'}
			// justifyContent={'space-between'}
		>
			<AspectRatio
				width={'100%'}
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
			<VStack width={'80%'} height={'100%'}>
				<Text isTruncated fontWeight={'semibold'} fontSize={'md'} mt={1}>
					{name}
				</Text>
				<Text isTruncated opacity={60} fontWeight={'medium'} ml={1}>
					{country}, {city}
				</Text>
			</VStack>
		</VStack>
	);
};

export default SmallRoute;
