App.Router.map(function() {
  return this.resource("user", {
    path: "/:username"
  }, function() {
    return this.resource("events", function() {
      this.route("completed");
      this.route("upcoming");
      return this.route("registered");
    });
  });
});

App.ApplicationRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    if (!this.controllerFor("index").get("userIsLoggedIn")) {
      return this.transitionTo("index");
    }
  }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('user');
  }
});

App.EventsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('event');
  }
});

App.EventsIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor("events");
  }
});

App.EventsUpcomingRoute = Ember.Route.extend({
  model: function() {
    return this.store.filter("event", function(evt) {
      return evt.get("isUpcoming");
    });
  },
  renderTemplate: function(controller) {
    return this.render("events/index", {
      controller: controller
    });
  }
});

App.EventsRegisteredRoute = Ember.Route.extend({
  model: function() {
    var username;
    username = this.modelFor("user").username;
    return this.store.filter("event", function(evt) {
      return evt.get("participants").findBy('username', username);
    });
  },
  renderTemplate: function(controller) {
    return this.render("events/index", {
      controller: controller
    });
  }
});

App.EventsCompletedRoute = Ember.Route.extend({
  model: function() {
    return this.store.filter("event", function(evt) {
      return evt.get("isCompleted");
    });
  },
  renderTemplate: function(controller) {
    return this.render("events/index", {
      controller: controller
    });
  }
});
