App.IndexController = Ember.ArrayController.extend({
  userIsLoggedIn: false,
  enteredUsername: null,
  loggedInUser: null,
  errorMsg: null,
  roles: ["DPS", "Tank", "Healer"],
  classes: ["Warrior", "Stalker", "Engineer", "Spellslinger", "Esper", "Medic"],
  logRegVisible: true,
  loginVisible: false,
  registerVisible: false,
  rulesVisible: false,
  philosophyVisible: false,
  newsVisible: true,
  actions: {
    toggleLogin: function() {
      this.toggleProperty("loginVisible");
      this.set("registerVisible", false);
    },
    toggleRegister: function() {
      this.set("loginVisible", false);
      this.toggleProperty("registerVisible");
    },
    toggleRules: function() {
      this.set("rulesVisible", true);
      this.set("philosophyVisible", false);
      this.set("newsVisible", false);
    },
    togglePhilosophy: function() {
      this.set("philosophyVisible", true);
      this.set("rulesVisible", false);
      this.set("newsVisible", false);
    },
    toggleNews: function() {
      this.set("rulesVisible", false);
      this.set("philosophyVisible", false);
      this.set("newsVisible", true);
    },
    enterEvents: function() {
      var name, user;
      name = this.get("loggedInUser.username");
      user = this.get("model").findBy("username", name);
      if (user == null) {
        this.set("errorMsg", "You need to log in first!");
        return Ember.run.later(this, (function() {
          return this.set("errorMsg", null);
        }), 2000);
      } else {
        return this.transitionToRoute("events", {
          username: name
        });
      }
    },
    register: function() {
      var charClass, mainRole, name, newUser, offRole, pass, user;
      name = this.get("nu_username");
      pass = this.get("nu_password");
      mainRole = this.get("nu_mainRole");
      offRole = this.get("nu_offRole");
      charClass = this.get("nu_charclass");
      user = this.get("model").findBy("username", name);
      if (name == null) {
        this.set("errorMsg", "You must enter a username!");
        return Ember.run.later(this, (function() {
          return this.set("errorMsg", null);
        }), 2000);
      } else if (user == null) {
        newUser = this.store.createRecord("user", {
          username: name,
          password: pass,
          canCreateEvents: false,
          charclass: charClass,
          mainRole: mainRole,
          offRole: offRole,
          isProgression: false
        });
        newUser.save();
        this.set("loggedInUser", newUser);
        this.set("enteredUsername", name);
        this.set("userIsLoggedIn", true);
        this.set("logRegVisible", false);
        this.set("loginVisible", false);
        return this.set("registerVisible", false);
      } else {
        this.set("errorMsg", "User already exists!");
        return Ember.run.later(this, (function() {
          return this.set("errorMsg", null);
        }), 2000);
      }
    },
    login: function() {
      var name, pass, user, userPass;
      name = this.get("enteredUsername");
      pass = this.get("enteredPassword");
      user = this.get("model").findBy("username", name);
      userPass = user != null ? user.get("password") : void 0;
      if (user == null) {
        this.set("errorMsg", "User does not exist!");
        return Ember.run.later(this, (function() {
          return this.set("errorMsg", null);
        }), 2000);
      } else if (pass !== userPass) {
        this.set("errorMsg", "Incorrect password!");
        return Ember.run.later(this, (function() {
          return this.set("errorMsg", null);
        }), 2000);
      } else {
        this.set("loggedInUser", user);
        this.set("userIsLoggedIn", true);
        this.set("logRegVisible", false);
        this.set("loginVisible", false);
        return this.set("registerVisible", false);
      }
    }
  }
});

App.EventsUpcomingController = Ember.ArrayController.extend({
  sortProperties: ["date"],
  sortAscending: true,
  needs: "EventsIndex",
  eventsIndex: Ember.computed.alias("controllers.EventsIndex"),
  actions: {
    unsignup: function(event) {
      return this.get("eventsIndex").send('unsignup', event);
    },
    signup: function(event) {
      return this.get("eventsIndex").send('signup', event);
    }
  }
});

