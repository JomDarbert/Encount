# INDEX
App.IndexController = Ember.ArrayController.extend(
  userIsLoggedIn: false
  enteredUsername: null
  loggedInUser: null
  errorMsg: null
  roles: ["DPS","Tank","Healer"]
  classes: ["Warrior","Stalker","Engineer","Spellslinger","Esper","Medic"]
  logRegVisible: true
  loginVisible: false
  registerVisible: false
  rulesVisible: false
  philosophyVisible: false
  newsVisible: true

  actions:
    toggleLogin: ->
      @toggleProperty "loginVisible"
      @set "registerVisible", false
      return

    toggleRegister: ->
      @set "loginVisible", false
      @toggleProperty "registerVisible"
      return

    toggleRules: ->
      @set "rulesVisible", true
      @set "philosophyVisible", false
      @set "newsVisible", false
      return

    togglePhilosophy: ->
      @set "philosophyVisible", true
      @set "rulesVisible", false
      @set "newsVisible", false
      return

    toggleNews: ->
      @set "rulesVisible", false
      @set "philosophyVisible", false
      @set "newsVisible", true
      return

    enterEvents: ->
      name      = @get "loggedInUser.username"
      user      = @get("model").findBy("username",name)

      if not user?
        @set("errorMsg","You need to log in first!")
        Ember.run.later this, (->
          @set("errorMsg",null)
        ), 2000
      else
        @transitionToRoute "events", {username: name}

    register: ->
      name      = @get "nu_username"
      pass      = @get "nu_password"
      mainRole  = @get "nu_mainRole"
      offRole   = @get "nu_offRole"
      charClass = @get "nu_charclass"
      user      = @get("model").findBy("username",name)

      if not name?
        @set("errorMsg","You must enter a username!")
        Ember.run.later this, (->
          @set("errorMsg",null)
        ), 2000   

      else if not user?
        newUser   = @store.createRecord("user",
          username: name
          password: pass
          canCreateEvents: false
          charclass: charClass
          mainRole: mainRole
          offRole: offRole
          isProgression: false
        )
        newUser.save()      
        @set "loggedInUser", newUser
        @set "enteredUsername", name
        @set "userIsLoggedIn", true
        @set "logRegVisible", false
        @set "loginVisible", false
        @set "registerVisible", false
        
      else
        @set("errorMsg","User already exists!")
        Ember.run.later this, (->
          @set("errorMsg",null)
        ), 2000        

    login: ->
      name = @get "enteredUsername"
      pass = @get "enteredPassword"
      user = @get("model").findBy("username",name)
      userPass = user?.get "password"

      if not user?
        @set("errorMsg","User does not exist!")
        Ember.run.later this, (->
          @set("errorMsg",null)
        ), 2000

      else if pass isnt userPass
        @set("errorMsg","Incorrect password!")
        Ember.run.later this, (->
          @set("errorMsg",null)
        ), 2000

      else
        @set "loggedInUser", user
        @set "userIsLoggedIn", true
        @set "logRegVisible", false
        @set "loginVisible", false
        @set "registerVisible", false
)


# EVENTS
App.EventsUpcomingController = Ember.ArrayController.extend(
  sortProperties: ["date"]
  sortAscending: true
  needs: "EventsIndex"
  eventsIndex: Ember.computed.alias("controllers.EventsIndex")
  actions:
    unsignup: (event) ->
      @get("eventsIndex").send('unsignup',event)

    signup: (event) ->
      @get("eventsIndex").send('signup',event)
)

App.EventsRegisteredController = Ember.ArrayController.extend(
  sortProperties: ["date"]
  sortAscending: true
  needs: "EventsIndex"
  eventsIndex: Ember.computed.alias("controllers.EventsIndex")
  actions:
    unsignup: (event) ->
      @get("eventsIndex").send('unsignup',event)

)

App.EventsCompletedController = Ember.ArrayController.extend(
  sortProperties: ["date"]
  sortAscending: true
  needs: "EventsIndex"
)

