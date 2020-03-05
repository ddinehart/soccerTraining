const mongoose = require('mongoose');

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


// sevenMinuteDrill: {
//   time: {
//     type: String,
//     required: true,
//   },
// }

module.exports = {
    Player: Player,
    SevenMinuteDrill: SevenMinuteDrill,
    TechnicalSkill: TechnicalSkill
};