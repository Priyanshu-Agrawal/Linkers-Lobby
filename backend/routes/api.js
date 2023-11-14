const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
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

apiRouter.use('/categories', require('./services/categories/categories'))
apiRouter.use('/users', require('./services/users/users'))
apiRouter.use('/service-providers', require('./services/service-providers/service-providers'))
apiRouter.use('/reviews', require('./services/reviews/reviews'))

module.exports = apiRouter;