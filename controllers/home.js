var nodemailer = require('nodemailer');

module.exports = function(app) {
	var validation = require('../config/validations/login');
	var user = app.models.users;
	var HomeController = {
		index: function(req,res){
			res.render('home');
		},
		dashboard: function(req,res){
			res.render('dashboard/index', { 
			  	title: 'Dashboard',
			  	data: [3,4,6,5,2,12]
			  });
		},
		login: function(req,res){
			res.render('user/login');

		},
		auth: function(req,res){
			var usuario  = new user();
			var email    = req.body.email;
			var password = req.body.password;

			if(validation(req,res)){
				user.findOne({'email': email}, function(err, data){
					if(err){
						req.flash('erro', 'Erro ao entrar no sistema: '+err);
						res.redirect('/login');
					} else if(!data){
						req.flash('erro', 'Email não encontrado');
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