App.EventsIndexController = Ember.ArrayController.extend(
  sortProperties: ["date"]
  sortAscending: true  
  needs: "index"
  index: Ember.computed.alias("controllers.index")

  actions:
    timeoutMessage: (event,message,text) ->
      event.set message,text
      Ember.run.later this, (->
        event.set message,null
        event.save()
      ), 2000

    unsignup: (event) ->
      user = @get "index.loggedInUser"
      event.get("participants").removeObject(user)
      event.save()
      return

    signup: (event) ->
      user = @get "index.loggedInUser"
      curUserName = @get "index.loggedInUser.username"
      curUserMainRole = @get "index.loggedInUser.mainRole"
      curUserClass = @get "index.loggedInUser.charclass"
      curUserIsProg = @get "index.loggedInUser.isProgression"
      userExists = false
      userDPS = @get "index.loggedInUser.dummyDPS"
      requiredDPS = event.get "requiredDPS"
      numParticipants = event.get "numParticipants"
      maxParticipants = event.get "maxParticipants"
      numHealers = event.get "numHealers"
      maxHealers = event.get "maxHealers"
      numTanks = event.get "numTanks"
      maxTanks = event.get "maxTanks"
      numDPS = event.get "numDPS"
      maxDPS = event.get "maxDPS"
      maxH_esper = event.get "maxH_esper"
      numH_esper = event.get "numH_esper"

      reqProg = event.get "requiresProgression"

      error = false


      #check if user exists
      event.get("participants").forEach (user) ->
        name = user.get "username"
        if name is curUserName then userExists = true

      #add user to event if it passes checks
      if userExists 
        @send("timeoutMessage",event,"signupError","You're already in that event!")
        error = true

      ###
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
      ###
      
      if curUserMainRole is "DPS" and userDPS < requiredDPS
        @send("timeoutMessage",event,"signupError","Your DPS is too low for this event! Talk to an officer if the DPS in your profile is out of date.")

      if reqProg is true and curUserIsProg is false
        @send("timeoutMessage",event,"signupError","You must be progression rank for this event!")
        error = true

      if error is false then event.get("participants").pushObject(@get "index.loggedInUser")

      event.save()
)

