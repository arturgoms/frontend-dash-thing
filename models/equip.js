var mongoose = require('mongoose');
module.exports = function(){
	var medicoesSchema = mongoose.Schema({
		valAssin:  {type: String,  trim:true},
		idCurva:   {type: String,  trim:true},
		chaveP:    {type: String,  trim:true},
		validade:  {type: String,  trim:true},
		umidade:   {type: String,  trim:true},
		assinatura:{type: String, trim:true},
		data:      {type: String,  trim:true},
		nomeGrao:  {type: String,  trim:true},
		idCalib:   {type: String, trim:true}
	});

	var equipSchema = mongoose.Schema({
		nserie:{type: String, required:true, trim:true},
		block: {type:Boolean, required:true},
		cnpj:  {type:String, required:true, trim:true},
		medicoes: [medicoesSchema],
		data_cad: {type: Date, default: Date.now}
	});

	return mongoose.model('equipamentos', equipSchema);
}