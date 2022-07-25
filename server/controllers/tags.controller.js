const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTags = async (req, res) => {
	try {
		const tags = await prisma.tag.findMany();
		res.status(200).json(tags);
	} catch (error) {
		console.log(error);
		res.json({
			OK: false,
			error_msj: error,
		});
	}
};
const postTag = async (req, res) => {
	try {
		const body = req.body;
		const newTag = await prisma.tag.create({
			data: body,
		});
		console.log(newTag);
		res.status(200).json(newTag);
	} catch (error) {
		console.log(error);
		res.json({
			OK: false,
			error_msj: error,
		});
	}
};

module.exports = {
	getTags,
	postTag,
};
