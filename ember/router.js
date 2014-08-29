App.Router.map(function() {
  return this.resource("user", {
    path: '/:user_name'
  }, function() {
    return this.resource("encounter", {
      path: '/:encounter_name'
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
