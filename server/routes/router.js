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

//ROUTES
router.get('/routes', getRoutes);
router.get('/route/:id', getRouteById); // Route by ID => All data
router.get('/discover', getRandomRoutes); // Random 10 routes to show => Min Data
router.post('/new/route', postRoute);

//LOCATIONS
router.get('/locations', getLocations);
router.get('/location/:id', getLocationById);
router.get('/locations/:route_id', getRouteLocations);

/*
    Location by ID => All Data
    Location by RouteId => All Data
*/

//TAGS
router.get('/tags', getTags);
router.post('/new/tag', postTag);

module.exports = router;
