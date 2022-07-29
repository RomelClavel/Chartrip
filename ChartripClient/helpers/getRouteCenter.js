export default getRouteCenter = (locations) => {
	let latitude = 0;
	let longitude = 0;

	locations.forEach((loc) => {
		latitude += loc.latitude;
		longitude += loc.longitude;
	});

	const center = {
		latitude: latitude / locations.length,
		longitude: longitude / locations.length,
	};

	return center;
};
