const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// Set up auth
const withAuth = require('./auth/middleware');
// Import our User schema
const User = require('./models/User.js');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 4000;
const secret = 'mysecretsshhh';

let Task = require('./models/Task');

// Set up express app
const app = express();
app.use(cors());
app.use(bodyParser.json()); // get information from html forms
app.use(cookieParser());
app.use(express.json());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


// Set up database
const configDB = require('./config/config.js');
mongoose.connect(configDB.url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on('error', (error) => console.error(error));
connection.once('open', function() {
    console.log('MongoDB database connection established successfully');
});


app.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
  });

// POST route to register a user
app.post('/api/register', function(req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      res.status(500)
        .send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: false })
            .sendStatus(200);
        }
      });
    }
  });
});


// Get all tasks listed
app.get('/api/team', function(req, res) {
  User.find(function(err, users) {
      if (err) {
          console.log(err);
      } else {
          res.json(users);
      }
  })
});


// Get all tasks listed
app.get('/api', function(req, res) {
    Task.find(function(err, tasks) {
        if (err) {
            console.log(err);
        } else {
            res.json(tasks);
        }
    }).sort({ _id: -1 })
});

// Add a new task
app.post('/api/add', function(req, res) {
    let task = new Task(req.body);
    task.save()
        .then(task => {
            res.status(200).json({'message': 'New task added successfully'});
        })
        .catch(err => {
            res.status(400).send('Adding new task failed');
        });
});

// Get single task

app.get('/api/:id', function(req, res) {
    Task.findById(req.params.id, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
});

// Edit a task
app.put('/api/:id', function(req, res) {

    Task.findById(req.params.id, function(err, task) {

        if (err)
            res.send(err);

        task.description = req.body.description;  
        task.duration = req.body.duration; 
        task.project = req.body.project; 

        // save 
        task.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Task updated!' });
        });

    });
});

// Delete a task
app.delete('/api/delete/:taskId', function(req, res) {
    Task.findByIdAndRemove(req.params.taskId, {useFindAndModify: false})
    .then(task => {
        if(!task) {
            return res.status(200).json({'message': 'Task not found'});
        }
        res.status(200).json({'message': 'Task deleted'});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "task not found with id " + req.params.taskId
            });                
        }
        return res.status(500).send({
            message: "Could not delete task with id " + req.params.taskId
        });
    });
});


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Start server to listen
app.listen(PORT, function() {
    console.log('Server is running on port: ' + PORT);
});