const express = require('express');
const User = require("../../services/users/models/User");
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
	try {
		const existingUserByEmail = await User.findOne({ email: req.body.email });
		if (existingUserByEmail) {
			return res.status(400).send('Email Already in use');
		}
		
		const existingUserByUsername = await User.findOne({ username: req.body.username });
		if (existingUserByUsername) {
			return res.status(400).send('Username Already in use');
		}
		
		const user = new User(req.body);
		await user.save();
		console.group("User Registered")
		axios.post(`${process.env.FULL_URL}/api/login`, req.body)
			.then(response => {
				// console.log(response.data);
				res.send(response.data);
			})
			.catch(error => {
				console.log(error);
				res.status(400).send(error);
			});
	} catch (e) {
		res.status(400).send(e);
	}
});

module.exports = router;