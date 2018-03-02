module.exports = function(app){
	var home = app.controllers.home;
	var auth = require('../middleware/auth');


	app.route('/').get(home.index);
	app.route('/login')
		.get(home.login)
		.post(home.auth);
	app.route('/dashboard').get(auth, home.dashboard);
	app.route('/logout').get(home.logout);
	app.route('/mail')
		.get(home.email)
		.post(home.enviar);

}