var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

module.exports = function(){
	var userSchema = mongoose.Schema({
		name:{
			type: String,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique:true,
			index:true
		},
		password: {
			type: String,
			required: true
		},
		date: {
			type: Date, dafault: Date.now
		},
		permission: {
			type: String, default: "user"
		}
	});

	userSchema.methods.generateHash = function(password){
		return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
	};

	userSchema.methods.compareHash = function(password, old_password){
		return bcrypt.compareSync(password, old_password, null);
	}
	return mongoose.model('dashboard', userSchema);
}