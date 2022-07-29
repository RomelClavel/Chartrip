// Latest version - v3.0.0
const Country = require('country-state-city').Country;
const State = require('country-state-city').State;

const getCountries = async (req, res) => {
	try {
		const countries = Country.getAllCountries();
		const countryData = countries.map((country) => {
			return { name: country.name, code: country.isoCode };
		});
		res.status(200).json(countryData);
	} catch (error) {
		console.log(error);
		res.json({
			OK: false,
			error_msj: error,
		});
	}
};
const getStatesByCountry = async (req, res) => {
	try {
		const country = req.params.country;
		const countries = Country.getAllCountries();
		const countryCode = countries.filter((c) => c.name === country)[0].isoCode;
		const states = State.getStatesOfCountry(countryCode);
		const statesData = states.map((state) => state.name);
		res.status(200).json(statesData);
	} catch (error) {
		console.log(error);
		res.json({
			OK: false,
			error_msj: error,
		});
	}
};

module.exports = { getCountries, getStatesByCountry };
