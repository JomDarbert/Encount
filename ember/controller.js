App.IndexController = Ember.ArrayController.extend();

App.UserController = Ember.ObjectController.extend({
  showNewEncounter: false,
  showNewCreature: false,
  showNewPlayer: false,
  showNewEncounterButton: true,
  showNewCreatureButton: true,
  showNewPlayerButton: true,
  encounterFilter: null,
  filteredEncounters: (function() {
    return console.log(this.get("encounterQuery"));
  }).property("encounterQuery"),
  actions: {
    find_encounter: function() {
      var query;
      query = this.get("encounterQuery");
      this.set("encounterFilter", query);
      console.log(query);
    },
    new_encounter: function(user, name) {
      var newEncounter;
      newEncounter = this.store.createRecord("encounter", {
        encounter_name: name,
        user: user
      });
      newEncounter.save();
      user.get("encounters").pushObject(newEncounter);
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
      newCreature.save();
      user.get("creatures").pushObject(newCreature);
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
      newPlayer.save();
      user.get("players").pushObject(newPlayer);
      this.set("showNewPlayer", false);
      this.set("showNewPlayerButton", true);
      this.set("newPlayerName", "");
    },
    toggle_new_encounter: function() {
      this.toggleProperty("showNewEncounter", this.toggleProperty("showNewEncounterButton"));
    },
    toggle_new_creature: function() {
      this.toggleProperty("showNewCreature");
      this.toggleProperty("showNewCreatureButton");
    },
    toggle_new_player: function() {
      this.toggleProperty("showNewPlayer");
      this.toggleProperty("showNewPlayerButton");
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
      newAbility.save();
      creature.get("abilities").pushObject(newAbility);
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
