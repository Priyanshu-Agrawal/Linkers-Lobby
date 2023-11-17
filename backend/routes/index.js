const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello API!');
});


/* TODO Main Tasks:
*  - Adding More routes and all delete routes
*  - Add Location and Region Management functionality
*  - Implement a cache- npm joi for validation
*  - Optional: logger using  winston
*/


router.use('/categories', require('./services/categories'))
router.use('/users', require('./services/users'))
router.use('/service-providers', require('./services/service-providers'))
router.use('/reviews', require('./services/reviews'))
router.use('/register', require('./Auth/Register'))
router.use('/login', require('./Auth/Login'))
router.use('/auth/google', require('./Auth/Google'))
module.exports = router;