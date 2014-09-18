window.App = Ember.Application.create({
  LOG_TRANSITIONS_INTERNAL: true
});

App.ApplicationAdapter = DS.FixtureAdapter;


/*
App.ApplicationAdapter = DS.FirebaseAdapter.extend(
  firebase: new Firebase('https://ptp-events.firebaseio.com')
)

App.ApplicationSerializer = DS.FirebaseSerializer.extend()
 */

App.showHide = Ember.View.extend({
  classNames: ['showHide']
});

App.drag = Ember.View.extend({
  attributeBindings: ['draggable'],
  draggable: 'true',
  classNames: ['draggable'],
  dragStart: function(event) {
    var data, json;
    data = {
      type: this.get('content').constructor.typeKey,
      id: Number(this.get('content.id'))
    };
    json = JSON.stringify(data);
    return event.dataTransfer.setData('data', json);
  }
});

App.drop = Ember.View.extend({
  classNames: ['drop'],
  tagName: 'section',
  dragOver: function(event) {
    return event.preventDefault();
  },
  drop: function(event) {
    var creature, data, player;
    data = JSON.parse(event.dataTransfer.getData('data'));
    player = null;
    creature = null;
    if (data.type === 'player') {
      this.get('parentView.controller').get('model').get('players').forEach(function(p) {
        var test_id;
        test_id = Number(p.get('id'));
        if (test_id === data.id) {
          return player = p;
        }
      });
      return this.get('controller.model').get('players').pushObject(player);
    } else if (data.type === 'creature') {
      this.get('parentView.controller').get('model').get('creatures').forEach(function(c) {
        var test_id;
        test_id = Number(c.get('id'));
        if (test_id === data.id) {
          return creature = c;
        }
      });
      return this.get('controller.model').get('creatures').pushObject(creature);
    }
  }
});
