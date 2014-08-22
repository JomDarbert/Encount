# ROUTER 
App.Router.map ->
  @resource "user", path: "/:username", ->
    @resource "events", ->
      @route "completed"
      @route "upcoming"
      @route "registered"

# ROUTES

App.ApplicationRoute = Ember.Route.extend
  beforeModel: (transition) ->
    unless @controllerFor("index").get("userIsLoggedIn")
      @transitionTo "index"

App.IndexRoute = Ember.Route.extend
  model: -> this.store.find('user')

App.EventsRoute = Ember.Route.extend
  model: -> this.store.find('event')

App.EventsIndexRoute = Ember.Route.extend
  model: -> @modelFor "events"

App.EventsUpcomingRoute = Ember.Route.extend(
  model: ->
    @store.filter "event", (evt) ->
      evt.get("isUpcoming")

  renderTemplate: (controller) ->
    @render "events/index",
      controller: controller
)

App.EventsRegisteredRoute = Ember.Route.extend(
  model: ->
    username = @modelFor("user").username
    @store.filter "event", (evt) ->
      evt.get("participants").findBy('username',username)

  renderTemplate: (controller) ->
    @render "events/index",
      controller: controller
)

App.EventsCompletedRoute = Ember.Route.extend(
  model: ->
    @store.filter "event", (evt) ->
      evt.get("isCompleted")

  renderTemplate: (controller) ->
    @render "events/index",
      controller: controller
)