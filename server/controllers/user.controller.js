const { PrismaClient } = require('@prisma/client');
const { generateJWT } = require('../token/jwt');
const prisma = new PrismaClient();

const getUser = async (req, res) => {
	try {
		const email = req.params.email;
		console.log(email);
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.json({
			OK: false,
			error_msj: error,
		});
	}
};

const postUser = async (req, res) => {
	try {
		const body = req.body;
		const newUser = await prisma.user.create({
			data: body,
		});
		console.log(newUser);

		const token = await generateJWT({
			email: newUser.email,
			id: newUser.id,
		});
		res.status(200).json({
			OK: true,
			userData: {
				fullName: newUser.fullName,
				profilePic: newUser.profilePic,
				about: newUser.about,
				id: newUser.id,
			},
			token: token,
		});
	} catch (error) {
		console.log(error);
		res.json({
			OK: false,
			error_msj: error,
		});
	}
};

const getCompletedRoutes = async (req, res) => {
	try {
		const userId = req.params.id;

		const routes = await prisma.completedRoute.findMany({
			where: {
				userId: userId,
			},
			include: {
				route: true,
			},
		});

		// console.log(routes);
		// //Format the tag field on the result of the routes query so it can be accessed more easily
		// const formattedRoutes = routes.map((route) => {
		// 	return {
		// 		...route,
		// 		tags: route.tags.map(({ tag }) => {
		// 			return tag;
		// 		}),
		// 	};
		// });
		res.status(200).json({
			OK: true,
			routes: routes,
		});
	} catch (error) {
		console.log(error);
		res.json({
			OK: false,
			error_msj: error,
		});
	}
};

const completeRoute = async (req, res) => {
	try {
		const { routeId, userId } = req.body;
		const newCompletion = await prisma.completedRoute.create({
			data: {
				route: {
					connect: {
						id: routeId,
					},
				},
				user: {
					connect: {
						id: userId,
					},
				},
			},
		});

		res.status(200).json({
			OK: true,
			completion: newCompletion,
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
	getUser,
	postUser,
	completeRoute,
	getCompletedRoutes,
};
