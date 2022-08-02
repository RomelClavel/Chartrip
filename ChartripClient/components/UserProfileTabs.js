import { View, Text, HStack, Pressable, Divider } from 'native-base';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { COLORS } from '../styles/Styling';
import RouteDisplayTab from './UserTabs/RouteDisplayTab';
import Constants from 'expo-constants';

const UserProfileTabs = ({ user }) => {
	const [index, setIndex] = useState(0);

	const [routes] = useState([
		{ key: 'first', title: 'My Routes' },
		{ key: 'second', title: 'Completed Routes' },
	]);

	const renderScene = ({ route }) => {
		switch (route.key) {
			case 'first':
				return <RouteDisplayTab type={'My'} user={user} />;
			case 'second':
				return <RouteDisplayTab type={'Completed'} user={user} />;
			default:
				return <RouteDisplayTab />;
		}
	};

	const layout = useWindowDimensions();

	const TabBox = (props) => {
		return (
			<>
				<HStack
					bgColor={COLORS.custom.backgroundWhite}
					justifyContent={'space-evenly'}
					alignItems={'center'}
					height={'12'}
					px={2}
					pt={1}
					rounded={'xl'}
				>
					{props.navigationState.routes.map((route, i) => {
						const activeStyles = index === i ? TabStyles.active : TabStyles.inactive;
						return (
							<Pressable onPress={() => setIndex(i)} key={i}>
								<Text
									fontWeight={'semibold'}
									color={activeStyles.color}
									fontSize={'md'}
								>
									{route.title}
								</Text>
								<Divider bg={activeStyles.bg} mt={1} height={1} rounded={'full'} />
							</Pressable>
						);
					})}
				</HStack>
				<Divider mt={2} shadow={1} />
			</>
		);
	};

	return (
		<View
			backgroundColor={COLORS.custom.backgroundWhite}
			mt={4}
			width={'100%'}
			flex={1}
			shadow={9}
			roundedTop={'xl'}
		>
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
export default UserProfileTabs;
