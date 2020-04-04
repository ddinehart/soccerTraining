const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://dylan:Rho26zIUaKc2rcOQ@ddinehart-kqodd.mongodb.net/Soccer?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true });

// var Player = mongoose.model('Player', {
//   name: String,
//   pin: String
// });
var Player = mongoose.model('Player', {
  name: {
    type: String,
    required: true,
  },
});

var SevenMinuteDrill = mongoose.model('SevenMinuteDrill', {
  time: {
    type: String,
    required: true,
  },
});

var TechnicalSkill = mongoose.model('TechnicalSkill', {
  shooting: {
    type: Number,
    required: [true, "Rating must be provided"],
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must be at most 10"]
  },
  passing: {
    type: Number,
    required: [true, "Rating must be provided"],
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must be at most 10"]
  },
  dribbling: {
    type: Number,
    required: [true, "Rating must be provided"],
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must be at most 10"]
  },
  turning: {
    type: Number,
    required: [true, "Rating must be provided"],
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must be at most 10"]
  },
  receiving: {
    type: Number,
    required: [true, "Rating must be provided"],
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must be at most 10"]
  },
  aerial: {
    type: Number,
    required: [true, "Rating must be provided"],
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must be at most 10"]
  },
  attacking: {
    type: Number,
    required: [true, "Rating must be provided"],
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must be at most 10"]
  },
});

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email must be provided"],
    unique: true
  },
  encryptedPassword: {
    type: String,
    required: true,
  }
});

userSchema.methods.setEncryptedPassword = function (plainPassword, callbackFunction) {
  bcrypt.hash(plainPassword, 12).then(hash => {
    this.encryptedPassword = hash;
    callbackFunction();
  });
};

userSchema.methods.verifyPassword = function (plainPassword, callbackFunction) {
  bcrypt.compare(plainPassword, this.encryptedPassword).then(result => {
    callbackFunction(result);
  });
};

var User = mongoose.model('User', userSchema);

module.exports = {
    Player: Player,
    SevenMinuteDrill: SevenMinuteDrill,
    TechnicalSkill: TechnicalSkill,
    User: User
};