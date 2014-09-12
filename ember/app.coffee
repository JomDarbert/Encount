window.App = Ember.Application.create(
    LOG_TRANSITIONS_INTERNAL: true
)
App.ApplicationAdapter = DS.FixtureAdapter
###
App.ApplicationAdapter = DS.FirebaseAdapter.extend(
  firebase: new Firebase('https://ptp-events.firebaseio.com')
)

App.ApplicationSerializer = DS.FirebaseSerializer.extend()
###

App.showHide = Ember.View.extend()

App.drag = Ember.View.extend(
    attributeBindings: ['draggable']
    draggable: 'true'

    dragStart: (event) ->
        data = 
            type: @get('content').constructor.typeKey
            id: Number(@get 'content.id')

        json = JSON.stringify data
        event.dataTransfer.setData 'data', json
)

App.drop = Ember.View.extend(
    classNames: ['drop']
    tagName: 'section'

    dragOver: (event) ->
        event.preventDefault()

    drop: (event) ->
        data = JSON.parse event.dataTransfer.getData 'data'
        player = null
        creature = null

        if data.type is 'player'
            @get('parentView.controller').get('model').get('players').forEach (p) ->
                test_id = Number(p.get 'id')
                if test_id is data.id then player = p

            @get('controller.model').get('players').pushObject player
            
        else if data.type is 'creature'
            @get('parentView.controller').get('model').get('creatures').forEach (c) ->
                test_id = Number(c.get 'id')
                if test_id is data.id then creature = c

            @get('controller.model').get('creatures').pushObject creature
)