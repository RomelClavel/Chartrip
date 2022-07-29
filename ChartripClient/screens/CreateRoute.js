import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { COLORS } from '../styles/Styling';
import { Box, Divider, Heading, HStack, Pressable, Text, View } from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import Step1 from '../components/createRouteForm/Step1';
import Step2 from '../components/createRouteForm/Step2';
import Step3 from '../components/createRouteForm/Step3';

const CreateRoute = () => {
	// const FirstRoute = () => <View style={{ flex: 1, backgroundColor: '#ff4081' }} />;

	// const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;
	// const ThirdRoute = () => <View style={{ flex: 1, backgroundColor: 'teal' }} />;

	const renderScene = SceneMap({
		first: Step1,
		second: Step2,
		third: Step3,
	});

	const layout = useWindowDimensions();

	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: 'first', title: 'Route Details' },
		{ key: 'second', title: 'Add Locations' },
		{ key: 'third', title: 'Create Route' },
	]);

	const TabBox = (props) => {
		return (
			<HStack
				bgColor={COLORS.custom.backgroundWhite}
				justifyContent={'space-evenly'}
				alignItems={'center'}
				height={10}
				px={2}
			>
				{props.navigationState.routes.map((route, i) => {
					const activeStyles =
						index === i
							? TabStyles.active
							: index > i
							? TabStyles.completed
							: TabStyles.inactive;
					return (
						<Pressable onPress={() => setIndex(i)}>
							<Text fontWeight={'semibold'} color={activeStyles.color}>
								{route.title}
							</Text>
							<Divider bg={activeStyles.bg} mt={1} height={1} rounded={'full'} />
						</Pressable>
					);
				})}
			</HStack>
		);
	};

	return (
		<View backgroundColor={COLORS.custom.backgroundWhite} height={'100%'}>
			<Heading alignSelf={'center'} mt={4} my={2} fontWeight={'medium'} fontSize={'xl'}>
				Create a Route
			</Heading>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				renderTabBar={TabBox}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				swipeEnabled={false}
			/>
		</View>
	);
};

const TabStyles = {
	active: {
		color: COLORS.custom.primary,
		bg: COLORS.custom.primary,
	},
	completed: {
		color: '#3F3F3F',
		bg: COLORS.custom.primary,
	},
	inactive: {
		color: COLORS.custom.grey,
		bg: COLORS.custom.grey,
	},
};

export default CreateRoute;
