import { AspectRatio, Heading, Image, Pressable, Text, View } from 'native-base';
import React from 'react';
import Constants from 'expo-constants';

const CreateStart = ({ navigation }) => {
	return (
		<View
			flex={1}
			style={{ marginTop: Constants.statusBarHeight }}
			justifyContent={'center'}
			alignItems={'center'}
		>
			<Heading textAlign={'center'} width={'3/4'} color={'primary.500'}>
				Create a new Route for the World to see
			</Heading>
			<AspectRatio
				ratio={{
					base: 1 / 1,
					md: 9 / 10,
				}}
				width={'5/6'}
				my={8}
			>
				<Image
					size={'full'}
					source={require('../icons/createImg.png')}
					alt="Alternate Text"
				/>
			</AspectRatio>
			<Pressable
				bgColor={'primary.500'}
				alignSelf={'center'}
				rounded={'lg'}
				mt={6}
				onPress={() => navigation.navigate('CreateForm')}
			>
				<Text px={4} py={4} color={'white'} fontSize={'md'} fontWeight={'semibold'}>
					Start Creation
				</Text>
			</Pressable>
		</View>
	);
};

export default CreateStart;
