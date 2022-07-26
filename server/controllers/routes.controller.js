const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//CONTROLLER TO GET ALL THE DATA IN A ROUTE (RELATIONS INCLUDED)
//GETS ALL THE ROUTES WITH THEIR ROUTES AND LOCATION
const getRoutes = async (req, res) => {
	try {
		let routes = await prisma.route.findMany({
			include: {
				locations: {
					orderBy: {
						position: 'asc',
					},
				},
				tags: {
					include: { tag: true },
				},
			},
		});
		//Format the tag field on the result of the routes query so it can be accessed more easily
		formattedRoutes = routes.map((route) => {
			return {
				...route,
				tags: route.tags.map(({ tag }) => {
					return tag;
				}),
			};
		});
		res.status(200).json({
			OK: true,
			routes: formattedRoutes,
		});
	} catch (error) {
		console.log(error);
		res.json({
			OK: false,
			error_msj: error,
		});
	}
};

const getRouteById = async (req, res) => {
	try {
		const routeId = req.params.id;
		const route = await prisma.route.findUnique({
			where: {
				id: routeId,
			},
			include: {
				locations: true,
				tags: {
					include: { tag: true },
				},
			},
		});

		if (route) {
			//Format the tag field on the result of the routes query so it can be accessed more easily
			formattedRoute = {
				...route,
				tags: route.tags.map(({ tag }) => {
					return tag;
				}),
			};

			res.status(200).json({
				OK: true,
				route: formattedRoute,
			});
		} else {
			res.status(404).json({
				OK: false,
				msg: 'Route not found',
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

const getRandomRoutes = async (req, res) => {
	try {
		let routes = await prisma.route.findMany({
			select: {
				id: true,
				name: true,
				country: true,
				city: true,
				durationMax: true,
				durationMin: true,
				userPicture: true,
				thumbnail: true,
			},
		});
		//Shuffle the Routes so they can be random and then selecting 10 of them
		routes
			.sort(() => {
				return Math.random() - 0.5;
			})
			.splice(9);
		res.status(200).json({
			OK: true,
			routes,
		});
	} catch (error) {
		console.log(error);
		res.json({
			OK: false,
			error_msj: error,
		});
	}
};

//CONTROLLER TO POST A ROUTE WITH ITS LOCATIONS AND CONNECT THEM TO EXISTING TAGS
const postRoute = async (req, res) => {
	try {
		//SOMEHOW VALIDATE INFORMATION HERE

		//Destructuring the body of the request
		const { locations, tags, ...route } = req.body;

		//Query for creating a route as explained at the top of the function
		//Separated it for ease of reading
		const createQuery = {
			data: {
				...route,
				locations: {
					create: [...locations],
				},
				tags: {
					//Fixing the Tags array so we can connect them properly with prisma on creation
					//Creates the entity on the relation table RoutesOnTags and connects it to the existing Tags
					create: tags.map((t_id) => {
						return {
							tag: {
								connect: { id: t_id },
							},
						};
					}),
				},
			},
			include: {
				locations: true,
				tags: true,
			},
		};

		const newRoute = await prisma.route.create({ ...createQuery });
		//Check how its sent back and maybe fix for readability
		res.status(200).json({
			OK: true,
			newRoute,
		});
	} catch (error) {
		console.log(error);
		res.json({
			OK: false,
			error_msj: error,
		});
	}
};

module.exports = {
	getRoutes,
	getRouteById,
	getRandomRoutes,
	postRoute,
};
