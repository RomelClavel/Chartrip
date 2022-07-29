const router = require('express').Router();

const { getTags, postTag } = require('../controllers/tags.controller');
const {
	getRoutes,
	postRoute,
	getRouteById,
	getRandomRoutes,
} = require('../controllers/routes.controller');
const {
	getLocations,
	getLocationById,
	getRouteLocations,
} = require('../controllers/locations.controller');

const { getCountries, getStatesByCountry } = require('../controllers/cs.api');

//ROUTES
router.get('/routes', getRoutes);
router.get('/route/:id', getRouteById); // Route by ID => All data
router.get('/discover', getRandomRoutes); // Random 10 routes to show => Min Data
router.post('/new/route', postRoute);

//LOCATIONS
router.get('/locations', getLocations);
router.get('/location/:id', getLocationById);
router.get('/locations/:route_id', getRouteLocations);

//TAGS
router.get('/tags', getTags);
router.post('/new/tag', postTag);

//Country-State-City Helper
router.get('/countries', getCountries);
router.get('/states/:country', getStatesByCountry);

module.exports = router;
