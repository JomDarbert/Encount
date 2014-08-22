App.Event = DS.Model.extend({
  title: DS.attr("string"),
  date: DS.attr("date", {
    defaultValue: new Date()
  }),
  type: DS.attr("string"),
  leader: DS.attr("string"),
  combatLog: DS.attr("string"),
  maxParticipants: DS.attr("number", {
    defaultValue: 5
  }),
  maxTanks: DS.attr("number", {
    defaultValue: 1
  }),
  maxT_stalker: DS.attr("number", {
    defaultValue: null
  }),
  maxT_engineer: DS.attr("number", {
    defaultValue: null
  }),
  maxT_warrior: DS.attr("number", {
    defaultValue: null
  }),
  maxHealers: DS.attr("number", {
    defaultValue: 1
  }),
  maxH_spellslinger: DS.attr("number", {
    defaultValue: null
  }),
  maxH_medic: DS.attr("number", {
    defaultValue: null
  }),
  maxH_esper: DS.attr("number", {
    defaultValue: null
  }),
  maxDPS: DS.attr("number", {
    defaultValue: 3
  }),
  maxD_spellslinger: DS.attr("number", {
    defaultValue: null
  }),
  maxD_medic: DS.attr("number", {
    defaultValue: null
  }),
  maxD_esper: DS.attr("number", {
    defaultValue: null
  }),
  maxD_stalker: DS.attr("number", {
    defaultValue: null
  }),
  maxD_engineer: DS.attr("number", {
    defaultValue: null
  }),
  maxD_warrior: DS.attr("number", {
    defaultValue: null
  }),
  requiresProgression: DS.attr("boolean", {
    defaultValue: true
  }),
  requiresBuffFood: DS.attr("boolean", {
    defaultValue: false
  }),
  requiresRegFood: DS.attr("boolean", {
    defaultValue: false
  }),
  requiresMedkits: DS.attr("boolean", {
    defaultValue: false
  }),
  requiresBoosts: DS.attr("boolean", {
    defaultValue: false
  }),
  requiredDPS: DS.attr("number", {
    defaultValue: null
  }),
  signupError: DS.attr("string", {
    defaultValue: null
  }),
  participants: DS.hasMany("user"),
  success: DS.attr("boolean"),
  bossesKilled: DS.attr("number"),
  archived: DS.attr("boolean"),
  notes: DS.attr("string"),
  numTanks: (function() {
    return this.get("participants").filterProperty('mainRole', 'Tank').length;
  }).property("participants.@each.mainRole"),
  numT_warrior: (function() {
    var count;
    count = this.get("participants").filter(function(user) {
      return user.get("mainRole").indexOf("Tank") !== -1 && user.get("charclass").indexOf("Warrior") !== -1;
    });
    return count.length;
  }).property("participants.@each.mainRole,participants.@each.charclass"),
  numT_stalker: (function() {
    var count;
    count = this.get("participants").filter(function(user) {
      return user.get("mainRole").indexOf("Tank") !== -1 && user.get("charclass").indexOf("Stalker") !== -1;
    });
    return count.length;
  }).property("participants.@each.mainRole,participants.@each.charclass"),
  numT_engineer: (function() {
    var count;
    count = this.get("participants").filter(function(user) {
      return user.get("mainRole").indexOf("Tank") !== -1 && user.get("charclass").indexOf("Engineer") !== -1;
    });
    return count.length;
  }).property("participants.@each.mainRole,participants.@each.charclass"),
  numHealers: (function() {
    return this.get("participants").filterProperty('mainRole', 'Healer').length;
  }).property("participants.@each.mainRole"),
  numH_esper: (function() {
    var count;
    count = this.get("participants").filter(function(user) {
      return user.get("mainRole").indexOf("Healer") !== -1 && user.get("charclass").indexOf("Esper") !== -1;
    });
    return count.length;
  }).property("participants.@each.mainRole,participants.@each.charclass"),
  numH_medic: (function() {
    var count;
    count = this.get("participants").filter(function(user) {
      return user.get("mainRole").indexOf("Healer") !== -1 && user.get("charclass").indexOf("Medic") !== -1;
    });
    return count.length;
  }).property("participants.@each.mainRole,participants.@each.charclass"),
  numH_spellslinger: (function() {
    var count;
    count = this.get("participants").filter(function(user) {
      return user.get("mainRole").indexOf("Healer") !== -1 && user.get("charclass").indexOf("Spellslinger") !== -1;
    });
    return count.length;
  }).property("participants.@each.mainRole,participants.@each.charclass"),
  numDPS: (function() {
    return this.get("participants").filterProperty('mainRole', 'DPS').length;
  }).property("participants.@each.mainRole"),
  numD_warrior: (function() {
    var count;
    count = this.get("participants").filter(function(user) {
      return user.get("mainRole").indexOf("DPS") !== -1 && user.get("charclass").indexOf("Warrior") !== -1;
    });
    return count.length;
  }).property("participants.@each.mainRole,participants.@each.charclass"),
  numD_stalker: (function() {
    var count;
    count = this.get("participants").filter(function(user) {
      return user.get("mainRole").indexOf("DPS") !== -1 && user.get("charclass").indexOf("Stalker") !== -1;
    });
    return count.length;
  }).property("participants.@each.mainRole,participants.@each.charclass"),
  numD_engineer: (function() {
    var count;
    count = this.get("participants").filter(function(user) {
      return user.get("mainRole").indexOf("DPS") !== -1 && user.get("charclass").indexOf("Engineer") !== -1;
    });
    return count.length;
  }).property("participants.@each.mainRole,participants.@each.charclass"),
  numD_esper: (function() {
    var count;
    count = this.get("participants").filter(function(user) {
      return user.get("mainRole").indexOf("DPS") !== -1 && user.get("charclass").indexOf("Esper") !== -1;
    });
    return count.length;
  }).property("participants.@each.mainRole,participants.@each.charclass"),
  numD_spellslinger: (function() {
    var count;
    count = this.get("participants").filter(function(user) {
      return user.get("mainRole").indexOf("DPS") !== -1 && user.get("charclass").indexOf("Spellslinger") !== -1;
    });
    return count.length;
  }).property("participants.@each.mainRole,participants.@each.charclass"),
  numD_medic: (function() {
    var count;
    count = this.get("participants").filter(function(user) {
      return user.get("mainRole").indexOf("DPS") !== -1 && user.get("charclass").indexOf("Medic") !== -1;
    });
    return count.length;
  }).property("participants.@each.mainRole,participants.@each.charclass"),
  isUpcoming: (function() {
    var eventDate, now;
    eventDate = this.get("date");
    now = new Date();
    return eventDate > now;
  }).property("event.@each.date"),
  isCompleted: (function() {
    var eventDate, now;
    eventDate = this.get("date");
    now = new Date();
    return eventDate < now;
  }).property("event.@each.date")
});

App.User = DS.Model.extend({
  username: DS.attr("string"),
  password: DS.attr("string"),
  canCreateEvents: DS.attr("boolean", {
    defaultValue: false
  }),
  charclass: DS.attr("string"),
  mainRole: DS.attr("string"),
  offRole: DS.attr("string"),
  isProgression: DS.attr("boolean", {
    defaultValue: false
  }),
  dummyDPS: DS.attr("number", {
    defaultValue: 0
  }),
  isTank: (function() {
    var mr;
    mr = this.get("mainRole");
    if (mr === "Tank") {
      return true;
    }
  }).property("mainRole"),
  isHealer: (function() {
    var mr;
    mr = this.get("mainRole");
    if (mr === "Healer") {
      return true;
    }
  }).property("mainRole"),
  isDPS: (function() {
    var mr;
    mr = this.get("mainRole");
    if (mr === "DPS") {
      return true;
    }
  }).property("mainRole")
});
