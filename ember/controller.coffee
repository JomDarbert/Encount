# INDEX
App.IndexController = Ember.ArrayController.extend()

App.UserController = Ember.ObjectController.extend(
    showNewEncounter: false
    showNewCreature: false
    showNewPlayer: false
    showNewEncounterButton: true
    showNewCreatureButton: true
    showNewPlayerButton: true

    actions:
        new_encounter: (user, name) ->
            newEncounter = @store.createRecord("encounter",
                encounter_name: name
                user: user
            )
            newEncounter.save()
            user.get("encounters").pushObject newEncounter

            @set "showNewEncounter", false
            @set "showNewEncounterButton", true
            @set "newEncounterName", ""
            return

        new_creature: (user, name) ->
            newCreature = @store.createRecord("creature",
                creature_name: name
                user: user
            )
            newCreature.save()
            user.get("creatures").pushObject newCreature

            @set "showNewCreature", false
            @set "showNewCreatureButton", true
            @set "newCreatureName", ""
            return

        new_player: (user, name) ->
            newPlayer = @store.createRecord("player",
                player_name: name
                user: user
            )
            newPlayer.save()
            user.get("players").pushObject newPlayer

            @set "showNewPlayer", false
            @set "showNewPlayerButton", true
            @set "newPlayerName", ""
            return

        toggle_new_encounter: ->
            @toggleProperty "showNewEncounter", true
            @toggleProperty "showNewEncounterButton", false
            return

        toggle_new_creature: ->
            @toggleProperty "showNewCreature", true
            @toggleProperty "showNewCreatureButton", false
            return

        toggle_new_player: ->
            @toggleProperty "showNewPlayer", true
            @toggleProperty "showNewPlayerButton", false
            return
)