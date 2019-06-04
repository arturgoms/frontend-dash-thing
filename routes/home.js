module.exports = function(app){
	var home = app.controllers.home;
	var auth = require('../middleware/auth');
    var admin = require('../middleware/admin');

	app.route('/').get(home.index);
	app.route('/login')
		.get(home.login)
		.post(home.auth);
	app.route('/dashboard').get(auth, home.dashboard);
	app.route('/ocorr/profile/:id')
	.get(auth, home.profile);
	app.route('/ocorr/register')
	.get(auth, home.register)
	.post(auth, home.salvar);
	app.route('/ocorr/delete/:id').post(admin, home.excluir);
	app.route('/ocorr/approve/:id').post(admin, home.aprovar);
	app.route('/ocorr/edit/:id')
	.get(admin, home.edit)
	.post(admin, home.update);

	app.route('/logout').get(home.logout);
	app.route('/mail')
		.get(home.email)
		.post(home.enviar);

}