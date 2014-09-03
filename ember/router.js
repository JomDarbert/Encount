App.Router.map(function() {
  return this.resource("user", {
    path: '/:user_name'
  }, function() {
    this.resource("encounter", {
      path: '/:encounter_name'
    });
    this.resource("creature", {
      path: '/:creature_name'
    });
    return this.resource("player", {
      path: '/:player_name'
    });
  });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('user');
  }
});

App.UserRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('user', params.id);
  }
});

App.EncounterRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('encounter', params.id);
  }
});

App.CreatureRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('creature', params.id);
  }
});

App.PlayerRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('player', params.id);
  }
});