App.EventsRegisteredController = Ember.ArrayController.extend({
  sortProperties: ["date"],
  sortAscending: true,
  needs: "EventsIndex",
  eventsIndex: Ember.computed.alias("controllers.EventsIndex"),
  actions: {
    unsignup: function(event) {
      return this.get("eventsIndex").send('unsignup', event);
    }
  }
});

App.EventsCompletedController = Ember.ArrayController.extend({
  sortProperties: ["date"],
  sortAscending: true,
  needs: "EventsIndex"
});

App.EventsIndexController = Ember.ArrayController.extend({
  sortProperties: ["date"],
  sortAscending: true,
  needs: "index",
  index: Ember.computed.alias("controllers.index"),
  actions: {
    timeoutMessage: function(event, message, text) {
      event.set(message, text);
      return Ember.run.later(this, (function() {
        event.set(message, null);
        return event.save();
      }), 2000);
    },
    unsignup: function(event) {
      var user;
      user = this.get("index.loggedInUser");
      event.get("participants").removeObject(user);
      event.save();
    },
    signup: function(event) {
      var curUserClass, curUserIsProg, curUserMainRole, curUserName, error, maxDPS, maxH_esper, maxHealers, maxParticipants, maxTanks, numDPS, numH_esper, numHealers, numParticipants, numTanks, reqProg, requiredDPS, user, userDPS, userExists;
      user = this.get("index.loggedInUser");
      curUserName = this.get("index.loggedInUser.username");
      curUserMainRole = this.get("index.loggedInUser.mainRole");
      curUserClass = this.get("index.loggedInUser.charclass");
      curUserIsProg = this.get("index.loggedInUser.isProgression");
      userExists = false;
      userDPS = this.get("index.loggedInUser.dummyDPS");
      requiredDPS = event.get("requiredDPS");
      numParticipants = event.get("numParticipants");
      maxParticipants = event.get("maxParticipants");
      numHealers = event.get("numHealers");
      maxHealers = event.get("maxHealers");
      numTanks = event.get("numTanks");
      maxTanks = event.get("maxTanks");
      numDPS = event.get("numDPS");
      maxDPS = event.get("maxDPS");
      maxH_esper = event.get("maxH_esper");
      numH_esper = event.get("numH_esper");
      reqProg = event.get("requiresProgression");
      error = false;
      event.get("participants").forEach(function(user) {
        var name;
        name = user.get("username");
        if (name === curUserName) {
          return userExists = true;
        }
      });
      if (userExists) {
        this.send("timeoutMessage", event, "signupError", "You're already in that event!");
        error = true;
      }

      /*
      if numParticipants >= maxParticipants
        @send("timeoutMessage",event,"signupError","This event is full!")
        error = true
      
      if curUserMainRole is "Healer" 
        if numHealers >= maxHealers
          @send("timeoutMessage",event,"signupError","No more room for healers!")
          error = true
        else if curUserClass is "Esper" and maxH_esper? and numH_esper >= maxH_esper
          @send("timeoutMessage",event,"signupError","No more room for Esper healers!")
          error = true
        else if curUserClass is "Medic" and maxH_medic? and numH_medic >= maxH_medic
          @send("timeoutMessage",event,"signupError","No more room for Medic healers!")
          error = true
        else if curUserClass is "Spellslinger" and maxH_spellslinger? and numH_spellslinger >= maxH_spellslinger
          @send("timeoutMessage",event,"signupError","No more room for Spellslinger healers!")
          error = true
      
      if curUserMainRole is "Tank" 
        if numTanks >= maxTanks
          @send("timeoutMessage",event,"signupError","No more room for tanks!")
          error = true
        else if curUserClass is "Warrior" and maxT_warrior? and numT_warrior >= maxT_warrior
          @send("timeoutMessage",event,"signupError","No more room for Warrior tanks!")
          error = true
        else if curUserClass is "Stalker" and maxT_stalker? and numT_stalker >= maxT_stalker
          @send("timeoutMessage",event,"signupError","No more room for Stalker tanks!")
          error = true
        else if curUserClass is "Engineer" and maxT_engineer? and numT_engineer >= maxT_engineer
          @send("timeoutMessage",event,"signupError","No more room for Engineer tanks!")
          error = true
      
      if curUserMainRole is "DPS" 
        if numDPS >= maxDPS
          @send("timeoutMessage",event,"signupError","No more room for DPS!")
          error = true
        else if curUserClass is "Warrior" and maxD_warrior? and numD_warrior >= maxD_warrior
          @send("timeoutMessage",event,"signupError","No more room for Warrior DPS!")
          error = true
        else if curUserClass is "Stalker" and maxD_stalker? and numD_stalker >= maxD_stalker
          @send("timeoutMessage",event,"signupError","No more room for Stalker DPS!")
          error = true
        else if curUserClass is "Engineer" and maxD_engineer? and numD_engineer >= maxD_engineer
          @send("timeoutMessage",event,"signupError","No more room for Engineer DPS!")
          error = true
        else if curUserClass is "Esper" and maxD_esper? and numD_esper >= maxD_esper
          @send("timeoutMessage",event,"signupError","No more room for Esper DPS!")
          error = true
        else if curUserClass is "Medic" and maxD_medic? and numD_medic >= maxD_medic
          @send("timeoutMessage",event,"signupError","No more room for Medic DPS!")
          error = true
        else if curUserClass is "Spellslinger" and maxD_spellslinger? and numD_spellslinger >= maxD_spellslinger
          @send("timeoutMessage",event,"signupError","No more room for Spellslinger DPS!")
          error = true
       */
      if (curUserMainRole === "DPS" && userDPS < requiredDPS) {
        this.send("timeoutMessage", event, "signupError", "Your DPS is too low for this event! Talk to an officer if the DPS in your profile is out of date.");
      }
      if (reqProg === true && curUserIsProg === false) {
        this.send("timeoutMessage", event, "signupError", "You must be progression rank for this event!");
        error = true;
      }
      if (error === false) {
        event.get("participants").pushObject(this.get("index.loggedInUser"));
      }
      return event.save();
    }
  }
});

