var nodemailer = require('nodemailer');

module.exports = function(app) {
	var validation = require('../config/validations/login');
	var validacao = require('../config/validations/ocorr');
	var ocorr = app.models.ocorr;
	var user = app.models.users;
	var HomeController = {
		index: function(req,res){
			res.render('home');
		},
		dashboard: function(req,res){
			ocorr.find(function(err, data){
				if(err){
					req.flash('erro', 'Error ao buscar usuários: '+err);
					res.redirect('/user');
				} else {
					res.render('dashboard/index', {
						lista:data, 
						logged_id: req.session.user._id,
						permission: req.session.user.permission,
						title: 'Dashboard',
						data: [3,4,6,5,2,12]
					});
				}
			});
		},
		login: function(req,res){
			res.render('user/login');

		},
		register: function(req,res){
			res.render('dashboard/register');

		},
		excluir: function(req,res){
			ocorr.remove({
				_id: req.params.id
			}, function(err){
				if(err){
					req.flash('erro', 'Error ao deletar ocorrência: '+err);
					res.redirect('/dashboard');
				} else {
					req.flash('info', 'Ocorrência deletada!');
					res.redirect('/dashboard');
				}
			});

		},
		edit: function(req,res){
			res.render('user/login');

		},
		salvar: function(req,res){
			if(validacao(req,res)){
				var model = new ocorr(req.body);
				model.type = req.body.type;
				model.local = req.body.local;
				model.date 	   = Date.now();
				model.reporter = req.body.reporter;
				model.vitims = req.body.vitims;
				console.log(model.nserie);
				ocorr.findOne({'nserie': model.nserie}, function(err,dados){
					if(err){
						req.flash('erro', "Erro ao carregar: "+err);
						res.render('dashboard/register', {model:model});
					}else{
						model.save(function(err){
							if(err){
								req.flash('erro', "Erro ao Cadastrar: "+err);
								res.redirect('/ocorr/register', {model:model});
							} else {
								req.flash('info', "Registro cadastrado com sucesso!");
							}
						});
						req.flash('info', "Ocorrência cadastrada com sucesso! Aguarde o administrador aprovar.");
						res.redirect('/dashboard');

					}
				});
			} else {
				res.render('dashboard/register', {model:req.body});
			}
		},
		update: function(req,res){
			res.render('user/login');

		},
		profile: function(req,res){
			ocorr.findById(req.params.id, function(err,dados){
				if(err){
					req.flash('erro', 'Error ao visualizar Ocorrência: '+err);
					res.redirect('/dashboard');
				} else{
					res.render('dashboard/profile', {dados:dados});

				}
			});

		},
		aprovar: function(req,res){
			ocorr.findById(req.params.id, function(err, data){
				var model = data;
				model.approved = true;
				model.save(function(err){
				if(err){
					req.flash('erro', 'Error ao editar: '+err);
					res.render('dashboard/index', {dados:model});
				} else {
					req.flash('info', 'Ocorrência atualizada!');
					res.redirect('/dashboard' );
				}
				});

			});

		},
		auth: function(req,res){
			var usuario  = new user();
			var matricula    = req.body.matricula;
			var password = req.body.password;

			if(validation(req,res)){
				user.findOne({'matricula': matricula}, function(err, data){
					if(err){
						req.flash('erro', 'Erro ao entrar no sistema: '+err);
						res.redirect('/login');
					} else if(!data){
						req.flash('erro', 'Matrícula não encontrado');
						res.redirect('/login');
					} else if(!usuario.compareHash(password, data.password)){
						req.flash('erro', 'Senha errada');
						res.redirect('/login');
					} else {
						req.session.user = data;
						res.redirect('/dashboard');
					}
				});
			} else {
				res.redirect('/login');
			}

		},

		logout: function(req,res){
			req.session.destroy();
			res.redirect('/');
		},

		email: function(req,res){
			res.render('user/mail');
		},
		enviar: function(req,res){
			var transport = nodemailer.createTransport({
				host: 'smtp.gmail.com',
				port: 465,
				secure: true,
				auth: {
					user: 'motomcogroup.aws@gmail.com',
					pass: 'xobyabytxtzdcwio'
				}
			});

			var mailOpts = {
				from: req.body.name+"<"+req.body.email+">",
				to: "motomcogroup.aws@gmail.com",
				subject: req.body.assunto,
				text: req.body.mensagem

			}

			transport.sendMail(mailOpts, function(err, response){
				if(err){
					req.flash('erro', 'Erro ao enviar email '+err);
					res.redirect('/mail');
				}

					req.flash('info', 'Email enviado!');
					res.render('user/mail');
			});
		}
	};

	return HomeController;
}