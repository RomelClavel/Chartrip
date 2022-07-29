export default createMapDirections = (locations) => {
	const locData = [...locations];

	const directions = [];

	for (let i = 0; i < locData.length; i++) {
		if (i + 1 < locData.length) {
			const coordinatesOriginDestination = {
				origin: {
					latitude: locData[i].latitude,
					longitude: locData[i].longitude,
				},
				destination: {
					latitude: locData[i + 1].latitude,
					longitude: locData[i + 1].longitude,
				},
			};
			directions.push(coordinatesOriginDestination);
		}
	}

	return directions;
};
