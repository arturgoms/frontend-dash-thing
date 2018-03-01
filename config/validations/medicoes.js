module.exports = function(req,res){
	req.assert('valAssin', 'Valores Assinados inválidos').notEmpty();
	req.assert('idCurva', 'ID da Curva inválido').notEmpty();
	req.assert('chaveP', 'Chave inválida');
	req.assert('validade', 'Validade inválida');
	req.assert('umidade', 'Umidade inválida').notEmpty();
	req.assert('assinatura', 'Assinatura inválida');
	req.assert('nomeGrao', 'Nome da curva inválida').notEmpty();
	req.assert('idCalib', 'ID da calibração inválida');
	req.assert('data', 'Data inválida');

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