const db = require('../db');

var userController = {

    getAuth(req, res){
        res.render('auth');
    },

    getCreateProfile(req, res){
        res.render('create_profile',{user: req.user});
    },
 
    postCreateProfile(req, res){

        if(req.user.profile_created == 0){
            db('profiles').insert({
                user_guid: req.user.guid,
                username: Math.floor(Math.random() * 1000000000000000),
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                languages: req.body.languages,
                hostortraveller : req.body.hostortraveller,
                interests: req.body.interests
            }).asCallback(function(err, result) {
                if(!err)
                db('users').where('guid',req.user.guid).first().update({ profile_created: 1 }).asCallback();
            });

            req.user.profile_created = 1;
        }
       

        res.redirect('/home');
    },

    explore(req, res){
        res.render('explore', {user: req.user});
    },

    async showProfile(req, res){
        var profileD = await db('profiles').where('username',req.params.pid).select(['user_guid','languages','city','country']).first().catch(function(err){
            console.log("profile not found");     
        });
        var user = await db('users').where('guid',profileD.user_guid).first().catch(function(err){
            console.log('profile not found');
        });
        profileD.name = user.name;
        profileD.facebook_id = user.facebook_id;
        res.render('profile', {user: req.user, profile: profileD});
    }

}


module.exports = userController;