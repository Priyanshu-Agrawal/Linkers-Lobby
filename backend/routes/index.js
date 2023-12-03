import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Hello API!');
});


/* TODO Main Tasks:
*  - Adding More routes and all delete routes
*  - Transactions using mongoose
*  - Adding Booking model and routes
*  - Implement a cache- npm joi for validation
*  - Optional: logger using  winston
*/


router.use('/categories', require('./services/categories'))
router.use('/users', require('./services/users'))
router.use('/service-providers', require('./services/service-providers'))
router.use('/reviews', require('./services/reviews'))
router.use('/bookings', require('./services/bookings'))
router.use('/register', require('./Auth/Register'))
router.use('/login', require('./Auth/Login'))
router.use('/auth/google', require('./Auth/Google'))

mongoose.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log(`DB Connected`);
		// console.log(result);
	})
	.catch((err) => {
		console.error(`Connection Failed ${err}`);
	});


module.exports = router;