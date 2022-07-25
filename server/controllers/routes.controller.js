const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getRoutes = async (req, res) => {
	try {
		const routes = await prisma.route.findMany({
			include: {
				locations: true,
				tags: {
					include: { tag: true },
				},
			},
		});
		res.status(200).json(routes);
	} catch (error) {
		console.log(error);
		res.json({
			OK: false,
			error_msj: error,
		});
	}
};
const postRoute = async (req, res) => {
	try {
		const body = req.body;
		const { locations, tags, ...route } = body;

		const tagMap = tags.map((t_id) => {
			return {
				tag: {
					connect: { id: t_id },
				},
			};
		});

		createObject = {
			data: {
				...route,
				locations: {
					create: [...locations],
				},
				//DO the connection
				tags: {
					create: [...tagMap],
				},
			},
			include: {
				locations: true,
				tags: true,
			},
		};

		// console.log(createObject);
		const newRoute = await prisma.route.create({ ...createObject });
		res.status(200).json(newRoute);
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
	postRoute,
};
