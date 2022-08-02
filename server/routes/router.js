const router = require('express').Router();

const { getTags, postTag } = require('../controllers/tags.controller');
const {
	getRoutes,
	postRoute,
	getRouteById,
	getRandomRoutes,
	getRouteByUserId,
} = require('../controllers/routes.controller');
const {
	getLocations,
	getLocationById,
	getRouteLocations,
} = require('../controllers/locations.controller');

const { getCountries, getStatesByCountry } = require('../controllers/cs.api');
const {
	getUser,
	postUser,
	completeRoute,
	getCompletedRoutes,
} = require('../controllers/user.controller');

//ROUTES
router.get('/routes', getRoutes);
router.get('/route/:id', getRouteById); // Route by ID => All data
router.get('/userroutes/:id', getRouteByUserId); // Route by CreatorID => All data
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

//Users
router.get('/user/:email', getUser);
router.post('/adduser', postUser);
router.get('/completed/:id', getCompletedRoutes);
router.post('/complete', completeRoute);

module.exports = router;
