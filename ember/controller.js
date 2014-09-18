App.IndexController = Ember.ArrayController.extend();

App.UserController = Ember.ObjectController.extend({
  tagName: 'section',
  showEncounter: true,
  showCreature: false,
  showPlayer: false,
  showNewEncounter: false,
  showNewCreature: false,
  showNewPlayer: false,
  showNewEncounterButton: true,
  showNewCreatureButton: true,
  showNewPlayerButton: true,
  encounterFilter: null,
  filteredEncounters: (function() {
    var query, results;
    query = this.get("encounterQuery");
    results = this.get("content.encounters");
    if (query) {
      results = results.filter(function(e) {
        return e.get("encounter_name").toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
    }
    return results;
  }).property("content", "encounterQuery"),
  filteredCreatures: (function() {
    var query, results;
    query = this.get("creatureQuery");
    results = this.get("content.creatures");
    if (query) {
      results = results.filter(function(e) {
        return e.get("creature_name").toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
    }
    return results;
  }).property("content", "creatureQuery"),
  filteredPlayers: (function() {
    var query, results;
    query = this.get("playerQuery");
    results = this.get("content.players");
    if (query) {
      results = results.filter(function(e) {
        return e.get("player_name").toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
    }
    return results;
  }).property("content", "playerQuery"),
  actions: {
    show_encounter: function() {
      this.set("showEncounter", true);
      this.set("showCreature", false);
      return this.set("showPlayer", false);
    },
    show_creature: function() {
      this.set("showCreature", true);
      this.set("showEncounter", false);
      return this.set("showPlayer", false);
    },
    show_player: function() {
      this.set("showPlayer", true);
      this.set("showCreature", false);
      return this.set("showEncounter", false);
    },
    show_none: function() {
      this.set("showEncounter", false);
      this.set("showCreature", false);
      return this.set("showPlayer", false);
    },
    new_encounter: function(user, name) {
      var newEncounter;
      newEncounter = this.store.createRecord("encounter", {
        encounter_name: name,
        user: user
      });
      user.get("encounters").then(function(encounters) {
        encounters.pushObject(newEncounter);
        return user.save();
      });
      this.set("showNewEncounter", false);
      this.set("showNewEncounterButton", true);
      this.set("newEncounterName", "");
    },
    new_creature: function(user, name) {
      var newCreature;
      newCreature = this.store.createRecord("creature", {
        creature_name: name,
        user: user
      });
      user.get("creatures").then(function(creatures) {
        creatures.pushObject(newCreature);
        return user.save();
      });
      this.set("showNewCreature", false);
      this.set("showNewCreatureButton", true);
      this.set("newCreatureName", "");
    },
    new_player: function(user, name) {
      var newPlayer;
      newPlayer = this.store.createRecord("player", {
        player_name: name,
        user: user
      });
      user.get("players").then(function(players) {
        players.pushObject(newPlayer);
        return user.save();
      });
      this.set("showNewPlayer", false);
      this.set("showNewPlayerButton", true);
      this.set("newPlayerName", "");
    },
    toggle_new_encounter: function() {
      this.toggleProperty("showNewEncounter");
      this.toggleProperty("showNewEncounterButton");
      setTimeout((function() {
        $("#newEncInput").focus();
      }), 0);
    },
    toggle_new_creature: function() {
      this.toggleProperty("showNewCreature");
      this.toggleProperty("showNewCreatureButton");
      setTimeout((function() {
        $("#newCreInput").focus();
      }), 0);
    },
    toggle_new_player: function() {
      this.toggleProperty("showNewPlayer");
      this.toggleProperty("showNewPlayerButton");
      setTimeout((function() {
        $("#newPlaInput").focus();
      }), 0);
    }
  }
});

App.CreatureController = Ember.ObjectController.extend({
  showNewAbility: false,
  showNewAbilityButton: true,
  actions: {
    new_ability: function(creature, name) {
      var newAbility;
      newAbility = this.store.createRecord("ability", {
        ability_name: name,
        creature: creature
      });
      creature.get("abilities").then(function(abilities) {
        abilities.pushObject(newAbility);
        return creature.save();
      });
      this.set("showNewAbility", false);
      this.set("showNewAbilityButton", true);
      this.set("newAbilityName", "");
    },
    toggle_new_ability: function() {
      this.toggleProperty("showNewAbility");
      this.toggleProperty("showNewAbilityButton");
    }
  }
});
