# ROUTER 
App.Router.map ->
    @resource "user", path: '/:user_name', ->
        @resource "encounter", path: '/:encounter_name'

# ROUTES
App.IndexRoute = Ember.Route.extend
    model: -> @store.find('user')

App.UserRoute = Ember.Route.extend
    model: (params) -> @store.find('user',params.id)

App.EncounterRoute = Ember.Route.extend
    model: (params) -> @store.find('encounter',params.id)