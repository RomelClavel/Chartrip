const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//CONTROLLER TO GET ALL THE DATA IN A LOCATION
//GETS ALL THE LOCATIONS
const getLocations = async (req, res) => {
	try {
		const locations = await prisma.location.findMany({});
		res.status(200).json(locations);
	} catch (error) {
		console.log(error);
		res.json({
			OK: false,
			error_msj: error,
		});
	}
};

//GETS A LOCATION BY ITS ID
const getLocationById = async (req, res) => {
	try {
		const locationId = req.params.id;
		const location = await prisma.location.findUnique({
			where: {
				id: locationId,
			},
		});
		//Maybe edit routes so it can be more readable
		res.status(200).json(location);
	} catch (error) {
		console.log(error);
		res.json({
			OK: false,
			error_msj: error,
		});
	}
};

//GET A LOCATION BY THE ROUTE IT BELONGS TO
const getRouteLocations = async (req, res) => {
	try {
		const routeId = req.params.route_id;
		const locations = await prisma.location.findMany({
			where: {
				routeId: routeId,
			},
			orderBy: {
				position: 'asc',
			},
		});
		//Maybe edit routes so it can be more readable
		res.status(200).json(locations);
	} catch (error) {
		console.log(error);
		res.json({
			OK: false,
			error_msj: error,
		});
	}
};

module.exports = {
	getLocations,
	getLocationById,
	getRouteLocations,
};