App.EventsController = Ember.ArrayController.extend(
  needs: "index"
  index: Ember.computed.alias("controllers.index")
  saveUserMsg: null
  saveLogMsg: null
  saveEventMsg: null
  createEventError: null
  profileVisible: false
  addEventVisible: false
  editEventVisible: false
  eventStatsVisible: false
  editUsersVisible: false
  eventTypes: ["Stormtalon's Lair","Ruins of Kel'Voreth","Skullcano","Sanctuary of the Swordmaiden","Genetic Archives","Datascape","To Be Determined"]

  actions:
    saveUser: (user) ->
      user.save()
      @set "saveUserMsg","Saved!"
      Ember.run.later this, (->
        @set("saveUserMsg",null)
      ), 2000

    deleteUser: (user) ->
      user.destroyRecord()

    toggleProfile: ->
      @set "addEventVisible",false
      @set "editEventVisible", false
      @set "eventStatsVisible", false
      @set "editUsersVisible", false
      @toggleProperty "profileVisible"
      return

    toggleAddEvent: ->
      @set "profileVisible",false
      @set "editEventVisible", false
      @set "eventStatsVisible", false
      @set "editUsersVisible", false
      @toggleProperty "addEventVisible"
      return

    toggleEditEvent: ->
      @set "profileVisible",false
      @set "addEventVisible", false
      @set "eventStatsVisible", false
      @set "editUsersVisible", false
      @toggleProperty "editEventVisible"
      return

    toggleEventStats: ->
      @set "profileVisible",false
      @set "addEventVisible", false
      @set "editEventVisible", false
      @set "editUsersVisible", false
      @toggleProperty "eventStatsVisible"
      return

    toggleEditUsers: ->
      @set "profileVisible",false
      @set "addEventVisible", false
      @set "editEventVisible", false
      @set "eventStatsVisible", false
      @toggleProperty "editUsersVisible"
      return

    createEvent: ->
      title             = @get "ne_title"
      date              = @get "ne_date"
      leader            = @get "ne_leader"
      time              = @get "ne_time"
      datetime          = moment(date+" "+time,"YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm")
      f_date            = new Date(datetime)
      eventType         = @get "ne_eventType"
      requiredDPS       = @get "ne_requiredDPS"
      maxP              = parseInt(@get "ne_maxParticipants",10)
      maxH              = parseInt(@get "ne_maxHealers",10)
      maxH_medic        = parseInt(@get "ne_healer_maxMedic",10)
      maxH_esper        = parseInt(@get "ne_healer_maxEsper",10)
      maxH_spellslinger = parseInt(@get "ne_healer_maxSpellslinger",10)
      maxT              = parseInt(@get "ne_maxTanks",10)
      maxT_stalker      = parseInt(@get "ne_tank_maxStalker",10)
      maxT_warrior      = parseInt(@get "ne_tank_maxWarrior",10)
      maxT_engineer     = parseInt(@get "ne_tank_maxEngineer",10)
      maxD              = parseInt(@get "ne_maxDPS",10)
      maxD_stalker      = parseInt(@get "ne_dps_maxStalker",10)
      maxD_warrior      = parseInt(@get "ne_dps_maxWarrior",10)
      maxD_engineer     = parseInt(@get "ne_dps_maxEngineer",10)
      maxD_medic        = parseInt(@get "ne_dps_maxMedic",10)
      maxD_esper        = parseInt(@get "ne_dps_maxEsper",10)
      maxD_spellslinger = parseInt(@get "ne_dps_maxSpellslinger",10)      
      max_roles         = maxH + maxT + maxD
      sum_tanks         = parseInt(maxT_stalker + maxT_warrior + maxT_engineer)
      sum_healer        = parseInt(maxH_medic + maxH_esper + maxH_spellslinger)
      sum_dps           = parseInt(maxD_stalker + maxD_warrior + maxD_engineer + maxD_medic + maxD_esper + maxD_spellslinger)
      reqProg           = @get "ne_requiresProgression"
      reqRegFood        = @get "ne_requiresRegFood"
      reqBuffFood       = @get "ne_requiresBuffFood"
      reqBoost          = @get "ne_requiresBoost"
      reqMedkit         = @get "ne_requiresMedkit"

      if not title? 
        @set "createEventError","Must enter a title!"
      else if not date?
        @set "createEventError","Must enter a date!"
      else if not time?
        @set "createEventError","Must enter a time!"
      else if not maxP? or maxP is ""
        @set "createEventError","Must enter maximum event size!"
      else if not maxH? or maxH is ""
        @set "createEventError","Must enter number of healers!"
      else if not maxT? or maxT is ""
        @set "createEventError","Must enter number of tanks!" 
      else if not maxD? or maxD is ""
        @set "createEventError","Must enter number of DPS!"
      else if max_roles != maxP
        @set "createEventError","Maximum number of role slots ("+max_roles+") doesn't equal maximum size of party ("+maxP+")!"
      else if sum_tanks > maxT
        @set "createEventError","Class maximums for tanks ("+sum_tank+") exceeds maximum number of tank slots ("+maxT+")!"
      else if sum_healer > maxH
        @set "createEventError","Class maximums for healers ("+sum_healer+") exceeds maximum number of healer slots ("+maxH+")!"
      else if sum_dps > maxD
        @set "createEventError","Class maximums for healers ("+sum_dps+") exceeds maximum number of healer slots ("+maxD+")!"
      else
        newEvent = @store.createRecord("event",
          title: title
          date: f_date
          type: eventType
          leader: leader
          maxParticipants: maxP
          maxTanks: maxT
          maxT_stalker: maxT_stalker || null
          maxT_warrior: maxT_warrior || null
          maxT_engineer: maxT_engineer || null
          maxHealers: maxH
          maxH_medic: maxH_medic || null
          maxH_esper: maxH_esper || null
          maxH_spellslinger: maxH_spellslinger || null
          maxDPS: maxD
          maxD_stalker: maxD_stalker || null
          maxD_warrior: maxD_warrior || null
          maxD_engineer: maxD_engineer || null
          maxD_medic: maxD_medic || null
          maxD_esper: maxD_esper || null
          maxD_spellslinger: maxD_spellslinger || null
          requiresProgression: reqProg
          requiresRegFood: reqRegFood
          requiresBuffFood: reqBuffFood
          requiresBoosts: reqBoost
          requiresMedkits: reqMedkit
          requiredDPS: requiredDPS
        )

        newEvent.save()   
        @toggleProperty "addEventVisible"
        @set "ne_title", null
        @set "ne_date", null
        @set "ne_time", null
        @set "ne_maxParticipants", null
        @set "ne_maxHealers", null
        @set "ne_healer_maxSpellslinger", null
        @set "ne_healer_maxEsper", null
        @set "ne_healer_maxMedic", null
        @set "ne_maxTanks", null
        @set "ne_tank_maxEngineer", null
        @set "ne_tank_maxWarrior", null
        @set "ne_tank_maxStalker", null
        @set "ne_maxDPS", null
        @set "ne_dps_maxSpellslinger", null
        @set "ne_dps_maxEsper", null
        @set "ne_dps_maxMedic", null
        @set "ne_dps_maxEngineer", null
        @set "ne_dps_maxWarrior", null
        @set "ne_dps_maxStalker", null
        @set "createEventError", null

    logout: ->
        @set "index.loggedInUser", null
        @set "index.userIsLoggedIn", false
        @set "index.enteredUsername", null
        @transitionToRoute "index"
        @set "index.logRegVisible", true
        @set "index.nu_username", null
        @set "index.nu_password", null

    deleteEvent: (evt) ->
      evt.destroyRecord()

    saveEvent: (evt) ->
      evt.save()
      @set "saveEventMsg","Saved!"
      Ember.run.later this, (->
        @set("saveEventMsg",null)
      ), 2000
)