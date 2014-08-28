# ROUTER 
App.Router.map ->
  @resource "user", ->
    @resource "encounter", ->
        @resource "player"
        @resource "creature", ->
            @resource "ability"

# ROUTES
App.IndexRoute = Ember.Route.extend
  model: -> this.store.find('user')