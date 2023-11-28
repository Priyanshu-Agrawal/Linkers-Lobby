import jwt from "jsonwebtoken";
import {Router} from "express";

const passport = require("./passport/passport");
const User = require("../../services/users/models/User");

const router = Router();

// router.get('/', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/', passport.authenticate('google', {scope: ['profile', 'email']}, () => {}));

router.get('/callback', passport.authenticate('google', {failureRedirect: '/login', session: false}, () => {}),
	function (req, res) {
		// Successful authentication, redirect home.
		// console.log(req.user);
		// console.log({name: req.user.displayName, email: req.user.emails[0]['value']});
		User.findOne({email: req.user.emails[0]['value']}).then(user => {
			if (user) {
				const token = jwt.sign({userID: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'}) // token expires in 30 days remove options to make it never expire
				res.send({user, token});
			} else {
				res.status(400).send('User not found');
			}
		})
	});

router.get('/success', (req, res) => {
	res.send('Login success');
})
module.exports = router;