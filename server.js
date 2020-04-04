const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express');
const session = require('express-session')
const passport = require('passport');
const passportLocal = require('passport-local');

const model = require('./model')
const app = express();

const port = process.env.PORT || 3001;

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.static('public'));
app.use(session({ secret: 'lkjfnvlieogdcurbyrp', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());


//passport configuration
passport.use(new passportLocal.Strategy({
  usernameField: 'email',
  passwordField: 'plainPassword'
}, function(email, plainPassword, done) {
  model.User.findOne({email: email }).then(function (user) {
    if (!user) {
      return done(null, false);
    } else {
      user.verifyPassword(plainPassword, function (result) {
        if (result) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  }).catch(function (err) {
    done(err);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(userId, done) {
  model.User.findOne({_id: userId}).then(function(user) {
    done(null, user);
  }).catch(function(err) {
    done(err)
  });
});

app.post('/session', passport.authenticate('local'), function(req, res) {
  // auth success, user logged in.
  res.sendStatus(201);
});

app.delete('/session', function (req, res) {
  //Authentication succeeded
  req.logOut()
  res.sendStatus(200)
})

app.get('/session', function (req, res) {
  if (req.user) {
    res.json(req.user)
  } else {
    res.sendStatus(401)
  }
})

app.get('/players', function (req, res) {
    res.set("Access-Control-Allow-Origin", "*")
    model.Player.find({}).then( (players) => {
    res.json(players);
    });
    // query the mongoose model
}); 

app.post('/players', function (req, res) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", req.body.name, "!!!!!!!!!!!!!!")
    //create an instance of the mongoose model
    let player = new model.Player({
      name: req.body.name,
      
      // physicalSkills: req.body.physicalSkills,
      // technicalSkills: req.body.technicalSkills
    });
    //Insert into mongoose model
    player.save().then(function () {
      // res.set("Access-Control-Allow-Origin", "*")
      res.sendStatus(201)
    }).catch(function (err) {
      
      if (err.errors) {

        var messages = {};
        for (let e in err.errors) {
          messages[e] = err.errors[e].message;
        }
        res.sendStatus(422).json(messages);
      } else {
        res.sendStatus(500);
      }

    })
});

app.get('/sevenMinuteDrills', function (req, res) {
  console.log("user/////////////////////////////////////", req.user)
  if (!req.user) {
    res.sendStatus(401);
    return
  }
  res.set("Access-Control-Allow-Origin", "*")
  model.SevenMinuteDrill.find({}).then( (sevenMinuteDrills) => {
  res.json(sevenMinuteDrills);
  });
  // query the mongoose model
});

app.post('/sevenMinuteDrills', function (req, res) {
  if (!req.user) {
    res.sendStatus(401);
    return
  }

  console.log("the body", req.body);
  res.set("Access-Control-Allow-Origin", "*")

  // create an instance of the mongoose model
  let sevenMinuteDrill = new model.SevenMinuteDrill({
    time: req.body.time,
  });

  // REST retrieve (member) action
// app.get('/sevenMinuteDrills/:sevenMinuteDrillId', function (req, res) {
//   console.log(sevenMinuteDrills)
//   let sevenMinuteDrillId = req.params.sevenMinuteDrillId;

//   // query the mongoose model
//   model.SevenMinuteDrill.findOne({ _id: sevenMinuteDrillId }).then(function (SevenMinuteDrill) {
//     // data now loaded
//     if (SevenMinuteDrill) {
//       res.json(SevenMinuteDrill);
//     } else {
//       res.sendStatus(404);
//     }
//   }).catch(function () {
//     res.sendStatus(400);
//   });
// });

  // insert into the mongoose model
  sevenMinuteDrill.save().then(function () {
    res.sendStatus(201);
  }).catch(function (err) {
    if (err.errors) {
      var messages = {};
      for (let e in err.errors) {
        messages[e] = err.errors[e].message;
      }
      res.status(422).json(messages);
    } else {
      res.sendStatus(500);
    }
  });
});

app.put('/sevenMinuteDrills/:sevenMinuteDrillId', function (req, res) {
  console.log("made it to put function")
  let sevenMinuteDrillId = req.params.sevenMinuteDrillId;
  console.log("the body", req.body.time);
  // create an instance of the mongoose model
  // model.SevenMinuteDrill.findOneAndUpdate({_id : sevenMinuteDrillId}, { $set: { time: req.body.time, }}).then(function() {
  model.SevenMinuteDrill.findOneAndUpdate({_id : sevenMinuteDrillId}, { $set: { time: req.body.time, }}).then(function() {
    // console.log(req.body.time)
    res.sendStatus(200)
  });
});

app.delete('/sevenMinuteDrills/:sevenMinuteDrillId', function (req, res) {
  let sevenMinuteDrillId = req.params.sevenMinuteDrillId;
  console.log("Id", sevenMinuteDrillId)

  // query the mongoose model
  model.SevenMinuteDrill.findOneAndDelete({ _id: sevenMinuteDrillId }).then(function (sevenMinuteDrill) {
    // data now loaded
    if (sevenMinuteDrill) {
      res.json(sevenMinuteDrill);
    } else {
      console.log(sevenMinuteDrillId)
      res.sendStatus(404);
    }
  }).catch(function () {
    res.sendStatus(400);
  });
});


app.get('/technicalSkills', function (req, res) {
  if (!req.user) {
    res.sendStatus(401);
    return
  }
  console.log("getting SEVEN")
  res.set("Access-Control-Allow-Origin", "*")
  model.TechnicalSkill.find({}).then( (technicalSkills) => {
  res.json(technicalSkills);
  });
  // query the mongoose model
});

app.post('/technicalSkills', function (req, res) {
  if (!req.user) {
    res.sendStatus(401);
    return
  }
  console.log("the body", req.body);
  res.set("Access-Control-Allow-Origin", "*")

  // create an instance of the mongoose model
  let technicalSkill = new model.TechnicalSkill({
    shooting: req.body.shooting,
    passing: req.body.passing,
    dribbling: req.body.dribbling,
    turning: req.body.turning,
    receiving: req.body.receiving,
    aerial: req.body.aerial,
    attacking: req.body.attacking,
  });

  // REST retrieve (member) action
// app.get('/technicalSKills/:technicalSkillId', function (req, res) {
//   console.log(sevenMinuteDrills)
//   let technicalSkillId = req.params.technicalSkillId;

//   // query the mongoose model
//   model.TechnicalSkill.findOne({ _id: technicalSkillId }).then(function (TechnicalSkill) {
//     // data now loaded
//     if (TechnicalSkill) {
//       res.json(TechnicalSkill);
//     } else {
//       res.sendStatus(404);
//     }
//   }).catch(function () {
//     res.sendStatus(400);
//   });
// });

  // insert into the mongoose model
  technicalSkill.save().then(function () {
    res.sendStatus(201);
  }).catch(function (err) {
    if (err.errors) {
      var messages = {};
      for (let e in err.errors) {
        messages[e] = err.errors[e].message;
      }
      res.status(422).json(messages);
    } else {
      res.sendStatus(500);
    }
  });
});

app.delete('/technicalSkills/:technicalSkillId', function (req, res) {
  let technicalSkillId = req.params.technicalSkillId;
  console.log("Id", technicalSkillId)

  // query the mongoose model
  model.TechnicalSkill.findOneAndDelete({ _id: technicalSkillId }).then(function (technicalSkill) {
    // data now loaded
    if (technicalSkill) {
      res.json(technicalSkill);
    } else {
      console.log(technicalSkillId)
      res.sendStatus(404);
    }
  }).catch(function () {
    res.sendStatus(400);
  });
});

app.put('/technicalSkills/:technicalSkillId', function (req, res) {
  console.log("made it to put function")
  let technicalSkillId = req.params.technicalSkillId;
  console.log("the body", req.body.shooting);
  // create an instance of the mongoose model
  model.TechnicalSkill.findOneAndUpdate({_id : technicalSkillId}, { $set: { shooting: req.body.shooting, passing: req.body.passing, dribbling: req.body.dribbling, turning: req.body.turning, receiving: req.body.receiving, aerial: req.body.aerial, attacking: req.body.attacking, }}).then(function() {
    // console.log(req.body.time)
    res.sendStatus(200)
  });
});

app.get('/sevenMinuteDrills', function (req, res) {
  console.log("getting SEVEN")
  res.set("Access-Control-Allow-Origin", "*")
  model.SevenMinuteDrill.find({}).then( (sevenMinuteDrills) => {
  res.json(sevenMinuteDrills);
  });
  // query the mongoose model
});

app.post('/users', function (req, res) {
  console.log("made it to user post!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!____________________________________");
  res.set("Access-Control-Allow-Origin", "*")
  // create an instance of the mongoose model
  let user = new model.User({
    email: req.body.email
  });

  user.setEncryptedPassword(req.body.plainPassword, function() {
    user.save().then(function() {
      res.sendStatus(201);
    }).catch(function(err) {
      if (err.errors) {
        var messages = {};
        for (let e in err.errors) {
          messages[e] = err.errors[e].message;
        }
        res.status(422).json(messages);
      } else {
        res.sendStatus(500);
      } 
    });
  });
});



app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);  
});

