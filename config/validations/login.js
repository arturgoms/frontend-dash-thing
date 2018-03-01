module.exports = function(req,res){
	req.assert('email', 'Email inválido').isEmail();
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