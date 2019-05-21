const FacebookStrategy = require('passport-facebook').Strategy;
const db = require('./db');
const guid = require('guid');
module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function(id, done) {
        var user = await db('users').where('id',id).select(['guid','name','profile_created','account_type']).first();
        if(user.profile_created === 1){
            var profile = await db('profiles').where('user_guid', user.guid).select(['username']).first();
            if(profile)
                user.username = profile.username;
        }else{
            user.username = "null";
        }
        user.n = user.name.split(" ")[0];
        done(null, user);
    });


    passport.use(new FacebookStrategy({
        clientID: process.env.FacebookAppId,
        clientSecret: process.env.FacebookAppSecret,
        callbackURL: process.env.FacebookCallbackUrl,
        profileFields: ['id', 'displayName', 'email','gender', 'picture.type(large)']
      },
      function(accessToken, refreshToken, profile, done) {
        process.nextTick(async function() {

            var user = await db('users').where('facebook_id',profile.id).first();
            
            if(user!=null){
                return done(null, user);
            }else{
                db('users').insert({
                    guid: guid.raw(),
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    facebook_auth_token: accessToken,
                    facebook_id: profile.id
                }).asCallback(function(err, result) {
                    if(!err)
                    return done(null, user);
                });
            }


        });
      }
    ));
}