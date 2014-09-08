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
            @toggleProperty "showNewEncounter",
            @toggleProperty "showNewEncounterButton"
            return

        toggle_new_creature: ->
            @toggleProperty "showNewCreature"
            @toggleProperty "showNewCreatureButton"
            return


        toggle_new_player: ->
            @toggleProperty "showNewPlayer"
            @toggleProperty "showNewPlayerButton"
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
            newAbility.save()
            creature.get("abilities").pushObject newAbility

            @set "showNewAbility", false
            @set "showNewAbilityButton", true
            @set "newAbilityName", ""
            return

        toggle_new_ability: ->
            @toggleProperty "showNewAbility"
            @toggleProperty "showNewAbilityButton"
            return
)