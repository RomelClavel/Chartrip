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
					const { routes } = await data.json();
					setRoutes(routes);
				} else {
					data = await fetch(`http://192.168.1.215:3001/completed/${user.id}`);
					const { routes } = await data.json();
					setRoutes(routes.map(({ route }) => route));
				}
				// const routeData = JSON.stringify(routes);
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
