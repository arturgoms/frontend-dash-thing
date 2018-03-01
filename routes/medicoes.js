module.exports = function(app){
	var med = app.controllers.medicoes;
	var auth = require('../middleware/auth');
	app.route('/med/:id').get(med.index);
	app.route('/med/register/:id')
	.get(med.register)
	.post(med.post);
	app.route('/med/delete/:id/:equip').post(med.excluir);
}