import { Box, Modal, PresenceTransition, Text } from 'native-base';
import React, { useEffect } from 'react';

const AlertModal = ({ errorMsj, open, setAlert }) => {
	useEffect(() => {
		setTimeout(() => {
			setAlert(false);
		}, 3000);
	}, []);

	return (
		<PresenceTransition
			visible={open}
			initial={{
				opacity: 0,
				scale: 0,
			}}
			animate={{
				opacity: 1,
				scale: 1,
				transition: {
					duration: 250,
				},
			}}
		>
			<Box
				bgColor={'#FF4141'}
				p={5}
				rounded={'full'}
				shadow={'3'}
				position={'absolute'}
				opacity={80}
				width={'5/6'}
				alignSelf={'center'}
				bottom={32}
			>
				<Text color={'white'} fontWeight={'semibold'} textAlign={'center'}>
					{errorMsj}
				</Text>
			</Box>
		</PresenceTransition>
	);
};

export default AlertModal;
