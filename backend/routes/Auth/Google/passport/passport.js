const passport = require('passport');
const User = require("../../../services/users/models/User");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/api/auth/google/callback', // Update with your callback URL
		},
		(accessToken, refreshToken, user, done) => {
			// console.log('passport callback function fired:');
			// console.log({name: profile.displayName, email: profile.emails[0]['value']});
			return done(null, user);
		}
	)
);

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

module.exports = passport;