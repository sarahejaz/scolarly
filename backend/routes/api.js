const express = require('express');
const app = express();
const registerRoute = express.Router();
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../database/db'); // Import database configuration
var passport = require('passport');
let Note = require('../models/note');
// Register model
let User = require('../models/user');
let Assignment = require('../models/assignment');
let Reminder = require('../models/reminder');
var path = require('path');
const multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../src/assets/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //Appending extension
  }
})
var upload = multer({ storage: storage }).any('file');
const fs = require('fs');

registerRoute.route('/getNotes').get((req, res) => {
  Note.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//create coach
registerRoute.route('/createNote').post((req, res, next) => {
  Note.create(req.body, (error, data) => {
    if (error) {
      
      return next(error)
    } else {
      console.log(data.description);
      res.json(data)
    }
  })
});

registerRoute.route('/uploadTimetable').post((req, res, next) => {
  upload(req,res,function(err){
      if(err){
           res.json({error_code:1,err_desc:err});
           return;
      }
       res.json({error_code:0,err_desc:null});
  })
});

registerRoute.route('/deleteTimetable/:id').delete((req, res, next) => {
  try {
    fs.unlinkSync('../src/assets/uploads/'+req.params.id);
    console.log('successfully deleted file');
    res.json({error_code:0,err_desc:null});
  } catch (err) {
    console.log("not deleted");
  }
})

registerRoute.route('/getTimetables').get((req, res) => {
    fs.readdir("../src/assets/uploads/", function (err, files) {
      //handling error
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      } 
      //listing all files using forEach
      var allpaths=[];
      files.forEach(function (file) {
          // Do whatever you want to do with the file
          //console.log(file);
          allpaths.push(file);
      });
      res.json(allpaths);
  });

});




// Add/Register
registerRoute.route('/signup').post((req, res, next) => {
  User.create(req.body, (error, data) => {
    //console.log(req.body.username);
    //console.log(data);
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

/*registerRoute.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {

    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function (err) {
      if (err) { return res.status(501).json(err); }
      console.log("logIn being called");
      console.log('logged in: ' + req.isAuthenticated());
      console.log(req.user);
      req.session.user = req.user;
      return res.status(200).json(user);

    });
  })(req, res, next);
});

registerRoute.use((req, res, next) => {

  const token = req.headers['authorization']; // Create token found in headers
  console.log("token thingy = " + token);
  // Check if token was found in headers
  if (!token) {
    console.log("token is nottttttt valid");
    res.json({ success: false, message: 'No token provided' }); // Return error
  } else {
    // Verify the token is valid
    console.log("token is valid");
    jwt.verify(token, config.secret, (err, decoded) => {
      // Check if error is expired or invalid
      if (err) {
        res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
      } else {
        req.decoded = decoded; // Create global variable to use in any request beyond
        next(); // Exit middleware
      }
    });
  }
});



  /*User.findOne({ _id: req.user._id }).select('username email').exec((err, user) => {
    // Check if error connecting
    if (err) {
      res.json({ success: false, message: err }); // Return error
    } else {
      // Check if user was found in database
      if (!user) {
        res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
      } else {
        res.json({ success: true, user: user }); // Return success, send user object to frontend for profile
      }
    }
  });
  
  */



// Get All Registered people
registerRoute.route('/users').get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

registerRoute.route('/read/:id').get((req, res) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


registerRoute.route('/readNote/:id').get((req, res) => {
  Note.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//update in Coach
registerRoute.route('/updateNote/:id').put((req, res, next) => {
  Note.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data)
      console.log('Data updated successfully in DB')
    }

  })
})



registerRoute.route('/deleteNote/:id').delete((req, res, next) => {
  Note.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
      console.log(req.params.id);
    }
  })
})


// ============================================================ ASSIGNMENTS ============================================================

registerRoute.route('/getAssignments').get((req, res) => {
  Assignment.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

registerRoute.route('/createAssignment').post((req, res, next) => {
  Assignment.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

registerRoute.route('/readAssignment/:id').get((req, res) => {
  Assignment.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


registerRoute.route('/updateAssignment/:id').put((req, res, next) => {
  Assignment.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data)
      console.log('Data updated successfully in DB')
    }

  })
})

registerRoute.route('/deleteAssignment/:id').delete((req, res, next) => {
  Assignment.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
      console.log(req.params.id);
    }
  })
})


// ============================================================ REMINDERS ============================================================

registerRoute.route('/getReminders').get((req, res) => {
  Reminder.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

registerRoute.route('/createReminder').post((req, res, next) => {
  Reminder.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

registerRoute.route('/readReminder/:id').get((req, res) => {
  Reminder.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


registerRoute.route('/updateReminder/:id').put((req, res, next) => {
  Reminder.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data)
      console.log('Data updated successfully in DB')
    }

  })
})

registerRoute.route('/deleteReminder/:id').delete((req, res, next) => {
  Reminder.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
      console.log(req.params.id);
    }
  })
})


/* ===============================================================
   Route to get user's profile data
=============================================================== */
registerRoute.get('/profile', (req, res) => {
  // Search for user in database
  User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
    // Check if error connecting
    if (err) {
      res.json({ success: false, message: err }); // Return error
    } else {
      // Check if user was found in database
      if (!user) {
        res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
      } else {
        res.json({ success: true, user: user }); // Return success, send user object to frontend for profile
      }
    }
  });
});
module.exports = registerRoute;
