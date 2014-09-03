App.IndexController = Ember.ArrayController.extend();

App.UserController = Ember.ObjectController.extend({
  showNewEncounter: false,
  showNewCreature: false,
  showNewPlayer: false,
  showNewEncounterButton: true,
  showNewCreatureButton: true,
  showNewPlayerButton: true,
  actions: {
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
      this.toggleProperty("showNewEncounter", true);
      this.toggleProperty("showNewEncounterButton", false);
    },
    toggle_new_creature: function() {
      this.toggleProperty("showNewCreature", true);
      this.toggleProperty("showNewCreatureButton", false);
    },
    toggle_new_player: function() {
      this.toggleProperty("showNewPlayer", true);
      this.toggleProperty("showNewPlayerButton", false);
    }
  }
});
