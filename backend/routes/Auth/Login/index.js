const express = require('express');
const User = require("../../services/users/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post('/', async (req, res, next) => {
	try {
		const user = await User.findOne({email: req.body.email});
		if (user) {
			const ifPasswordMatches = await bcrypt.compare(req.body.password, user.password);
			(!ifPasswordMatches) && res.status(400).send('Invalid Credentials') && next();
			const token = jwt.sign({userID: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'}) // token expires in 30 days remove options to make it never expire
			/* TODO - Add more security to token
			*  -Opional - Sending token inside cookie.
			*  -Opional - Sending token inside user object itself.
			*  -Using token expiring time and refresh token.
			*/
			res.send({user, token});
		} else {
			res.status(400).send('Invalid Credentials')
			next();
		}
	} catch (e) {
		console.log("error", e);
		res.status(400).send(e);
	}
})

module.exports = router;