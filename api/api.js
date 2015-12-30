var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var Task = require('./models/Task.js');
var jwt = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function(user, done){
    done(null, user.id);
});
 
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

var strategyOptions = {
    usernameField: 'email'
};

var loginStrategy = new LocalStrategy(strategyOptions, function(email, password, done){
    var searchUser = {email: email};
    User.findOne(searchUser, function(err, user){
        if(err) return done(err);
        
        if(!user) return done(null, false, {
            message: 'Wrong email/password'
        });
        
        user.comparePasswords(password, function(err, isMatch){
            if(err) return done(err);
            
            if(!isMatch) return done(null, false, {
                message: 'Wrong email/password'
            });
            return done(null, user);
            
        });
    }); 
});

var registerStrategy = new LocalStrategy(strategyOptions, function(email, password, done){
      var searchUser = {
          email: email
      };
    
        User.findOne(searchUser, function(err, user){
            
        if(err) return done(err);
        
        if(!user) return done(null, false, {
            message: 'email already exists'
        });
        });
    var newUser = new User({
        email: email,
        password: password
    });
    
   
    newUser.save(function(err){
        done(null, newUser);
    });
});


passport.use('local-register', registerStrategy);
passport.use('local-login', loginStrategy);

app.post('/register', passport.authenticate('local-register'),function(req, res){
         createSendToken(req.user, res);  
});

app.post('/login', passport.authenticate('local-login'), function(req, res){
         createSendToken(req.user, res);
});
 
function createSendToken(user, res){
     var payload =  {
        sub: user.id
    }
    var token = jwt.encode(payload, "shhh..");
    res.status(200).send({
            user: user.toJSON(),
            token: token
        });
}

var tasks = [
    {text: 'Learning JS', done: false},
    {text: 'Coding .Net Programs', done: false},
    {text: 'Learning Algorithms', done: false},
    {text: 'Coding is simply superb', done: false}
];

app.param('task_id', function(req, res, next, taskId){
    req.db.tasks.findById(taskId, function(err, task){
        if(err) return next(err);
        if(!task) return next(new Error('Task not found'));
        req.task = task;
        return next();
    });
});

app.get('/jobs', function(req, res, done){
    
    if(!req.headers.authorization){
        return res.status(401).send({
            message: 'You are not authorized'
        });
    }
    
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, "shhh..");
    
    if(!payload.sub){
        res.status(401).send({
            message: 'Authentication Failed'
        });
    }
    Task.find({}, function(err, tasks){
       if(err) return console.error(err);
        console.log(tasks);
        res.json(tasks);
    });
    //res.json(tasks);
});

app.post('/jobs', function(req, res){
    if(!req.headers.authorization){
        return res.status(401).send({
            message: 'You are not authorized'
        });
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, "shhh..");
    
    if(!payload.sub){
        res.status(401).send({
            message: 'Authentication Failed'
        });
    }
    var mynewTask = new Task({
        text: req.body.text,
        Completed: false
    });
    mynewTask.save(function(err, mynewTask){
        console.log('Entered function');    
    });
    res.json(true);
});

app.delete('/jobs/:_id', function(req, res){
    if(tasks.length <= req.params.id){
        res.statusCode = 404;
        return res.send('Error no items left to delete');
    }
    Task.remove({_id: req.params._id}, function(err, result){
        if (err) throw err;
    });
    res.json(true);
});

mongoose.connect('mongodb://localhost/Todos');

var server = app.listen(3000, function(){
    console.log('api listening on port: ', server.address().port);
});


