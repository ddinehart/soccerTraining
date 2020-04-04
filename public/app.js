var getSevenMinuteDrillsFromServer = function () {
  return fetch("https://fast-citadel-67412.herokuapp.com/sevenMinuteDrills");
};

var createSevenMinuteDrillOnServer = function (newSevenMinuteDrillTime) {
  var data = `time=${encodeURIComponent(newSevenMinuteDrillTime)}`;
  console.log("data seven min drill", newSevenMinuteDrillTime)
  
  return fetch("https://fast-citadel-67412.herokuapp.com/sevenMinuteDrills", {
    body: data,
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

var loginUserOnServer = function (email, plainPassword) {
  var data = `email=${encodeURIComponent(email)}`;
  data += "&plainPassword=" + encodeURIComponent(plainPassword);
  console.log("email, plain pass", data)
  
  // return fetch("http://localhost:3001/session", {
  return fetch("https://fast-citadel-67412.herokuapp.com/session", {
    body: data,
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

var deleteSessionOnServer = function () {
  return fetch("https://fast-citadel-67412.herokuapp.com/session", {
    method: "DELETE",
    credentials: "include",
  });
}

var checkIfLoggedInOnServer = function () {
  return fetch("https://fast-citadel-67412.herokuapp.com/session", {
      method: "GET",
      credentials: "include"
  })
}

var signUpUserOnServer = function (email, plainPassword) {
  var data = `email=${encodeURIComponent(email)}`;
  data += "&plainPassword=" + encodeURIComponent(plainPassword);
  console.log("email, plainPassword", data)
  
  // return fetch("http://localhost:3001/users", {
  return fetch("https://fast-citadel-67412.herokuapp.com/users", {
    body: data,
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

var updateSevenMinuteDrillOnServer = function (id, time) {
  var data = `time=${encodeURIComponent(time)}`;
  console.log("data seven min drill", id, time)
  console.log("dataaaaaaaaaaaaaa", data)

  return fetch("https://fast-citadel-67412.herokuapp.com/sevenMinuteDrills/" + id, {
    method: "PUT",
    credentials: "include",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

var deleteSevenMinuteDrillOnServer = function (sevenMinuteDrillId) {
  console.log("called Delete seven", sevenMinuteDrillId)
  // var data = `sevenMinuteDrillId=${encodeURIComponent(sevenMinuteDrillId)}`;
  console.log("data seven min drill", sevenMinuteDrillId)

  return fetch("https://fast-citadel-67412.herokuapp.com/sevenMinuteDrills/" + sevenMinuteDrillId, {
    method: "DELETE",
    credentials: "include",
  });
};

var getTechnicalSkillsFromServer = function () {
  return fetch("https://fast-citadel-67412.herokuapp.com/technicalSkills");
};

var createTechnicalSkillOnServer = function (newTechnicalSkillShooting, newTechnicalSkillPassing, newTechnicalSkillDribbling, newTechnicalSkillTurning, newTechnicalSkillReceiving, newTechnicalSkillAerial, newTechnicalSkillAttacking) {
  var data = `shooting=${encodeURIComponent(newTechnicalSkillShooting)}`;
  data += "&passing=" + encodeURIComponent(newTechnicalSkillPassing);
  data += "&dribbling=" + encodeURIComponent(newTechnicalSkillDribbling);
  data += "&turning=" + encodeURIComponent(newTechnicalSkillTurning);
  data += "&receiving=" + encodeURIComponent(newTechnicalSkillReceiving);
  data += "&aerial=" + encodeURIComponent(newTechnicalSkillAerial);
  data += "&attacking=" + encodeURIComponent(newTechnicalSkillAttacking);


  return fetch("https://fast-citadel-67412.herokuapp.com/technicalSkills", {
    body: data,
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

var deleteTechnicalSkillOnServer = function (technicalSkillId) {
  console.log("called Delete seven", technicalSkillId)
  // var data = `sevenMinuteDrillId=${encodeURIComponent(sevenMinuteDrillId)}`;
  console.log("data seven min drill", technicalSkillId)

  return fetch("https://fast-citadel-67412.herokuapp.com/technicalSkills/" + technicalSkillId, {
    method: "DELETE",
    credentials: "include",
  });
};

var updateTechnicalSkillOnServer = function (id, shooting, passing, dribbling, turning, receiving, aerial, attacking) {
  var data = `shooting=${encodeURIComponent(shooting)}`; 
  data += "&passing=" + encodeURIComponent(passing);
  data += "&dribbling=" + encodeURIComponent(dribbling);
  data += "&turning=" + encodeURIComponent(turning);
  data += "&receiving=" + encodeURIComponent(receiving);
  data += "&aerial=" + encodeURIComponent(aerial);
  data += "&attacking=" + encodeURIComponent(attacking);
  console.log("dataaaaaaaaaaaaaa", data)

  return fetch("https://fast-citadel-67412.herokuapp.com/technicalSkills/" + id, {
    method: "PUT",
    credentials: "include",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }

  });

};


var app = new Vue({
  el: "#app",
  data: {
    sevenMinuteDrills: [],
    technicalSkills: [],
    newSevenMinuteDrillTime: "",
    newTechnicalSkillShooting: "",
    newTechnicalSkillPassing: "",
    newTechnicalSkillDribbling: "",
    newTechnicalSkillTurning: "",
    newTechnicalSkillReceiving: "",
    newTechnicalSkillAerial: "",
    newTechnicalSkillAttacking: "",
    editItemClickedId: "",
    emailField: "",
    passwordField: "",
    loggedIn: false,

    
    showEditSevenMinuteDrillForm: false,
    showLoginForm: false,
    showSignUpForm: false,
    showEditTechnicalSkillForm: false,
    showSevenMinuteDrillForm: false,
    showCreateTechnicalForm: false,
    showTableDisplay: false,

    errors: []
  },
  methods: {
    validateSevenMinuteDrill: function () {
      this.errors = [];

      if (this.newSevenMinuteDrillTime == "") {
        this.errors.push("Please enter a seven title.");
      }


      if (this.errors.length > 0) {
        return false;
      } else {
        return true;
      }
    },
    saveSevenMinuteDrill: function () {
      this.showSevenMinuteDrillForm = false;
      this.showTableDisplay = true;
      this.showSevenMinuteDrills();
      // perform client validation before sending request
      if (this.validateSevenMinuteDrill()) {
        createSevenMinuteDrillOnServer(this.newSevenMinuteDrillTime).then((response) => {
          if (response.status == 201) {
            console.log("made it")
            this.showCreatePhysicalForm = false;
            this.showCreateTechnicalForm = false;
            this.newSevenMinuteDrillTime = "";
            this.showSevenMinuteDrillForm = false;
            // this.newSevenMinuteDrillRating = "";
          } else if (response.status == 422) {
            // server validation error
          } else {
            // unexpected server error
            alert("something terrible happened. oh no.");
          }
        });
      }
    },
    editSevenMinuteDrill: function (id, time) {
      console.log("update!!!!!!!!!!!!!!!!!!!!!!!!!!!", id, time)
      this.showEditTechnicalSkillForm = false
      this.showEditSevenMinuteDrillForm = true;
      this.newSevenMinuteDrillTime = time;
      this.editItemClickedId = id;
      console.log("update", this.newSevenMinuteDrillTime)
      
      },
      updateSevenMinuteDrill: function (time) {
        console.log("Made it to update call", this.editItemClickedId, time)
        // perform client validation before sending request
        updateSevenMinuteDrillOnServer(this.editItemClickedId, time).then((response) => {
            if (response.status == 200) {
              this.showSevenMinuteDrills();
              this.showCreatePhysicalForm = false;
              this.showCreateTechnicalForm = false;
              this.newSevenMinuteDrillTime = time;
              this.showEditTechnicalSkillForm = false
              // this.newSevenMinuteDrillRating = "";
            } else if (response.status == 422) {
              // server validation error
            } else {
              // unexpected server error
              alert("something terrible happened. oh no.");
            }
          });
      },
    // },
    
    deleteSevenMinuteDrill: function (sevenMinuteDrillId) {
      // perform client validation before sending request
      deleteSevenMinuteDrillOnServer(sevenMinuteDrillId).then((response) => {
          if (response.status == 200) {
            this.showSevenMinuteDrills();
            // this.showCreatePhysicalForm = false;
            this.showCreateTechnicalForm = false;
            this.newSevenMinuteDrillTime = "";
            // this.newSevenMinuteDrillRating = "";
          } else if (response.status == 422) {
            // server validation error
          } else {
            // unexpected server error
            alert("something terrible happened. oh no.");
          }
        });
    },
    
    showSevenMinuteDrills: function () {
      getSevenMinuteDrillsFromServer().then((response) => {
        response.json().then((sevenMinuteDrills) => {
          console.log("here be sevenMinuteDrills:", sevenMinuteDrills);
          this.sevenMinuteDrills = sevenMinuteDrills;
        });
      });
    },


    validateTechnicalSkill: function () {
      this.errors = [];

      if (parseInt(this.newTechnicalSkillShooting, 10) < 1) {
        this.errors.push("The minimum rating is 1.");
      } else if (parseInt(this.newTechnicalSkillShooting, 10) > 10) {
        this.errors.push("The maximum rating is 10.");
      }

      if (parseInt(this.newTechnicalSkillPassing, 10) < 1) {
        this.errors.push("The minimum rating is 1.");
      } else if (parseInt(this.newTechnicalSkillPassing, 10) > 10) {
        this.errors.push("The maximum rating is 10.");
      }
      if (parseInt(this.newTechnicalSkillDribbling, 10) < 1) {
        this.errors.push("The minimum rating is 1.");
      } else if (parseInt(this.newTechnicalSkillDribbling, 10) > 10) {
        this.errors.push("The maximum rating is 10.");
      }
      if (parseInt(this.newTechnicalSkillTurning, 10) < 1) {
        this.errors.push("The minimum rating is 1.");
      } else if (parseInt(this.newTechnicalSkillTurning, 10) > 10) {
        this.errors.push("The maximum rating is 10.");
      }
      if (parseInt(this.newTechnicalSkillReceiving, 10) < 1) {
        this.errors.push("The minimum rating is 1.");
      } else if (parseInt(this.newTechnicalSkillReceiving, 10) > 10) {
        this.errors.push("The maximum rating is 10.");
      }
      if (parseInt(this.newTechnicalSkillAerial, 10) < 1) {
        this.errors.push("The minimum rating is 1.");
      } else if (parseInt(this.newTechnicalSkillAerial, 10) > 10) {
        this.errors.push("The maximum rating is 10.");
      }
      if (parseInt(this.newTechnicalSkillAttacking, 10) < 1) {
        this.errors.push("The minimum rating is 1.");
      } else if (parseInt(this.newTechnicalSkillAttacking, 10) > 10) {
        this.errors.push("The maximum rating is 10.");
      }

      if (this.errors.length > 0) {
        return false;
      } else {
        return true;
      }
    },

    saveTechnicalSkill: function () {

      // perform client validation before sending request
      if (this.validateTechnicalSkill()) {
        createTechnicalSkillOnServer(this.newTechnicalSkillShooting, this.newTechnicalSkillPassing, this.newTechnicalSkillDribbling, this.newTechnicalSkillTurning, this.newTechnicalSkillReceiving, this.newTechnicalSkillAerial, this.newTechnicalSkillAttacking).then((response) => {
          if (response.status == 201) {
            this.showTechnicalSkills();
            // this.showCreatePhysicalForm = false;
            this.showCreateTechnicalForm = false;
            this.newTechnicalSkillShooting = "";
            this.newTechnicalSkillPassing = "";
            this.newTechnicalSkillDribbling = "";
            this.newTechnicalSkillTurning = "";
            this.newTechnicalSkillReceiving = "";
            this.newTechnicalSkillAerial = "";
            this.newTechnicalSkillAttacking = "";
            // this.newSevenMinuteDrillRating = "";
  	} else if (response.status == 422) {
            // server validation error
          } else {
            // unexpected server error
            alert("something terrible happened. oh no.");
          }
        });
      }
    },
    editTechnicalSkill: function (id, shooting, passing, dribbling, turning, receiving, aerial, attacking) {
      console.log("edit!!!!!!!!!!!!!!!!!!!!!!!!!!!", id, shooting, passing, dribbling, turning, receiving, aerial, attacking)
     
      this.showEditTechnicalSkillForm = true
      this.showEditSevenMinuteDrillForm = false;
      this.newTechnicalSkillShooting = shooting;
      this.newTechnicalSkillPassing = passing;
      this.newTechnicalSkillDribbling = dribbling;
      this.newTechnicalSkillTurning = turning;
      this.newTechnicalSkillReceiving = receiving;
      this.newTechnicalSkillAerial = aerial;
      this.newTechnicalSkillAttacking = attacking;
      this.editItemClickedId = id;
      // console.log("update", this.newSevenMinuteDrillTime)
      
    },
    updateTechnicalSkill: function (shooting, passing, dribbling, turning, receiving, aerial, attacking) {
      console.log("Made it to update call", this.editItemClickedId)
      // perform client validation before sending request
      updateTechnicalSkillOnServer(this.editItemClickedId, shooting, passing, dribbling, turning, receiving, aerial, attacking).then((response) => {
          if (response.status == 200) {
            this.showTechnicalSkills();
            this.showCreatePhysicalForm = false;
            this.showCreateTechnicalForm = false;
            this.newTechnicalSkillShooting = shooting;
            this.newTechnicalSkillPassing = passing;
            this.newTechnicalSkillDribbling = dribbling;
            this.newTechnicalSkillTurning = turning;
            this.newTechnicalSkillReceiving = receiving;
            this.newTechnicalSkillAerial = aerial;
            this.newTechnicalSkillAttacking = attacking;
            // this.newSevenMinuteDrillRating = "";
          } else if (response.status == 422) {
            // server validation error
          } else {
            // unexpected server error
            alert("something terrible happened. oh no.");
          }
        });
    },
    deleteTechnicalSkill: function (technicalSkillId) {
      // perform client validation before sending request
      deleteTechnicalSkillOnServer(technicalSkillId).then((response) => {
          if (response.status == 200) {
            this.showTechnicalSkills();
            // this.showCreatePhysicalForm = false;
            this.showCreateTechnicalForm = false;
            this.newTechnicalSkillTime = "";
            // this.newSevenMinuteDrillRating = "";
          } else if (response.status == 422) {
            // server validation error
          } else {
            // unexpected server error
            alert("something terrible happened. oh no.");
          }
        });
    },
    showTechnicalSkills: function () {
      this.showTableDisplay = true;

      getTechnicalSkillsFromServer().then((response) => {
        response.json().then((technicalSkills) => {
          console.log("here be technicalSkills:", technicalSkills);
          this.technicalSkills = technicalSkills;
	      });
      });
    },
    addSevenMinuteDrill: function () {
      if (this.loggedIn = true) {
      this.showCreateTechnicalForm = false;
      // this.showCreatePhysicalForm = false;
      this.showSevenMinuteDrillForm = true;
      this.showTableDisplay = false;
      }
    },
    addTechnicalSkill: function () {
      if (this.loggedIn = true) {

        this.showCreateTechnicalForm = true;
        // this.showCreatePhysicalForm = false;
        this.showTableDisplay = false;
        this.showSevenMinuteDrillForm = false;
      }
    },
    checkForUserLogin: function () {
      loginUserOnServer(this.emailField, this.passwordField).then((res) => {
        if (res.status == 201) {
          console.log("success")
          this.loggedIn = true;
          
          this.showLoginForm = false;
          this.showTableDisplay = true;
          this.showTechnicalSkills = true;
          this.showSevenMinuteDrills = true;
        } else {
          alert("Login attempt failed please try again")
        }
        this.showSevenMinuteDrills();
        this.showTechnicalSkills();
      })
    },

    checkForUserSignUp: function () {
      signUpUserOnServer(this.emailField, this.passwordField).then((res) => {
        if (res.status == 201) {
          console.log("success")
          
          this.showTableDisplay = true;
          this.showTechnicalSkills = true;
          this.showSevenMinuteDrills = true;
          this.showSevenMinuteDrills();
          this.showTechnicalSkills();
          
        } else {
          alert("Sign in failed, email may already exist")
        }
      })
    },

    login: function () {
      this.showLoginForm = true;
      this.showSignUpForm = false;
      this.showCreateTechnicalForm = false;
      this.showSevenMinuteDrillForm = false;
      this.showTableDisplay = false; 
    },

    logout: function () {
      deleteSessionOnServer().then((res) => {
        this.loggedIn = false
        this.showLoginForm = false;
        this.showSignUpForm = false;
        this.showCreateTechnicalForm = false;
        this.showSevenMinuteDrillForm = false;
        this.showTableDisplay = false; 
      })
    },
    signUp: function () {
      this.showSignUpForm = true;
      this.showLoginForm = false;
      this.showCreateTechnicalForm = false;
      this.showSevenMinuteDrillForm = false;
      this.showTableDisplay = false;
    }
  },
  created: function () {
    console.log("VUE LOADED.");
    checkIfLoggedInOnServer().then((response) => {
      if (response.status == 200) {
          this.loggedIn = true;
          this.showTableDisplay = true;
          this.showSevenMinuteDrills();
          this.showTechnicalSkills();
      } else {
          this.loggedIn = false;
      }
  });
  }
});
