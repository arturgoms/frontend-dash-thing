var url = require('url');

module.exports = function(req,res,app){
	var createUrl = url.parse(req.url).pathname == "/register";
	var updateUrl = !createUrl;

	req.assert('name', "Informe o seu Nome").notEmpty();

	req.assert('idade', "Informe o sua idade").notEmpty();

	req.assert('matricula', "Informe o sua Matrícula").notEmpty();

	req.assert('patente', "Informe o sua Patente").notEmpty();


	if(createUrl){
		req.assert('email', 'Email inválido').isEmail();
		req.assert('password', 'Sua senha deve conter mais de 8 caracteres').isLength({ min: 8 });
	}
	var validateErros = req.validationErrors() || [];

	if(req.body.password != req.body.passwordconfirmed){
		validateErros.push({msg: 'Senhas não conferem'});
	}

	if(validateErros.length > 0){
		validateErros.forEach(function(e){
			req.flash('erro', e.msg);
		});
		return false;
	} else {
		return true;
	}


}