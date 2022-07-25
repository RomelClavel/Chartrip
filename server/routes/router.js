const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { getTags, postTag } = require('../controllers/tags.controller');
const { getRoutes, postRoute } = require('../controllers/routes.controller');

const prisma = new PrismaClient();
//ROUTES
router.get('/routes', getRoutes);
router.post('/new/route', postRoute);

//LOCATIONS
router.get('/locations');

//TAGS
router.get('/tags', getTags);
router.post('/new/tag', postTag);

module.exports = router;
