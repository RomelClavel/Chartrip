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
		if (location) {
			res.status(200).json({ OK: true, location });
		} else {
			res.status(404).json({
				OK: false,
				msg: 'Location not found by its ID',
			});
		}
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
		if (locations.length) {
			res.status(200).json({ OK: true, locations });
		} else {
			res.status(404).json({
				OK: false,
				msg: 'Location not found by its Route',
			});
		}
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
