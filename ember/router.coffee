# ROUTER 
App.Router.map ->
    @resource "user", path: '/:user_name', ->
        @resource "encounter", path: '/:encounter_name', ->
            @resource "enc_player", path: '/:player_name'
            @resource "enc_creature", path: '/:creature_name'
        @resource "creature", path: '/:creature_name'
        @resource "player", path: '/:player_name'

# ROUTES
App.IndexRoute = Ember.Route.extend
    model: -> @store.find('user')

App.UserRoute = Ember.Route.extend
    model: (params) -> @store.find('user',params.id)

App.EncounterRoute = Ember.Route.extend
    model: (params) -> @store.find('encounter',params.id)

App.EncounterEnc_playerRoute = Ember.Route.extend
    model: (params) -> @store.find('player',params.id)

App.CreatureRoute = Ember.Route.extend
    model: (params) -> @store.find('creature',params.id)

App.PlayerRoute = Ember.Route.extend
    model: (params) -> @store.find('player',params.id)