App.EventsController = Ember.ArrayController.extend({
  needs: "index",
  index: Ember.computed.alias("controllers.index"),
  saveUserMsg: null,
  saveLogMsg: null,
  saveEventMsg: null,
  createEventError: null,
  profileVisible: false,
  addEventVisible: false,
  editEventVisible: false,
  eventStatsVisible: false,
  editUsersVisible: false,
  eventTypes: ["Stormtalon's Lair", "Ruins of Kel'Voreth", "Skullcano", "Sanctuary of the Swordmaiden", "Genetic Archives", "Datascape", "To Be Determined"],
  actions: {
    saveUser: function(user) {
      user.save();
      this.set("saveUserMsg", "Saved!");
      return Ember.run.later(this, (function() {
        return this.set("saveUserMsg", null);
      }), 2000);
    },
    deleteUser: function(user) {
      return user.destroyRecord();
    },
    toggleProfile: function() {
      this.set("addEventVisible", false);
      this.set("editEventVisible", false);
      this.set("eventStatsVisible", false);
      this.set("editUsersVisible", false);
      this.toggleProperty("profileVisible");
    },
    toggleAddEvent: function() {
      this.set("profileVisible", false);
      this.set("editEventVisible", false);
      this.set("eventStatsVisible", false);
      this.set("editUsersVisible", false);
      this.toggleProperty("addEventVisible");
    },
    toggleEditEvent: function() {
      this.set("profileVisible", false);
      this.set("addEventVisible", false);
      this.set("eventStatsVisible", false);
      this.set("editUsersVisible", false);
      this.toggleProperty("editEventVisible");
    },
    toggleEventStats: function() {
      this.set("profileVisible", false);
      this.set("addEventVisible", false);
      this.set("editEventVisible", false);
      this.set("editUsersVisible", false);
      this.toggleProperty("eventStatsVisible");
    },
    toggleEditUsers: function() {
      this.set("profileVisible", false);
      this.set("addEventVisible", false);
      this.set("editEventVisible", false);
      this.set("eventStatsVisible", false);
      this.toggleProperty("editUsersVisible");
    },
    createEvent: function() {
      var date, datetime, eventType, f_date, leader, maxD, maxD_engineer, maxD_esper, maxD_medic, maxD_spellslinger, maxD_stalker, maxD_warrior, maxH, maxH_esper, maxH_medic, maxH_spellslinger, maxP, maxT, maxT_engineer, maxT_stalker, maxT_warrior, max_roles, newEvent, reqBoost, reqBuffFood, reqMedkit, reqProg, reqRegFood, requiredDPS, sum_dps, sum_healer, sum_tanks, time, title;
      title = this.get("ne_title");
      date = this.get("ne_date");
      leader = this.get("ne_leader");
      time = this.get("ne_time");
      datetime = moment(date + " " + time, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm");
      f_date = new Date(datetime);
      eventType = this.get("ne_eventType");
      requiredDPS = this.get("ne_requiredDPS");
      maxP = parseInt(this.get("ne_maxParticipants", 10));
      maxH = parseInt(this.get("ne_maxHealers", 10));
      maxH_medic = parseInt(this.get("ne_healer_maxMedic", 10));
      maxH_esper = parseInt(this.get("ne_healer_maxEsper", 10));
      maxH_spellslinger = parseInt(this.get("ne_healer_maxSpellslinger", 10));
      maxT = parseInt(this.get("ne_maxTanks", 10));
      maxT_stalker = parseInt(this.get("ne_tank_maxStalker", 10));
      maxT_warrior = parseInt(this.get("ne_tank_maxWarrior", 10));
      maxT_engineer = parseInt(this.get("ne_tank_maxEngineer", 10));
      maxD = parseInt(this.get("ne_maxDPS", 10));
      maxD_stalker = parseInt(this.get("ne_dps_maxStalker", 10));
      maxD_warrior = parseInt(this.get("ne_dps_maxWarrior", 10));
      maxD_engineer = parseInt(this.get("ne_dps_maxEngineer", 10));
      maxD_medic = parseInt(this.get("ne_dps_maxMedic", 10));
      maxD_esper = parseInt(this.get("ne_dps_maxEsper", 10));
      maxD_spellslinger = parseInt(this.get("ne_dps_maxSpellslinger", 10));
      max_roles = maxH + maxT + maxD;
      sum_tanks = parseInt(maxT_stalker + maxT_warrior + maxT_engineer);
      sum_healer = parseInt(maxH_medic + maxH_esper + maxH_spellslinger);
      sum_dps = parseInt(maxD_stalker + maxD_warrior + maxD_engineer + maxD_medic + maxD_esper + maxD_spellslinger);
      reqProg = this.get("ne_requiresProgression");
      reqRegFood = this.get("ne_requiresRegFood");
      reqBuffFood = this.get("ne_requiresBuffFood");
      reqBoost = this.get("ne_requiresBoost");
      reqMedkit = this.get("ne_requiresMedkit");
      if (title == null) {
        return this.set("createEventError", "Must enter a title!");
      } else if (date == null) {
        return this.set("createEventError", "Must enter a date!");
      } else if (time == null) {
        return this.set("createEventError", "Must enter a time!");
      } else if ((maxP == null) || maxP === "") {
        return this.set("createEventError", "Must enter maximum event size!");
      } else if ((maxH == null) || maxH === "") {
        return this.set("createEventError", "Must enter number of healers!");
      } else if ((maxT == null) || maxT === "") {
        return this.set("createEventError", "Must enter number of tanks!");
      } else if ((maxD == null) || maxD === "") {
        return this.set("createEventError", "Must enter number of DPS!");
      } else if (max_roles !== maxP) {
        return this.set("createEventError", "Maximum number of role slots (" + max_roles + ") doesn't equal maximum size of party (" + maxP + ")!");
      } else if (sum_tanks > maxT) {
        return this.set("createEventError", "Class maximums for tanks (" + sum_tank + ") exceeds maximum number of tank slots (" + maxT + ")!");
      } else if (sum_healer > maxH) {
        return this.set("createEventError", "Class maximums for healers (" + sum_healer + ") exceeds maximum number of healer slots (" + maxH + ")!");
      } else if (sum_dps > maxD) {
        return this.set("createEventError", "Class maximums for healers (" + sum_dps + ") exceeds maximum number of healer slots (" + maxD + ")!");
      } else {
        newEvent = this.store.createRecord("event", {
          title: title,
          date: f_date,
          type: eventType,
          leader: leader,
          maxParticipants: maxP,
          maxTanks: maxT,
          maxT_stalker: maxT_stalker || null,
          maxT_warrior: maxT_warrior || null,
          maxT_engineer: maxT_engineer || null,
          maxHealers: maxH,
          maxH_medic: maxH_medic || null,
          maxH_esper: maxH_esper || null,
          maxH_spellslinger: maxH_spellslinger || null,
          maxDPS: maxD,
          maxD_stalker: maxD_stalker || null,
          maxD_warrior: maxD_warrior || null,
          maxD_engineer: maxD_engineer || null,
          maxD_medic: maxD_medic || null,
          maxD_esper: maxD_esper || null,
          maxD_spellslinger: maxD_spellslinger || null,
          requiresProgression: reqProg,
          requiresRegFood: reqRegFood,
          requiresBuffFood: reqBuffFood,
          requiresBoosts: reqBoost,
          requiresMedkits: reqMedkit,
          requiredDPS: requiredDPS
        });
        newEvent.save();
        this.toggleProperty("addEventVisible");
        this.set("ne_title", null);
        this.set("ne_date", null);
        this.set("ne_time", null);
        this.set("ne_maxParticipants", null);
        this.set("ne_maxHealers", null);
        this.set("ne_healer_maxSpellslinger", null);
        this.set("ne_healer_maxEsper", null);
        this.set("ne_healer_maxMedic", null);
        this.set("ne_maxTanks", null);
        this.set("ne_tank_maxEngineer", null);
        this.set("ne_tank_maxWarrior", null);
        this.set("ne_tank_maxStalker", null);
        this.set("ne_maxDPS", null);
        this.set("ne_dps_maxSpellslinger", null);
        this.set("ne_dps_maxEsper", null);
        this.set("ne_dps_maxMedic", null);
        this.set("ne_dps_maxEngineer", null);
        this.set("ne_dps_maxWarrior", null);
        this.set("ne_dps_maxStalker", null);
        return this.set("createEventError", null);
      }
    },
    logout: function() {
      this.set("index.loggedInUser", null);
      this.set("index.userIsLoggedIn", false);
      this.set("index.enteredUsername", null);
      this.transitionToRoute("index");
      this.set("index.logRegVisible", true);
      this.set("index.nu_username", null);
      return this.set("index.nu_password", null);
    },
    deleteEvent: function(evt) {
      return evt.destroyRecord();
    },
    saveEvent: function(evt) {
      evt.save();
      this.set("saveEventMsg", "Saved!");
      return Ember.run.later(this, (function() {
        return this.set("saveEventMsg", null);
      }), 2000);
    }
  }
});
