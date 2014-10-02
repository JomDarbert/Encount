# INDEX
App.IndexController = Ember.ArrayController.extend()

App.UserController = Ember.ObjectController.extend(
    tagName: 'section'
    showEncounter: true
    showCreature: false
    showPlayer: false
    showNewEncounter: false
    showNewCreature: false
    showNewPlayer: false
    showNewEncounterButton: true
    showNewCreatureButton: true
    showNewPlayerButton: true

    filteredEncounters: (->
        query = @get "encounterQuery"
        results = @get "content.encounters"

        if query
            results = results.filter((e) ->
                e.get("encounter_name").toLowerCase().indexOf(query.toLowerCase()) > -1
            )
        return results
    ).property("content", "encounterQuery")

    filteredCreatures: (->
        query = @get "creatureQuery"
        results = @get "content.creatures"

        if query
            results = results.filter((e) ->
                e.get("creature_name").toLowerCase().indexOf(query.toLowerCase()) > -1
            )
        return results
    ).property("content", "creatureQuery")

    filteredPlayers: (->
        query = @get "playerQuery"
        results = @get "content.players"

        if query
            results = results.filter((e) ->
                e.get("player_name").toLowerCase().indexOf(query.toLowerCase()) > -1
            )
        return results
    ).property("content", "playerQuery")

    actions:
        reset_new_buttons: ->
            @set "showNewEncounter", false
            @set "showNewEncounterButton", true
            @set "showNewCreature", false
            @set "showNewCreatureButton", true
            @set "showNewPlayer", false
            @set "showNewPlayerButton", true

        show_encounter: ->
            @set "showEncounter", true
            @set "showCreature", false
            @set "showPlayer", false

        show_creature: ->
            @set "showCreature", true
            @set "showEncounter", false
            @set "showPlayer", false

        show_player: ->
            @set "showPlayer", true
            @set "showCreature", false
            @set "showEncounter", false

        show_none: ->
            @set "showEncounter", false
            @set "showCreature", false
            @set "showPlayer", false

        new_encounter: (user, name) ->
            newEncounter = @store.createRecord("encounter",
                encounter_name: name
                user: user
                date_created: new Date()
            )
            user.get("encounters").then (encounters) ->
                encounters.pushObject newEncounter
                user.save()

            @set "showNewEncounter", false
            @set "showNewEncounterButton", true
            @set "newEncounterName", ""
            return

        new_creature: (user, name) ->
            newCreature = @store.createRecord("creature",
                creature_name: name
                user: user
            )
            user.get("creatures").then (creatures) ->
                creatures.pushObject newCreature
                user.save()

            @set "showNewCreature", false
            @set "showNewCreatureButton", true
            @set "newCreatureName", ""
            return

        new_player: (user, name) ->
            newPlayer = @store.createRecord("player",
                player_name: name
                user: user
            )
            user.get("players").then (players) ->
                players.pushObject newPlayer
                user.save()

            @set "showNewPlayer", false
            @set "showNewPlayerButton", true
            @set "newPlayerName", ""
            return

        toggle_new_encounter: ->
            @toggleProperty "showNewEncounter"
            @toggleProperty "showNewEncounterButton"
            setTimeout (->
              $("#newEncInput").focus()
              return
            ), 0
            return

        toggle_new_creature: ->
            @toggleProperty "showNewCreature"
            @toggleProperty "showNewCreatureButton"
            setTimeout (->
              $("#newCreInput").focus()
              return
            ), 0
            return

        toggle_new_player: ->
            @toggleProperty "showNewPlayer"
            @toggleProperty "showNewPlayerButton"
            setTimeout (->
              $("#newPlaInput").focus()
              return
            ), 0
            return
)

App.CreatureController = Ember.ObjectController.extend(
    showNewAbility: false
    showNewAbilityButton: true

    actions:    
        new_ability: (creature, name) ->
            newAbility = @store.createRecord("ability",
                ability_name: name
                creature: creature
            )

            creature.get("abilities").then (abilities) ->
                abilities.pushObject newAbility
                creature.save()

            @set "showNewAbility", false
            @set "showNewAbilityButton", true
            @set "newAbilityName", ""
            return

        toggle_new_ability: ->
            @toggleProperty "showNewAbility"
            @toggleProperty "showNewAbilityButton"
            setTimeout (->
              $("#newAbilInput").focus()
              return
            ), 0
            return
)
