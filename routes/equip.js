module.exports = function(app){
	var equip = app.controllers.equip;

	app.route('/equip').get(equip.index);
	app.route('/equip/register')
		.get(equip.register)
		.post(equip.salvar);

	app.route('/equip/profile/:id').get(equip.show);
	app.route('/equip/delete/:id').post(equip.excluir);
	app.route('/equip/edit/:id')
		.get(equip.edit)
		.post(equip.update);

};