module.exports =function(req, res, next){
	if(req.session.user){
		if(req.session.user.permission == "admin"){
			return next();
		}
	}
	previousURL=req.header('Referer') || '/';
	return res.redirect(previousURL);
};