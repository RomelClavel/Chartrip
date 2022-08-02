import { View, Text, HStack, ScrollView } from 'native-base';
import React, { useEffect, useState } from 'react';
import SmallRoute from '../SmallRoute';

const RouteDisplayTab = ({ type, user }) => {
	if (user.id === '') return <></>;
	const [routes, setRoutes] = useState([]);

	useEffect(() => {
		const fetchRoutes = async () => {
			try {
				if (type === 'My') {
					data = await fetch(`http://192.168.1.215:3001/userroutes/${user.id}`);
				} else {
					data = await fetch('http://192.168.1.215:3001/routes');
				}
				const { routes } = await data.json();
				// const routeData = JSON.stringify(routes);

				setRoutes(routes);
			} catch (error) {
				console.log(error);
			}
		};
		fetchRoutes();
	}, []);

	return (
		<ScrollView>
			{routes.length > 0 && (
				<HStack flexWrap={'wrap'} px={6} justifyContent={'space-between'}>
					{routes.map((route, index) => (
						<SmallRoute key={index} route={route} />
					))}
				</HStack>
			)}
		</ScrollView>
	);
};

export default RouteDisplayTab;
