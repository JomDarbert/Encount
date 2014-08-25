# ROUTER 
App.Router.map ->
  @resource "user", path: "/:username", ->
    @resource "events", ->
      @route "completed"
      @route "upcoming"
      @route "registered"

# ROUTES

App.ApplicationRoute = Ember.Route.extend