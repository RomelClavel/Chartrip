import { Avatar, Heading, Pressable, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import UserProfileTabs from '../components/UserProfileTabs';
import { clearStorage, getData } from '../helpers/storageFunctions';

const Profile = () => {
	const [user, setUser] = useState({ name: '', id: '' });

	useEffect(() => {
		const getUserData = async () => {
			const userData = await getData('userData');
			setUser(JSON.parse(userData));
		};
		getUserData();
	}, []);

	return (
		<View
			flex={1}
			style={{ marginTop: Constants.statusBarHeight + 4 }}
			alignItems={'center'}
			pt={5}
		>
			<Avatar
				// size={'2xl'}
				height={160}
				width={160}
				bg="primary.500"
				source={{
					uri: user.profilePic,
				}}
			>
				USER
			</Avatar>
			<Pressable
				onPress={() => {
					clearStorage();
				}}
			>
				<Heading mt={6}> {user.fullName}</Heading>
			</Pressable>
			<UserProfileTabs user={user} />
		</View>
	);
};

export default Profile;
