


var check = function(req, res, next){
    
    if(req.user.profile_created == 0){
        res.redirect('/profile/create');       
     }else{
        next();
    }

}

module.exports = check;