const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
	return new Promise((resolve, reject) => {
		const payload = { uid };

		jwt.sign(payload, process.env.SECRET_JWT_SEED, {}, (err, token) => {
			if (err) {
				console.log(err);
				reject('Could not save token');
			}

			resolve(token);
		});
	});
};

module.exports = {
	generateJWT,
};
