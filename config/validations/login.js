module.exports = function(req,res){
	req.assert('matricula', 'Matrícula inválida').notEmpty();
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