const db = require('../db');

var eventController = {

    createEvent(req, res){
//id  is increem
        db('events').insert({
            user_guid: req.user.guid,            
            event_name: req.body.event_name,
            img: req.body.img,
            description: req.body.desc,
            date:req.body.date,
            location: req.body.loc
        }).asCallback(function(err, result){
            if(!err)
            res.redirect('/events');
            else
            console.log(err);
        });
    },

    getEvents(req,res){
        db('events').select().asCallback(function(err, data){
            res.render('events', {events: data, user: req.user});
        });
        
    },

    editEvent(req, res){
     
     db('events').where('id',req.params.eid).first().asCallback(function(err, event){
         console.log(event); 
        res.render('edit_event',{'event': event, user: req.user});
     });
    },

    SaveEditEvent(req, res){
        db('events')
            .where('id',req.params.eid) //here we checking the event exists 
            .where('user_guid', req.user.guid) //here we are checking if the user is ownerr yeah
            .update({
            img: req.body.img,
            description: req.body.desc,
            date:req.body.date,
            location: req.body.loc
            }).asCallback(function(err, data){
                if(err)
                res.send("unable to update some error occurrred");
                else
                res.redirect('/events');
            });
    }
}

module.exports = eventController;