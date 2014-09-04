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

App.showHide = Ember.View.extend();

App.drag = Ember.View.extend({
  attributeBindings: ['draggable'],
  draggable: 'true',
  classNames: ['drag'],
  dragStart: function(event) {
    return event.dataTransfer.setData('text/data', this.get('content.id'));
  }
});

App.drop = Ember.View.extend({
  classNames: ['drop'],
  tagName: 'section',
  dragOver: function(event) {
    return event.preventDefault();
  },
  drop: function(event) {
    var exists, id, player;
    id = Number(event.dataTransfer.getData('text/data'));
    player = null;
    exists = false;
    this.get('parentView.controller').get('model').get('players').forEach(function(p) {
      var test_id;
      test_id = Number(p.get('id'));
      if (test_id === id) {
        return player = p;
      }
    });
    this.get('controller.model').get('players').forEach(function(p) {
      var test_id;
      test_id = Number(p.get('id'));
      if (test_id === id) {
        return exists = true;
      }
    });
    if (exists === false) {
      return this.get('controller.model').get('players').pushObject(player);
    }
  }
});
