module.exports = function(req,res){
	req.assert('nserie', 'Número de série inválido').notEmpty();
	req.assert('cnpj', 'CNPJ inválido').notEmpty();

	var validateErros = req.validationErrors() || [];
	if(validateErros.length > 0){
		validateErros.forEach(function(e){
			req.flash('erro', e.msg);
		});
		return false;
	} else {
		return true;
	}
};