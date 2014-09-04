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
    classNames: ['drag']

    dragStart: (event) ->
        event.dataTransfer.setData 'text/data', @get 'content.id'
)

App.drop = Ember.View.extend(
    classNames: ['drop']
    tagName: 'section'

    dragOver: (event) ->
        event.preventDefault()

    drop: (event) ->
        id = Number(event.dataTransfer.getData 'text/data')
        player = null
        exists = false

        @get('parentView.controller').get('model').get('players').forEach (p) ->
            test_id = Number(p.get 'id')
            if test_id is id then player = p

        @get('controller.model').get('players').forEach (p) ->
            test_id = Number(p.get 'id')
            if test_id is id then exists = true

        if exists is false then @get('controller.model').get('players').pushObject player
)