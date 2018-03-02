module.exports = function(app){
	var user = app.controllers.users;
	var auth = require('../middleware/admin');
	app.route('/user').get(auth,user.index);
	app.route('/register')
		.get(user.register)
		.post(user.post);
	app.route('/profile/:id').get(auth,user.profile);
	app.route('/delete/:id').post(user.delete);
	app.route('/edit/:id').get(auth,user.edit);
	app.route('/edit/:id').post(user.update);
}