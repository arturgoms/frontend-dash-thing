module.exports = function(app){
	var home = app.controllers.home;
	var auth = require('../middleware/auth');

	app.route('/')
		.get(home.login)
		.post(home.auth);
	app.route('/dashboard').get(auth, home.index);
	app.route('/logout').get(home.logout);
	app.route('/mail')
		.get(home.email)
		.post(home.enviar);

}