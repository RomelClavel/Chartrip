export default formatRouteData = (route, locations) => {
	const locationFormatted = locations.map((loc, index) => {
		return { ...loc, position: index };
	});

	const newRoute = {
		name: route.name,
		description: route.description,
		thumbnail: route.thumbnail,
		country: route.country,
		city: route.state,
		durationMin: route.timeMinMax[0],
		durationMax: route.timeMinMax[1],
		tags: route.tags.map((tag) => tag.id),
		locations: [...locationFormatted],
	};

	return newRoute;
};
