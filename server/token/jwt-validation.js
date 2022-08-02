const { response } = require('express');
// const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const JWTValidator = (req, res = response, next) => {
	// x-token headers
	const token = req.header('x-token');

	console.log(token);

	if (!token) {
		return res.status(401).json({
			ok: false,
			msj: 'No token',
		});
	}

	try {
		const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);

		req.uid = payload.uid;
	} catch {
		return res.status(401).json({
			ok: false,
			msj: 'Token is not valid',
		});
	}

	next();
};

module.exports = {
	JWTValidator,
};
