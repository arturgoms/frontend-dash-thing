var mongoose = require('mongoose');
module.exports = function(){
	var ocorrSchema = mongoose.Schema({
		type:  {type: String,  trim:true},
		date:   {type: Date, dafault: Date.now},
		local:    {type: String,  trim:true},
		reporter:  {type: String,  trim:true},
		vitims:   {type: String,  trim:true},
        pictures: {type: String, trim:true},
		approved:   {type: Boolean,default:false, trim:true}
	});


	return mongoose.model('ocorr', ocorrSchema);
}