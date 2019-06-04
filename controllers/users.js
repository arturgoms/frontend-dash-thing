module.exports = function(app) {
	var validation = require('../config/validations/users');
	var user = app.models.users;

	var UserController = {
		index: function(req,res){
			user.find(function(err, data){
				if(err){
					req.flash('erro', 'Error ao buscar usuários: '+err);
					res.redirect('/user');
				} else {
					res.render('user/index', {lista:data, logged_id: req.session.user._id});
				}
			});
		},
		register: function(req,res){
			res.render('user/register');
		},
		post: function(req,res){
			if(validation(req,res)){
				var model      = new user();
				model.name     = req.body.name;
				model.patente  = req.body.patente;
				model.idade    = req.body.idade;
				model.matricula= req.body.matricula;
				model.email    = req.body.email;
				model.date 	   = Date.now();
				model.password = model.generateHash(req.body.password);
				user.findOne({'matricula': model.matricula},function(err,dados){
					if(dados){
						req.flash('erro', 'Essa matrícula já existe');
						res.render('user/register', {dados:model});
					} else {
						model.save(function(err){
							if(err){
								req.flash('erro', 'Error ao cadastrar usuários: '+err);
								res.render('user/register',{
									user: req.body
								});
							} else {
								req.flash('info', 'Registro cadastrado com sucesso!');
								res.redirect('/login');
							}
						});
					}
				});
				
			} else {
				res.render('user/register', {dados: req.body});
			}
			

		},
		profile: function(req,res){
			user.findById(req.params.id, function(err,dados){
				if(err){
					req.flash('erro', 'Error ao visualizar usuários: '+err);
					res.redirect('/user');
				} else{
					res.render('user/profile', {dados:dados});

				}
			});
		},
		delete: function(req, res){
			user.remove({
				_id: req.params.id
			}, function(err){
				if(err){
					req.flash('erro', 'Error ao deletar usuários: '+err);
					res.redirect('/user');
				} else {
					req.flash('info', 'Usuário deletado!');
					res.redirect('/user');
				}
			});
		},
		edit: function(req,res){
			user.findById(req.params.id, function(err, data){
				if(err){
					req.flash('erro', 'Error ao editar: '+err);
					res.redirect('/user');
				} else {
					req.flash('info', 'Usuário deletado!');
					res.render('user/edit', {dados:data} );
				}
			});
		},
		update: function(req,res){
			user.findById(req.params.id, function(err, data){
				var model = data;
				model.name = req.body.name;
				model.username = req.body.username;
				model.email = req.body.email;
				model.idade = req.body.idade;
				model.patente = req.body.patente;
				model.save(function(err){
				if(err){
					req.flash('erro', 'Error ao editar: '+err);
					res.render('user/edit', {dados:model});
				} else {
					req.flash('info', 'Usuário editado!');
					res.redirect('/user' );
				}
				});

			});
		}
	};

	return UserController;
};