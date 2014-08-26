# ROUTER 
App.Router.map ->
  @resource "user", ->
    @resource "encounter", ->
        @resource "player"
        @resource "creature", ->
            @resource "ability"

# ROUTES