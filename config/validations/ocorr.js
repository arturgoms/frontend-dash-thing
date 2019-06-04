module.exports = function(req,res){
	req.assert('type', 'Tipo da ocorrência é inválido').notEmpty();
	req.assert('date', 'Data da ocorrência inválida');
	req.assert('local', 'Local inválido').notEmpty();;
	req.assert('reporter', 'Reporter não existe').notEmpty();;
	req.assert('vitims', 'Vítimas inválidas').notEmpty();
	req.assert('pictures', 'Imagens inválidas');
	req.assert('approved', 'Nome da curva inválida');

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