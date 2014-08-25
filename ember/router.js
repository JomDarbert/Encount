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

App.ApplicationRoute = Ember.Route.extend;
