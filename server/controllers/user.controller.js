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

module.exports = {
	getUser,
	postUser,
};
