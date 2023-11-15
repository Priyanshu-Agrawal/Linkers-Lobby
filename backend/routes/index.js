const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello API!');
});


/* TODO:
*  - Implement Google Authentication
*  - Add Location and Region Management functionality
*  - Cors
*  - Helmet
*  - Babel
*  - Password Hashing and Salting
*  - token System
*  - Implement a logger
*  - Implement a cache
*  - renaming each route files in all services routes folder to index.js instead of the service name so that we can use the service name folder as the route name
*  - npm joi for validation
*/

router.use('/categories', require('./services/categories'))
router.use('/users', require('./services/users'))
router.use('/service-providers', require('./services/service-providers'))
router.use('/reviews', require('./services/reviews'))

module.exports = router;