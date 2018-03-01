var validacao = require('../config/validations/medicoes');
module.exports = function(app){
	var equip = app.models.equip;

	var medController = {
		index: function(req,res){
			var _id = req.params.id;
			equip.findById(_id, function(err, dados){
				if(err){
					req.flash('erro', 'Erro ao listar medicoes: '+err);
					res.render('medicoes/index', {lista:null});
				} 

				res.render('medicoes/index', {lista:dados.medicoes, id:_id});
			});
		},

		register: function(req, res){
			res.render('medicoes/register', {model: new equip(), id: req.params.id});
		},

		post: function(req,res){
			if(validacao(req,res)){
			var _id = req.params.id;
			console.log(_id);
			equip.findById(req.params.id, function(err, dados){
				var medicao = req.body.medicoes;

				console.log(medicao);
				dados.medicoes.push(medicao);
				dados.save(function(err){
					if(err){
						req.flash('erro', 'Erro ao cadastrar medicoes: '+err);
					}

					res.redirect('/med/'+ _id);
				});
			});
			} else {
				res.render('medicoes/register', {model: req.body, id: req.params.id});
			}
		},
		excluir: function(req,res){
			var _id = req.params.equip;
		    equip.findById(_id, function(err,dados){
				if(err){
					res.json(400, 'Erro ao encontrar contato para excluir: '+err);
				}

				var medID = req.params.id;
				dados.medicoes.id(medID).remove();
				dados.save(function(err){
					if(err){
						res.json(400, 'Erro ao salvar exclusao contato: '+err);
					}
					res.redirect('/med/'+_id);
				
				});
			});
		}
	}

	return medController;
}